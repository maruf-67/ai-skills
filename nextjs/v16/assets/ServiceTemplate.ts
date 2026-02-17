import { api, unwrapResponse } from '@/lib/api';
import type { ApiResponse, PaginatedResponse } from '@/types';

// In-flight request deduplication cache
const requestCache = new Map<string, Promise<PaginatedResponse<unknown>>>();

type QueryFilters = Record<string, string | number | boolean | undefined>;

interface BaseEntity {
    id: string;
}

interface ListPayload<TItem> {
    items: TItem[];
    total: number;
}

export const baseService = {
    /**
     * Get all items (paginated)
     */
    getAll: async (
        page: number = 1,
        limit: number = 10,
        filters?: QueryFilters
    ): Promise<PaginatedResponse<unknown>> => {
        const skip = Math.max(page - 1, 0) * limit;
        const params = { limit, skip, ...filters };
        const cacheKey = `items:${JSON.stringify(params)}`;

        if (requestCache.has(cacheKey)) {
            return requestCache.get(cacheKey)!;
        }

        const request = api.get<ApiResponse<ListPayload<unknown>>>('/endpoint', { params })
            .then((response) => {
                requestCache.delete(cacheKey);
                const data = response.data.data ?? { items: [], total: 0 };
                return {
                    items: data.items,
                    total: data.total,
                    limit,
                    skip,
                    hasMore: skip + limit < data.total,
                };
            })
            .catch((error) => {
                requestCache.delete(cacheKey);
                throw error;
            });

        requestCache.set(cacheKey, request);
        return request;
    },

    /**
     * Get item by ID
     */
    getById: async (id: string) => {
        const response = await api.get<ApiResponse<BaseEntity>>(`/endpoint/${id}`);
        return unwrapResponse(response.data, 'Item not found');
    },

    /**
     * Create new item
     */
    create: async <TCreate extends Record<string, unknown>, TResult extends BaseEntity>(data: TCreate) => {
        const response = await api.post<ApiResponse<TResult>>('/endpoint', data);
        return unwrapResponse(response.data, 'Failed to create item');
    },

    /**
     * Update item
     */
    update: async <TUpdate extends Record<string, unknown>, TResult extends BaseEntity>(id: string, data: TUpdate) => {
        const response = await api.put<ApiResponse<TResult>>(`/endpoint/${id}`, data);
        return unwrapResponse(response.data, 'Failed to update item');
    },

    /**
     * Delete item
     */
    delete: async (id: string) => {
        await api.delete(`/endpoint/${id}`);
    },
};
