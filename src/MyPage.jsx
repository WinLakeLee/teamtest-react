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
      <p>{userInfo.nickname}님의 마이페이지</p>
      <h2>{userInfo.username}님</h2>
      <hr />
      <label>닉네임 : {userInfo.nickname}</label> <br />
      <label>이메일 : {userInfo.email}</label> <br />
      <label>포인트 : {userInfo.point}</label> <br />
      <label>롤점수 : {userInfo.score}</label> <br />
      <label>배그점수 : {userInfo.score}</label> <br />
      <label>스타점수 : {userInfo.score}</label> <br />
      <label>메이플점수 : {userInfo.score}</label> <br />

      <hr />
      <label>{userInfo.nickname}</label> <br />
      <label>{userInfo.email}</label> <br />
      <label>{userInfo.point}</label> <br />

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