import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './css/signup.css';

const Signup = () => {
   const [member, setMember] = useState({
    username: '',
    nickname: '',
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
      <label>아이디<input type="text" name="username" onChange={onChangeHandler}/></label> <br />
      <label>닉네임<input type="text" name="nickname" onChange={onChangeHandler}/></label> <br />
      <label>비밀번호<input type="password" name="password" onChange={onChangeHandler}/></label> <br />
      <label>이메일<input type="text" name="email" onChange={onChangeHandler}/></label> <br />
      <button onClick={() => {
        console.log(member)
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