import type { NextPage } from 'next';
import Head from 'next/head';
import { aquaConfig } from '../aqua.config';

const Home: NextPage = () => (
    <div className="p-8">
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
