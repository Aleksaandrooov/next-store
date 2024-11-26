'use server';

import { TFormCheckoutValues, TFormDostavka } from '@/components/shared/modals/forms/schemas';
import { prisma } from '@/prisma/prisma-client';
import { CartItemType } from './redux/CartSlice/slice';
import { createPayment } from '@/components/shared/lib/create-payment';

interface items {
  totalAmount: number;
  items: CartItemType['items'][];
  email: string;
  NameData: string;
  NameTime: string;
}

export async function createOrder(data: TFormCheckoutValues & TFormDostavka & items) {
  const token = crypto.randomUUID();

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const order = await prisma.order.create({
    data: {
      address: data.adres,
      fullName: data.name,
      email: data.mail,
      number: data.number,
      totalAmount: data.totalAmount,
      token: token,
      userId: user!.id,
      items: data.items,
      cv: data.cv,
      heig: data.heig,
      pod: data.pod,
      NameData: data.NameData,
      NameTime: data.NameTime,
    },
  });

  const paymentData = await createPayment({
    amount: data.totalAmount,
    orderId: order.id,
    description: 'Оплата заказа #' + order.id,
    token,
  });

  if (!paymentData) {
    throw new Error('Payment data not found');
  }

  const paymentUrl = paymentData.confirmation.confirmation_url;

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      paymentId: paymentData.id,
      status: 'pending',
    },
  });

  return paymentUrl;
}

export async function deleteOrder(id: number) {
  await prisma.order.delete({
    where: {
      id,
    },
  });
}
