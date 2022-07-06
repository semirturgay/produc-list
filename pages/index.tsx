import type {NextPage} from 'next'
import Head from 'next/head'
import {useSession, signIn} from "next-auth/react"

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const {data: session} = useSession()

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Manage product list"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h6 className={styles.title}>
                    Welcome to dashboard
                </h6>
                {!session ? <button className={styles.loginWithGoogleBtn}
                                    onClick={() => signIn('google', {callbackUrl: `${window.location.origin}/dashboard/products`})}>Sign
                    in</button> : null}
            </main>
        </div>
    )
}

export default Home
