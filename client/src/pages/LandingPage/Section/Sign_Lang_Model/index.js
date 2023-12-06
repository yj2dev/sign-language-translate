import React from "react";
import Model from "./images/Model.png";
const About = () => {
  return (
    <div className="model-section-container">
      <div className="model-section-image-container">
        <img src={Model} alt="" />
      </div>
      <div className="model-section-text-container">
        <p className="model-subheading">Model</p>
        <h1 className="model-heading">
        수어 이미지를 분류하는 CNN(Convolution Neural Network) 모델을 사용합니다.
        </h1>
        <p className="model-text">
        keras를 사용해 수어 이미지를 분류하는 CNN(Convolution Neural Network) 모델을 사용합니다.
            성능 향상을 위해 적합한 모델 구조와 데이터 처리 과정을 거쳤습니다.  개별 사진에 99%의 정확도를 보이며 수어 동작 인식에 평균 0.15초의 시간이 소요됩니다.
        </p>
        
      </div>
    </div>
  );
};

export default About;
