import { Container, FileDropSection } from "./styled";
import { useCallback, useRef, useState } from "react";
import { RxUpload } from "react-icons/rx";
import { IconContext } from "react-icons";

const TestPage3 = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [dropFile, setDropFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over....");
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(true);
    console.log("over....");
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDrag(false);

    const files = e.dataTransfer.files;
    if (files && files.length) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length) {
        setDropFile(files);
        console.log("Dropped image files", imageFiles);
      } else {
        setDropFile(null);
        console.log("No image files found");
      }
    }
  }, []);

  return (
    <Container>
      <h3>TEST3</h3>
      <FileDropSection
        className={isDrag && "in"}
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
      >
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
    </Container>
  );
};

export default TestPage3;
