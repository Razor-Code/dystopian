import styles from "./Documentation.module.css";
import Link from 'next/link';
import Logo from "../home/logo";

export default function Documentation() {
    return(
        <div className={styles.body}>
        <div className={styles.Nav}>
   
        <ul className={styles.list}>
            <h2 className={styles.head} ><Logo /></h2>
            <li className={styles.list1}><img className={styles.img1} src="https://cdn-icons-png.flaticon.com/128/1061/1061427.png"></img><a href='/documentation'>Documentation</a></li>
        </ul>
        <ul className={styles.list2}>
            <li><img className={styles.img1} src="https://cdn-icons-png.flaticon.com/128/1177/1177428.png"></img><a id="Login" onClick= {() => isOpenDispatch(
                {component: 'login'}
            )}>Login</a></li> 
            <li><img className={styles.img1} src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"></img><a onClick = {() => isOpenDispatch( 
                {component: 'register'}
             )}>Register</a></li>
        </ul>
        </div>

        <div className={styles.container}>
        <div className={styles.docs}>
            <h1>Python Programming Language </h1>
            <h2>Introduction to python :</h2>
            <p> Python is a high-level, general-purpose and a very popular programming language.  
            Python programming language (latest Python 3) is being used in web development,  Machine Learning applications, along with all cutting edge technology in Software Industry. 
            Python Programming Language is very well suited for Beginners, also for 
            experienced programmers with other programming languages like C++ and Java.</p>
            <p>This specially designed Python tutorial will help you learn Python Programming Language in most efficient way, with the topics from basics to advanced 
            (like Web-scraping, Django, Deep-Learning, etc.) with examples.</p>
            <span>Below are some facts about Python Programming Language:</span>
            
            <ol className={styles.list}>
                <li>Python is currently the most widely used multi-purpose, high-level programming language.</li>
                <li>Python allows programming in Object-Oriented and Procedural paradigms.</li>
                <li>Python programs generally are smaller than other programming languages like Java. 
                Programmers have to type relatively less and indentation requirement of the language, makes them readable all the time.</li>
                <li>Python language is being used by almost all tech-giant companies like – Google, Amazon, Facebook, Instagram, Dropbox, Uber… etc.</li>
                <li>The biggest strength of Python is huge collection of standard library which can be used for the following:
                    <ul>
                        <li>Machine Learning</li>
                        <li>GUI Applications (like Kivy, Tkinter, PyQt etc. )</li>
                        <li>Web frameworks like Django (used by YouTube, Instagram, Dropbox)</li>
                        <li>Image processing (like OpenCV, Pillow)</li>
                        <li>Web scraping (like Scrapy, BeautifulSoup, Selenium)</li>
                        <li>Test frameworks</li>
                        <li>Multimedia</li>
                        <li>Scientific computing</li>
                        <li>Text processing and many more.</li>
                    </ul>               
                </li>
            </ol>
        </div>
        <div className={styles.compilerCont}><iframe className={styles.compiler} src="https://trinket.io/embed/python/9f5f0b7d5e" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe></div>
        </div>
        <div className={styles.footer}>
            <h2><img className={styles.img} src="https://cdn-icons.flaticon.com/png/128/3246/premium/3246112.png?token=exp=1659959388~hmac=10eab2dfb5b2871ef8aea9744130da6b"></img> Introduction</h2>
            <ul>
                <li><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053188.png"></img>Back</li>
                <li>0/12</li>
                <li>Next<Link href="/documentation1"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053190.png"></img></Link></li>
            </ul>
        </div>
        </div>
    )
}