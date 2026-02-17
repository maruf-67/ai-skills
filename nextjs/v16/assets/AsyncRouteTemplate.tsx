import { Metadata } from 'next';
import { featureService } from '@/services/feature.service';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ query?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const item = await featureService.getBySlug(slug);

    if (!item) return { title: 'Not Found' };

    return {
        title: item.title,
        description: item.description,
    };
}

export default async function Page({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { query } = await searchParams;
    const item = await featureService.getBySlug(slug);

    if (!item) {
        notFound();
    }

    return (
        <main className="container py-10">
            <h1 className="text-4xl font-bold">{item.title}</h1>
            {query && <p>Search query: {query}</p>}
            <div className="mt-6 prose prose-slate dark:prose-invert">
                {item.content}
            </div>
        </main>
    );
}
