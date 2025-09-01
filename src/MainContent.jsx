import Content from "../MainContent";
const MainContent = () => {
  return(
    <div className="MainPage container">
          <div className="imp">
            <div className="title"><h2>공지사항</h2></div>
            <div className="content-list">
              <ul>
                {Content.map((content, i) => (
                  <li key={i}>
                    <span className={i < 3 ? "ctt-title-red" : "ctt-title"}>공지:</span>
                    <span className="content">{content}</span>
                  </li>
                ))}
                
              </ul>
            </div>
          </div>
        </div>
  )
};
export default MainContent;