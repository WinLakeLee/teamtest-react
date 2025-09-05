import { useEffect, useState } from "react";
import "./css/RSidebar.css"
const RSidebar = ({gameScore, gameNames, userInfo}) => {
  const [rShow, setRShow] = useState();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setRShow(true);
      } else {
        setRShow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="R-layout">
        {rShow && (
          <div className="R-sidebar">
            <h2 className="R-title">나의 점수🏆</h2>
            <ul className="R-menu">
              {gameNames.map((game) => {
                const score = gameScore[game.name]?.find(
                  (user) => user.nickname === userInfo.nickname // user = 현재 보고 있는 유저, userinfo = 로그인한 유저
              );
                return (
                  <div key={game.name}>
                    <li>
                      {game.label} 점수 : {score ? score.score : 0}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default RSidebar;