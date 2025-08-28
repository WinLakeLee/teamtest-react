const MyPage = ({ userInfo }) => {
  
  return (
    <div className="login-container">
      <h2>xxxx님</h2>
      <hr />
      <label>닉네임</label> <br />
      <label>점수</label> <br />

      <button>수정</button>
      <button>탈퇴</button>
    </div>
  )
}

export default MyPage;