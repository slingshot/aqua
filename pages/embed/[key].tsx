import {
    GetStaticPaths, GetStaticProps, NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { getPage } from '../../lib/getPage';
import { AquaTypes, Embed } from '../../lib/types';
import { aquaConfig } from '../../aqua.config';
import { redis } from '../../lib/redis';

interface EmbedPageParams extends ParsedUrlQuery {
    key: string
}

const EmbedPage: NextPage<{ embed: Embed }> = ({ embed }) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            {/* Primary Meta Tags */}
            <title>{embed?.title || `${aquaConfig.appName} by ${aquaConfig.orgName}`}</title>
            <meta name="title" content={embed?.title || `${aquaConfig.appName} by ${aquaConfig.orgName}`} />
            <meta
                name="description"
                content={embed?.description || `${aquaConfig.orgName} is sharing a page with you`}
            />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={embed.target} />
            <meta property="og:title" content={embed?.title || `${aquaConfig.appName} by ${aquaConfig.orgName}`} />
            <meta
                property="og:description"
                content={embed?.description || `${aquaConfig.orgName} is sharing a page with you`}
            />
            <meta property="og:image" content={aquaConfig.defaultCoverURL} />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={embed.target} />
            <meta property="twitter:title" content={embed?.title || `${aquaConfig.appName} by ${aquaConfig.orgName}`} />
            <meta
                property="twitter:description"
                content={embed?.description || `${aquaConfig.orgName} is sharing a page with you`}
            />
            <meta property="twitter:image" content={aquaConfig.defaultCoverURL} />
        </Head>
        <div
            style={{
                margin: 0,
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <iframe
                width="100%"
                height="100%"
                allow="camera; microphone; autoplay; encrypted-media;"
                title={embed?.title || `${aquaConfig.appName} by ${aquaConfig.orgName}`}
                src={embed.target}
                style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    top: '0',
                    border: '0',
                }}
            />
        </div>
    </>
);

export default EmbedPage;

export const getStaticProps: GetStaticProps = async (context) => {
    const { key } = context.params as EmbedPageParams;
    const pageData = await getPage<Embed>(AquaTypes.Embed, key);
    if (!pageData) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            embed: pageData,
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: (await redis.keys('embed:*')).map((key) => ({
        params: {
            key: key.split(':')[1],
        },
    })),
    fallback: 'blocking',
});
