import './css/Honor.css';


function Honor () {
  const [honor, setHonor] = useState([]);
  
  useEffect(() => {
    axiosInstance.get("/honor")
      .then(response => {
        setHonor(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []) 
  
function Honor ({gameScore}) {
  const gameNames = [
    { name: "LOL", label: "리그 오브 레전드" },
    { name: "MS", label: "메이플스토리" },
    { name: "BG", label: "배틀그라운드" },
    { name: "SC", label: "스타크래프트" },
  ];

  return (
    
    <div className="honor-container">
      <h2>🏆 명예의 전당</h2>
      <p className="honor-subtitle">지난 주 1~10위</p>
      <table className="honor-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>총점</th>
          </tr>
        </thead>
        <tbody>
          {honor.map((user, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{user.nickname}</td>
              <td>{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>🏅 명예의 전당</h2>
      <p className="honor-subtitle">지난 주 1~5위</p>
      <div className="quiz-score-container">
          {gameNames.map((game) => (
          <div key={game.name}>
            <h2 className="gamename">{game.label}</h2>
            <ul className="honor-list">
              {gameScore[game.name]?.map((score, i) => (
                <li key={i} className="honor-card">
                  <span className="honor-rank">{i + 1}</span>
                  <span>{score.nickname}</span>
                  <span className="honor-score">{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Honor;