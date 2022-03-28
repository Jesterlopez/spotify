import { useState, useEffect, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { currentTrackState } from '../atoms/songAtom'
import { millisToMinutesAndSeconds } from '../utils/time'


import styles from '../styles/app.module.css'
import {IconShuffle, IconRepeat} from '../utils/icons'
import { debounce } from 'lodash'

export default function ProgressBar ({duration}) {  
  const currentTrackDuration = millisToMinutesAndSeconds(duration)
  const currentTrack = useRecoilValue(currentTrackState)

  return (
    <>
      <progress className={styles.progress_bar} max="100" value="10" />
      <div className={styles.info_progress_bar}>
        <div className={styles.info_progress_bar_left}>
          {progressTime}
        </div>
        <div className={styles.info_progress_bar_center}>
          <button className={styles.button_progress_bar}>
            <IconShuffle color="#4F5A6A" /> 
          </button>
          <button className={styles.button_progress_bar}>
            <IconRepeat color="#4F5A6A" /> 
          </button>
        </div>
        <div className={styles.info_progress_bar_right}>
          {currentTrackDuration}
        </div>
      </div>
    </>
  )
}