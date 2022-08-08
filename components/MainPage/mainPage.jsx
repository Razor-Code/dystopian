import style from './mainPage.module.css';
import Logo from '../home/logo';
import { useReducer } from 'react';

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

export default function MainPage() {

    const [isOpen, isOpenDispatch] = useReducer(reducer, {register: false, login: false});


return(
    <div className={style.body}>
    <div className={style.Nav}>
   
    <ul className={style.list}>
        <h2 className={style.head} ><Logo /></h2>
        <li className={style.list1}><a href='#'>Documentation</a></li>
    </ul>
    <ul className={style.list2}>
        <li><img className={style.img1} src="https://cdn-icons-png.flaticon.com/128/535/535245.png"></img><a id="Login" onClick= {() => isOpenDispatch(
            {component: 'login'}
        )}>Login</a></li> 
        <li><img className={style.img1} src="https://cdn-icons-png.flaticon.com/128/456/456212.png"></img><a onClick = {() => isOpenDispatch( 
            {component: 'register'}
         )}>Register</a></li>
    </ul>
   {isOpen.login && (<>
    <div className={style.arrow}></div>
    
    <div className={style.form}>
    <form>
        <div>
            <div className={style.label}>Username</div>
            <input className={style.input} type="text" placeholder="username" />
        </div>
        <div>
        <div className={style.label}>Password</div> 
        <input className={style.input} type="text" placeholder="password" />
    </div>
    
    <div>

        <input className={style.submit} type="submit" value="Login" />
    </div>
    <div className={style.lostpass}>
        <a href="#">Lost your Password ?</a>
    </div>

</form>
    </div>
    </>
   )}

   {isOpen.register && (<>
    <div className={style.arrow2}></div>
    
    <div className={style.form2}>
    <form>
        <div>
            <div className={style.label2}>Username</div>
            <input className={style.input2} type="text" placeholder="username" />
        </div>
        <div>
        <div className={style.label2}>Email</div>
        <input className={style.input2} type="text" placeholder="Email Id" />
    </div>
        <div>
        <div className={style.label2}>Password</div> 
        <input className={style.input2} type="text" placeholder="password" />
    </div>
    
    <div>

        <input className={style.submit2} type="submit" value="Register" />
    </div>

</form>
    </div>
    </>
   )}
    </div>
    </div>
) }

