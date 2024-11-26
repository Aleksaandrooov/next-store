import { PaymentCallbackData } from '@/app/services/dto/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    const isSuccess = body.object.status == 'succeeded';

    await prisma.order.update({
      where: {
        id: order?.id,
      },
      data: {
        status: isSuccess ? 'success' : 'rejected',
      },
    });
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
  }
}
