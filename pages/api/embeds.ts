import { NextRequest } from 'next/server';
import { redis } from '../../lib/redis';

export const config = {
    runtime: 'edge',
};

interface EmbedData {
    target: string;
    title?: string;
    description?: string;
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token || token !== process.env.API_TOKEN) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const embeds: Array<{
            key: string;
            target: string;
            title?: string;
            description?: string;
        }> = [];

        // Use keys command to get all embed keys
        const allKeys = await redis.keys('embed:*');

        for (const redisKey of allKeys) {
            const data = await redis.hgetall(redisKey) as EmbedData | null;
            if (data) {
                const key = redisKey.replace('embed:', '');
                embeds.push({
                    key,
                    target: data.target,
                    title: data.title,
                    description: data.description,
                });
            }
        }

        return new Response(JSON.stringify(embeds), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Internal server error', { status: 500 });
    }
}
