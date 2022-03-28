import { useState, useEffect, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState, showPlaylistState, showMenuState } from '../atoms/playlistAtom'
import { useSession } from 'next-auth/react'
import useSongInfo from '../hooks/useSongInfo'
import { currentTrackIdState, isPlayingState, currentTrackState } from '../atoms/songAtom'


import Image from "next/image"
import ProgressBar from './ProgressBar'
import Navigation from './Navigation'

import styles from '../styles/app.module.css'
import image from '../public/images/Lion-Heart.jpeg'
import {IconPlay, IconNext, IconLikes, IconMode, IconMenu, IconPlaylist, IconPause, IconVolumenDown, IconVolumenUp} from '../utils/icons'

import useSpotify from '../hooks/useSpotify'
import { debounce } from 'lodash'


export default function Player () {
  const spotifyApi = useSpotify()
  const {data: session, status} = useSession()
  const playlistId = useRecoilValue(playlistIdState)
  const [isShowPlaylist, setIsShowPlaylist] = useRecoilState(showPlaylistState)
  const [isOpen, setIsOpen] = useRecoilState(showMenuState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState)
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [openSliderVolume, setOpenSliderVolume] = useState(false)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {

    if(!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body?.item?.id)
        setCurrentTrack(data.body)

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
    
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if(data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      }else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }


  useEffect(( ) => {
    if(spotifyApi.getAccessToken() && !currentIdTrack) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyApi, session])

  useEffect(() => {
    if( volume > 0 && volume < 100 ) {
      debounceAdjustVolume(volume)
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(
    debounce(volume => {
      spotifyApi.setVolume(volume)
      .catch(err => {console.error(err)})
    }, 300), []
  )

  useEffect( () => {
    spotifyApi.getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((error) => console.log('Something Went Wrong ->', error))
  
  }, [spotifyApi, playlistId])

  return (
    <div className={styles.container_player}>
      <div className={styles.background_container} style={{backgroundImage: `url(${songInfo?.album.images?.[0]?.url})`}}></div>
      <header className={styles.container_player_header}>
        <button className={styles.icon}>
          <IconLikes color="#D1D7DE" />
        </button>
        <button className={styles.icon}>
          <IconMode color="#D1D7DE" /> 
        </button>
      </header>

        <div className={styles.info_music}>
          <Image src={songInfo?.album.images?.[0]?.url || image.src} width={200} height={200} className={styles.art_music} alt="image music" />
          <div className={styles.info_music_content}>
            <div>
              <p>
                {
                  songInfo?.album.artists?.map(artist => artist.name).join(', ')               
                }
              </p>
              <h1>{songInfo?.name}</h1>
            </div>
            <div className={styles.info_music_controls}>
              <button onClick={handlePlayPause} className={styles.button_controls_play}>
                {
                  isPlaying 
                  ? <IconPause color="#D1D7DE" />
                  : <IconPlay color="#D1D7DE" />
                }
              </button>
              <button className={styles.button_controls_prev}>
                <IconNext color="#D1D7DE" />
              </button>
              <button className={styles.button_controls_next}>
                <IconNext color="#D1D7DE" />
              </button>
              <button onClick={() => setOpenSliderVolume(!openSliderVolume)} className={styles.button_controls_volume} >
                {
                  volume === 0 
                  ? <IconVolumenDown color="#D1D7DE" /> 
                  : <IconVolumenUp color="#D1D7DE" />
                }
                <div className={styles.slider_volume} style={{display: openSliderVolume ? 'flex' : 'none'}}>
                  <input 
                    type='range' 
                    min={0} 
                    value={volume} 
                    max={100} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.progress_bar_music}>
          <ProgressBar duration={songInfo?.duration_ms} />
        </div>

        <Navigation isOpen={isOpen} /> 
       
        <button onClick={() => setIsOpen(!isOpen)} className={styles.button_menu}>
          <IconMenu color="#4F5A6A" />
        </button>
        <button onClick={() => setIsShowPlaylist(!isShowPlaylist)} className={styles.button_show_playlist}>
          <IconPlaylist color="#4F5A6A" />
        </button>
        
    </div>
  )
}