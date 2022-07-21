import { NextRequest } from 'next/server';
import { ParsedUrlQuery } from 'querystring';
import { json } from '../../lib/stream-consumers';
import { setEmbed } from '../../lib/embed/setEmbed';

export const config = {
    runtime: 'experimental-edge',
};

export interface CreateQuery extends ParsedUrlQuery {
    token: string;
}

export interface CreateResponse {
    key: string;
}

export default async function handler(
    req: NextRequest,
) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    if (!token || token !== process.env.API_TOKEN) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (!req.body || req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const embed = await json(req.body);

    if (!(embed && embed.key && embed.type && embed.target)) {
        return new Response('Bad Request', { status: 400 });
    }

    try {
        // Good to go
        return new Response(JSON.stringify(await setEmbed(embed), null, 2), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Internal server error', { status: 500 });
    }
}
