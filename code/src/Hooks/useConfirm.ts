/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Modal } from 'antd';

const { confirm } = Modal;

export function useConfirm(
  title: string,
  content = '',
  onOk: () => any,
  onCancel: () => any = () => null
) {
  function showConfirm() {
    confirm({
      title,
      content,
      onOk,
      onCancel,
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      okButtonProps: {
        style: {
          background: 'var(--primary-color)',
          border: 'none'
        }
        // disabled: true,
      }
    });
  }

  return showConfirm;
}
