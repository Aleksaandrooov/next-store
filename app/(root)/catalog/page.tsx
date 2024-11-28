import { PageProps } from '@/.next/types/app/layout';
import { Container } from '@/components/shared/container';
import { Filter } from '@/components/shared/filter';
import { getProducts } from '@/components/shared/lib/getProducts';
import { ProductCart } from '@/components/shared/productCart';
import { SortPopup } from '@/components/shared/sortPopup';
import { Title } from '@/components/ui/title';
import { prisma } from '@/prisma/prisma-client';

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryId = params.category || 1;
  const allProducts = await getProducts(params);
  const titleFetch = await prisma.category.findFirst({
    where: {
      id: Number(params.category) || 1,
    },
    include: {
      model: true,
    },
  });
  const modelId = params.modelType ? params.modelType.split(',').map(Number) : [];

  const modelFetch = await prisma.model.findMany({
    where: {
      id: {
        in: modelId,
      },
    },
  });

  const filterFetch = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
    include: {
      model: true,
      memory: true,
      memoryOp: true,
      size: true,
      color: true,
      procesor: true,
      diagonal: true,
    },
  });

  return (
    <>
      <div className="mt-5 bg-white py-5 max-xl:py-2 max-xl:mt-0 shadow-lg shadow-black/5 relative">
        <Container className="flex justify-between max-sm:justify-between items-center h-12">
          <div className="flex items-center font-semibold">
            <Title
              size="md"
              text="Каталог"
              className="border-r-2 border-gray-500 pr-4 max-xl:text-xl max-md:text-lg max-sm:hidden"></Title>
            <div className="flex pl-4 overflow-x-hidden max-lg:hidden">
              {!modelFetch.length && (
                <Title
                  text={titleFetch!.name}
                  size="md"
                  className="max-xl:text-xl max-md:text-lg"
                />
              )}
              {modelFetch
                ?.filter((_, i) => i < 4)
                .map((obj, i) => (
                  <div
                    key={obj.id}
                    className="text-[26px] text-nowrap max-xl:text-xl max-md:text-lg">
                    {i == 0 ? '' : ', '}
                    {obj.name}
                  </div>
                ))}
            </div>
            <div className="max-lg:block hidden max-sm:mt-[2px] ml-4 max-sm:ml-20 text-lg max-md:text-base">
              {titleFetch!.name}
            </div>
          </div>
          <SortPopup />
        </Container>
      </div>
      <Container className="max-w-[2000px] pr-0 max-sm:pl-0">
        <div className="flex h-full">
          <Filter {...filterFetch} />
          <div className="flex-1 pb-12 pt-6">
            <div className="flex flex-wrap max-xl:px-5 max-sm:px-0 max-xl:mx-auto max-w-[1400px] mx-auto max-xl:max-w-[950px] max-lg:max-w-[790px] max-[840px]:max-w-[540px] max-[590px]:max-w-[340px]">
              {allProducts.map((obj) => (
                <ProductCart key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
