import { Nav } from "react-bootstrap";
import "./css/Sidebar.css"
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <>
    <div className="layout">
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
    </div>
    </>
  )
}

export default Sidebar;