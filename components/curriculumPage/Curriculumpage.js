import React from 'react'
import styles from "./curriculumPage.module.css"
import Button from '../../components/button/button'
import MainPage from '../MainPage/mainPage'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { app } from '../../firebase'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'


const Curriculumpage = () => {

const [user, setUser] = useState('')
const auth = getAuth(app);
 
useEffect(() => {
  onAuthStateChanged(auth ,user => {
    if (user) {
      setUser(user)
      console.log(user)
    }
  }
)}, [])


return (
  <div className={styles.body}>
    <div className={styles.Nav}>
      <div> 
        <ul className={styles.list}>
          <li className={styles.listitem}> Name :  {user.displayName && user.displayName} |</li>
          <li className={styles.listitem}> Stage : I</li>
        </ul> 
      </div>
      <div className={styles.docs}><a href='/documentation'>Documentation</a></div>
      
        <div>Your Progress<div className={styles.progressBar}><div className={styles.progress}>10%</div></div>
        </div>
      </div>
       
    <div className={styles.Container}>
      <div className={styles.heading}>The Cirriculum </div>
    
    <div className={styles.box}>

    <div className={styles.list}>
    <div className={styles.card}><h2>Chapter 1 <br/> <div className={styles.place}>Cyber city </div></h2> <div> Input and Output Statements</div>
    <div className={styles.button}>Level 1</div></div>

    <div className={styles.card}><h2>Chapter 2 <br/> <div className={styles.place}>Warped City </div></h2> <div> Keywords and Variables</div>
    <div className={styles.button}>Level 2</div></div>

    <div className={styles.card}><h2>Chapter 3  <br/> <div className={styles.place}>Forest of Ilusion </div></h2> <div> Datatypes</div>
    <div className={styles.button}>Level 3</div></div>

    <div className={styles.card}><h2>Chapter 4  <br/> <div className={styles.place}>Tall Forest</div></h2> <div> Operators</div>
    <div className={styles.button}>Level 4</div></div>

    </div>

    <div className={styles.list}>
    <div className={styles.card}><h2>Chapter 5  <br/> <div className={styles.place}>Forest </div></h2> <div>Strings and its functions </div>
    <div className={styles.button}>Level 5</div></div>

    <div className={styles.card}><h2>Chapter 6 <br/> <div className={styles.place}>Forest of Illusion </div></h2> <div> List and Tuples</div>
    <div className={styles.button}>Level 6</div></div>

    <div className={styles.card}><h2>Chapter 7 <br/> <div className={styles.place}>Gothic vania </div></h2> <div> Dictionary</div>
    <div className={styles.button}>Level 7</div></div>

    <div className={styles.card}><h2>Chapter 8 <br/> <div className={styles.place}>Rocthy pass </div></h2> <div> Slicing and Striding</div>
    <div className={styles.button}>Level 8</div></div>

    </div>

    <div className={styles.list}>
    <div className={styles.card}><h2>Chapter 9 <br/> <div className={styles.place}>Swamp </div></h2> <div> Decision Making Statements</div>
    <div className={styles.button}>Level 9</div></div>

    <div className={styles.card}><h2>Chapter 10 <br/> <div className={styles.place}>Church </div></h2> <div> Looping Statements</div>
    <div className={styles.button}>Level 10</div></div>

    <div className={styles.card}><h2>Chapter 11 <br/> <div className={styles.place}>Town </div></h2> <div> Control Statements</div>
    <div className={styles.button}>Level 11</div></div>

    <div className={styles.card}><h2>Chapter 12 <br/> <div className={styles.place}>Junk yard </div></h2> <div> Function and its Prototype</div>
    <div className={styles.button}>Level 12</div></div>

    </div>
    </div>
    </div>
    </div>
  )
}

export default Curriculumpage;