import { Container } from "./styled";
import { useCallback, useState } from "react";

const TestPage2 = () => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(null);
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over..........");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over..........");
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length) {
      // 파일 업로드 로직
      console.log("Dropped files", files);

      setImage(files);
    }
  }, []);

  return (
    <Container>
      <div
        onDragOver={handleDrag}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          width: "100%",
          border: "1px solid red",
          height: "100vh",
          backgroundColor: dragging ? "lightblue" : "white",
        }}
      >
        {dragging ? (
          <p>파일을 여기에 놓으세요</p>
        ) : (
          <p>파일을 이 영역으로 드래그하세요</p>
        )}

        {image ? <p>{image[0].name}</p> : <p>파일 없음</p>}
      </div>
    </Container>
  );
};

export default TestPage2;
