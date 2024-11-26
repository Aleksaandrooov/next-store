import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('filter') || '';

  const modelProduct = await prisma.category.findMany({
    where: {
      id: Number(category),
    },
    include: {
      memory: true,
      model: true,
      diagonal: true,
      memoryOp: true,
      size: true,
      color: true,
      procesor: true,
    },
  });

  return NextResponse.json(modelProduct);
}
