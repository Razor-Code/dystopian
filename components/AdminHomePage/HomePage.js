import React, { useEffect } from 'react'
import styles from "./HomePage.module.css"
import { useReducer, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app, { db } from '../../Firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const HomePage = () => {

  const router = useRouter()
  const [createGuild, setCreateGuild] = useState({
    guildName: '',
    guildPassword: '',
    guildCapacity: '',
  });

  const [user, setUser] = useState('')

  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
    }
    )
  })

  const registerGuild = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'guilds'), {
      admin: user.uid,
      guildName: createGuild.guildName,
      guildPassword: createGuild.guildPassword,
      guildCapacity: createGuild.guildCapacity,
      guildMembers: [],
    })

    const userDocument = await getDoc(doc(db, 'users', user.uid));

    await setDoc(doc(db, 'users', user.uid), {
      ...userDocument.data(),
      guilds: [...userDocument.data().guilds, docRef.id],
    })

    router.replace('/AdminPage')

  }

  return (
    <div className={styles.main}>
      <div className={styles.Nav}>
        <ul className={styles.list}>
          <li className={styles.listitem}> Name : {user.displayName} </li>
          <li className={styles.listitem1}>| Admin</li>
        </ul>
      </div>

      <div className={styles.body1}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_item}>
            <div className={styles.sidebar1}>
              <img src="/Logos/Bluehome.png" width={50} height={50} />
              <img src="/Logos/student.png" />

            </div>
          </div>  </div>


        <div className={styles.body}>

          <div className={styles.Logincontainer}>
            <div className={styles.title}>
              Create guild
            </div>
            <form action="#">
              <div className={styles.details1}>
                <div className={styles.inputBox}>
                  <span className={styles.details}>Guild Name</span>
                  <input type="text" placeholder='Enter the Guild Name' value={createGuild.guildName} onChange={(e) => setCreateGuild({ ...createGuild, guildName: e.target.value })} required />

                  <div className={styles.inputBox}>
                    <span className={styles.details}>Guild Password</span>
                    <input type="text" placeholder='Enter Password' value={createGuild.guildPassword} onChange={(e) => setCreateGuild({ ...createGuild, guildPassword: e.target.value })} required />
                  </div>

                  <div className={styles.inputBox}>
                    <span className={styles.details}>Guild Capacity</span>
                    <input type="number" placeholder='Enter the capacity' value={createGuild.guildCapacity} onChange={(e) => setCreateGuild({ ...createGuild, guildCapacity: e.target.value })} required />
                  </div>

                  <div className={styles.button}>
                    <button type="submit" onClick={registerGuild}>Create Guild</button>
                  </div>

                </div>
              </div>
            </form>

          </div>


        </div>
      </div>
    </div>


  )
}

export default HomePage