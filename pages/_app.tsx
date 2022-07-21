/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { aquaConfig } from '../aqua.config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>{`${aquaConfig.appName} by ${aquaConfig.orgName}`}</title>
                <link rel="apple-touch-icon" sizes="57x57" href="/logos/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/logos/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/logos/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/logos/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/logos/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/logos/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/logos/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/logos/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/logos/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/logos/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/logos/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/logos/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/logos/favicon-16x16.png" />
                <link rel="manifest" href="/logos/manifest.json" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="msapplication-TileImage" content="/logos/ms-icon-144x144.png" />
                <meta name="theme-color" content="#000000" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
