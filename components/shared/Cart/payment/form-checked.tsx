'use client';

import { Checkbox } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Store, Truck } from 'lucide-react';
import React from 'react';
import { FormInput } from '../../modals/forms/formInpit/formInput';
import { cn } from '@/lib/utils';
import { dataTime } from './dataMasiv';

interface Props {
  className?: string;
  isOpen: (change: boolean) => void;
  inChange: boolean;
  isSetting: (change: boolean) => void;
  activeData: number;
  activeTime: number;
}

export const FormChecked: React.FC<Props> = ({
  className,
  isOpen,
  inChange,
  isSetting,
  activeData,
  activeTime,
}) => {
  const onChange = () => {
    isOpen(true);
    isSetting(false);
  };

  return (
    <div className={className}>
      <div className="flex gap-1 text-xl max-xl:text-lg flex-wrap">
        Оформление заказа в<div className="text-green-800">Санкт-Петербурге и ЛО</div>
      </div>
      <div className="">
        <div className="flex mt-8 gap-5 max-md:gap-2 max-sm:grid-cols-2 max-sm:grid">
          <FormInput
            name="number"
            className="w-[240px] h-14 text-base max-sm:w-full"
            placeholder="Телефон"
          />
          <FormInput
            name="name"
            className="w-[230px] max-sm:w-full h-14 text-base"
            placeholder="Имя"
          />
          <FormInput
            name="mail"
            className="w-[240px] h-14 text-base max-sm:w-full col-span-2"
            placeholder="E-mail"
          />
        </div>
      </div>
      <div className="mt-10 text-xl font-semibold">Способ получения</div>
      <div className="flex gap-5 mt-2 flex-wrap max-md:gap-3 max-md:mt-4">
        <div
          onClick={() => onChange()}
          className={cn(
            'border cursor-pointer border-gray-200 max-sm:w-full flex-col flex min-w-[200px] justify-between px-3 py-3 h-[100px] transition-all rounded-md shadow-lg hover:scale-[1.02]',
            inChange ? 'border-black' : '',
          )}>
          <div className="flex justify-between items-top gap-5">
            <div className="">
              Доставка {inChange ? dataTime()[activeData].dataName : dataTime()[0].dataName}
              {inChange && (
                <div className="text-sm text-gray-400">
                  {dataTime()[activeData].time[activeTime].dataName}
                </div>
              )}
            </div>
            <Truck size={28} strokeWidth={1} />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-green-800">{inChange ? 'Изменить' : 'Выбрать'}</div>
            <div className="text-sm text-gray-400">Бесплатно</div>
          </div>
        </div>
        <div className="border cursor-no-drop bg-gray-300 max-sm:w-full opacity-50 border-gray-200 min-w-[250px] flex flex-col justify-between px-3 py-3 h-[100px] transition-all rounded-md shadow-lg">
          <div className="flex justify-between items-center gap-5">
            <div className="">В магазине в любое время</div>
            <Store size={26} strokeWidth={1} />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-green-800">Выбрать</div>
            <div className="text-sm text-gray-400">Бесплатно</div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-xl font-semibold">Способ оплаты</div>
      <div className="mt-3 flex gap-4">
        <Button className="px-7 text-white" type="button">
          Онлайн-оплата
        </Button>
        <Button disabled={true} className="px-7 bg-gray-100 text-black hover:text-white">
          При получении
        </Button>
      </div>
      <div className="border-t w-full mt-5">
        <div className="flex items-center gap-3 mt-5">
          <Checkbox id="11" />
          <label htmlFor="11">Перезвоните мне для подтверждения заказа</label>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Checkbox defaultChecked={true} id="21" />
          <label htmlFor="21">Я соглашаюсь с условиями оферты и политикой конфиденциальности</label>
        </div>
      </div>
    </div>
  );
};
