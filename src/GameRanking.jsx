import axios from "axios"
import { useEffect, useState } from "react"

const Gameranking = () => {

  const BASE_URL = "https://api.kcisa.kr/openapi/API_CIA_093/request"
  const API_KEY = "91826de2-58fb-4c63-a350-44be60d6c85c"
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://api.kcisa.kr/openapi/API_CIA_093/request?serviceKey=91826de2-58fb-4c63-a350-44be60d6c85c&numOfRows=10&pageNo=1")
      .then(response => {
        const item = response.data.response.body.items.item;
        console.log(response.data.response.body.items.item)
        setData(item);
      }).catch(error => {
        console.error(error);
      })
  }, [])

  return (
    <>
      <div className="rankpost">
        <div className="rankpost_newgame">
          <h2>신규게임</h2>
        </div>
      </div>
      <div className="ranking_container">
        <table className="ranking_table">
          <thead>
            <tr>
              <td>#</td>
              <td>게임</td>
              <td>분류</td>
              <td>출시일</td>
            </tr>
          </thead>
          <tbody>
            {data && data.map((game, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{game.TITLE}</td>
                <td>{game.GENRE}</td>
                <td>{game.ISSUED_DATE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Gameranking;