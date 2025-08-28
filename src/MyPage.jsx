import { useState } from "react";
import { Link } from "react-router-dom";

const MyPage = ({ userInfo, setUserInfo }) => {
  
  const goToPage = () => {
    window.location.href = "http://localhost:5173/modify";
  };

  return (
    <div className="login-container">
      <h2>xxxx님</h2>
      <hr />
      <label>닉네임</label> <br />
      <label>이메일</label> <br />
      <label>점수</label> <br />

      <button onClick={goToPage}>
        수정
      </button>
      <button onClick={() => {
        alert("탈퇴 하시겠습니까?")
      }}>탈퇴</button>
    </div>
  )
}

export default MyPage;