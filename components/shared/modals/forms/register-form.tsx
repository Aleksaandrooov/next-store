'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from './formInpit/formInput';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/app/updateUserInfo';
import { signIn } from 'next-auth/react';

interface Props {
  onClose: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      onClose();
      await signIn('credentials', {
        ...data,
        redirect: false,
      });

      toast.success('Вы успешно зарегистрировались 📝.');
    } catch {
      return toast.error('Неверный E-Mail или пароль');
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base shadow-xl"
          type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};