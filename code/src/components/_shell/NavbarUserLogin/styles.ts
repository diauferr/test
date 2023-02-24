import styled, { keyframes } from 'styled-components';
import { Popover as popover } from 'antd';
import { device } from '../../styledComponent';

export const zoomInOut = keyframes`
	0% {
			transform: scale(1, 1);
	}
	50% {
			transform: scale(1.1, 1.04);
	}
	100% {
			transform: scale(1, 1);
	}
`;

export const Navbar = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  order: 2;

  @media ${device.lg} {
    order: 3;
  }
`;

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  border: 3px solid #d7282f;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  padding: 1px;
  margin: 1px;

  @media ${device.md} {
    margin: 8px;
  }
`;

export const ProfileInfo = styled.div`
  display: none;

  @media ${device.md} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

export const Popover = styled(popover)`
  order: 4;

  .ant-popover-inner {
    padding: 8px;
    border-radius: 16px;
  }

  .ant-popover-arrow {
    display: none;
  }
`;

export const SessionName = styled.span`
  font-weight: bold;
`;

export const SessionClient = styled.span`
  font-size: 12px;
`;

export const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Option = styled.a`
  text-decoration: none;
  color: black;
  margin: 4px 0 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:visited {
    color: black;
  }

  &:hover {
    color: #003a70;
  }
`;

export const Icon = styled.img`
  width: 24px;
  margin: 0 6px 0 0;
`;

export const NavbarButtons = styled.div`
  display: none;
  order: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 10px;
  cursor: pointer;

  &.one {
    order: 2;
  }

  &.two {
    order: 3;
  }

  @media ${device.md} {
    display: flex;
  }
`;
