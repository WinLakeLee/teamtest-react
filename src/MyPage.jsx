import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyPage = ({ userInfo, setUserInfo}) => {

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>님</h2>
      <hr />
      <label>닉네임</label> <br />
      <label>이메일</label> <br />
      <label>점수</label> <br />

      <button onClick={() => {
        navigate("/modify")
      }}>
        수정
      </button>
      <button className="deleteId" onClick={() => {
        axiosInstance.delete('/delete')
          .then(response => {
            console.log(response.data);
            alert("탈퇴 하시겠습니까?")
            navigate("/")
          }) .catch(error => {
            console.log(error);
          })
        
      }}>탈퇴</button>
    </div>
  )
}

export default MyPage;