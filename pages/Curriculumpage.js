import Curriculumpage from "../components/curriculumPage/Curriculumpage";
import { useState, useEffect } from "react";
import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../Firebase';
import MainPage from '../components/MainPage/mainPage';
import AdimPage from "../components/AdimPage/AdimPage";




export default function CurriculumPage (){

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
