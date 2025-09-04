import { Nav } from "react-bootstrap";
import "./css/LSidebar.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [show, setShow] = useState();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <>
      <div className="L-layout">
        {show && (
          <div className="L-sidebar">
            <h2 className="L-title">🎮 퀴즈 풀기</h2>
            <ul className="L-menu">
              <Nav>
                <Link to='/quiz/lol'><li>⚔️리그오브레전드</li></Link>
                <Link to='/quiz/ms'><li>🍁메이플스토리</li></Link>
                <Link to='/quiz/sc'><li>🛰️스타크래프트</li></Link>
                <Link to='/quiz/bg'><li>🍗배틀그라운드</li></Link>
              </Nav>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar;