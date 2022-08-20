import React, { useEffect, useState } from 'react'
import styles from './AdminPage.module.css'
import Image from 'next/image'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../Firebase'
import { useRouter } from 'next/router'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { FaPlus } from "react-icons/fa"
import Link from 'next/link'

const AdimPage = () => {

  const router = useRouter()
  const [user, setUser] = useState('')
  const [guilds, setGuilds] = useState([])
  const [currentGuild, setCurrentGuild] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        await getDoc(doc(db, 'users', user.uid)).then(result => {
          if (result.data().role != "admin") {
            router.push('/Curriculumpage')
          }
        })
      } else {
        router.replace('/mainpage')
      }
    })
  }, [])

  useEffect(() => {
    if (user) {
      const guildQuery = query(collection(db, "guilds"), where("admin", "==", user.uid))
      getDocs(guildQuery).then(querySnapshot => {
        let guildsArray = []
        querySnapshot.forEach((doc) => {
          guildsArray.push({
            id: doc.id,
            ...doc.data()
          })
        });
        setGuilds(guildsArray)
      })
    }
  }, [user]);

  useEffect(() => {
    console.log(guilds);
  }, [guilds]);

  return (
    <div className={styles.body}>
      <div className={styles.Nav}>
        <div>
          <ul className={styles.list}>
            <li className={styles.listitem}> Name : {user.displayName && user.displayName} </li>
            <li className={styles.listitem1}>| Admin</li>
          </ul>
        </div>



      </div>
      <div className={styles.body1}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_item}>
            <div className={styles.sidebar1}>
              <img src="/Logos/Home.png" width={50} height={50} />
              <img src="/Logos/student.png" />
              <Link href="/AdminCreateGuild">
                <div className={styles.add_guild}>
                  <FaPlus />
                </div>
              </Link>
            </div>
            <div className={styles.sidebar2}>
              <img src="/Logos/info.png" />
              <img src="/Logos/log-out.png" />
            </div>
          </div>



        </div>
        <div className={styles.main}>
          <div className={styles.user}>
            <h2 className={styles.h2}>DashBoard</h2>
            <div className={styles.userHead}>
              <div className={styles.userNo}><b>No.</b></div>
              <div className={styles.userName}><b>UserName</b></div>
              <div className={styles.status}><b>Status</b></div>
              <div className={styles.xp}><b>XP</b></div>
            </div>

            <div className={styles.userList}>
              <div className={styles.ListNo}><span>1</span></div>
              <div className={styles.ListName}><span>John</span></div>
              <div className={styles.Liststatus}><span>Strings</span></div>
              <div className={styles.Listxp}><span>XP</span></div>
            </div>

            <div className={styles.userList}>
              <div className={styles.ListNo}><span>2</span></div>
              <div className={styles.ListName}><span>John</span></div>
              <div className={styles.Liststatus}><span>Strings</span></div>
              <div className={styles.Listxp}><span>XP</span></div>
            </div>

            <div className={styles.userList}>
              <div className={styles.ListNo}><span>3</span></div>
              <div className={styles.ListName}><span>John</span></div>
              <div className={styles.Liststatus}><span>Strings</span></div>
              <div className={styles.Listxp}><span>XP</span></div>
            </div>

            <div className={styles.userList}>
              <div className={styles.ListNo}><span>4</span></div>
              <div className={styles.ListName}><span>John</span></div>
              <div className={styles.Liststatus}><span>Strings</span></div>
              <div className={styles.Listxp}><span>XP</span></div>
            </div>

            <div className={styles.userList}>
              <div className={styles.ListNo}><span>5</span></div>
              <div className={styles.ListName}><span>John</span></div>
              <div className={styles.Liststatus}><span>Strings</span></div>
              <div className={styles.Listxp}><span>XP</span></div>
            </div>
          </div>

          <div className={styles.Box}>
            <div className={styles.totalUser}>
              <div className={styles.totalUserHead}>
                <div className={styles.imgs}>
                  <img src="https://cdn-icons-png.flaticon.com/128/681/681494.png"></img>
                  <img src="https://cdn-icons-png.flaticon.com/128/3121/3121571.png"></img>
                </div>
                <div className={styles.total}> Total Users : <h3>100</h3> </div>
                <div className={styles.newUser}><b>+ Add New User</b></div>
                <div className={styles.addUser}><input
                  className={styles.input}
                  type="text"
                  placeholder="userID"
                />
                  <div className={styles.submit}>Add</div>
                </div>
              </div>

            </div>
            <div className={styles.Graph}>
              <div className={styles.GraphHead}>
                <h2>Student's xp progress :</h2>
                <span><img src="https://cdn-icons-png.flaticon.com/128/625/625946.png"></img>This Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdimPage