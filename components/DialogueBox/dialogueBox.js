import styles from './dialogueBox.module.css';
import Image from 'next/image';


var speeds = {
  pause : 500,
  slow : 120,
  normal : 70,
  fast : 40
}




export default function DialogueBox(props) {
  return (
    <div className={styles.dialogueBox}>
      <div className={styles.speakerImage}>
        <Image src={props.image} width={100} height={100} />
      </div>
      <p className={styles.speakerName}>Pranshu Jha</p>
      <p>{props.text}</p>
      <div className={styles.dialogueBoxArrow} />
    </div>
  )
}