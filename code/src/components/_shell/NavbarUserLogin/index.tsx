/* eslint-disable @typescript-eslint/naming-convention */

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChangeAccountModal } from '../../../features/auth_v2/components/ChangeAccountModal';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { TopbarLoginButton } from '../TopbarLoginButton';
import { SearchButtonMobile } from '../NavbarSearch/styles';
import { NavbarContext } from '../NavbarFilters/NavbarContext';
import FolderIcon from '../../../assets/images/icon-folder.svg';
import NotationIcon from '../../../assets/images/icon-notation.svg';
import HelpIcon from '../../../assets/images/icon-help.svg';
import ResetIcon from '../../../assets/images/icon-reset.svg';
import SwapIcon from '../../../assets/images/icon-swap.svg';
import LogoutIcon from '../../../assets/images/icon-logout.svg';
import UsersIcon from '../../../assets/images/icon-users.svg';
import MagnifyingGlassIcon from '../../../assets/images/lupa.svg';
import ChevronIcon from '../../../assets/images/icon-chevron.svg';
import {
  Icon,
  MenuOptions,
  Navbar,
  NavbarButtons,
  Option,
  Popover,
  ProfileImage,
  ProfileInfo,
  SessionClient,
  SessionName,
  Trigger
} from './styles';

export const NavbarUserLogin = () => {
  const history = useHistory();

  const {
    session,
    is_authenticated_by,
    logout,
    is_authenticated_with_email,
    go_to_reset_password,
    is_contract_manager
  } = useAuthCtx();

  const [changeAccountVisible, setChangeAccountVisible] = useState(false);

  const FoldersButton = () => {
    const handleClick = () => history.push('/pastas');

    return (
      <NavbarButtons className="one" onClick={handleClick}>
        <Icon src={FolderIcon} />
        Pastas
      </NavbarButtons>
    );
  };

  const NotationsButton = () => {
    const handleClick = () => history.push('/anotacoes/1');

    return (
      <NavbarButtons className="two" onClick={handleClick}>
        <Icon src={NotationIcon} />
        Anotações
      </NavbarButtons>
    );
  };

  const UsersButton = () => history.push('/gestao-usuarios');

  const getName = (str: string) => {
    let [first] = str.split(' ');
    let last = str.split(' ').pop();
    return `${first} ${last}`;
  };

  const getTruncated = (str: string) =>
    str.length > 30 ? `${str.substring(0, 32)}...` : str;

  const menuTitle = (
    <div>
      Logado como <br />
      {session.email}
    </div>
  );

  const menuOptions = (
    <MenuOptions>
      <Option target="_blank" href="https://plataformaforum.zendesk.com">
        <Icon src={HelpIcon} alt={HelpIcon} />
        Ajuda
      </Option>
      {is_contract_manager() && (
        <Option onClick={() => UsersButton()}>
          <Icon src={UsersIcon} alt={UsersIcon} />
          Gestão de usuários
        </Option>
      )}
      <Option onClick={() => go_to_reset_password()}>
        <Icon src={ResetIcon} alt={ResetIcon} />
        Redefinir senha
      </Option>
      <Option onClick={() => setChangeAccountVisible(true)}>
        <Icon src={SwapIcon} alt={SwapIcon} />
        Trocar de conta
      </Option>
      <Option onClick={() => logout()}>
        <Icon src={LogoutIcon} alt={LogoutIcon} />
        Sair
      </Option>
    </MenuOptions>
  );

  const { searchOpen, setSearchOpen } = useContext(NavbarContext);

  return is_authenticated_with_email() ? (
    <>
      <Navbar>
        <SearchButtonMobile onClick={() => setSearchOpen(!searchOpen)}>
          <Icon src={searchOpen ? ChevronIcon : MagnifyingGlassIcon} alt="" />
        </SearchButtonMobile>
        <FoldersButton />
        <NotationsButton />
        <Popover
          content={menuOptions}
          title={menuTitle}
          trigger="click"
          getPopupContainer={(trigger) => trigger}>
          <Trigger>
            <ProfileImage
              title="Menu de usuário"
              src={session.picture}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  'https://ui-avatars.com/api/?name=' +
                  `${getName(session.name)}` +
                  '&color=fff&background=D7282F';
              }}
            />
            <ProfileInfo>
              <SessionName>{getName(session.name) || 'Usuário'}</SessionName>
              <SessionClient>{getTruncated(session.client.name)}</SessionClient>
            </ProfileInfo>
          </Trigger>
        </Popover>
      </Navbar>

      {is_authenticated_by('auth0') && (
        <ChangeAccountModal
          {...{
            visible: changeAccountVisible,
            onCancel: () => {
              setChangeAccountVisible(false);
            }
          }}
        />
      )}
    </>
  ) : (
    <TopbarLoginButton />
  );
};
