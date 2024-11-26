import { deleteOrder } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/modal';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: () => void;
  id: number;
}

export const DeleteModal: React.FC<Props> = ({ id, onOpenChange, open }) => {
  const [loading, setLoading] = useState(false);
  const deleteOr = (id: number) => {
    setLoading(true);
    deleteOrder(id).then(() => {
      onOpenChange();
      redirect('/profile/order');
    });
  };
  return (
    <Modal placement="center" isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent className="px-5 py-4">
        <ModalHeader className="border-b">Удалить</ModalHeader>
        <div className="py-5 px-6">Вы точно хотите удалить свой заказ?</div>
        <div className="flex gap-2 justify-end">
          <Button loading={loading} onClick={() => deleteOr(id)} className="w-24" variant="outline">
            Удалить
          </Button>
          <Button onClick={() => onOpenChange()} className=" text-white">
            Назад
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
