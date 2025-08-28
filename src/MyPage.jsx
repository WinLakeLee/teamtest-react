const MyPage = ({ auth }) => {
  
  return (
    <div>
      <p>{auth.nickname}님의 마이페이지</p>
    </div>
  )
}

export default MyPage;