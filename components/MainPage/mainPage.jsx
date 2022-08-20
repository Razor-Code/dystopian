import style from './mainPage.module.css';
import Logo from '../home/logo';
import { useRef, useReducer, useState, useEffect } from 'react';
import app from '../../Firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { motion } from 'framer-motion';

 
function reducer(state, action) {
    switch (action.component) {
        case 'register':    
            return { register: !state.register , login: false };
        case 'login':
            return { login: !state.login , register: false };
        default:
            return state;
    }
}


const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export default function MainPage() {




  // const db = getFirestore(app);
  // const [isOpen, isOpenDispatch] = useReducer(reducer, {register: false, login: false});
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  // const [error, setError] = useState('');

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(email, password)
  //     .then(cred => {
  //       return db.collection('users').doc(cred.user.uid).set({
  //         name: name,
  //         email: email,
  //         password: password,
  //         uid: cred.user.uid
  //       })
  //     }).then(() => {
  //       dispatch({ component: 'register', type: 'register' });
  //     }).catch(error => {
  //       setError(error.message);
  //       alert(error.message);
  //     }
  //     );
  // }
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(email, password)

  //     .then(cred => {
  //       return db.collection('users').doc(cred.user.uid).get()
  //     }).then(doc => {
  //       if (doc.exists) {
  //         dispatch({ component: 'login', type: 'login' });
  //       } else {
  //         setError('User not found');
  //       }
  //     }).catch(error => {
  //       setError(error.message);
  //     }
  //     );
  // }



const [isOpen, isOpenDispatch] = useReducer(reducer, {register: false, login: false});
const auth = getAuth(app);
const [username, setUsername] = useState('');
const [email, setEmail] = useState("");
const [password, setPassword] = useState('');
const [role, setRole] = useState('');

const signIn = () => {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    
    alert(" successfully Signed in");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(error);
    alert(errorCode);
    // const errorMessage = error.message;
  });
}


const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {displayName : username } ).then(
      () => {
        console.log("User profile updated");
      }    
    )

  
    console.log(user.Role)
    console.log(user);
    console.log(user.displayName);
    alert("successfully created account")
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
console.log(error);
  // const errorMessage = error.message;
   alert(errorCode);
  });
}


const LogOut = () => {
  const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}


let slider = document.querySelector('.slide');
        let index = 0;
        function next(){
          slider[index].classList.remove('active')
          index = (index + 1) % slider.length
          slider[index].classList.add('active')
        }



    
return (
  <div className={style.body}>
    <div className={style.Nav}>
      <ul className={style.list}>
        <h2 className={style.head}>
          <Logo />
        </h2>
       
      </ul>
      <ul className={style.list2}>
      <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.8 }}><li>
          <img
            className={style.img1}
            src="https://cdn-icons-png.flaticon.com/128/1177/1177428.png"
          ></img>
          <a id="Login" onClick={() => isOpenDispatch({ component: "login" })}>
            Login
          </a>
        </li></motion.div>
        <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}><li>
          <img
            className={style.img1}
            src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          ></img>
          <a onClick={() => isOpenDispatch({ component: "register" })}>
            Register
          </a>
        </li></motion.div>
      </ul>
      {isOpen.login && (
        <>
          <div className={style.arrow}></div>

          <div className={style.form}>
            <form>
              <div>
                <div className={style.label}>Email</div>
                <input
                  className={style.input}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <div className={style.label}>Password</div>
                <input
                  className={style.input}
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>

              <div>
                <div className={style.submit} onClick={signIn}>
                  {" "}
                  Login{" "}
                </div>
              </div>
              <div className={style.lostpass}>
                <a href="#">Lost your Password ?</a>
              </div>
            </form>
          </div>
        </>
      )}

      {isOpen.register && (
        <>
          <div className={style.arrow2}></div>

          <div className={style.form2}>
            <form>
              <div>
                <div className={style.label2}>Email</div>
                <input
                  className={style.input2}
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Id"
                />
              </div>
              <div>
                <div className={style.label2}>Password</div>
                <input
                  className={style.input2}
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div>
                <div className={style.label}>UserName</div>
                <input
                  className={style.input}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                />
              </div>

              <div>
                <div className={style.label}>Role</div>
                <input
                  className={style.input}
                  type="text"
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Admin or User"
                />
              </div>

              <div>
                <div className={style.submit2} onClick={signUp}>
                  Submit
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>

    <motion.div 
    whileInView={{ x: [-100, 0], opacity: [0, 1] }}
    transition={{ duration: 0.6 }} >
    <h1 className={style.title}>DYSTOPIAN</h1>
    <h3 className={style.info}>Register and Login to Start your Python journy with Dystopian</h3></motion.div>
    <div className={style.Button}>Preview</div>
    <div className={style.seg}>
    <div className={style.slides}>
    <div className={style.slide}><a className={style.slideImg} href=''></a></div>
    <div className={style.slide}><a className={style.slideImg} href=''></a></div>
    <div className={style.slide}><a className={style.slideImg} href=''></a></div>
    <div className={style.slide}><a className={style.slideImg} href=''></a></div>
    
     </div>
    
     </div>
    
  </div>
); }

