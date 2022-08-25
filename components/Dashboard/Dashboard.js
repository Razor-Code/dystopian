import React from 'react'
import styles from './Dashboard.module.css'
import style from '../curriculumPage/curriculumPage.module.css'
import Link from "next/link"

const Dashboard = () => {
  return (
        <div className={styles.Body}>
            <div className={styles.sidebar}>
                   <div className={styles.head}> Dashboard </div>
                   <div className={styles.home}>Home</div>
                   <div className={styles.dash}>Daskboard <img src="/logos/Category.png"></img></div>
                   <div className={styles.home}>profile</div>
            </div>

            <div className={styles.container}>
            <div className={styles.header}><div className={styles.hello}>Hello Rahul</div>
            <div className={styles.welcome}>Welcome Back!</div></div>

            <div className={styles.maindiv}>
                <div className={styles.progressBox}>
                <div className={styles.box}><div className={styles.BoxContents}> Level crossed<span>100</span></div>
                <img src=""></img></div>
                <div className={styles.box}><div className={styles.BoxContents}> XP <span>1000</span></div><img src=""></img></div>
                <div className={styles.box}><div className={styles.BoxContents}> Trophies <span>20</span></div><img src=""></img></div>
                <div className={styles.box}><div className={styles.BoxContents}> totalTime <span>100min</span></div><img src=""></img></div>
                <div className={styles.box}><div className={styles.BoxContents}> overall <span>performance</span></div><img src=""></img></div>
                </div>
            
            <div className={styles.subMaindiv}>
            <div className={styles.subject}>
                <div className={styles.head}>Subjects</div>
                <div className={styles.subjectContents}>
                <div className={styles.sub1}><img src="https://cdn-icons-png.flaticon.com/128/5968/5968350.png"></img>python</div>
                <div className={styles.sub2}><img src="https://cdn-icons-png.flaticon.com/128/3665/3665923.png"></img>C language</div>
                <div className={styles.sub3}><img src="https://cdn-icons-png.flaticon.com/128/6132/6132222.png"></img>C plus plus</div>
                <div className={styles.sub4}><img src="https://cdn-icons-png.flaticon.com/128/226/226777.png"></img>Java</div>
                <div className={styles.sub5}><img src="https://cdn-icons-png.flaticon.com/128/919/919842.png"></img>Ruby</div>
                <div className={styles.sub6}><img src="https://cdn-icons-png.flaticon.com/128/6132/6132221.png"></img>C#</div>
                <div className={styles.sub7}><img src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png"></img>Java</div>
                <div className={styles.sub8}><img src="https://cdn-icons-png.flaticon.com/128/1126/1126012.png"></img>Java</div>
                <div className={styles.sub9}><img src="https://cdn-icons-png.flaticon.com/128/5968/5968705.png"></img>Figma</div>
            </div>
           
            </div>

            <div className={styles.chapter}>
            
            </div>

            <div className={style.Dashboard}>

            <div className={style.XP}>
              <div className={style.XP1}>
                <h2 className={style.XPHead}>Leaderboard </h2>
  
                <Link href="/dashboard" className={style.dash}><div className={style.dashboardbutton}>View DashBoard</div></Link>
              </div>
              <div className={style.XP2}>
  
                <div className={style.xpItem}>
                  <div className={style.xpInfo}>
                    <span className={style.xpName}>1.</span>
                    <img className={style.XPimg} src="/Badges/image6.png"></img>
                    <div className={style.XPName}> Rahul</div></div>
                  <div className={style.userxp}>100xp</div>
                </div>
                <div className={style.xpItem}>
                  <div className={style.xpInfo}>
                    <span className={style.xpName}>2.</span>
                    <img className={style.XPimg} src="/Badges/image4.png"></img>
                    <div className={style.XPName}> Naveed</div></div>
                  <div className={style.userxp}>80xp</div>
                </div>
               
                <div className={style.xpItem}>
                  <div className={style.xpInfo}>
                    <span className={style.xpName}>3.</span>
                    <img className={style.XPimg} src="/Badges/image7.png"></img>
                    <div className={style.XPName}> Gokul</div></div>
                  <div className={style.userxp}>60xp</div>
                </div>
                <div className={style.xpItem}>
                  <div className={style.xpInfo}>
                    <span className={style.xpName}>4.</span>
                    <img className={style.XPimg} src="/Badges/image9.png"></img>
                    <div className={style.XPName}> Michael</div></div>
                  <div className={style.userxp}>50xp</div>
                </div>
  
  
              </div>
            </div>
           
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Dashboard