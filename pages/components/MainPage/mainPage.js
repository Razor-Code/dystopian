import style from './mainPage.module.css';


export default function MainPage() {
return(
    <div className={style.body}>
    <div className={style.Nav}>
   
    <ul className={style.list}>
        <h2 className={style.head} >Dystopian</h2>
        <li className={style.list1}><a href='#'>Documentation</a></li>
    </ul>
    <ul>
        <li><a href="#">Register</a></li>    
        <li><a href="#">Sign Up</a></li>
    </ul>
    </div>
    </div>
)

}

