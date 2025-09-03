import Slider from "./Slider";
import MainContent from "./MainContent";
import "./css/Mainpage.css"
import Gameranking from "./GameRanking";
import Sidebar from "./Sidebar";
import RSidebar from "./RSidebar";

const MainPage = () => {
  return (
    <>
      <Sidebar/>
      <RSidebar/>
      <Slider />
      <MainContent />
      <Gameranking />
    </>
  )
}

export default MainPage;