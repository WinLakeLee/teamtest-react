import Slider from "./Slider";
import MainContent from "./MainContent";
import GameRanking from "./GameRanking";
import LSidebar from "./LSidebar";
import RSidebar from "./RSidebar";

const MainPage = ({gameScore, gameNames, userInfo}) => {
  return (
    <>
      <LSidebar />
      <RSidebar  gameScore={gameScore} gameNames={gameNames} userInfo={userInfo}/>
      <Slider />
      <MainContent />
      <GameRanking />
    </>
  )
}

export default MainPage;