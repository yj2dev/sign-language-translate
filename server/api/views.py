import json
import os
from dotenv import load_dotenv
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
    if req.method == "POST":
        print('sign_lan_analysis post >> ')
        print('req.FILES >> ', req.FILES)
        if req.FILES:
            file_urls = []
            # 파일 인덱스 패턴에 맞춰서 파일 처리

            print('req.FILES >> ', req.FILES)
            print('file_urls >> ', file_urls)

            for key in req.FILES:
                if key.startswith('file'):
                    file = req.FILES[key]
                    fs = FileSystemStorage()
                    filename = fs.save(file.name, file)
                    file_url = fs.url(filename)
                    file_urls.append(file_url)

            return JsonResponse({'response': 'Files uploaded successfully', 'file_urls': file_urls})
        else:
            return JsonResponse({'response': 'No files attached'}, status=400)
    else:
        return JsonResponse({'response': 'Invalid request method'}, status=405)

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        prompt = data.get('message', '')
        print('prompt >> ', prompt)

        completion = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=[{"role": "user", "content": prompt}]
        )
        print(completion)
        result = completion.choices[0].message.content
        print('result >> ', result)

        return JsonResponse({'result': result})
