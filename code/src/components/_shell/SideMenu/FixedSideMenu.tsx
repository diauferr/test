import React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { contentSelectionHeight } from '../TabContentSelection';
import { topbarHeight } from '../Navbar';
import { useMenuContext } from './hooks/useMenuContext';
import { HelpIcon } from './icons';

const Container = styled.nav<any>`
  width: 70px;
  top: ${`${topbarHeight + contentSelectionHeight}px`};
  background: #fff;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-flow: column;
  z-index: 1;
  border-right: 1px solid #e6e6e6;

  @media (max-width: 1300px) {
    display: none;
  }

  &.menuOpen {
    display: none;
  }

  .menuItens {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 20px 0;
    padding: 5px;

    &:hover {
      svg {
        fill: var(--primary-color);
      }

      span {
        color: var(--primary-color);
      }
    }

    img,
    svg {
      transition: all 0.4s;
      fill: #cecece;
      width: 24px;
      margin-bottom: 6px;
    }

    span {
      transition: all 0.4s;
      font-size: 0.8rem;
      font-family: var(--title-font-family);

      text-align: center;
      color: #323232;
    }
  }

  .menu-link.active {
    span {
      color: var(--primary-color-dark);
    }

    svg {
      fill: var(--primary-color-dark);
    }
  }
`;

const FixedSideMenu = ({ location }: RouteComponentProps) => {
  const menuCtx = useMenuContext();
  const isInHomePage = location.pathname === '/inicial';
  const isInVideoPage = location.pathname.indexOf('/video') >= 0;
  const isInSearchPage = location.pathname.indexOf('/pesquisa') >= 0;

  if (isInHomePage || isInSearchPage || isInVideoPage) return null;

  return (
    <Container isInHomePage={isInHomePage}>
      <ul>
        {menuCtx.menuOptions.map((menuItem: any) => (
          <li key={menuItem.text}>
            <NavLink to={menuItem.linkTo} className={'menu-link'}>
              <div className="menuItens">
                {menuItem.Icon ? <menuItem.Icon /> : null}

                <span>{menuItem.text}</span>
              </div>
            </NavLink>
          </li>
        ))}

        <li key={'Ajuda'}>
          <a
            href="https://plataformaforum.zendesk.com"
            className={'menu-link'}
            target="_blank">
            <div className="menuItens">
              {<HelpIcon />}

              <span>Ajuda</span>
            </div>
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default withRouter(FixedSideMenu);
