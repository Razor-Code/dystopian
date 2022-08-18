import styles from "./Documentation.module.css";
import Link from 'next/link';

export default function Documentation10() {
    return(
        <div className={styles.body}>
        <div className={styles.Nav}>
        <div> <ul className={styles.list}>
           <li className={styles.listitem}> Name : Dystopian  |</li>
           <li className={styles.listitem}> Stage : I</li>
         </ul> </div>
         <div>Your Progress<div className={styles.progressBar}><div className={styles.progress}>10%</div></div></div>
       </div>
  
        <div className={styles.container}>
        <div className={styles.docs}>
        
        </div>
        <div className={styles.compilerCont}><iframe className={styles.compiler} src="https://trinket.io/embed/python/9f5f0b7d5e" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe></div>
        </div>
        <div className={styles.footer}>
            <h2><img className={styles.img} src="https://cdn-icons.flaticon.com/png/128/3246/premium/3246112.png?token=exp=1659959388~hmac=10eab2dfb5b2871ef8aea9744130da6b"></img> Introduction</h2>
            <ul>
            <li><Link href="/documentation10"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053188.png"></img></Link>Back</li>
                <li>10/12</li>
                <li>Next<Link href="/documentation11"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053190.png"></img></Link></li>
            </ul>
        </div>
        </div>
    )
}