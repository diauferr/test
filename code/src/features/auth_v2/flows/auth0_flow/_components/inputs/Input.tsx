import React from 'react';

interface IProps {
  value: string;
  on_change: (value: string) => any;
  is_valid: boolean;
  label: string;
  id: string;
  error_msg: string;
  type?: 'email' | 'text' | 'password';
}

export const Input: React.FC<IProps> = ({
  value,
  on_change,
  is_valid,
  label,
  id,
  error_msg,
  type = 'text'
}) => (
  <>
    <label {...{ htmlFor: id }}>{label}</label>
    <input
      {...{
        id,
        value,
        type,
        'aria-required': true,
        'aria-invalid': !is_valid,
        onChange: (evt) => {
          on_change(evt.target.value);
        },
        style: {}
      }}
    />

    {!is_valid && (
      <span
        {...{
          role: 'alert'
        }}>
        {error_msg}
      </span>
    )}

    <div className="" style={{ marginBottom: 16 }}></div>
  </>
);
