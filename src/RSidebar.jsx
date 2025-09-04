import { useEffect, useState } from "react";
import "./css/RSidebar.css"
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const RSidebar = ({ }) => {
  const [Rshow, setRShow] = useState();

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 420) {
        setRShow(true);
      } else {
        setRShow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);


  return (
    <>
    <div className="Rlayout">
      {Rshow && (
        <div className="Rsidebar">
        <h2 className="Rtitle">나의 점수🏆</h2>
        <ul className="Rmenu">
          <li>⚔️리그오브레전드 :</li>
          <li>🍁메이플스토리 :</li>
          <li>🛰️스타크래프트 :</li>
          <li>🍗배틀그라운드 :</li>
        </ul>
        <h2 className="Rtitle">나의 순위🏆</h2>
        <ul className="Rmenu">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      )}
    </div>
    </>
  )
}

export default RSidebar;