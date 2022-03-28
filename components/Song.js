import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {currentTrackIdState,currentTrackState} from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

import Image from "next/image"
import styles from '../styles/playlist.module.css'

export default function Song ( {track} ) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const currentTrack = useRecoilValue(currentTrackState)



  const playSong = () => {
    setCurrentTrackId(track.track.id)
    spotifyApi.play({
      uris: [track.track.uri]
    })
  }

  return (
          <li className={styles.song } onClick={playSong}>
            <div className={styles.image_song}>
              <Image src={track.track.album.images[0]?.url} width="100%" height="100%" alt="Cover Song" />
            </div>
            <div className={styles.song_info} >
              <p>{track.track.name}</p>
              <p>{track.track.artists[0].name}</p>
            </div>
          </li>
  )
}