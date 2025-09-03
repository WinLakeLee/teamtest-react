import './css/Honor.css';


function Honor ({honor}) {

  
  return (
    
    <div className="honor-container">
      <div className='honor-header'>
        <h2>🏆 명예의 전당</h2>
        <p className="honor-subtitle">지난 주 1~10위</p>
      </div>
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
            <tr key={i} className="honor-card">
              <td className={i < 3 ? "honor-TopRank" : "honor-rank"}>
                    {i < 3 ? ( <img src={`../images/rank/랭킹이미지/trophy${i + 1}.png`} 
                                    alt={`${i + 1}위`} /> ) : (i + 1)}</td>
              <td>{user.nickname}</td>
              <td className="honor-score">{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  )
};

export default Honor;