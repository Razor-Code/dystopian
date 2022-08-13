import styles from "./Documentation.module.css";
import Link from 'next/link';
import Logo from "../home/logo";


export default function Documentation1() {
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
        <h2>Introduction To PYTHON</h2>
        <p>Python is a widely used general-purpose, high level programming language. It was created by Guido van Rossum in 1991 and further developed by the Python Software Foundation. 
        It was designed with an emphasis on code readability, and its syntax allows programmers to express their concepts in fewer lines of code.<br/>
        Python is a programming language that lets you work quickly and integrate systems more efficiently.</p>
        <span>Beginning with Python programming:<br/><br/>
        1) Finding an Interpreter:</span>
        <p>Before we start Python programming, we need to have an interpreter to interpret and run our programs. There are certain online interpreters that can be used to run Python programs without installing an interpreter.<br/>

       <b> Windows :</b> There are many interpreters available freely to run Python scripts like IDLE (Integrated Development Environment) that comes bundled with the Python software downloaded from http://python.org/.<br/>
        
        <b>Linux :</b> Python comes preinstalled with popular Linux distros such as Ubuntu and Fedora. To check which version of Python you’re running, type “python” in the terminal emulator. The interpreter should start and print the version number.<br/>
        
        <b>macOS :  </b> Generally, Python 2.7 comes bundled with macOS. You’ll have to manually install Python 3 from http://python.org/.</p>
        <span>2) Writing our first program: </span>
        <p>Just type in the following code after you start the interpreter.</p>
        <p># Script Begins<br/>
  
        print("Hello World")<br/>
          
        # Scripts Ends</p>

        <p>Let’s analyze the script line by line.<br/><span>Line 1 : </span> [ # Script Begins] In Python, comments begin with a #. This statement is ignored by the interpreter and serves as documentation for our code.
        <br/><span>Line 2 :</span>  This function also adds a newline after our message is printed(unlike in C). Note that in Python 2, “print” is not a function but a keyword and therefore 
        can be used without parentheses. However, in Python 3, it is a function and must be invoked with parentheses.<br/><span>Line 3 : </span>[# Script Ends] This is just another comment like in Line 1.</p>
        
        <h3><b>LANGUAGE FEATURES</b></h3>
        <ul className={styles.list}>
        <li><b>Interpreted</b>
        <ul>
    
        <li>There are no separate compilation and execution steps like C and C++.</li>
        <li>Directly run the program from the source code.</li>
        <li>Internally, Python converts the source code into an intermediate form called bytecodes which is then translated into native language of specific computer to run it.</li>
        <li>No need to worry about linking and loading with libraries, etc.</li>
        </ul></li>
    
        <li><b>Platform Independent</b>
        <ul>
        <li>Python programs can be developed and executed on multiple operating system platforms.</li>
        <li>Python can be used on Linux, Windows, Macintosh, Solaris and many more.</li>
        </ul></li>
        <li>
        <b>Free and Open Source</b>; Redistributable</li>
        <li><b>High-level Language</b>
        <ul>
        <li>In Python, no need to take care about low-level details such as managing the memory used by the program.</li></ul></li>
        <li><b>Simple</b><ul>
        <li>Closer to English language;Easy to Learn</li>
        <li>More emphasis on the solution to the problem rather than the syntax</li></ul></li>
        <li><b>Embeddable</b><ul>
        <li>Python can be used within C/C++ program to give scripting capabilities for the program’s users.</li></ul></li>
        </ul>
        </div>
        <div className={styles.compilerCont}><iframe className={styles.compiler} src="https://trinket.io/embed/python/9f5f0b7d5e" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe></div>
        </div>
        <div className={styles.footer}>
            <h2><img className={styles.img} src="https://cdn-icons.flaticon.com/png/128/3246/premium/3246112.png?token=exp=1659959388~hmac=10eab2dfb5b2871ef8aea9744130da6b"></img> Introduction</h2>
            <ul>
            <li><Link href="/documentation"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053188.png"></img></Link>Back</li>
                <li>1/12</li>
                <li>Next<Link href="/documentation2"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053190.png"></img></Link></li>
            </ul>
        </div>
        </div>
    )
}