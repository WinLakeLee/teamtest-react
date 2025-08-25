// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function QuizPage() {
//   const { game } = useParams(); // lol, maple, star ...
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     axios.get(`/api/quiz/${game}`)
//       .then(response => 
//         setQuestions(response.data));
//   }, [game]);

//   return (
//     <div>
//       <h1>{game} 퀴즈</h1>
//       {questions.map((q, i) => (
//         <div key={i}>{q.question}</div>
//       ))}
//     </div>
//   );
// }

// export default QuizPage;