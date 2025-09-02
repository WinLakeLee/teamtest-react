import './css/Ranking.css';
import MyPage from './MyPage';

function Ranking ({gameScore, gameNames}) {
  
  return (
    <div className="ranking-container">
      <h2>🏅 랭킹</h2>
      <p className="ranking-subtitle">지난 주 1~5위</p>
      <div className="quiz-score-container">
        
          {gameNames.map((game) => (
          <div key={game.name}>
            <h2 className="gamename">{game.label}</h2>
            <ul className="ranking-list">
              {gameScore[game.name]?.map((score, i) => (
                <li key={i} className="ranking-card">
                  <span className="ranking-rank">{i + 1}</span>
                  <span>{score.nickname}</span>
                  <span className="ranking-score">{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      
      </div>
       
      
    </div>
  )
};
export default Ranking;