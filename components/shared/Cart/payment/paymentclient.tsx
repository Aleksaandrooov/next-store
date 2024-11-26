'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  formCheckout,
  formDostavka,
  TFormCheckoutValues,
  TFormDostavka,
} from '../../modals/forms/schemas';
import { FormChecked } from './form-checked';
import { Pay } from './pay';
import { PaymentModal } from './payment-modal';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent } from '@nextui-org/modal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { createOrder } from '@/app/actions';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { removeAllItemCart } from '@/app/redux/CartSlice/slice';
import toast from 'react-hot-toast';
import { dataTime } from './dataMasiv';

export const PaymentClient = ({ email }: User) => {
  const { totalItems, totalAmount, totalCount } = useSelector((state: RootState) => state.cart);
  const [open, isOpen] = useState(false);
  const [inChange, setInChange] = useState(false);
  const [loading, isLoading] = useState(false);
  const [activeData, setActiveData] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const dispatch = useAppDispatch();
  const [dostavka, setDostavre] = useState<TFormDostavka>({
    adres: '',
    pod: '',
    heig: '',
    cv: '',
  });

  const form = useForm<TFormCheckoutValues>({
    resolver: zodResolver(formCheckout),
    defaultValues: {
      mail: '',
      name: '',
      number: '',
    },
  });
  const formData = useForm<TFormDostavka>({
    resolver: zodResolver(formDostavka),
    defaultValues: {
      adres: '',
      pod: '',
      heig: '',
      cv: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (!totalItems.length) {
      return redirect('/cart');
    }
    return;
  }, []);

  const onSubmitData = (data: TFormDostavka) => {
    setInChange(true);
    isOpen(false);
    setDostavre(data);
  };

  const onSubmit = async (item: TFormCheckoutValues) => {
    if (inChange) {
      try {
        const { name, number, mail } = item;
        const { adres, pod, heig, cv, comment } = dostavka;
        const NameData = dataTime()[activeData].dataName;
        const NameTime = dataTime()[activeData].time[activeTime].dataName;
        const set = new Set<number>(totalItems.map((obj) => obj.id));
        const data = {
          name,
          number,
          mail,
          adres,
          pod,
          heig,
          cv,
          comment,
          items: totalItems,
          email,
          totalAmount,
          NameData,
          NameTime,
        };

        const url = await createOrder(data);
        dispatch(removeAllItemCart(set));
        isLoading(true);

        if (url) {
          location.href = url;
        }
      } catch {}
    } else {
      toast.error('Выберите способ получения');
    }
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between max-xl:flex-col md:items-center">
            <FormChecked
              isOpen={(change) => isOpen(change)}
              isSetting={(boolean) => setInChange(boolean)}
              inChange={inChange}
              activeData={activeData}
              activeTime={activeTime}
            />
            <Pay
              loading={loading}
              totalItems={totalItems}
              totalAmount={totalAmount}
              totalCount={totalCount}
            />
          </div>
        </form>
      </FormProvider>
      <Modal
        placement="center"
        size="4xl"
        isOpen={open}
        onOpenChange={() => isOpen((prev) => !prev)}>
        <ModalContent className="px-5 py-4">
          <FormProvider {...formData}>
            <form onSubmit={formData.handleSubmit(onSubmitData)}>
              <PaymentModal
                setActiveData={(i) => setActiveData(i)}
                setActiveTime={(i) => setActiveTime(i)}
                activeTime={activeTime}
                activeData={activeData}
              />
              <div className="w-full text-center">
                <Button type="submit" className="w-[150px] text-base mt-4">
                  Подтвердить
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </div>
  );
};
