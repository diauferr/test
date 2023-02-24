import React from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu, Icon } from 'antd';

const Container = styled.div`
  position: relative;
  .profile-menu {
    position: absolute;
    top: 20px;
    right: 10px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  cursor: pointer;
`;

export const UserProfileMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        Minha conta
      </Menu.Item>
      <Menu.Item>
        <Icon type="logout" />
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Container className={'animated bounceIn'}>
      <StyledDropdown overlay={menu} trigger={['click']}>
        <Avatar
          style={{}}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScs054I_CKQxZrTYqOSOod3G4LJiYtnZPVNJmEmLEgncvpsDc5tQ"
        />
      </StyledDropdown>
    </Container>
  );
};
