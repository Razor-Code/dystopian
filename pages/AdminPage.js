import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import AdimPage from "../components/AdminPage/AdminPage";

const Adminpage = () => {

  const router = useRouter()
  const [isAuthStateChecked, setIsAuthStateChecked] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        let result = await getDoc(doc(db, 'users', user.uid))
        if (result.exists()) {
          if (result.data().role == "admin") {
            if (result.data().guilds.length == 0) {
              router.push('/AdminCreateGuild')
            } else {
              setIsAuthStateChecked(true)
            }
          } else {
            router.replace('/Curriculumpage')
          }
        }
      } else {
        router.replace('/mainpage')
      }
    }
    )
  }, [])

  return (
    <div>
      {isAuthStateChecked && <AdimPage />}
    </div>
  )
}

export default Adminpage