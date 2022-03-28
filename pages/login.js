import Image from 'next/image'
import styles from '../styles/login.module.css'
import logoSpotify from '../public/images/logo-spotify.png'

import {getProviders, signIn} from 'next-auth/react'

export default function Login ({ providers }) {
  return  (
    <div className={styles.page}>
      <div className={styles.container_login}>
        <div className={styles.logo_spotify}>
          <Image src={logoSpotify} alt="logo spotify"/>
        </div>
        
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button className={styles.button_login} onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Login With {provider.name}
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}