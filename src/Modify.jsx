import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useState } from "react";

const Modify = ({ userInfo, setUserInfo }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = () => {
    if (password.length < 4) {
      alert("비밀번호는 3자 이상이어야 합니다.");
      return;
    }

    axiosInstance
      .put(`/update`, { password })
      .then((response) => {
        console.log(response.data);

        
        setUserInfo({ ...userInfo, password });

        navigate("/"); 
      })
      .catch((error) => {
        console.error(error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="login-container">
      <h2>님</h2>
      <label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={onChangeHandler}
        />
      </label>
      <br />

      <button onClick={onSubmitHandler}>수정</button>
    </div>
  );
};

export default Modify;
