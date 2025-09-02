import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Honor.css';

function Honor () {
  const [honor, setHonor] = useState([]);
  
  useEffect(() => {
    axiosInstance.get("/honor")
      .then(response => {
        console.log(response.data);
        setHonor(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []) 
  
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
    </div>
  )
}

export default Honor;