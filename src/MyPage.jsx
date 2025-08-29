import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyPage = ({ userInfo, setUserInfo, auth, setAuth }) => {

  const navigate = useNavigate();

    const logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
    setUserInfo('');
  }

  return (
    <div className="login-container">
      <h2>{userInfo.username}님</h2>
      <hr />
      <label>닉네임 : {userInfo.nickname}</label> <br />
      <label>이메일 : {userInfo.email}</label> <br />
      <label>포인트 : {userInfo.point}</label> <br />
      <label>롤점수 : {userInfo.score}</label> <br />
      <label>배그점수 : {userInfo.score}</label> <br />
      <label>스타점수 : {userInfo.score}</label> <br />
      <label>메이플점수 : {userInfo.score}</label> <br />

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
              navigate("/");
            })
            .catch((error) => {
              console.error(error);
              alert("탈퇴 중 오류가 발생했습니다.");
            });
        }}
      >
        탈퇴
      </button>
    </div>
  )
}

export default MyPage;