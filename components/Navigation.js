import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/app.module.css'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState, showMenuState, showPlaylistState } from '../atoms/playlistAtom'

export default function Navegation ({isOpen}) {
  const spotifyApi = useSpotify()
  const {data: session, status} = useSession()

  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [isShowMenu, setIsShowMenu] = useRecoilState(showMenuState)
  const [showPlaylist, setShowPlaylist] = useRecoilState(showPlaylistState)



  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

    return (
      <nav className={styles.navigation} style={{right: isOpen ? '0%' : '-50%'}}>
        <div className={styles.navigation_top}>
          <p>{session?.user.name}</p>
          <button onClick={() => signOut()}>
            Log Out
          <div className={styles.navigation_avatar}>
            <Image width="100%" height="100%" src={session?.user.image} alt="avatar user" />
          </div>  
          </button>
        </div>
        <div className={styles.sections_menu}>
          My Playlists
        </div>
        <ul className={styles.navigation_items}>
          {playlists.map(playlist => (
            <li key={playlist.id}>
              <button 
              onClick={() => {
                setPlaylistId(playlist.id)
                setIsShowMenu(!isShowMenu)
                !showPlaylist && setShowPlaylist(!showPlaylist)
              }}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
}