import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      Memory: true,
      MemoryOp: true,
      Size: true,
      Color: true,
      Diagonal: true,
      Img: true,
    },
    take: 6,
  });

  return NextResponse.json(products);
}
