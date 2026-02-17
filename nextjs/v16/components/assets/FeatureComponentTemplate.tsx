'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ItemCardProps = {
  title: string;
  description?: string;
  onOpen?: () => void;
};

export function ItemCard({ title, description, onOpen }: ItemCardProps) {
  return (
    <Card className={cn('p-4 space-y-3')}>
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      <Button type="button" onClick={onOpen}>Open</Button>
    </Card>
  );
}
