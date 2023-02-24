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

import React, { createContext, useReducer } from 'react';
import { useAuthCtx } from '../../../../features/auth_v2/hooks/useAuthCtx';
import {
  AnnotationIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  UserManagementIcon
} from '../icons';
import { MenuReducer } from './MenuReducer';
import { MenuState } from './MenuState';

// @ts-ignore
export const MenuContext = createContext();

interface IProps {
  children: any;
}

type MenuOption = {
  iconSrc: string;
  Icon: any;
  linkTo: string;
  text: string;
};

export const MenuContextProvider = ({ children }: IProps) => {
  const { is_authenticated_with_email, is_contract_manager } = useAuthCtx();
  const [state, dispatch]: [MenuState, (action: any) => any] = useReducer(
    MenuReducer,
    new MenuState()
  );

  let menuOptions: MenuOption[] = [
    {
      iconSrc: '/assets/images/logo-icon-02.svg',
      Icon: HomeIcon,
      linkTo: '/pesquisa/todos',
      text: 'Home'
    }

    // {
    // 	iconSrc: "/assets/images/supportLogo.svg",
    // 	Icon: SupportIcon,
    // 	linkTo: "/suporte",
    // 	text: "Suporte",
    // },
  ];

  if (is_authenticated_with_email()) {
    menuOptions.push(
      {
        iconSrc: '/assets/images/folder.svg',
        Icon: FolderIcon,
        linkTo: '/pastas',
        text: 'Pastas'
      },
      {
        iconSrc: '/assets/images/annotations.svg',
        Icon: AnnotationIcon,
        linkTo: '/anotacoes/1',
        text: 'Anotações'
      }
    );
  }

  if (is_contract_manager()) {
    menuOptions.push({
      iconSrc: '/assets/images/user.svg',
      Icon: UserManagementIcon,
      linkTo: '/gestao-usuarios',
      text: 'Gestão de usuários'
    });
  }

  return (
    <MenuContext.Provider
      value={{
        state,
        menuOptions,
        changeMenuState: (isOpen: boolean) =>
          dispatch({
            type: 'changeMenuState',
            payload: isOpen
          })
      }}>
      {children}
    </MenuContext.Provider>
  );
};
