import { PaymentClient } from '@/components/shared/Cart/payment/paymentclient';
import { Container } from '@/components/shared/container';
import { getUserSession } from '@/components/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

export default async function payment() {
  const session = await getUserSession();

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session!.email!,
    },
  });

  if (!user) {
    redirect('/');
  }

  return (
    <Container className="mt-10 max-xl:px-3">
      <PaymentClient {...user} />
    </Container>
  );
}
