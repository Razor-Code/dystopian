import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../components/Vedio/vedio.module.css'
import Logo from '../components/home/logo'
import MainPage from '../components/MainPage/mainPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Curriculumpage from '../components/curriculumPage/Curriculumpage';
import app, { db } from '../Firebase';
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'


const Vedio = () => {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isAuthStateChecked, setIsAuthStateChecked] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)

  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, user => {
      if (user) {
        getDoc(doc(db, 'users', user.uid)).then(result => {
          setUser(result.data())
          setIsAuthStateChecked(true)
        })
      } else {
        setIsAuthStateChecked(true)
      }
    })
  }, [])

  useEffect(() => {
    /**
     * if user is not logged in then redirect him to the /mainpage
     * if the user is logged in
     *  - if the user.role is admin then redirect him to the /AdminPage
     *  - if the user.role is user then redirect him to the /Curriculumpage
     */
    if (isAuthStateChecked && isSkipped) {
      if (user) {
        if (user.role === 'admin') {
          router.replace('/AdminPage')
        } else {
          router.replace('/Curriculumpage')
        }
      } else {
        router.replace('/mainpage')
      }
    }
  }, [isSkipped, isAuthStateChecked])


  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 24000);
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 21000);
  }, []);


  const skip = () => {
    setIsSkipped(true)
  }


  return (
    <div>
      {
        state ?
          loading ?
            <div className={styles.body}>
              <div className={styles.skip} onClick={skip}>SKIP <img src='https://cdn-icons-png.flaticon.com/128/7719/7719974.png'></img></div>
              <video className={styles.video} src="/video.mp4" autoPlay muted></video></div>
            :
            <div className={styles.Logo}><div className={styles.fadein} > <Logo className={styles.log} /></div></div>
          :
          <div></div>
      }
    </div>
  )
}

export default Vedio