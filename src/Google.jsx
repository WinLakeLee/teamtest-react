import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Google({ setAuth }) {

  const navigate = useNavigate();

  const responseGoogle = (response) => {
  console.log(response)
  console.log(response.credential)
  const decode = jwtDecode(response.credential)
  console.log('디코딩완료', decode)
  console.log('이메일', decode.email)
  console.log('이메일', decode.name)
  axiosInstance.post(`/login/google?username=${decode.name}&email=${decode.email}`) 
    .then(response => {
    const jwt = response.headers.authorization;
    console.log(jwt)
    if(jwt != null) {
      sessionStorage.setItem('jwt', jwt);
      setAuth(true)
      navigate('/')
    }
  }) .catch(error => {
    console.log(error);
  })
  }

  return (
    <>
      <GoogleOAuthProvider clientId="100114333902-9rqlk26v1k76pv56g862s90ln7i20elr.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={()=> console.log("실패")}
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default Google;