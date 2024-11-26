import React from 'react';
import { Dostavka } from './dostavka';
import { FormInput } from '../../modals/forms/formInpit/formInput';
import { TextArea } from './text-area';
import { dataTime } from './dataMasiv';

interface Props {
  className?: string;
  activeTime: number;
  activeData: number;
  setActiveData: (i: number) => void;
  setActiveTime: (i: number) => void;
}

export const PaymentModal: React.FC<Props> = ({
  setActiveTime,
  activeData,
  activeTime,
  setActiveData,
}) => {
  return (
    <>
      <div className=" mb-5 mt-1 text-2xl">Способ получения</div>
      <div className="flex gap-3 max-md:grid max-md:grid-cols-3">
        <FormInput
          name="adres"
          className="text-base rounded-sm flex-1 max-md:col-span-3 placeholder:text-center"
          placeholder="Введите адрес..."
        />
        <FormInput
          name="pod"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Подъезд"
        />
        <FormInput
          name="heig"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Этаж"
        />
        <FormInput
          name="cv"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Квартира"
        />
      </div>
      <TextArea
        name="comment"
        className="text-base py-3 px-3 placeholder:text-gray-500 rounded-sm min-h-20 mt-5 h-28"
        placeholder="Комментарий курьеру"
      />
      <div className="flex gap-4 mt-5 overflow-x-auto scroll-m-0 scroll">
        {dataTime().map((obj, i) => (
          <Dostavka
            key={i}
            {...obj}
            index={i}
            active={activeData}
            setActiveIndex={(i) => setActiveData(i)}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-4 overflow-x-auto scroll">
        {dataTime()[activeData].time.map((obj, i) => (
          <Dostavka
            {...obj}
            key={i}
            index={obj.id}
            className="flex-1 text-center"
            active={activeTime}
            setActiveIndex={(i) => setActiveTime(i)}
          />
        ))}
      </div>
    </>
  );
};
