import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState, showPlaylistState } from '../atoms/playlistAtom'

import styles from '../styles/playlist.module.css'
import Song from './Song'

export default function Playlist ( ) {

  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const showPlaylist = useRecoilValue(showPlaylistState)

  return (
    <div className={styles.container_playlist} style={{width: showPlaylist ? '300px' : '0'}}>
        <header className={styles.info_playlist}>
        {playlist?.images.length > 0 && (
          <Image src={playlist?.images?.[0]?.url} width="100%" height="100%" alt="name Playlist" className={styles.info_image} />
        )}
          <div className={styles.info_name}>
            PLAYLIST
            <p>{playlist?.name}</p>
          </div>
        </header>

        <ul className={styles.playlist_items}>
          {
             playlist?.tracks.items.map((track) => {
               return <Song key={track?.track.id} track={track} />
             })
          }
        </ul>

    </div>
  )
}