import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import Player from '../components/Player'
import Playlist from '../components/Playlists'
import styles from '../styles/app.module.css'

export default function Home() {

  return (
      <div className={styles.page}>
      <Head>
        <title>Music Player with Spotify</title>
        <meta name="description" content="Music Player with Spotify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Player />
      <Playlist />

      </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}
