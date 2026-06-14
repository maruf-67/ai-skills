import { api, unwrapResponse } from '@/lib/api';
import type { ApiResponse } from '@/types';

type QueryParams = {
    page?: number;
    limit?: number;
    search?: string;
};

type Entity = {
    _id: string;
    name: string;
};

type EntityListPayload = {
    items: Entity[];
    total: number;
};

export async function getEntities(params: QueryParams): Promise<EntityListPayload> {
    const response = await api.get<ApiResponse<EntityListPayload>>('/entities', { params });
    return unwrapResponse(response.data, 'Failed to fetch entities');
}
