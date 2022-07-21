import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { aquaConfig } from '../aqua.config';

const Home: NextPage = () => (
    <div className={styles.container}>
        <Head>
            <title>
                {`${aquaConfig.appName} by ${aquaConfig.orgName}`}
            </title>
            <meta name="description" content={`${aquaConfig.appName} by ${aquaConfig.orgName}`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
);

export default Home;
