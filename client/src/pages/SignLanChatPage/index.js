import {
  Container,
  FileDropSection,
  DragOverlay,
  PreviewImageSection,
  ChatSection,
  MessageList,
  InputArea,
  Message,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import { IoIosImages, IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons";
import ReactQuill from "react-quill";
import { fullModules } from "../../utils/ReactQuillConfig";
import axios from "axios";
import { BeatLoader, BounceLoader, PulseLoader } from "react-spinners";
import TypingEffect from "../../components/TypingEffect";

const SignLanChatPage = () => {
  const inputRef = useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const dragTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const [dropFile, setDropFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);

  const [dragging, setDragging] = useState(false); // 드래그 중인지 상태
  const [draggedIndex, setDraggedIndex] = useState(null); // 드래그 중인 항목의 인덱스

  const [chatLoading, setChatLoading] = useState(false);

  const [translateLoading, setTranslateLoading] = useState(false);

  const [rValue, setRValue] = useState("");

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

    setTranslateLoading(true);

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
        // alert("[분석]파일이 성공적으로 전송되었습니다.");
        console.log(response.data);
        setRValue(rValue + response.data.result.join(""));
        setDropFile([]);
        setPreviewUrl([]);
        inputRef.current.focus();
      })
      .catch((error) => {
        alert("이미지 분석중 에러가 발생했습니다. 다시 시도해 주세요.");
        console.error("Error uploading file: ", error);
      })
      .finally(() => {
        setTranslateLoading(false);
      });
  };

  const onClickChat = () => {
    if (!rValue || rValue.length === 0) return;
    if (chatLoading) return;

    setChatLoading(true);

    const payload = { message: rValue };

    setRValue("");
    setMessages([...messages, rValue]);

    axios
      .post("/api/chat", payload)
      .then((res) => {
        // alert("[채팅] 파일이 성공적으로 전송되었습니다.");
        console.log(res.data);
        // setMessages([...messages, res.data.result]);
        setMessages((prevMessages) => [...prevMessages, res.data.result]);
      })
      .catch((error) => {
        alert("채팅중 에러가 발생했습니다. 다시 시도해 주세요.");
        console.error("Error uploading file: ", error);
      })
      .finally(() => {
        setChatLoading(false);
      });
  };

  const onChangeRValue = (e) => {
    setRValue(e.target.value);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDrag(true);

    // if (dragTimeoutRef.current) {
    //   clearTimeout(dragTimeoutRef.current);
    // }

    // dragTimeoutRef.current = setTimeout(() => {
    //   setIsDrag(false);
    // }, 300);
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

  return (
    <Container>
      <div className="flex-1 analysis-section">
        <input
          type="file"
          multiple={true}
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        <FileDropSection
          className={`${isDrag ? "drag" : ""} ${
            dropFile.length > 0 ? "active" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDrag(false)}
          onClick={() => fileInputRef.current.click()}
        >
          {dropFile.length > 0 ? (
            <div className="drop-content">
              <IconContext.Provider value={{ className: "react-icons" }}>
                <IoIosImages />
              </IconContext.Provider>
              <p>
                업로드가 완료되었습니다. 추가 업로드 하거나
                <br />
                이미지를 드래그하여 순서 변경 및 삭제할 수 있습니다
              </p>
            </div>
          ) : (
            <div className="drop-content">
              <IconContext.Provider value={{ className: "react-icons" }}>
                <IoIosImages />
              </IconContext.Provider>
              <p>
                이미지 선택, 드래그 & 드롭, 클립보드 붙여넣기로
                <br />
                업로드 할 수 있습니다
              </p>
            </div>
          )}
        </FileDropSection>
        <PreviewImageSection className={dropFile.length > 0 && "active"}>
          {previewUrl && previewUrl.length > 0 ? (
            <div className="images-container">
              {/* 여기에 images-container 클래스를 추가 */}
              {previewUrl.map((url, index) => (
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
                  <span>{index + 1}</span>
                  <button className="del-btn" onClick={() => onDelete(index)}>
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p id="upload-info">
              수화 이미지 업로드 후 <br />
              텍스트로 변환해보세요!
              <br />
              <span className="tip">이미지 업로드 후 버튼이 생성됩니다.</span>
            </p>
          )}
          {dropFile.length > 0 && (
            <>
              <button
                className={translateLoading && "disabled"}
                disabled={translateLoading}
                id="translate-btn"
                onClick={onClickSendImg}
              >
                {translateLoading ? (
                  <>
                    <PulseLoader size={12} margin={6} color="#fff" />
                  </>
                ) : (
                  <>수어 텍스트로 변환</>
                )}
              </button>
            </>
          )}
        </PreviewImageSection>
      </div>
      <div className="flex-1 chat-section">
        <ChatSection>
          <MessageList>
            <div className="chatbot-title">
              ChatGPT 4{/*<TypingEffect text="C hatGPT 4" />*/}
            </div>
            <Message className="odd">
              <span>
                <TypingEffect text="안 녕하세요! 무엇을 도와드릴까요?" />
              </span>
            </Message>
            {messages.map((message, index) => (
              <Message key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <span>{message}</span>
              </Message>
            ))}
          </MessageList>
          <InputArea>
            <input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") onClickChat();
              }}
              type="text"
              value={rValue}
              onChange={onChangeRValue}
            />
            <button
              disabled={chatLoading || rValue.length === 0}
              className={chatLoading || rValue.length === 0 ? "disabled" : ""}
              onClick={onClickChat}
            >
              {chatLoading ? (
                <>
                  <BounceLoader size={12} color="#fff" />
                </>
              ) : (
                <>보내기</>
              )}
            </button>
          </InputArea>
        </ChatSection>
      </div>
    </Container>
  );
};

export default SignLanChatPage;
