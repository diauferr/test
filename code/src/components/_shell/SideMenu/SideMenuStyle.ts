import { Drawer } from 'antd';
import styled from 'styled-components';

export const StyledDrawer = styled(Drawer)`
  background: rgba(0, 0, 0, 0.1);

  li,
  span {
    font-size: 0.95rem;
    font-family: var(--title-font-family);
    font-weight: 600;

    img.icon {
      width: 22px;
      margin-right: 1rem;
      opacity: 0.5;
      transition: all 0.5s;
    }

    &:hover {
      img.icon {
        opacity: 1;
      }
    }
  }

  .ant-menu {
    background: transparent;
    border: 0;
  }

  .ant-drawer-wrapper-body {
    background: #fff;
    overflow: hidden !important;
  }
  .ant-drawer-body {
    padding: 0 !important;
    overflow: hidden;
  }

  .ant-menu:first-child {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.7rem 0 !important;
  }

  .ant-menu-item-active {
    width: 100% !important;
  }

  .ant-menu-submenu-title,
  .ant-menu-item {
    height: 50px !important;
    line-height: 50px !important;
  }

  .ant-menu-item:hover {
    color: unset;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #f4f4f4 !important;
    color: unset;

    &:after {
      display: none;
    }

    &:active {
      color: unset !important;
    }
  }

  a {
    color: unset !important;

    &.active {
      color: black !important;
    }

    &:hover {
      color: black !important;
    }
  }

  a.Home {
    &.active {
      color: unset !important;
    }
  }

  a.active {
    color: black !important;
    img {
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  height: 180px;

  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(14, 0, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 1rem;

    h4 {
      text-align: center;
      line-height: 1rem;
      font-family: var(--title-font-family);
      font-size: 16px;
      margin-bottom: 0.3rem;
      margin-top: 0.2rem;
      color: #fff;
    }

    .intranet {
      text-align: center;
      color: #fff;
      font-size: 0.75rem;
      text-transform: uppercase;
      opacity: 1;
      font-weight: 600;
    }

    .login-link {
      &:hover {
        opacity: 0.7;
      }
      display: block;
      margin-top: 0.5rem;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: white !important;
      border: 1px solid white !important;
      border-radius: 5px;

      .loginIcon {
        padding-right: 0.3rem;
      }
    }

    .loading-acconts {
      margin-top: 0.5rem;

      svg {
        height: 1.2rem;
        width: 1.2rem;
        margin-right: 0.4rem;
      }

      .text {
        color: white;
        opacity: 0.7;
      }
    }

    .logout-link {
      &:hover {
        opacity: 1;
        color: white;
      }
      display: block;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: white !important;
      opacity: 0.7;

      .logoutIcon {
        padding-right: 0.3rem;
      }
    }
  }
`;

export const MenuContainer = styled.div`
  overflow-y: auto;
  max-height: 100%;

  .logout-option {
    margin-top: 5rem;
  }

  svg {
    width: 22px;
  }
`;
