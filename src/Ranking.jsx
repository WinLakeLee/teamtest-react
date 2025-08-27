import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Ranking.css';

function Ranking () {
  const [ranking, setRanking] = useState([]);
  
  useEffect(() => {
    axiosInstance.get("/ranking")
      .then(response => {
        const sorted = response.data.sort((a, b) => b.score - a.scroe)
        setRanking(sorted);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  
  return (
    <div className="ranking-container">
      <h2>🏆 랭킹</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{user.nickname}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Ranking;