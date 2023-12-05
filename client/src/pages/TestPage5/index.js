import {
  Container,
  FileDropSection,
  DragOverlay,
  PreviewImage,
} from "./styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { RxUpload } from "react-icons/rx";
import { IconContext } from "react-icons";

const TestPage5 = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [dropFile, setDropFile] = useState(null);
  const dragTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

      console.log("DROP files >> ", files);

      if (files && files.length) {
        const imageFiles = Array.from(files).filter((file) =>
          file.type.startsWith("image/"),
        );

        if (imageFiles.length) setDropFile(files);
        else setDropFile(null);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [isDrag]);

  const handleFileSelect = (e) => {
    const files = e.target.files;

    console.log("select files >> ", files);

    if (files && files[0]) {
      setDropFile(files);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }} // 숨김 처리
      />

      <h3>TEST5</h3>
      {isDrag && <DragOverlay>파일을 드롭하세요</DragOverlay>}
      <FileDropSection onClick={openFileDialog}>
        {dropFile ? (
          <p>{dropFile[0].name}</p>
        ) : (
          <>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <RxUpload />
            </IconContext.Provider>

            <p>최대 10MB 이하 JPEG, PNG 첨부 가능</p>
            <p>
              <b>파일을 선택하거나</b> 여기로 드래그하세요
            </p>
          </>
        )}
      </FileDropSection>

      {previewUrl && <PreviewImage src={previewUrl} alt="Preview" />}
    </Container>
  );
};

export default TestPage5;
