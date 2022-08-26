import React from 'react'
import styles from './Guildpage.module.css'

const Guildpage = () => {
  return (
    <div className={styles.main}>
    <div className={styles.Nav}>
    <ul className={styles.list}>
      <li className={styles.listitem}> Name : Rahul </li>
      <li className={styles.listitem1}>| Admin</li>
    </ul> 
  </div>

  <div className={styles.body1}>
  <div className={styles.sidebar}>
      <div className={styles.sidebar_item}>
          <div className={styles.sidebar1}>
          <img src="/Logos/Home.png" width={50} height={50}/>
          <img src="/Logos/student.png" />
          
          </div>
          <div className={styles.sidebar2}>
          <img src="/Logos/info.png" />
          <img src="/Logos/log-out.png" />
          </div>
    </div>  
    </div>
    </div>
    </div>
  )
}

export default Guildpage