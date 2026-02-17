import { cn, cardClasses, headingClasses } from '@/lib/utils';

type SectionCardProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionCard({ title, className, children }: SectionCardProps) {
  return (
    <section className={cn(cardClasses, 'p-4 space-y-3', className)}>
      <h2 className={cn(headingClasses.h3)}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
