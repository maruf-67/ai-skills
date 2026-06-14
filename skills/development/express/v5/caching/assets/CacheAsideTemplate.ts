import { getCachedOrFetch, generateCacheKey } from '../../../common/utils/optionalCache.js';

export const getCachedEntity = async <T>(
    scope: string,
    id: string,
    loader: () => Promise<T>,
): Promise<T> => {
    return getCachedOrFetch(
        generateCacheKey(scope, id),
        loader,
        { ttl: 600 },
    );
};
