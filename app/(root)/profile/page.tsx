import { getUserSession } from '@/components/shared/lib/get-user-session';
import { ProfileForm } from '@/components/shared/profille/profile-form';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
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

  return (
    <div className="">
      <ProfileForm data={user} />
    </div>
  );
}
