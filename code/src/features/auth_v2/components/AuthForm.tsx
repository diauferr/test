import React, { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
  disabled: boolean;
  onSubmit: () => any;
}

export const AuthForm: React.FC<IProps> = ({
  title,
  children,
  disabled,
  onSubmit
}) => (
  <form
    {...{
      className: 'auth-form',
      onSubmit: (evt) => {
        evt.preventDefault();

        if (disabled) {
          return;
        }

        onSubmit();
      }
    }}>
    <fieldset
      {...{
        disabled
      }}>
      <div className="logo">
        <img
          src="/assets/images/logo-email.png"
          alt="Fórum Conhecimento Jurídico"
        />
      </div>

      <h3 style={{ textAlign: 'center' }}>{title}</h3>

      {children}
    </fieldset>
  </form>
);
