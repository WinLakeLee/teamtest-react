import Slider from "./Slider";
import MainContent from "./MainContent";
import GameRanking from "./GameRanking";
import Sidebar from "./Sidebar";
import RSidebar from "./RSidebar";

const MainPage = () => {
  return (
    <>
      <Sidebar />
      <RSidebar />
      <Slider />
      <MainContent />
      <GameRanking />
    </>
  )
}

export default MainPage;