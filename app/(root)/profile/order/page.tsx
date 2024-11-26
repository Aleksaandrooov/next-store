import { Container } from '@/components/shared/container';
import { getUserSession } from '@/components/shared/lib/get-user-session';
import { OrderItems } from '@/components/shared/profille/order';
import { ProfileCheckout } from '@/components/shared/profille/profile-checkout';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function order() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.email || '',
    },
  });

  if (!user) {
    return redirect('/');
  }

  const orderItem = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updateAt: 'desc',
    },
  });

  return (
    <Container className="my-10 max-lg:px-0">
      <div className="text-4xl mb-12 mx-20">Мои заказы</div>
      <div className="flex gap-28 mx-10 max-lg:mx-2">
        <ProfileCheckout id={2} />
        <div className="flex flex-col gap-5 w-[800px] max-md:min-w-[200px] max-xl:mx-auto">
          {orderItem?.map((obj) => (
            <OrderItems key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </Container>
  );
}
