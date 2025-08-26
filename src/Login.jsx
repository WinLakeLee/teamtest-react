import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './css/Login.css';

const Login = ({ setAuth }) => {
  const [member, setMember] = useState({
    "username" : '',
    "password" : ''
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <hr />
      아이디 : <input type="text" name="username" onChange={onChangeHandler} /> <br />
      비밀번호 : <input type="password" name="username" onChange={onChangeHandler} /> <br />
      <button onClick={() => {
        axiosInstance.post('/login', member)
        .then(response => {
          const jwt = response.headers.authorization;
        
          if(jwt != null) {
            sessionStorage.setItem('jwt', jwt);
            setAuth(true)
            navigate('/')
          }
        }).catch(error => {
          console.log(error);
        })
      }}>로그인</button>
    </div>
  )
}

export default Login;