import axiosInstance from "../axiosInstance";

const Modify = ({ userInfo, setUserInfo }) => {

  return (
    <>
      <div className="login-container">
        <h2>{userInfo}님</h2>
        <label>{userInfo}</label> <br />
        <label><input type="password" name="password"  placeholder="비밀번호를 입력하세요" /></label> <br />

        <button onClick={() => {
          axiosInstance.post
        }}>수정</button>
    </div>
    </>
  )
}

export default Modify;