import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Market.css'

const Market = ({auth, setAuth}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/market')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      }).catch(error => {
        console.error(error)
        setError("아이템을 불러오지 못했습니다")
        setLoading(false)
      });
  }, []);

  const handlePurchase = async (item) => {
    if(auth.point < item.itemPrice){
      alert('포인트가 부족합니다')
      return;
    }

    // 서버에 구매 요청
    try {
      await axiosInstance.post('/market/purchase', {
          userId: auth.id,  // 로그인된 사용자 id
          itemId: item.itemId // 구매할 아이템 id
      });
      
      setAuth(prev => ({
        ...prev,
        point: prev.point - item.itemPrice
      }));

      alert(`${item.itemName} 구매완료`);
    } catch (err) {
      alert(err.response?.data || "구매실패");
    }
  };  

  if(loading) 
    return <div>불러오는 중...</div>
  if(error)
    return <div>{error}</div>  

  return (
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
          {items.map((item)=>(
            <tr key={item.itemId} className="item-card">
              <td className="item-name">{item.itemName}</td>
              <td className="item-price">{item.itemPrice}</td>
              <td className="buy-button"><button onClick={() => handlePurchase(item)}>구매하기</button></td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;