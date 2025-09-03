import axiosInstance from "../../axiosInstance";

const QuizAnswer = ({ id, answer, index, setIndex, score, setScore, styles }) => {
  return (
    <>
      {answer.map((currentAnswer, i) => (
        <div key={i} className={styles.answerItem}>
          <button onClick={() => {
            setIndex(index + 1);
            axiosInstance.post(`/score`, { id: id, answer: currentAnswer })
              .then(response => {
                setScore(prevScore => prevScore + response.data);
              })
              .catch(error => console.log(error));
          }} value={currentAnswer}>
            {i + 1}번
          </button>
          {currentAnswer}
        </div>
      ))}
    </>
  );
};

export default QuizAnswer;