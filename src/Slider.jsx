import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import LOL from '../images/lol.jpg';
import LostArk from '../images/LostArk.png';
import MapleStory from '../images/maplestory.jpg';
import StarCraft from '../images/starcraft.jpg';
import Battleground from '../images/battleground.jpg';

function Slider() {
  const images = [LOL, LostArk, MapleStory, StarCraft, Battleground];
  const [index, setIndex] = useState(0);

  // 5초마다 이미지 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // 클리어
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} controls={false} indicators={false}>
      {images.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img}
            alt={`slide-${idx}`}
            style={{ maxHeight: '500px', background: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;