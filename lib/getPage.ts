import { redis } from './redis';
import { AquaPage } from './types';

export const getPage = async <T extends AquaPage>(type: string, key: string): Promise<T | null> => {
    const data = await redis.hgetall(`${type}:${key}`);
    if (!data) {
        return null;
    }

    const dataWithKey = { key, ...data };
    return dataWithKey as T;
};
