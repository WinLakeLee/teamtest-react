import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './json/Sample.json';

function QuizPage() {
  const { game } = useParams(); // lol, maple, star ...
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/quiz/${game}`)
      .then(response => 
        setQuestions(response.data))
      .catch(error => {
        console.log(error)
      })
  }, [game]);

  return (
    <div>
      <h1>{game} 퀴즈</h1>
      {questions.map((q, i) => (
        <div key={i}>
          <div>{q.question}</div>
          <div>{q.answer1}</div>
          <div>{q.answer2}</div>
          <div>{q.answer3}</div>
          <div>{q.answer4}</div>
        </div>
      ))}
    </div>
  );
}

export default QuizPage;