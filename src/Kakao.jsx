import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Kakao({setAuth}) {

  const navigate = useNavigate();

  const responseKakao = (response) => {
    console.log(response)
    axiosInstance.post('/oauth/kakao', {
      username: response.profile.properties.nickname,
      email: response.profile.kakao_account.email
    }).then(response => {
      const jwt = response.headers.authorization;
      console.log(jwt);
      if(jwt != null){
        sessionStorage.setItem('jwt', jwt);
        setAuth(true)
        navigate('/')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
    <KakaoLogin
      token="6f1b484622eb9ece5080d695a796e865"
      onSuccess={responseKakao}
      onFail={() => console.log("소셜 로그인 실패")}
    />
    </>
  )

}

export default Kakao;