import {
  Container,
  FileDropSection,
  DragOverlay,
  PreviewImageSection,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import { RxUpload } from "react-icons/rx";
import { IconContext } from "react-icons";
import ReactQuill from "react-quill";
import { fullModules } from "../../utils/ReactQuillConfig";
import axios from "axios";

const TestPage = () => {
  const [isDrag, setIsDrag] = useState(false);
  const dragTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const [dropFile, setDropFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [value, setValue] = useState("");

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDrag(true);

      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }

      dragTimeoutRef.current = setTimeout(() => {
        setIsDrag(false);
      }, 100);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDrag(false);

      const files = e.dataTransfer.files;
      let previewUrls = []; // 미리보기 URL을 저장할 배열

      if (files && files.length) {
        const imageFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/"),
        );

        if (imageFiles.length) {
          const newImageFiles = dropFile ? [...dropFile, ...imageFiles] : imageFiles; // 기존 파일에 새로운 파일 추가

          newImageFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.onloadend = () => {
              previewUrls.push(reader.result); // URL 배열에 추가

              // 모든 이미지가 로드되었는지 확인
              if (previewUrls.length === newImageFiles.length) {
                setDropFile(newImageFiles); // 드랍된 파일 상태 업데이트
                setPreviewUrl(previewUrls); // 모든 이미지 URL 배열을 상태에 설정
              }
            };

            reader.readAsDataURL(file); // 파일 읽기 시작
          });
        } else {
          setDropFile(null);
        }
      }
    };

    const handlePaste = (e) => {
      const items = (e.clipboardData || window.clipboardData).items;
      let previewUrls = []; // 미리보기 URL을 저장할 배열

      for (let index in items) {
        const item = items[index];

        if (item.kind === "file" && item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          const reader = new FileReader();

          reader.onloadend = () => {
            previewUrls.push(reader.result);
            setPreviewUrl(previewUrls);
          };

          reader.readAsDataURL(blob);
        }
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log("select files >> ", files);

    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length > 0) {
        setDropFile(imageFiles); // 드랍된 이미지 파일들을 상태에 저장

        let previewUrls = []; // 미리보기 URL을 저장할 배열

        imageFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            previewUrls.push(reader.result); // URL 배열에 추가
            // 모든 이미지가 로드되었는지 확인
            if (previewUrls.length === imageFiles.length) {
              setPreviewUrl(previewUrls); // 모든 이미지 URL 배열을 상태에 설정
            }
          };

          reader.readAsDataURL(file); // 파일 읽기 시작
        });
      } else {
        setDropFile(null);
      }
    }
  };

  const onClickSendImg = () => {
    console.log('dropFile >> ', dropFile)
    if (!dropFile || dropFile.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    const fd = new FormData();
    dropFile.forEach((file, index) => {
      fd.append(`file${index}`, file, file.name);
    });

    axios.post('/api/sign-lan/analysis', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
        .then(response => {
          console.log(response.data);
          alert('[분석]파일이 성공적으로 전송되었습니다.');
        })
        .catch(error => {
          console.error('Error uploading file: ', error);
          alert('[분석]파일 전송 중 오류가 발생했습니다.');
        });

  }

  const  onClickChat = () => {
    const message= "안녕하세요. 오늘 날씨 어때요?"
    const payload = {message}

    axios.post('/api/chat', payload
    )
        .then(res => {
          console.log(res.data);
          alert('[채팅] 파일이 성공적으로 전송되었습니다.');
        })
        .catch(error => {
          console.error('Error uploading file: ', error);
          alert('[채팅] [알파벳 분석] 파일 전송 중 오류가 발생했습니다.');
        });

  }


  return (
    <Container>
      <button onClick={onClickSendImg}>전송</button>
      <button onClick={onClickChat}>채팅</button>
      <h3>글을 쓰자</h3>
      <div>
        <ReactQuill value={value} onChange={setValue} modules={fullModules} />
      </div>

      <input
        type="file"
        multiple={true}
        accept="image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {isDrag && <DragOverlay>파일을 드롭하세요</DragOverlay>}
      <FileDropSection onClick={() => fileInputRef.current.click()}>
        {dropFile ? (
          <p>{dropFile[0].name}</p>
        ) : (
          <>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <RxUpload />
            </IconContext.Provider>

            <p>최대 10MB 이하 JPEG, PNG 첨부 가능</p>
            <p>이미지를 끌어넣거나 클립보드에 복사하여 붙여 넣어주세요.</p>
            <p>또는 시작할 파일을 선택하세요</p>
          </>
        )}
      </FileDropSection>

      <PreviewImageSection>
        {previewUrl &&
          previewUrl.map((v, i) => {
            return (
              <>
                <img src={v} alt="preview" />
              </>
            );
          })}
      </PreviewImageSection>
    </Container>
  );
};

export default TestPage;
