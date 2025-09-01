import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Modify = ({ userInfo, setUserInfo, auth, setAuth }) => {
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
    setUserInfo('');
  }

  const onSubmitHandler = () => {
    if (userInfo.nickname.length < 3) {
      alert("닉네임은 2자 이상이어야 합니다.");
      return;
    }
    if (userInfo.password.length < 3) {
      alert("비밀번호는 2자 이상이어야 합니다.");
      return;
    }
    axiosInstance
      .put("/update", {
        nickname: userInfo.nickname,
        password: userInfo.password
      })
      .then((response) => {
        console.log(response.data);
        alert("수정이 완료되었습니다.");
        logout();
        navigate("/"); 
      })
      .catch((error) => {
        console.error(error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="login-container">
      <h2>{userInfo.username}님</h2>
      <br/>
      <label>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChangeHandler}
        />
      </label>
      <br />
      <label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangeHandler}
        />
      </label>
      <br />
      <button onClick={onSubmitHandler}>수정</button>
    </div>
  );
};

export default Modify;
