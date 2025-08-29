import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './json/Sample.json';
import { PacmanLoader } from "react-spinners";

function QuizPage() {
  const { game } = useParams(); // lol, maple, star ...
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState();
  const [index, setIndex] = useState(0);
  const [choose, setChoose] = useState('');
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
      axiosInstance.post(`/quiz/result`, { data: { score: score, game: game } })
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
        <div key={index}>
          <div>{quizzes[index].question}</div>
          <div><button onClick={() => {
            setChoose(quizzes[index].answer[0].value);
            setIndex(index + 1);
            axiosInstance.post(`/quiz`, { id: quizzes[index].quizId, answer: choose } )
              .then(response => {setScore([...score + response]);
              })
              .catch(error => console.log(error))
          }}>1번</button>{quizzes[index].answer[0]}</div>
          <div><button onClick={() => {
            setChoose(quizzes[index].answer[1]);
            setIndex(index + 1);
            axiosInstance.post(`/quiz`,  { id: quizzes[index].quizId, answer: choose } )
              .then(response => setScore([...score + response]))
          }}>2번</button>{quizzes[index].answer[1]}</div>
          <div><button onClick={() => {
            setChoose(quizzes[index].answer[2]);
            setIndex(index + 1);
            axiosInstance.post(`/quiz`,  { id: quizzes[index].quizId, answer: choose } )
              .then(response => setScore([...score + response]))
          }}>3번</button>{quizzes[index].answer[2]}</div>
          <div><button onClick={() => {
            setChoose(quizzes[index].answer[3]);
            setIndex(index + 1);
            axiosInstance.post(`/quiz`,  { id: quizzes[index].quizId, answer: choose } )
              .then(response => setScore([...score + response]))
          }}>4번</button>{quizzes[index].answer[3]}</div>

        </div>
      </div>
  );
}

export default QuizPage;