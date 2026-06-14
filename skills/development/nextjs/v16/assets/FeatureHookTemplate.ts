'use client';

import { useState, useCallback } from 'react';
import { featureService } from '@/services/feature.service';
import type { Feature, CreateFeatureInput } from './types';

export function useFeature() {
    const [items, setItems] = useState<Feature[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async (page: number = 1, limit: number = 10, filters?: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await featureService.getAll(page, limit, filters);
            setItems(response.items);
            setTotal(response.total);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch items');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createItem = async (data: CreateFeatureInput) => {
        setIsLoading(true);
        try {
            const newItem = await featureService.create(data);
            return newItem;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create item');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        items,
        total,
        isLoading,
        error,
        fetchItems,
        createItem,
    };
}
