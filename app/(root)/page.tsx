import { Poster } from '@/components/shared/Home/Poster';
import { ProductsVariant } from '@/components/shared/Home/ProductsVariant';
import { Reklama } from '@/components/shared/Home/reklama';

export default async function Home() {
  return (
    <div className="flex flex-col bg-slate-100 pb-16 max-md:pb-10">
      <Reklama />
      <ProductsVariant />
      <Poster />
    </div>
  );
}
