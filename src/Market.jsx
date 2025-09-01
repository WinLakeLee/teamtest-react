import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Market.css'

const Market = ({auth, setAuth, userInfo}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myItem, setMyItem] = useState([]);

  console.log(userInfo)
  useEffect(() => {
    axiosInstance.get('/market')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : response.data.data || []
        setItems(data);
        setLoading(false);
      }).catch(error => {
        console.error(error)
        setError("아이템을 불러오지 못했습니다")
        setLoading(false)
      });
  }, []);

  // 내 아이템 가져오기
  useEffect(() => {
  if (!userInfo?.id) return;  // userInfo가 없으면 실행하지 않음

  axiosInstance.get(`/market/my/${userInfo.id}`)
    .then(response => {
      
      setMyItem(Array.isArray(response.data) ? response.data : [])
    })
    .catch(error => console.error(error));
  }, [userInfo]);;

  const handlePurchase = async (item) => {    
    if(auth.point < item.itemPrice){
      alert('포인트가 부족합니다')
      return;
    }

    // 서버에 구매 요청
    try {
      await axiosInstance.post('/market/purchase', {
          userId: userInfo.id,  // 로그인된 사용자 id
          itemId: item.itemId // 구매할 아이템 id
      });

      setAuth(prev => ({
        ...prev,
        point: prev.point - item.itemPrice
      }));

      alert(`${item.itemName} 구매완료`);
      const response = await axiosInstance.get(`/market/my/${userInfo.id}`);
      setMyItem(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      alert(err.response?.data || "구매실패");
    }
  };  

  const handleRefund = async (refundItem) => {
    try {
      await axiosInstance.post(`/market/my/refund/${refundItem.id}`);
        setAuth(prev => ({
          ...prev,
          point: prev.point + refundItem.item.itemPrice
        }));
        setMyItem(prev => prev.filter(m => m.id !== refundItem.id)); // 환불한 아이템 제거
        alert("환불완료");
    } catch(err) {
      alert(err.response?.data || "환불실패");
    }
  };

  // const gradeClass = myItem.find(i => i.item.itemCategory === "GRADE")?.item.effectClass || "";
  // const imageClass = myItem.find(i => i.item.itemCategory === "IMAGE")?.item.effectClass || "";

  // const activeClass = `${gradeClass} ${imageClass}`.trim();

  if(loading) 
    return <div>불러오는 중...</div>
  if(error)
    return <div>{error}</div>  

  const gradeItems = items.filter(item => item.itemCategory === "GRADE");
  const useItems = items.filter(item => item.itemCategory === "IMAGE"); 

  return (
    <>
    <div className="market-container">
      <h2 className="market-title">🛒 상점</h2>
      <table className="item-grid">
        <thead>
          <tr>
            <th>아이템명</th>
            <th>가격</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody>
          {gradeItems.map((item)=>(
            <tr key={item.itemId} className="item-card">
              <td className="item-name">{item.itemName}</td>
              <td className="item-price">{item.itemPrice}</td>
              <td className="buy-button"><button onClick={() => handlePurchase(item)}>구매하기</button></td>
            </tr>  
          ))}
        </tbody>
      </table>
      </div>

      <div className="market-container">
      <table className="item-grid">
        <thead>
          <tr>
            <th>아이템명</th>
            <th>가격</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody>
          {useItems.map((item)=>(
            <tr key={item.itemId} className="item-card">
              <td className="item-name">{item.itemName}</td>
              <td className="item-price">{item.itemPrice}</td>
              <td className="buy-button"><button onClick={() => handlePurchase(item)}>구매하기</button></td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>          


    <h3 className="market-title">내 아이템</h3>
    <table className="item-grid">
        <thead>
          <tr>
            <th>아이템명</th>
            <th>가격</th>
            <th>환불</th>
            <th>사용</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(myItem) && myItem.map((myItem)=>(
            <tr key={myItem.id} className="item-card">
              <td className="item-name">{myItem.item.itemName}</td>
              <td className="item-price">{myItem.item.itemPrice}</td>
              <td className="buy-button">{myItem.item.itemCategory === "GRADE" ? (
                <button disabled style={{backgroundColor: "rgba(230, 35, 35, 1)"}}>환불불가</button>
              ) : ( 
              <button onClick={() => handleRefund(myItem)}>환불</button>
              )}</td>
              <td className="buy-button"><button onClick={() => (myItem)}>사용하기</button></td>
            </tr>  
          ))}
      </tbody>   
    </table>
    </>
  );
};

export default Market;