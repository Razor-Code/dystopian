import React from 'react'
import styles from "./vedio.module.css"

const vedio = () => {
  return (
    <div className={styles.body}>
    <video src="/video.mp4" autoplay loop mutd></video>
</div>
  )
}


export default vedio