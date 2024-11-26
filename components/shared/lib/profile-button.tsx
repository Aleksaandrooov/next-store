import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { ProfileMobile } from '../ProfileMobile';

interface Props {
  className?: string;
  onClickSignIn: () => void;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <div
          onClick={() => onClickSignIn()}
          className="flex items-center gap-2 text-sm cursor-pointer max-xl:gap-0 max-sm:text-xs max-xl:flex-col">
          <User size={16} className="size-5 max-sm:size-4" />
          Войти
        </div>
      ) : (
        <>
          <Link href="/profile" className="max-xl:hidden">
            <div className="flex items-center gap-2 text-sm cursor-pointer max-xl:flex-col max-xl:gap-0 max-sm:text-xs">
              <CircleUser className="size-5 max-sm:size-4" size={16} />
              Личный кабинет
            </div>
          </Link>
          <div className="xl:hidden">
            <ProfileMobile />
          </div>
        </>
      )}
    </div>
  );
};
