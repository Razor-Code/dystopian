import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import MainPage from '../components/MainPage/mainPage';
import { useEffect } from 'react';
import { useState } from 'react';
import app, { auth, db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Logo from '../components/home/logo';


export default function mainpage() {

  const [user, setUser] = useState('')
  const [executed, setExecuted] = useState(false)
  const [role, setRole] = useState('')

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        let result = await getDoc(doc(db, 'users', user.uid))

        if (result.exists()) {
          if (result.data().role == "admin") {
            router.push('/AdminPage')
          } else {
            router.replace('/Curriculumpage')
          }
        } else {
          console.log("please reload the page");
replace('/Curriculumpage')

        }
      } else {
        setExecuted(true)
      }
    }
    )
  }, [])

  return (
    <div>
      {
        executed ? <MainPage /> : (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Logo /></div>)
      }
    </div>
  )
}
