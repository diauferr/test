import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FooterContainer, FooterLogoImg } from './globalStyles';
import LogoIcon from '../assets/images/footer-logo.svg';

const links = [
  { title: 'Todos', path: '/pesquisa/todos' },
  { title: 'Revistas', path: '/pesquisa/revistas' },
  { title: 'Livros', path: '/pesquisa/livros' },
  { title: 'Vídeos', path: '/conteudo/videos' },
  { title: 'Informativos', path: '/pesquisa/informativos' },
  { title: 'Códigos', path: '/pesquisa/codigos' }
];

const LogoButton = () => {
  const history = useHistory();
  const handleClick = () => history.push('/pesquisa/todos');
  return <FooterLogoImg src={LogoIcon} onClick={handleClick} />;
};

export const Footer = () => (
  <FooterContainer>
    <LogoButton />
    <nav>
      {links.map((e) => (
        <Link to={e.path}>{e.title}</Link>
      ))}
    </nav>
  </FooterContainer>
);
