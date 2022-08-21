import Curriculumpage from "../components/curriculumPage/Curriculumpage";
import { useState, useEffect } from "react";
import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../Firebase';
import { useRouter } from "next/router";




export default function CurriculumPage() {

  const router = useRouter()

  const [user, setUser] = useState('')
  const [executer, setExecuter] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        setExecuter(true)
        await getDoc(doc(db, 'users', user.uid)).then(result => {
          if (result.exists()) {
            if (result.data().role == "admin") {
              router.replace('/AdminPage')
            }
          }
        })
      } else {
        router.replace('/mainpage')
      }
    })
  }, [])

  return (
    <div>
      {executer && <Curriculumpage />}
    </div>
  )
}
