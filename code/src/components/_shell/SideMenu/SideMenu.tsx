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

import { Icon, Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { IconLogo } from '../IconLogo';
import { useMenuContext } from './hooks/useMenuContext';
import { Header, MenuContainer, StyledDrawer } from './SideMenuStyle';

export const SideMenu = () => {
  const { session, is_authenticated, is_authenticated_by, logout } =
    useAuthCtx();

  const menuCtx = useMenuContext();

  if (!is_authenticated()) {
    return null;
  }

  const is_user_authenticated =
    is_authenticated_by('auth0') || is_authenticated_by('sso');

  return (
    <StyledDrawer
      placement="left"
      closable={false}
      onClose={() => menuCtx.changeMenuState(false)}
      visible={menuCtx.state.isOpen}>
      <>
        <Header
          style={{
            background: `url('/assets/images/indigo-pentagonal-background.png') #003a70`,
            backgroundSize: 'cover'
          }}>
          <div className={'content'}>
            {is_user_authenticated ? (
              <img
                src={
                  !!session.picture
                    ? session.picture
                    : '/assets/images/user.svg'
                }
                style={{
                  width: 42,
                  marginBottom: '.6rem',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.5)',
                  boxSizing: 'content-box',
                  background: 'white'
                }}
              />
            ) : (
              <IconLogo style={{ width: 40, marginBottom: '.6rem' }} />
            )}

            <h4>
              {is_user_authenticated
                ? session.name.split('@')[0]
                : session.client.name}
            </h4>

            {is_user_authenticated ? (
              <span className={'intranet'}>{session.client.name}</span>
            ) : (
              <NavLink href={'#'} className={'login-link'} to={'/login'}>
                <Icon type="login" className="loginIcon" />
                Login
              </NavLink>
            )}

            <a
              className={'logout-link'}
              href="#"
              onClick={() => {
                logout();
              }}>
              <Icon type="logout" className="logoutIcon" />
              <span>Sair</span>
            </a>
          </div>
        </Header>
        <MenuContainer>
          <Menu mode="inline">
            {menuCtx.menuOptions.map((menuItem: any) => (
              <Menu.Item key={menuItem.text}>
                <NavLink
                  to={menuItem.linkTo}
                  className={menuItem.text}
                  onClick={() => menuCtx.changeMenuState(false)}>
                  <span>
                    <img
                      src={menuItem.iconSrc}
                      className={'icon'}
                      style={menuItem.iconStyle || {}}
                    />
                    <span>{menuItem.text}</span>
                  </span>
                </NavLink>
              </Menu.Item>
            ))}
            <Menu.Item key="Ajuda">
              <a
                href="https://plataformaforum.zendesk.com"
                onClick={() => menuCtx.changeMenuState(false)}
                target="_blank">
                <span>
                  <img
                    src="/assets/images/question-mark.svg"
                    className={'icon'}
                  />
                  <span>Ajuda</span>
                </span>
              </a>
            </Menu.Item>
          </Menu>
        </MenuContainer>
      </>
    </StyledDrawer>
  );
};
