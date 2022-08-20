import Image from 'next/image';
import styles from '../components/learnmore/learnmore.module.css';

export default function LearnMore() {
  return (
    <main>
      <div className={styles.glassContainer}>
        <h1>Team RazorCode</h1>
        {/* gallery of 6 pictures with three picture in a row */}
        <div className="gallery" >
          <Image src={"/creators/pranshu.png"} width={100} height={100} />
          <Image src={"/creators/naveed.png"} width={100} height={100} />
          <Image src={"/creators/gokul.png"} width={100} height={100} />
          <Image src={"/creators/rahul.png"} width={100} height={100} />
          <Image src={"/creators/mogana.png"} width={100} height={100} />
          <Image src={"/creators/deepthi.png"} width={100} height={100} />
        </div>
        <p className='desc-text'>We are a team of dedicated developers who brainstormed together and came up with the idea of making an interactive python teaching game with a cyberpunk twist!</p>
      </div>
    </main>
  )
}