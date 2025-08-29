import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './json/Sample.json';
import { PacmanLoader } from "react-spinners";

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
      })
      .catch(error => {
        console.log(error)
      })
  }, [game]);
  useEffect(() => {
    const result = () => {
      axiosInstance.post(`/quiz/result`, { score: score, game: game, username: userInfo.username })
        .then(response => console.log(response.data.score))
    }
    setTimeout(() => {
      result();
    }, 90000);
  }, [])

  return (
    loading ?
      <PacmanLoader />
      :
      <div>
        <h1>{game} 퀴즈</h1>
        <h1>현재 점수 : {score}</h1>
        <div key={index}>
          <div>{quizzes[index].question}</div>
          <div><button onClick={() => {
            const selectedAnswer = quizzes[index].answer[0];
            setIndex(index + 1);
            axiosInstance.post(`/quiz`, { id: quizzes[index].quizId, answer: selectedAnswer })
              .then(response => {
                setScore(prevScore => prevScore + response.data);
              })
              .catch(error => console.log(error))
          }} value={quizzes[index].answer[0]}>1번</button>{quizzes[index].answer[0]}</div>
          <div><button onClick={() => {
            const selectedAnswer = quizzes[index].answer[1];
            setIndex(index + 1);
            axiosInstance.post(`/quiz`, { id: quizzes[index].quizId, answer: selectedAnswer })
              .then(response => {
                setScore(prevScore => prevScore + response.data);
              })
          }}>2번</button>{quizzes[index].answer[1]}</div>
          <div><button onClick={() => {
            const selectedAnswer = quizzes[index].answer[2];
            setIndex(index + 1);
            axiosInstance.post(`/quiz`, { id: quizzes[index].quizId, answer: selectedAnswer })
              .then(response => {
                setScore(prevScore => prevScore + response.data);
              })
          }}>3번</button>{quizzes[index].answer[2]}</div>
          <div><button onClick={() => {
            const selectedAnswer = quizzes[index].answer[3];
            setIndex(index + 1);
            axiosInstance.post(`/quiz`, { id: quizzes[index].quizId, answer: selectedAnswer })
              .then(response => {
                setScore(prevScore => prevScore + response.data);
              })
          }}>4번</button>{quizzes[index].answer[3]}</div>
        </div>
      </div>
  );
}

export default QuizPage;