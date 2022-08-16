import React from 'react'
import { useState, useEffect} from 'react'
import styles from '../components/Vedio/vedio.module.css'
import Logo from '../components/home/logo'
import MainPage from '../components/MainPage/mainPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Curriculumpage from '../components/curriculumPage/Curriculumpage';
import app from '../Firebase';


const Vedio = () => {

const [user, setUser] = useState('')
const [executer, setExecuter] = useState(false)  
  
  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, user => {
      setExecuter(true)
      if (user) {
         setUser(user)
      } 
    }
)}, [])  


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


return (
    <div>
    {
        state?
        loading?
        <div className={styles.body}><video className={styles.video} src="/video.mp4" autoPlay muted></video></div>
        :
        <div className={styles.Logo}><div className={styles.fadein} > <Logo className={styles.log} /></div></div>
        :
        <div>
        {
            (executer && user) && <Curriculumpage/>
        }
        {
            (executer && !user) && <MainPage/>
        }
        </div>
}
    </div>
  )
}

export default Vedio