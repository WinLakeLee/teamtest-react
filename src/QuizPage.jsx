import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './json/Sample.json';
import { PacmanLoader } from "react-spinners";
import QuizAnswer from "./component/QuizAnswer";

function QuizPage({ userInfo }) {
  const { game } = useParams(); // lol, maple, star ...
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  useEffect(() => {
    axiosInstance.post(`/quiz/${game}`)
      .then(response => {
        setQuizzes(response.data);
        setLoading(false);
        setScore(0);
      })
      .catch(error => {
        console.log(error)
      })
  }, [game]);
  useEffect(() => {
    if (userInfo && userInfo.username) {
      const result = () => {
        axiosInstance.post(`/quiz/result`, { score: score, game: game, username: userInfo.username })
          .then(response => {
            console.log(response.data);
            setScore(0);
          })
      }
      const timer = setTimeout(() => {
        result();
      }, 10000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [score])

  return (
    loading ?
      <PacmanLoader />
      :
      <div>
        <h1>{game} 퀴즈</h1>
        <h1>현재 점수 : {score}</h1>
        <div key={index}>
          <div>{quizzes[index].question}</div>
          <QuizAnswer id={quizzes[index].quizId} answer={quizzes[index].answer} index={index} setIndex={setIndex} score={score} setScore={setScore}/>
        </div>
      </div>
  )
}

export default QuizPage;