import React from 'react';

interface Props {
  code: string;
}

export const VerificationUser: React.FC<Props> = ({ code }) => {
  return (
    <div className="div">
      <p>
        Код подстверждения: <h2>${code}</h2>
      </p>

      <p>
        <a href="https://localhost:3000/api/auth/verify?code=${code}">Подтвердить регистрацию</a>
      </p>
    </div>
  );
};
