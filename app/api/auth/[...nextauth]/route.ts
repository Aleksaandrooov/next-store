import NextAuth from 'next-auth';
import { authOptions } from '@/components/shared/lib/AuthOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
