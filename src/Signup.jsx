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

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setMember({
      ...member,
      [name]: value
    })
  }

  const validate = () => {
    let newErrors = {};

    if(!member.username.trim()) { // 공백 X
      newErrors.username = "아이디를 입력하시오.";
    }
    if(!member.nickname.trim()) { // 공백 X
      newErrors.nickname = "닉네임을 입력하시오.";
    }
    if(member.password.length < 3) { 
      newErrors.password = "비밀번호는 최소 3자리 이상이어야 합니다."
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(member.email)){
      newErrors.email = "올바른 이메일형식을 입력하시오."
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onsubmitHandler = () => {
    if(!validate()) {
      alert('입력값을 확인하세요');
      return;
    } // 에러 있으면 axios 요청 안보냄
  

    axiosInstance.post('/signup', member)
      .then(response => {
       console.log(response);
       alert(response.data);
       navigate('/');
      }).catch(error => {
       console.log(error);
       alert("회원가입 중 오류가 발생했습니다")
      })
  };

   return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <hr />
      <label>아이디<input type="text" name="username" placeholder="아이디를 입력하세요" onChange={onChangeHandler}/></label>
      {errors.username && <p className="error">{errors.username}</p>}
      <label>닉네임<input type="text" name="nickname" placeholder="닉네임을 입력하세요" onChange={onChangeHandler}/></label>
      {errors.nickname && <p className="error">{errors.nickname}</p>}
      <label>비밀번호<input type="password" name="password" placeholder="비밀번호를 입력하세요" onChange={onChangeHandler}/></label>
      {errors.password && <p className="error">{errors.password}</p>}
      <label>이메일<input type="text" name="email" placeholder="이메일을 입력하세요" onChange={onChangeHandler}/></label>
      {errors.email && <p className="error">{errors.email}</p>}
      <button onClick={onsubmitHandler}>회원가입</button>
    </div>
  )
}

export default Signup;