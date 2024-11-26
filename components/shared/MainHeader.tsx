'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Container } from './container';
import { ProfileButton } from './lib/profile-button';
import { AuthModal } from './modals/auth-modal';
import { Navigation } from 'lucide-react';

interface Props {
  className?: string;
}

export const MainHeader: React.FC<Props> = ({ className }) => {
  const [open, isOpen] = useState(false);

  return (
    <div className={cn('bg-black', className)}>
      <Container className="flex text-white justify-between items-center h-8">
        <div className="flex gap-2 group cursor-pointer items-center">
          <Navigation size={14} className="transition fill-black group-hover:fill-white" />
          <div className="text-sm">Санкт-Петербург и ЛО</div>
        </div>
        <div className="">
          <ProfileButton onClickSignIn={() => isOpen((prev) => !prev)} />
          <AuthModal open={open} onOpenChange={() => isOpen((prev) => !prev)} />
        </div>
      </Container>
    </div>
  );
};
