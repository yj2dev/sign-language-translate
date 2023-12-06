import { useEffect, useState } from "react";
import { TypingText } from "./styled";

const TypingEffect = ({ text }) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // 타이핑 속도 조절o

    return () => clearInterval(timer);
  }, [text]);

  return <TypingText>{typedText}</TypingText>;
};

export default TypingEffect;
