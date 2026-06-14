'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button, Input, RichTextEditor } from '@/components/ui';
import { featureService } from '@/services/feature.service';

const FormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormValues = z.infer<typeof FormSchema>;

export function FeatureForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            if (initialData?.id) {
                await featureService.update(initialData.id, data);
            } else {
                await featureService.create(data);
            }
            router.push('/dashboard/features');
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Name"
                {...register('name')}
                error={errors.name?.message}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                    )}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" isLoading={isSubmitting}>Save</Button>
            </div>
        </form>
    );
}
