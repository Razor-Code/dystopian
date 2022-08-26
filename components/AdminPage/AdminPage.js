import React, { useEffect, useRef, useState } from 'react'
import styles from './AdminPage.module.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../../Firebase'
import { useRouter } from 'next/router'
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import Link from 'next/link'
import app from '../../Firebase'
import { getAuth } from 'firebase/auth'

const AdimPage = () => {

  const router = useRouter()
  const [user, setUser] = useState('')
  const [guilds, setGuilds] = useState([])
  const [currentGuild, setCurrentGuild] = useState('')
  const [students, setStudents] = useState([])
  const [studentsDetails, setStudentsDetails] = useState([])
  const [unSubscribe, setUnSubscribe] = useState()
  const addUserRef = useRef(null)

  // checks the authentication state and redirect the user accordingly
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        await getDoc(doc(db, 'users', user.uid)).then(result => {
          if (result.exists()) {
            if (result.data().role != "admin") {
              router.replace('/Curriculumpage')
            }
          }
        })
      } else {
        router.replace('/mainpage')
      }
    })
  }, [])

  // get the list of all the guilds owned by the admin
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
        setCurrentGuild(guildsArray[0])
      })
    }
  }, [user]);

  // listen for realtime updates in the current guild collection
  useEffect(() => {
    if (currentGuild) {
      if (unSubscribe) {
        unSubscribe()
      }
      setUnSubscribe(() =>
        onSnapshot(doc(db, 'guilds', currentGuild.id), (doc) => {
          setStudents(doc.data().guildMembers)
        }));
    }
  }, [currentGuild]);

  // fetch the student details if the student is modified
  useEffect(() => {
    if (students.length > 0) {
      let studentsArray = []
      const studentsQuery = query(collection(db, "users"), where("uid", "in", students))
      getDocs(studentsQuery).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          studentsArray.push({
            id: doc.id,
            ...doc.data()
          })
        });
        setStudentsDetails(studentsArray)
        console.log(studentsArray)
      }).catch(e => {
        console.log(e)
      })
    }
  }, [students]);

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (addUserRef.current.value != '') {

      // if there is no guild selected alert user
      if (!currentGuild) {
        alert("Please select a guild")
        return;
      }

      // check if the user is already in the guild
      let userInGuild = false
      students.forEach(student => {
        if (student.id == addUserRef.current.value) {
          userInGuild = true
        }
      })
      if (userInGuild) {
        alert("User is already in the guild")
        return;
      }

      const checkUser = query(collection(db, "users"), where("email", "==", addUserRef.current.value))
      getDocs(checkUser).then(async querySnapshot => {
        if (querySnapshot.empty) {
          alert("User not found")
        } else {
          const user = querySnapshot.docs[0].data()
          if (user.role == "admin") {
            alert("You can't add an admin")
          } else {
            await setDoc(doc(db, 'guilds', currentGuild.id), {
              guildMembers: [...students, user.uid],
            }, { merge: true }).catch(e => {
              console.log(e)
              alert("Error adding user to guild")
            }).then(() => {
              setStudents([...students, user.uid])
              alert("User added to the guild")
              addUserRef.current.value = ''
            })
          }
        }
      })
    }
  }



  const logout = () => {
    const auth = getAuth(app);
    signOut(auth)
  }

  return (
    <div className={styles.body}>
      <div className={styles.Nav}>
        <div className={styles.Navlist}>
          <ul className={styles.list}>
            <li className={styles.listitem}> Name : {user.displayName && user.displayName} </li>
            <li className={styles.listitem1}>| Admin</li>
          </ul>
          <ul className={styles.list1}>
          <Link href="https://dystopian.tribeplatform.com/"><div className={styles.forum}>Forum</div></Link>
          <Link href=""><div className= {styles.logout} onClick={logout}>Logout</div></Link>
          </ul>
        </div>



      </div>
      <div className={styles.body1}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_item}>
            <div className={styles.sidebar1}>
              <Link href="/AdminCreateGuild">
                <div className={styles.add_guild}>
                  <img src="/Logos/home.png" width={50} height={50} />
                </div>
              </Link>
              {guilds.map((guild, index) => (
                <div className={styles.guilds1} key={index} onClick={() => setCurrentGuild(guild)}>G{index + 1}</div>
              ))}

            </div>
          </div>



        </div>
        <div className={styles.main}>
          <div className={styles.user_info}>


            <div className={styles.Box}>


              <div className={styles.Guildinfo}>
                <h1>Guild Info</h1>
                <div className={styles.Guildname}><h2>Guild Name : </h2><span> {currentGuild.guildName}</span></div>
                <div className={styles.Guildname}><h2>Admin Name : </h2><span> {user.displayName}</span></div>
                <div className={styles.Guildname}><h2>Capacity   : </h2><span> {currentGuild.guildCapacity}</span></div>
              </div>

              <div className={styles.totalUser}>
                <div className={styles.totalUserHead}>
                  <div className={styles.imgs}>
                    <img src="https://cdn-icons-png.flaticon.com/128/4906/4906266.png"></img>
                    <img src="https://cdn-icons-png.flaticon.com/128/4876/4876510.png"></img>
                  </div>
                  <div className={styles.total}> Total Users : <h3>100</h3> </div>
                  <div className={styles.newUser}><b>+ Add New User</b></div>
                  <div className={styles.addUser}><input
                    className={styles.input}
                    ref={addUserRef}
                    type="text"
                    placeholder="Enter the student's email"
                  />
                    <div className={styles.submit} onClick={handleAddStudent}>Add</div>
                  </div>
                </div>
              </div>

              <div className={styles.Div3}>
                <div className={styles.XP2}>
                  <div className={styles.head}>Toppers :</div>
                  <div className={styles.xpItem}>
                    <div className={styles.xpInfo}>
                      <span className={styles.xpName}>1.</span>
                      <img className={styles.XPimg} src="/Badges/image6.png"></img>
                      <div className={styles.XPName}> vijay</div></div>
                    <div className={styles.userxp}>100xp</div>
                  </div>

                  <div className={styles.xpItem}>
                    <div className={styles.xpInfo}>
                      <span className={styles.xpName}>2.</span>
                      <img className={styles.XPimg} src="/Badges/image4.png"></img>
                      <div className={styles.XPName}> Ajith</div></div>
                    <div className={styles.userxp}>80xp</div>
                  </div>

                  <div className={styles.xpItem}>
                    <div className={styles.xpInfo}>
                      <span className={styles.xpName}>3.</span>
                      <img className={styles.XPimg} src="/Badges/image8.png"></img>
                      <div className={styles.XPName}> Pranshu</div></div>
                    <div className={styles.userxp}>70xp</div>
                  </div>

                  <div className={styles.xpItem}>
                    <div className={styles.xpInfo}>
                      <span className={styles.xpName}>4.</span>
                      <img className={styles.XPimg} src="/Badges/image7.png"></img>
                      <div className={styles.XPName}> Gokul</div></div>
                    <div className={styles.userxp}>60xp</div>
                  </div>

                  <div className={styles.xpItem}>
                    <div className={styles.xpInfo}>
                      <span className={styles.xpName}>5.</span>
                      <img className={styles.XPimg} src="/Badges/image9.png"></img>
                      <div className={styles.XPName}> Michael</div></div>
                    <div className={styles.userxp}>50xp</div>
                  </div>

                </div>
              </div>

              <div className={styles.Div4}>
              <div className={styles.divhead}>
                Upload File
              </div>
              <div className={styles.divbody}>
              <img src='https://cdn-icons-png.flaticon.com/128/4007/4007698.png'></img>
              Search or Browse file
              <div className={styles.upload}>upload</div>
              </div>
              </div>
            </div>
            <div className={styles.user}>
              <div className={styles.userdiv}>
                <h2 className={styles.h2}>DashBoard</h2>
                <div className={styles.userHead}>
                  <div className={styles.userNo}><b>No.</b></div>
                  <div className={styles.userName}><b>UserName</b></div>
                  <div className={styles.status}><b>Status</b></div>
                  <div className={styles.xp}><b>XP</b></div>
                </div>
                <div className={styles.list}>
                 
                { studentsDetails.map((student) => (
                    
                
                <div className={styles.userList}>
                    <div className={styles.ListNo}><span>1</span></div>
                    <div className={styles.ListName}><span>{student.name}</span></div>
                    <div className={styles.Liststatus}><span>Strings</span></div>
                    <div className={styles.Listxp}><span>XP</span></div>
                  </div>
                  ))}
                 
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
    </div>

  )
}

export default AdimPage