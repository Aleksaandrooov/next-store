'use client';
import React, { useState } from 'react';
import { ProfileButton } from './lib/profile-button';
import { AuthModal } from './modals/auth-modal';

interface Props {
  className?: string;
}

export const MobileProfile: React.FC<Props> = ({}) => {
  const [open, isOpen] = useState(false);
  return (
    <>
      <ProfileButton onClickSignIn={() => isOpen((prev) => !prev)} />
      <AuthModal open={open} onOpenChange={() => isOpen((prev) => !prev)} />
    </>
  );
};
