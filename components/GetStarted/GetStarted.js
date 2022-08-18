import Link from 'next/link';
import styles from './GetStarted.module.css';
import Logo from '../home/logo';

export default function GetStarted(){
    return(
        <div className={styles.section}>
    <div className={styles.box}>
    <Logo/>
    <h2> Learn How to code Python Language By Playing !</h2>
        <p>
        Dystopian is a interative gamified Python learning platform that teaches you all
        the basics and intermediate concepts of Python language.
        Learn to Code Python Language By Playing !
        </p>
        <div className={styles.buttons}>
        <Link href="/Vedio"><a>GetStarted</a></Link>
            <Link href="/learnmore"><a>Learn More</a></Link>
        </div>
    </div>
    </div>
)}