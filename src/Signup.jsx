import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './css/signup.css';

const Signup = () => {
  const [member, setMember] = useState({
    username: '',
    password: '',
    email: ''
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <hr />
      아이디 : <input type="text" name="username" onChange={onChangeHandler} /> <br />
      닉네임 : <input type="text" name="nickname" onChange={onChangeHandler} /> <br />
      비밀번호 : <input type="password" name="password" onChange={onChangeHandler} /> <br />
      이메일 : <input type="text" name="email" onChange={onChangeHandler} /> <br />
      <button onClick={() => {
        axiosInstance.post('/signup', member)
          .then(response => {
            console.log(response)
            alert(response.data);
            navigate('/');
          }).catch(error => {
            console.log(error);
          })
      }}>회원가입</button>
    </div>
  )
}

export default Signup;