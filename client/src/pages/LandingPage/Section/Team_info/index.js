import Team from "./image/team.png";
const Team_info = () => {
  
  const workInfoData = [
    {
      image: Team,
      title: "🐻김진우",
      text: "Model",
    },
    {
      image: Team,
      title: "🐹최다인",
      text: "Model ",
    },
    {
      image: Team,
      title: "🐶김동민",
      text: "Infra",
    },
    {
      image: Team,
      title: "🐼이승주",
      text: "Frontend",
    },
    {
      image: Team,
      title: "🦁이유진",
      text: "Frontend",
    },
    {
      image: Team,
      title: "🐰홍아현",
      text: "Frontend",
    },
    {
      image: Team,
      title: "🐻‍❄️김성민",
      text: "Backend ",
    },
    {
      image: Team,
      title: "🐯박성현",
      text: "Backend",
    },

  ];
  return (
   <div className="team-section-wrapper">
    <div className="team-section-top">
      <p className="team-subheading">팀 소개</p>
      <h1 className="team-heading">전남/전북 AI 9반 26조</h1>
      <p className="team-text">
        KT Aivle School 4기 AI트랙 7차 미니프로젝트 진행하는 26조입니다🤭
      </p>
      <p className="team-text">
        김동민, 김성민, 김진우, 박성현, 이승주, 이유진, 최다인, 홍아현 총 8명의 팀원으로 이루어져 있습니다.✌️😊
      </p>
    </div>
    <div className="team-section-bottom">
      {workInfoData.map((data) => (
        <div className="team-section-info" key={data.title}>
          <div className="team-boxes-img-container">
            <img src={data.image} alt="" />
          </div>
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>
      ))}
    </div>
</div>
);
  
};

export default Team_info;
