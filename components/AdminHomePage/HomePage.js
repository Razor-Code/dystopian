import React from 'react'
import styles from "./HomePage.module.css"
import { useReducer } from 'react'

const HomePage = () => {

  function reducer(state, action) {
    switch (action.component) {
        case 'register':    
            return { register: !state.register , login: true, register: false };
        case 'login':
            return { login: !state.login , register: true, login: false };
        default:
            return state;
    }
}

const [isOpen, isOpenDispatch] = useReducer(reducer, {register: false, login: true});

  return (
    <div className={styles.main}>
    <div className={styles.Nav}>
      <ul className={styles.list}>
        <li className={styles.listitem}> Name : Rahul </li>
        <li className={styles.listitem1}>| Admin</li>
      </ul> 
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
      </div>  </div>
      

        <div className={styles.body}>
        <div className={styles.Login_Signup} id="form"><div id="Login" className={styles.Login} onClick={() => isOpenDispatch({ component: "login" })}>Login Guild</div>
        <div className={styles.Signup} onClick={() => isOpenDispatch({ component: "register" })}>Create Guild</div></div>
       
                 
        {isOpen.login && (
          <>
        <div className={styles.createcontainer}>

          <div className={styles.title}>
          Create Guild
          </div>
          <form action="#">
            <div className={styles.details1}>
              <div className={styles.inputBox}>
                <span className={styles.details}>Guild Name</span>
                <input type="text" placeholder='Enter the Guild Name' required/>
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Admin Name</span>
                <input type="text" placeholder='Enter the Admin Name' required/>
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Admin Email</span>
                <input type="text" placeholder='Enter the Admin email' required/>
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Guild Password</span>
                <input type="text" placeholder='Enter the Password' required/>
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Capacity of Guild</span>
                <input type="text" placeholder='Enter Capacity of Guild' required/>
              </div>

              <div className={styles.inputBox}>
                <span className={styles.details}>Admin Phone number</span>
                <input type="text" placeholder='Enter the Phone number' required/>
              </div>

             
            </div>
            <div className={styles.button}>
            <input type="submit" value="create Guild"></input>
          </div>
          </form>
        </div>
          </>
          )}

          {isOpen.register && (
            <>
        <div className={styles.Logincontainer}>
        <div className={styles.title}>
        Login guild
        </div>
        <form action="#">
          <div className={styles.details1}>
            <div className={styles.inputBox}>
              <span className={styles.details}>Guild Name</span>
              <input type="text" placeholder='Enter the Guild Name' required/>
            </div>

            <div className={styles.inputBox}>
              <span className={styles.details}>Admin Name</span>
              <input type="text" placeholder='Enter the Admin Name' required/>
            </div>

            <div className={styles.inputBox}>
                <span className={styles.details}>Guild Password</span>
                <input type="text" placeholder='Enter the Password' required/>
              </div>

            <div className={styles.button}>
            <input type="submit" value="Enter guild"></input>
          </div>

            </div>
            </form>
        
        </div>
        </>
        )}

        </div>
       

    </div>
    </div>
    
    
  )
}

export default HomePage