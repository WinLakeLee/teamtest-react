import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyPage = ({ userInfo, setUserInfo}) => {

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>{userInfo.username}님</h2>
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