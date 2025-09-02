import './css/Honor.css';


function Honor ({honor}) {

  
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
            <tr key={i} className='honor-card'>
              <td className={i < 1 ? "honor-TopRank" : "honor-rank"} >
                    {i < 1 ? ( <img src={"../images/honorTrophy.png"} 
                                    alt={`${i + 1}위`} 
                                    style={{ width: "25px", height: "25px" }}/> ) : (i + 1)}</td>
              <td>{user.nickname}</td>
              <td>{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Honor;