import { cn } from '@/lib/utils';
import { prisma } from '@/prisma/prisma-client';
import { CategoriesItems } from './lib/categories-items';

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = async ({ className }) => {
  const data = await prisma.category.findMany({
    include: {
      model: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div
      className={cn(
        'ml-3 inline-flex flex-wrap categories border-l pl-2 max-xl:hidden 2xl:ml-6 2xl:pl-6',
        className,
      )}>
      {data.map((obj) => (
        <CategoriesItems key={obj.id} {...obj} />
      ))}
    </div>
  );
};
