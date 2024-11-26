import { z } from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите коректную почту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password == data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const formCheckout = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать не менее 2-ух символов' }),
  mail: z.string().email({ message: 'Введите коректную почту' }),
  number: z.string().min(10, { message: 'Введите коректный телефон' }),
});

export const formDostavka = z.object({
  adres: z.string().min(6, { message: 'Введите коректный адрес' }),
  pod: z.string().min(1, { message: 'Заполните поле' }),
  heig: z.string().min(1, { message: 'Заполните поле' }),
  cv: z.string().min(1, { message: 'Заполните поле' }),
  comment: z.string().optional(),
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormCheckoutValues = z.infer<typeof formCheckout>;
export type TFormDostavka = z.infer<typeof formDostavka>;
