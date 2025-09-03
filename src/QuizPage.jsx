import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { PacmanLoader } from "react-spinners";
import QuizAnswer from "./component/QuizAnswer";
import Timer from "./component/Timer";
import styles from "./css/QuizPage.module.css"

function QuizPage({ userInfo }) {

  const { game } = useParams(); // lol, maple, star ...
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const scoreRef = useRef(score);
  const navigate = useNavigate();
  const limit = 1000000;

  useEffect(() => {
    scoreRef.current = score;
  }, [score])

  useEffect(() => {
    axiosInstance.post(`/quiz/${game}`)
      .then(response => {
        setQuizzes(response.data);
        setChance(true)
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
    axiosInstance.post(`/result`, { score: scoreRef.current, game: game, username: userInfo.username })
      .then(response => {
        console.log(response.data);
        setScore(0);
        alert("점수는 " + scoreRef.current + "점 입니다.")
        navigate('/');
      });
  }, [score, game, userInfo, navigate]);

  useEffect(() => {
    let timerId;
    if (userInfo && userInfo.username && chance) {
      timerId = setTimeout(() => {
        result();
      }, limit);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [userInfo, chance]);
  return (
    !chance ?
      <div style={styles}>오늘 도전횟수를 모두 사용했습니다</div>
      :
      loading ?
        <PacmanLoader />
        :
        <div className={styles.quizContainer}>
          <Timer limit = {limit}/>
          <h1>{game} 퀴즈</h1>
          <p>현재 점수 : {score}</p>
          <div key={index} className={styles.answersBox}>
            <div className={styles.questionText}>문제 : {quizzes[index].question}</div>
            <QuizAnswer id={quizzes[index].quizId} answer={quizzes[index].answer} index={index} setIndex={setIndex} score={score} setScore={setScore} styles={styles}/>
          </div>
          <button onClick={() => result()}>포기하기</button>
        </div>
  )
}

export default QuizPage;