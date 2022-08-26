import React from 'react'
import styles from "./curriculumPage.module.css"
import Button from "../Button/Button"
import MainPage from '../MainPage/mainPage'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { app } from '../../Firebase'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore"
import Link from 'next/link'


const Curriculumpage = () => {

  const db = getFirestore(app)

  const [user, setUser] = useState('')

  const auth = getAuth(app);

  const LogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("You have been signed out")
    }).catch((error) => {
      // An error happened.
    });
  }




  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        console.log(user)
      }
    }
    )
  }, [])


  return (
    <div className={styles.body}>
      <div className={styles.Nav}>
        <div>
          <ul className={styles.list}>
            <li className={styles.listitem}> Name :  {user.displayName && user.displayName} </li>
            <li className={styles.listitem1}>| Stage : I</li>
          </ul>
        </div>


        <div className={styles.prog}>Your Progress<div className={styles.progressBar}><div className={styles.progress}>20%</div></div>


        </div> 
        <Link href='https://dystopian.tribeplatform.com'><div className={styles.forum} > Forum</div></Link>
        <div className={styles.docs}><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/3672/3672470.png" /><a className={styles.docs1} href='/documentation'>Documentation</a></div>
        <div className={styles.Logout}><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/5542/5542821.png" /><div onClick={LogOut} className={styles.docs1}>LogOut</div></div>
      </div>
      <div className={styles.main}>
        <div className={styles.Container}>
          <div className={styles.heading}>The Curriculum </div>

          <div className={styles.box}>

            <div className={styles.list}>
              <div className={styles.card}><h2>Chapter 1 <br /> <div className={styles.place}>Cyber city </div></h2> <div> I/O Statements</div>
                <Link href="/play"><div className={styles.button}>Level 1</div></Link></div>

              <div className={styles.card}><h2>Chapter 2 <br /> <div className={styles.place}>Warped City </div></h2> <div> Keywords and Variables</div>
                <div className={styles.button}>Level 2</div></div>

              <div className={styles.card}><h2>Chapter 3  <br /> <div className={styles.place}>Forest of Ilusion </div></h2> <div> Datatypes</div>
                <div className={styles.button}>Level 3</div></div>

              <div className={styles.card}><h2>Chapter 4  <br /> <div className={styles.place}>Tall Forest</div></h2> <div> Operators</div>
                <div className={styles.button}>Level 4</div></div>

            </div>

            <div className={styles.list}>
              <div className={styles.card}><h2>Chapter 5  <br /> <div className={styles.place}>Forest </div></h2> <div>Strings and its functions </div>
                <div className={styles.button}>Level 5</div></div>

              <div className={styles.card}><h2>Chapter 6 <br /> <div className={styles.place}>Forest of Illusion </div></h2> <div> List and Tuples</div>
                <div className={styles.button}>Level 6</div></div>

              <div className={styles.card}><h2>Chapter 7 <br /> <div className={styles.place}>Gothic vania </div></h2> <div> Dictionary</div>
                <div className={styles.button}>Level 7</div></div>

              <div className={styles.card}><h2>Chapter 8 <br /> <div className={styles.place}>Rocthy pass </div></h2> <div> Slicing and Striding</div>
                <div className={styles.button}>Level 8</div></div>

            </div>

            <div className={styles.list}>
              <div className={styles.card}><h2>Chapter 9 <br /> <div className={styles.place}>Swamp </div></h2> <div> Decision Making Statements</div>
                <div className={styles.button}>Level 9</div></div>

              <div className={styles.card}><h2>Chapter 10 <br /> <div className={styles.place}>Church </div></h2> <div> Looping Statements</div>
                <div className={styles.button}>Level 10</div></div>

              <div className={styles.card}><h2>Chapter 11 <br /> <div className={styles.place}>Town </div></h2> <div> Control Statements</div>
                <div className={styles.button}>Level 11</div></div>

              <div className={styles.card}><h2>Chapter 12 <br /> <div className={styles.place}>Junk yard </div></h2> <div> Function and its Prototype</div>
                <div className={styles.button}>Level 12</div></div>

            </div>

          </div>

        </div>
        <div className={styles.Dashboard}>

          <div className={styles.XP}>
            <div className={styles.XP1}>
              <h2 className={styles.XPHead}>Leaderboard </h2>

              <Link href="/dashboard" className={styles.dash}><div className={styles.dashboardbutton}>View DashBoard</div></Link>
            </div>
            <div className={styles.XP2}>

              <div className={styles.xpItem}>
                <div className={styles.xpInfo}>
                  <span className={styles.xpName}>1.</span>
                  <img className={styles.XPimg} src="/Badges/image6.png"></img>
                  <div className={styles.XPName}> Rahul</div></div>
                <div className={styles.userxp}>100xp</div>
              </div>
              <div className={styles.xpItem}>
                <div className={styles.xpInfo}>
                  <span className={styles.xpName}>2.</span>
                  <img className={styles.XPimg} src="/Badges/image4.png"></img>
                  <div className={styles.XPName}> Naveed</div></div>
                <div className={styles.userxp}>80xp</div>
              </div>
              <div className={styles.xpItem}>
                <div className={styles.xpInfo}><span className={styles.xpName}>3.</span>
                  <img className={styles.XPimg} src="/Badges/image8.png"></img>
                  <div className={styles.XPName}> Pranshu</div></div>
                <div className={styles.userxp}>70xp</div>
              </div>
              <div className={styles.xpItem}>
                <div className={styles.xpInfo}>
                  <span className={styles.xpName}>4.</span>
                  <img className={styles.XPimg} src="/Badges/image7.png"></img>
                  <div className={styles.XPName}> Gokul</div></div>
                <div className={styles.userxp}>60xp</div>
              </div>
              <div className={styles.xpItem}>
                <div className={styles.xpInfo}>
                  <span className={styles.xpName}>5.</span>
                  <img className={styles.XPimg} src="/Badges/image9.png"></img>
                  <div className={styles.XPName}> Michael</div></div>
                <div className={styles.userxp}>50xp</div>
              </div>


            </div>
          </div>
          <div className={styles.Dash}>
            <div className={styles.DashXP1}>
              <h2 className={styles.XPHead1}>XP Progress<span>Edit Goal</span></h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Curriculumpage;