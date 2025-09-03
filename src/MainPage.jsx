import Slider from "./Slider";
import MainContent from "./MainContent";
import "./css/Mainpage.css"
import Gameranking from "./GameRanking";
import Sidebar from "./Sidebar";

const MainPage = () => {
  return (
    <>
      <Sidebar/>
      <Slider />
      <MainContent />
      <Gameranking />
    </>
  )
}

export default MainPage;