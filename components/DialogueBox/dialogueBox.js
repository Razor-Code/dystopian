import styles from './dialogueBox.module.css';
import Image from 'next/image';

export default function DialogueBox(props) {
  return (
    <div className={styles.dialogueBox}>
      <div className={styles.speakerImage}>
        <Image src={props.image} width={100} height={100} />
      </div>
      <div className={styles.dialogueBoxText}>
        <p>{props.text}</p>
      </div>
      <div className={styles.dialogueBoxArrow} />
    </div>
  )
}