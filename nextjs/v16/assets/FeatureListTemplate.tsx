'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce, useModal } from '@/hooks';
import { Badge, Button, Column, ConfirmDialog, DataTable, TimeFormat } from '@/components/ui';
import { featureService } from '@/services/feature.service';

export function FeatureList() {
    const router = useRouter();
    const deleteModal = useModal();
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    const loadItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await featureService.getAll(page, perPage, { search: debouncedSearch });
            setItems(response.items);
            setTotalItems(response.total);
        } catch (err: any) {
            setError(err.message || 'Failed to load items');
        } finally {
            setIsLoading(false);
        }
    }, [page, perPage, debouncedSearch]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const handleDelete = async () => {
        if (!selectedItem) return;
        try {
            await featureService.delete(selectedItem.id);
            loadItems();
            deleteModal.close();
        } catch (err) {
            console.error(err);
        }
    };

    const columns: Column<any>[] = useMemo(() => [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            render: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'status',
            header: 'Status',
            render: (item) => <Badge variant={item.status === 'active' ? 'success' : 'secondary'}>{item.status}</Badge>,
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (item) => <TimeFormat date={item.createdAt} />,
        },
    ], []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Features</h1>
                <Button onClick={() => router.push('/dashboard/features/new')}>New Feature</Button>
            </div>

            <DataTable
                data={items}
                columns={columns}
                isLoading={isLoading}
                manualPagination
                rowCount={totalItems}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
                onSearchChange={setSearch}
                onEdit={(item) => router.push(`/dashboard/features/${item.id}/edit`)}
                onDelete={(item) => {
                    setSelectedItem(item);
                    deleteModal.open();
                }}
            />

            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleDelete}
                title="Delete Item"
                message="Are you sure you want to delete this item?"
            />
        </div>
    );
}
