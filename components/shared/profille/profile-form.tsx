'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from '../modals/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from '../container';
import { Title } from '../../ui/title';
import { FormInput } from '../modals/forms/formInpit/formInput';
import { Button } from '../../ui/button';
import { updateUserInfo } from '@/app/updateUserInfo';
import { ProfileCheckout } from './profile-checkout';
import { LogOut } from 'lucide-react';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Данные обовлены');
    } catch (error) {
      console.log(error);

      toast.success('Ошибка при обовлении данных');
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });

    document.cookie = 'cartToken=; Max-Age=0; path=/;';
    document.cookie = 'favoritesToken=; Max-Age=0; path=/;';
  };

  return (
    <Container className="my-10">
      <div className="text-4xl mb-12 mx-20 max-xl:hidden">Личный кабинет</div>
      <div className="flex gap-28 mx-10 max-xl:justify-center">
        <ProfileCheckout id={0} />
        <div className="">
          <Title
            text={`Ваш профиль | #${data.fullName}`}
            size="md"
            className="font-bold max-xl:text-xl max-xl:text-center"
          />

          <FormProvider {...form}>
            <form
              className="flex flex-col gap-4 w-96 mt-10 max-xl:mt-8"
              onSubmit={form.handleSubmit(onSubmit)}>
              <div className="font-medium max-xl:mx-4">Почта</div>
              <input
                name="email"
                placeholder={data.email}
                className="h-12 border px-2 rounded-md max-xl:mx-4"
                required
                disabled
              />
              <FormInput name="fullName" className="max-xl:mx-4" label="Имя" required />

              <FormInput
                type="password"
                placeholder="Изменить пароль"
                name="password"
                label="Новый пароль"
                required
                className="max-xl:mx-4"
              />
              <FormInput
                type="password"
                className="max-xl:mx-4"
                name="confirmPassword"
                label="Повторите пароль"
                required
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="text-base mt-4 h-10"
                type="submit">
                Сохранить
              </Button>

              <Button
                onClick={onClickSignOut}
                variant="secondary"
                disabled={form.formState.isSubmitting}
                className="text-base bg-red-800 h-10"
                type="button">
                <LogOut />
                Выйти
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};
