import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './json/Sample.json';
import { PacmanLoader } from "react-spinners";
import QuizAnswer from "./component/QuizAnswer";
import Timer from "./component/Timer";

function QuizPage({ userInfo }) {

  const { game } = useParams(); // lol, maple, star ...
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post(`/quiz/${game}`)
      .then(response => {
        setQuizzes(response.data);
        setLoading(false);
        setScore(0);
      })
      .catch(error => {
        if (error.response.status == 403)
          setChance(false)
      })
  }, [game]);

  const result = useCallback(() => {
    if (submitting) return;
    setSubmitting(true);
    axiosInstance.post(`/quiz/result`, { score: score, game: game, username: userInfo.username })
      .then(response => {
        console.log(response.data);
        setScore(0);
        alert("점수 : " + score + "점")
        navigate('/');
      });
  }, [score, game, userInfo, navigate]);

  useEffect(() => {
    let timerId;
    if (userInfo && userInfo.username && chance) {
      timerId = setTimeout(() => {
        result();
      }, 10000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [userInfo, chance]);
  return (
    loading ?
      <PacmanLoader />
      :
      !chance ?
        <div>오늘 도전횟수를 모두 사용했습니다</div>
        :
        <div>
          <Timer />
          <h1>{game} 퀴즈</h1>
          <h1>현재 점수 : {score}</h1>
          <div key={index}>
            <div>{quizzes[index].question}</div>
            <QuizAnswer id={quizzes[index].quizId} answer={quizzes[index].answer} index={index} setIndex={setIndex} score={score} setScore={setScore} />
          </div>
          <button onClick={() => result()}>포기하기</button>
        </div>
  )
}

export default QuizPage;