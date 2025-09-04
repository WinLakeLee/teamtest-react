import { Nav } from "react-bootstrap";
import "./css/Sidebar.css"
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
      <div className="layout">
        {show && (
          <div className="sidebar">
            <h2 className="title">🎮</h2>
            <ul className="menu">
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