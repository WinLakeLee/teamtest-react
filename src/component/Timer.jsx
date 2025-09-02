import { useEffect, useState } from 'react';
import styles from '../css/Timer.module.css'

const Timer = () => {
  const [time, setTime] = useState(90);
  useEffect(() => {
    const setTimer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    setTimer;
  }, [])
  

  return (
    <>
      <div className="container" style={styles}>
        <p className="timer">남은시간: {time}초</p>
      </div>
    </>
  )

}

export default Timer