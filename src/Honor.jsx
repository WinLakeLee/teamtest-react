import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './css/Honor.css';


function Honor ({gameScore}) {
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
    </div>
  )
};

export default Honor;