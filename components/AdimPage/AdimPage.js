import React from 'react'
import styles from './AdminPage.module.css'
import Image from 'next/image'

const AdimPage = () => {
  return (
    <div className={styles.body}>
    <div className={styles.Nav}>
    <div> 
      <ul className={styles.list}>
        <li className={styles.listitem}> Name : Rahul </li>
        <li className={styles.listitem1}>| Admin</li>
      </ul> 
    </div>
   
    
     
    </div>
    <div className={styles.body1}>
    <div className={styles.sidebar}>
        <div className={styles.sidebar_item}>
            <div className={styles.sidebar1}>
            <img src="/Logos/Home.png" width={50} height={50}/>
            <img src="/Logos/student.png" />
            
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