import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Curriculumpage from '../components/curriculumPage/Curriculumpage';
import GetStarted from '../components/GetStarted/GetStarted';
import MainPage from '../components/MainPage/mainPage';
import { useEffect } from 'react';
import { useState } from 'react';
import app from '../Firebase';
import AdimPage from '../components/AdimPage/AdimPage';


export default function mainpage (){

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

return (
    <div>
    {
      (executer && user) && <Curriculumpage/>
    }
    {
      (executer && !user) && <MainPage/>
    }
    </div>
  )
}
