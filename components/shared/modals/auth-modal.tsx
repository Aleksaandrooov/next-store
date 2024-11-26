import { Modal, ModalBody, ModalContent, Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type == 'login' ? 'register' : 'login');
  };
  return (
    <>
      <Modal shadow="lg" placement="center" isOpen={open} onOpenChange={onOpenChange}>
        <ModalContent className="px-5 py-4">
          {() => (
            <>
              <ModalBody className="flex flex-col gap-3">
                {/* <Input
                  placeholder="Email"
                  className="bg-slate-100 h-10 px-4 focus:bg-inherit rounded-sm text-base border-none"></Input> */}

                {type == 'login' ? (
                  <LoginForm onClose={onOpenChange} />
                ) : (
                  <RegisterForm onClose={onOpenChange} />
                )}
                <Button
                  variant="shadow"
                  onClick={() => signIn('yandex', { redirect: true })}
                  className="bg-gray-700 h-12 text-white text-base">
                  <div className="bg-red-600 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="white"
                      width="26px"
                      height="26px">
                      <path d="M 20.800781 1 L 15.199219 17.199219 L 10.199219 4 L 7 4 L 14 22.599609 L 14 31 L 17 31 L 17 21.099609 L 24 1 L 20.800781 1 z" />
                    </svg>
                  </div>
                  Войти через Яндекс
                </Button>
                <Button
                  variant="shadow"
                  onClick={() => onSwitchType()}
                  type="button"
                  className="h-12 bg-slate-100 text-base text-black">
                  {type == 'login' ? 'Регистрация' : 'Авторизация'}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
