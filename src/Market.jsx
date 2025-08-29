import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Market.css'

const Market = ({auth, setAuth}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myItem, setMyItem] = useState([]);

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

  // 내 아이템 가져오기
  useEffect(() => {
    if(auth?.id){
      axiosInstance.get(`/market/my/${auth.id}`)
        .then(response => {
          setMyItem(response.data)
        }).catch(error => {
          console.error(error)
        })
    }
  }, [auth]);

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

  const handleRefund = async (myItem) => {
    try {
      await axiosInstance.post(`/market/refund/${myItem.Id}`);
        setMyItem(prev => ({
          ...prev,
          point: prev.point + myItem.item.itemPrice
        }));
        setMyItem(prev => prev.filter(m => m.id !== myItem.id)); // 환불한 아이템 제거
        alert("환불완료");
    } catch(err) {
      alert(err.response?.data || "환불실패");
    }
  };


  if(loading) 
    return <div>불러오는 중...</div>
  if(error)
    return <div>{error}</div>  

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
    <h3>내 아이템</h3>
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
          {myItem.map((myItem)=>(
            <tr key={myItem.d} className="item-card">
              <td className="item-name">{myItem.item.itemName}</td>
              <td className="item-price">{myItem.item.itemPrice}</td>
              <td className="buy-button"><button onClick={() => handleRefund(myItem)}>환불</button></td>
              <td className="buy-button"><button onClick={() => (myItem)}>사용하기</button></td>
            </tr>  
          ))}
      </tbody>   
    </table>
    </>
  );
};

export default Market;