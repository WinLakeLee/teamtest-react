import { useEffect, useState } from 'react';
import styles from '../css/Timer.module.css'

const Timer = ({ limit }) => {
  
  const [time, setTime] = useState(limit / 1000);
  useEffect(() => {
    const setTimer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    setTimer;
    return () => {
      clearInterval(setTimer);
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <p className={styles.timer}>&nbsp;</p>
        <span className={styles.text}>남은시간: {time}초</span>
      </div>
    </>
  )

}

export default Timer