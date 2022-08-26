import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import styles from './t2s.module.css'
import { SpeechSynthesisVoice } from 'react-speech-kit'

const Texttospeech = (props) => {

    const [value, setvalue] = useState('')
    const { speak } = useSpeechSynthesis();


  return (
    <div className={styles.body}>
    <input value={value}
    onChange={(event) => setvalue(event.target.value)}></input>
    <button className={styles.button} onClick={() => speak({ text: value, voice:SpeechSynthesisVoice })}>listen</button>    
    </div>
  )
}

export default Texttospeech