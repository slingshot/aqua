import { NextRequest, NextResponse } from 'next/server';
import { getPage } from './lib/getPage';
import { aquaConfig } from './aqua.config';
import { redis } from './lib/redis';

export async function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        // Proceed to specified redirect route for root/index requests
        return NextResponse.redirect(aquaConfig.rootRedirectURL);
    }

    if (
        request.nextUrl.pathname.includes('_next/')
        || request.nextUrl.pathname.includes('logos/')
        || request.nextUrl.pathname.includes('fonts/')
        || request.nextUrl.pathname.includes('icons/')
        || request.nextUrl.pathname.includes('embed/')
        || request.nextUrl.pathname.includes('presave/')
        || request.nextUrl.pathname.includes('api/')
        || request.nextUrl.pathname.includes('admin')
    ) {
        // Proceed immediately with excepted routes
        console.log('Route exception found, serving resource');
        return NextResponse.next();
    }

    const key = request.nextUrl.pathname.split('/')[1];

    // Attempt to get page data from Redis
    const pageData = await redis.scan(0, { match: `*:${key}` });

    if (!pageData) {
        // Proceed with request if page data not found in Redis
        return NextResponse.next();
    }

    if (pageData[1].length > 0 && pageData[1][0].indexOf('embed:') === 0) {
        // Rewrite to `embed/[key]`
        return NextResponse.rewrite(`${request.nextUrl.protocol}//${request.nextUrl.host}/embed/${key}`);
    }

    // Proceed with request if no conditions tripped
    return NextResponse.next();
}
