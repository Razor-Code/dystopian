import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import Curriculumpage from '../components/curriculumPage/Curriculumpage';

import GetStarted from '../components/GetStarted/GetStarted';
import MainPage from '../components/MainPage/mainPage';
import { useEffect } from 'react';
import { useState } from 'react';
import app from '../Firebase';


export default function Home() {

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
      <Head>
        <title>Dystopyan</title>
        <meta name="description" content="Gamified Python Learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
      <GetStarted/>
      </main>
    </div>
  )
}
