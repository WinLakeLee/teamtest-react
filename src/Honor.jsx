import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Honor.css';

function Honor () {
  const [honors, setHonors] = useState([]);

  useEffect(() => {
    axiosInstance.get("/honor")
      .then(response => {
        setHonors(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);


  return (
    <div className="honor-container">
      <h2>🏅 명예의 전당</h2>
      <p className="honor-subtitle">지난 주 1위</p>

      {/* <ul className="honor-list">
        {honors.map((h, i) => (
          <li key={i} className="honor-card">
            <span className="honor-rank">#{i + 1}</span>
            <span className="honor-score">{h.score}점</span>
            <span className="honor-period">
              {h.week_start} ~ {h.week_end}
            </span>
          </li>
        ))}
      </ul> */}
    </div>  
  )
}

export default Honor;