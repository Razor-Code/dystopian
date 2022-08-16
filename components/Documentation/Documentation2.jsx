import styles from "./Documentation.module.css";
import Link from 'next/link';

export default function Documentation2() {
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
        <h2> Python Keywords</h2>
        <b>Python Keywords</b>
        <p>Keywords in Python are reserved words that can not be used as a variable name, function name, or any other identifier.</p>
        <h3>List of all keywords in Python</h3>
        <p>and, as,	assert,	 break, class,	continue,	def,	del, elif,	else,	except,	False, finally,	for,	from,	global, if,	import,	in,	is, lambda,	None,	nonlocal,	not, or,	pass,	raise,	return, True, try,	while,	with</p>
        <h3>Example: Python Keywords List </h3>
        # Python code to demonstrate working of iskeyword()
        <br/>
        # importing "keyword" for keyword operations<br/>
        import keyword
        # printing all keywords at once using "kwlist()"<br/>
        print("The list of keywords is : ")<br/>
         print(keyword.kwlist)
         <p>paste the code And See the output in compiler</p>
    
        <h3>Let’s discuss each keyword in detail with the help of good examples.</h3>
        <h2>True, False, None</h2>
        <ul>
        <li>True: This keyword is used to represent a boolean true. If a statement is true, “True” is printed.</li>
        <li>False: This keyword is used to represent a boolean false. If a statement is false, “False” is printed.</li>
        <li>None: This is a special constant used to denote a null value or a void. It’s important to remember, 0, any empty container(e.g empty list) does not compute to None. 
        <br/>It is an object of its datatype – NoneType. It is not possible to create multiple None objects and can assign them to variables.
        </li>
        </ul>
        <h3>Example: True, False, and None Keyword</h3>
        print(False == 0)<br/>
        print(True == 1)<br/>
          
        print(True + True + True)<br/>
        print(True + False + False)<br/>
          
        print(None == 0)<br/>
        print(None == [])
       
        </div>
        <div className={styles.compilerCont}><iframe className={styles.compiler} src="https://trinket.io/embed/python/9f5f0b7d5e" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe></div>
        </div>
        <div className={styles.footer}>
            <h2><img className={styles.img} src="https://cdn-icons.flaticon.com/png/128/3246/premium/3246112.png?token=exp=1659959388~hmac=10eab2dfb5b2871ef8aea9744130da6b"></img> Introduction</h2>
            <ul>
            <li><Link href="/documentation1"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053188.png"></img></Link>Back</li>
                <li>2/12</li>
                <li>Next<Link href="/documentation3"><img className={styles.img} src="https://cdn-icons-png.flaticon.com/128/1053/1053190.png"></img></Link></li>
            </ul>
        </div>
        </div>
    )
}