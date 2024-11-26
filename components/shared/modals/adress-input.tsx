'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      hintText="Ваш адресс"
      token="b68c2fe32f6f68912cf70c8a7a5ddce2dca6a02a"
      onChange={(data) => onChange!(data!.value)}
    />
  );
};
