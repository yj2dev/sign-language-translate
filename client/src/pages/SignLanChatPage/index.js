import {
  Container,
  FileDropSection,
  DragOverlay,
  PreviewImageSection,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IconContext } from "react-icons";
import ReactQuill from "react-quill";
import { fullModules } from "../../utils/ReactQuillConfig";
import axios from "axios";

const SignLanChatPage = () => {
  const [isDrag, setIsDrag] = useState(false);
  const dragTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const [dropFile, setDropFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [dragging, setDragging] = useState(false); // 드래그 중인지 상태
  const [draggedIndex, setDraggedIndex] = useState(null); // 드래그 중인 항목의 인덱스

  const [value, setValue] = useState("");
  // 드래그 시작 핸들러
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setDragging(true);
    setDraggedIndex(index);
  };
  // 드롭 핸들러
  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain")); // 저장된 인덱스를 숫자로 변환

    if (dragIndex === dropIndex) {
      return; // 같은 위치에 드롭하는 경우 변화 없음
    }

    const newFiles = [...dropFile];
    const newUrls = [...previewUrl];
    const draggedFile = newFiles.splice(dragIndex, 1)[0];
    const draggedUrl = newUrls.splice(dragIndex, 1)[0];
    newFiles.splice(dropIndex, 0, draggedFile);
    newUrls.splice(dropIndex, 0, draggedUrl);
    setDropFile(newFiles);
    setPreviewUrl(newUrls);
    setDragging(false);
    setDraggedIndex(null);
  };
  const onDragEnd = () => {
    setDragging(false);
    setDraggedIndex(null);
  };

  // 삭제 핸들러
  const onDelete = (deleteIndex) => {
    const newFiles = dropFile.filter((_, index) => index !== deleteIndex);
    const newUrls = previewUrl.filter((_, index) => index !== deleteIndex);
    setDropFile(newFiles);
    setPreviewUrl(newUrls);
  };

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
      if (files && files.length) {
        const imageFiles = Array.from(files).filter((file) =>
          file.type.startsWith("image/"),
        );

        if (imageFiles.length) {
          let newPreviewUrls = [...(previewUrl || [])]; // 기존 미리보기 URL 유지

          imageFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
              newPreviewUrls = [...newPreviewUrls, reader.result]; // 새 URL 추가

              if (
                newPreviewUrls.length ===
                (dropFile ? dropFile.length : 0) + imageFiles.length
              ) {
                const updatedImageFiles = dropFile
                  ? [...dropFile, ...imageFiles]
                  : imageFiles;
                setDropFile(updatedImageFiles); // 업데이트된 파일 목록 상태 업데이트
                setPreviewUrl(newPreviewUrls); // 업데이트된 미리보기 URL 목록 상태 업데이트
              }
            };

            reader.readAsDataURL(file);
          });
        }
      }
    };
    const handlePaste = (e) => {
      const items = (e.clipboardData || window.clipboardData).items;
      let imageFiles = []; // 이미지 파일을 저장할 배열
      let previewUrls = []; // 미리보기 URL을 저장할 배열

      for (let index in items) {
        const item = items[index];

        if (item.kind === "file" && item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          imageFiles.push(blob); // 파일 배열에 추가
          const reader = new FileReader();

          reader.onloadend = () => {
            previewUrls.push(reader.result); // URL 배열에 추가
            // 모든 이미지가 로드되었는지 확인
            if (previewUrls.length === imageFiles.length) {
              setDropFile((prevFiles) => [...(prevFiles || []), ...imageFiles]); // 기존 파일에 새로운 파일 추가
              setPreviewUrl((prevUrls) => [
                ...(prevUrls || []),
                ...previewUrls,
              ]); // 기존 URL에 새로운 URL 추가
            }
          };

          reader.readAsDataURL(blob); // 파일 읽기 시작
        }
      }
    };

    // window.addEventListener("dragover", handleDragOver);
    // window.addEventListener("drop", handleDrop);
    window.addEventListener("paste", handlePaste);

    return () => {
      // window.removeEventListener("dragover", handleDragOver);
      // window.removeEventListener("drop", handleDrop);
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

      let previewUrls = []; // 미리보기 URL을 저장할 배열

      imageFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          previewUrls.push(reader.result); // URL 배열에 추가
          // 모든 이미지가 로드되었는지 확인
          if (previewUrls.length === imageFiles.length) {
            setDropFile((prevFiles) => [...(prevFiles || []), ...imageFiles]);
            setPreviewUrl((prevUrls) => [...(prevUrls || []), ...previewUrls]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const onClickSendImg = () => {
    console.log("dropFile >> ", dropFile);
    if (!dropFile || dropFile.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    const fd = new FormData();
    dropFile.forEach((file, index) => {
      fd.append(`file${index}`, file, file.name);
    });

    // FormData 객체의 내용을 로깅
    for (let [key, value] of fd.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post("/api/sign-lan/analysis", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("[분석]파일이 성공적으로 전송되었습니다.");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        alert("[분석]파일 전송 중 오류가 발생했습니다.");
      });
  };

  const onClickChat = () => {
    const message = "안녕하세요. 오늘 날씨 어때요?";
    const payload = { message };

    axios
      .post("/api/chat", payload)
      .then((res) => {
        console.log(res.data);
        alert("[채팅] 파일이 성공적으로 전송되었습니다.");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        alert("[채팅] [알파벳 분석] 파일 전송 중 오류가 발생했습니다.");
      });
  };

  return (
    <Container>
      <button onClick={onClickSendImg}>전송</button>
      <button onClick={onClickChat}>채팅</button>

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
        {dropFile && dropFile.length > 0 ? (
          <p>{dropFile[0].name}</p> // 파일이 있을 때만 파일 이름 표시
        ) : (
          <div className="drop-content">
            <IconContext.Provider value={{ className: "react-icons" }}>
              <IoIosImages />
            </IconContext.Provider>
            사진을 클릭하여 이미지를 업로드하세요. <br />
            또는 이미지를 끌어 넣거나 클립보드에 (Ctrl+V) 복사 후 사용해주세요.
            {/*<p>최대 10MB 이하 JPEG, PNG 첨부 가능</p>*/}
            {/*<p>이미지를 끌어넣거나 클립보드에 복사하여 붙여 넣어주세요.</p>*/}
            {/*<p>또는 시작할 파일을 선택하세요</p>*/}
          </div>
        )}
      </FileDropSection>
      <PreviewImageSection>
        {previewUrl && previewUrl.length > 0 ? (
          previewUrl.map((url, index) => (
            <div
              key={index}
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDragStart={(e) => onDragStart(e, index)}
              onDrop={(e) => onDrop(e, index)}
              onDragEnd={onDragEnd}
              className={`preview-item ${
                dragging && index === draggedIndex ? "dragging" : ""
              }`}
            >
              <img src={url} alt="preview" />
              <button className="del-btn" onClick={() => onDelete(index)}>
                삭제
              </button>
              <span>{index + 1}</span> {/* 인덱스 번호 표시 */}
            </div>
          ))
        ) : (
          <p>미리보기 이미지가 없습니다.</p>
        )}
      </PreviewImageSection>

      <input type="text" />
    </Container>
  );
};

export default SignLanChatPage;
