type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResourcePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : undefined;

  return (
    <main>
      <h1 className="text-xl font-semibold">{slug}</h1>
      <pre className="text-xs">{JSON.stringify(query ?? {}, null, 2)}</pre>
    </main>
  );
}
