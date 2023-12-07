import json
import os
import string
import cv2
from dotenv import load_dotenv
import mlflow
import mlflow.keras
import numpy as np
from openai import OpenAI
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(BASE_DIR, '.env')
load_dotenv(dotenv_path)

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


def index(req):
    print('index >> ')
    if req.method == "GET":
        return JsonResponse({'response': True})


@csrf_exempt
def sign_lan_analysis(req):
    print('sign_lan_analysis >> ')
    print(req)
    if req.method == "POST":
        print('sign_lan_analysis post >> ')
        # print('req.FILES >> ', req.FILES)
        if req.FILES:
            file_urls = []
            # 파일 인덱스 패턴에 맞춰서 파일 처리
            chatGptPrompt=[]
            print('req.FILES >> ', req.FILES)
            # print('file_urls >> ', file_urls)

            for key in req.FILES:
                print("key>>",key)
                # if key.startswith('FILES'):
                file = req.FILES[key]
                # print(file)
                # print("file>>",file)
                fs = FileSystemStorage()
                if not os.path.exists('file'):
                    os.makedirs('file')
                filename = fs.save('file/'+file.name, file)
                file_url = fs.url(filename)
                file_url = '.'+file_url
                file_urls.append(file_url)
                print('file_url>>', file_url)
                class_names = list(string.ascii_lowercase)
                class_names = np.array(class_names)
                

                # mlflow 로딩
                mlflow_uri="http://mini7-mlflow.carpediem.so/"
                mlflow.set_tracking_uri(mlflow_uri)
                model_uri = "models:/signlanguage/production" 
                model = mlflow.keras.load_model(model_uri)
                
                img = cv2.imread(file_url, cv2.IMREAD_GRAYSCALE)
                # 크기 조정
                print(img)
                img = cv2.resize(img, (28, 28))

                # input shape 맞추기
                test_sign = img.reshape(1, 28, 28, 1)

                # 스케일링
                test_sign = test_sign / 255.

                # 예측 : 결국 이 결과를 얻기 위해 모든 것을 했다.
                pred = model.predict(test_sign)
                pred_1 = pred.argmax(axis=1)

                result_str = class_names[pred_1][0]
                print(result_str)
                chatGptPrompt .append(result_str)
            
            # result = chat(chatGptPrompt)
            # print(result)
            # context = {
            #     'question': chatGptPrompt,
            #     'result': result
            # }
            # print(context)
            context = {
                'result': chatGptPrompt
            }
            print(context)
            return JsonResponse(context)
        else:
            return JsonResponse({'response': 'No files attached'}, status=400)
    else:
        return JsonResponse({'response': 'Invalid request method'}, status=405)

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        prompt = data.get('message')
        print('prompt >> ', prompt)
        gptprompt ="한글로 대답해"
        completion = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=[
                {"role": "system", "content": gptprompt},
                {"role": "user", "content": prompt}]
        )
        print(completion)
        result = completion.choices[0].message.content
        print('result >> ', result)
        context = {"result": result}
        return JsonResponse(context)
