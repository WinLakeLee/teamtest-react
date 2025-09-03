import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./css/MyPage.css";

const MyPage = ({ userInfo, setUserInfo, auth, setAuth, gameScore, gameNames}) => {

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('jwt');
    setUserInfo('');
  }
  if(!userInfo)
    return <div>로딩창</div>

  return (
    <div className="mypage-container" 
      style={{
      backgroundImage: userInfo?.nicknameBg  // nicknameBg(테두리이미지)가 있을때만 적용
      ? `url(${userInfo.nicknameBg})`        // 없으면 none
      : "none"
      }}>
      <img src={`../images/rank/티어이미지/${userInfo?.grade}.jpg`} // 등급이미지 
           alt={userInfo?.grade} 
           style={{ width: "50px", height: "50px", marginLeft: "10px" }} 
      />
      <h2>{userInfo.username}님</h2>
      <p>{userInfo.nickname}님의 마이페이지</p>
      <label>닉네임 : {userInfo.nickname}</label> <br />
      <label>이메일 : {userInfo.email}</label> <br />
      <label>포인트 : {userInfo.point}</label> <br />
      {gameNames.map((game) => {
        const score = gameScore[game.name]?.find(
          (user) => user.nickname === userInfo.nickname // user = 현재 보고 있는 유저, userinfo = 로그인한 유저
        );
         return (
          <div key={game.name}>
            <label>
              {game.label} 점수 : {score ? score.score : 0}
            </label>
          </div>
         );
        })}

      <button onClick={() => navigate("/modify")}>
        수정
      </button>
      <button
        className="deleteId"
        onClick={() => {
          const pw = window.prompt("한번더 비밀번호를 입력해 주세요");
          axiosInstance
            .delete('/delete', { params: { password: pw } })
            .then((response) => {
              alert(response.data);
              logout();
              if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;
              axiosInstance
                .delete('/delete', { data: { id: userInfo.id } })
                .then((response) => {
                  console.log(response.data);
                  alert("탈퇴가 완료되었습니다.");
                  logout();
                  navigate("/");
                })
                .catch((error) => {
                  console.error(error);
                  alert("탈퇴 중 오류가 발생했습니다.");
                });
            })
        }
        }
      >
        탈퇴
      </button>
    </div>
  );
};

export default MyPage;
