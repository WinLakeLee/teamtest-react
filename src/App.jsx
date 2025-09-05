import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { lazy, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import MainPage from './MainPage';
import Ranking from './Ranking';
import Honor from './Honor';
import Market from './Market';
import Modify from './Modify';
import Kakao from './Kakao';

const MyPage = lazy(() => import('./MyPage'));
const QuizPage = lazy(() => import('./QuizPage'));

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [gameScore, setGameScore] = useState({ LOL: [], BG: [], SC: [], MS: [], LOA: [] });
  const [honor, setHonor] = useState([]);
  const gameNames = [
    { name: "LOL", label: "리그 오브 레전드" },
    { name: "MS", label: "메이플스토리" },
    { name: "BG", label: "배틀그라운드" },
    { name: "SC", label: "스타크래프트" },
    { name: "LOA", label: "로스트아크" },
  ];

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

  useEffect(() => {
    axiosInstance.get('/ranking')
      .then(response => {
        console.log(response.data);
        setGameScore(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  useEffect(() => {
    axiosInstance.get("/honor")
      .then(response => {
        setHonor(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  return (
    <>
      <Header auth={auth} setAuth={setAuth} userInfo={userInfo} setUserInfo={setUserInfo} />
      <Routes>
        <Route path="/" element={<MainPage gameScore={gameScore} gameNames={gameNames} userInfo={userInfo} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/market" element={<Market auth={auth} setAuth={setAuth} userInfo={userInfo} />} />
        <Route path="/quiz/:game" element={<QuizPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path="/honor" element={<Honor honor={honor} />} />
        <Route path="/ranking" element={<Ranking gameScore={gameScore} gameNames={gameNames} />} />
        <Route path="/oauth/kakao" element={<Kakao />} />
        <Route path="/mypage" element={<MyPage userInfo={userInfo} auth={auth} setUserInfo={setUserInfo} setAuth={setAuth} gameScore={gameScore} gameNames={gameNames}/>} />
        <Route path="/modify" element={<Modify userInfo={userInfo} auth={auth} setUserInfo={setUserInfo} setAuth={setAuth}/>} />
      </Routes>
    </>
  )
}

export default App;
