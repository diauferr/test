import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { NavbarSearch } from '../NavbarSearch';
import { NavbarUserLogin } from '../NavbarUserLogin';
import { NavbarFilters } from '../NavbarFilters';
import { Container, Inner, Menus, Navbar } from './styles';
import TabContentSelection from '../TabContentSelection';
import LogoIcon from '../../../assets/images/home-page-logo.svg';
import { FooterLogoImg } from '../../globalStyles';

export const topbarHeight = 76;

const HomeLogoButton = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/pesquisa/todos');
  }

  return <FooterLogoImg src={LogoIcon} onClick={handleClick} />;
};

const Topbar = ({ location }: RouteComponentProps) => {
  const isInHomePage = location.pathname === '/inicial';
  const isInTodos = location.pathname === '/pesquisa/todos';
  const isInRevistas = location.pathname === '/pesquisa/revistas';
  const isInVideos = location.pathname === '/conteudo/videos';
  const isInInformativos = location.pathname === '/pesquisa/informativos';
  const isInCodigos = location.pathname === '/pesquisa/codigos';
  const isInLegislacao = location.pathname === '/pesquisa/legislacao-comentada';
  const isInLivros =
    location.pathname === '/conteudo/livros' ||
    location.pathname === '/pesquisa/livros';

  let myLocation = location.pathname;
  let splittedUrl = myLocation.split('/');

  const isCondiction =
    isInTodos ||
    isInRevistas ||
    isInLivros ||
    isInVideos ||
    isInInformativos ||
    isInCodigos ||
    isInLegislacao;

  return (
    <Container>
      <Inner>
        {splittedUrl.length >= 5 ? null : (
          <>
            <Navbar>
              <HomeLogoButton />
              {!isInHomePage && <NavbarSearch />}
              <NavbarUserLogin />
            </Navbar>
            {!isInHomePage && (
              <Menus>
                <TabContentSelection {...{ user: {} }} />
                {isCondiction ? <NavbarFilters /> : null}
              </Menus>
            )}
          </>
        )}
      </Inner>
    </Container>
  );
};

export default withRouter(Topbar);
