import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MainPage from '../components/MainPage/mainPage';
import { useEffect } from 'react';
import { useState } from 'react';
import app, { db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';


export default function mainpage() {

  const [user, setUser] = useState('')
  const [executed, setExecuted] = useState(false)
  const [role, setRole] = useState('')

  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, async user => {
      if (user) {
        let result = await getDoc(doc(db, 'users', user.uid))

        console.log(result.data())

        if (result.data().role == "admin") {
          router.push('/AdminPage')
        } else {
          router.push('/Curriculumpage')
        }
      }
      setExecuted(true)
    }
    )
  }, [])

  return (
    <div>
      {
        executed && <MainPage />
      }
    </div>
  )
}
