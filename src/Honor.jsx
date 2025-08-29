import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Honor.css';

function Honor ({gameScore}) {

  return (
    <div className="honor-container">
      <h2>🏅 명예의 전당</h2>
      <p className="honor-subtitle">지난 주 1위</p>
      <div className="quiz-score-container">
        <div>
          <h2>LOL</h2>
          <ul>
            {gameScore.LOL.map((score, i) => (
                <li key={i}>
                  <span>{score.userId}<p>:</p></span>
                  <span>{score.lolScore}</span>
            
                </li>
             
            ))}

          </ul>
        </div>
        <div>
          <h2>메이플스토리</h2>
          <ul>
            {gameScore.MS.map((score, i) => {
                <li key={i}>
                  <span>{score.userId}</span>
                  <span>{score.msScore}</span>
            
                </li>
            })}
            <p>1111</p> 

          </ul>
        </div>
          <div>Battle Ground</div>
          <div>StarCraft</div>
          <div>Loastark</div>
      </div>

      {/* <ul className="honor-list">
        {honors.map((h, i) => (
          <li key={i} className="honor-card">
            <span className="honor-rank">{i + 1}</span>
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