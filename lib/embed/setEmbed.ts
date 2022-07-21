import { Embed } from '../types';
import { redis } from '../redis';

export const setEmbed = async (embed: Embed) => {
    const { key, type, ...data } = embed;
    await redis.hset(`${type}:${key}`, JSON.parse(JSON.stringify(data)));
    return embed;
};
