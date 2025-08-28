import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import QuizPage from './QuizPage';
import MainPage from './MainPage';
import Ranking from './Ranking';
import Honor from './Honor';
import Market from './Market';
import MyPage from './MyPage';
import Modify from './Modify';

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (sessionStorage.getItem('jwt'))
      setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) {
      axiosInstance.get('/userinfo')
        .then(response => {
          setUserInfo(response.data);
        }).catch(error => {
          console.log(error)
        })
    }
  }, [auth])

  return (
    <>
      <Header auth={auth} setAuth={setAuth} userInfo={userInfo} setUserInfo={setUserInfo} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/market" element={<Market auth={auth} setAuth={setAuth}/>} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/honor" element={<Honor />} />
        <Route path="/mypage" element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo}/>} />
        <Route path="/modify" element={<Modify userInfo={userInfo} setUserInfo={setUserInfo}/>} />
      </Routes>

    </>
  )
}

export default App;
