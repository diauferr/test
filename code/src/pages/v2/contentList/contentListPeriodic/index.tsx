import React, { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { LeftArrow, RightArrow } from './arrows';
import { Card } from './card';

import { useDrag } from '../hooks/useDrag';

import Periodic1 from '../../../assets/periodics/cover-periodic1.jpg';
import Periodic2 from '../../../assets/periodics/cover-periodic2.jpg';
import Periodic3 from '../../../assets/periodics/cover-periodic3.jpg';
import Periodic4 from '../../../assets/periodics/cover-periodic4.jpg';
import Periodic5 from '../../../assets/periodics/cover-periodic5.jpg';
import Periodic6 from '../../../assets/periodics/cover-periodic6.jpg';

import * as S from './styles';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

// NOTE: embrace power of CSS flexbox!

const elemPrefix = 'periodic';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

export const ContentPeriodic = () => {
  const [items] = useState(getItems);

  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState<string>('');
  const handleItemClick = (itemId: string) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : '');
  };

  const data = [
    {
      tag: 'Revista',
      title: 'FA - FÓRUM ADMINISTRATIVO',
      cover: Periodic1,
      author: 'Editora Fórum',
      date: 'Número 263, Ano 2023,Jan - 2023',
      desc: 'O Fórum Administrativo – FA, periódico mensal especializado em Direito Administrativo com o viés do Direito Público, aborda as questões relativas aos agentes públicos — estatuários, celetistas e terceirizados. Os artigos tratam as matérias que permeiam o dia a dia da função pública, tais como controle, processo, processo administrativo disciplinar, regulação e, sobretudo, em servidor público.'
    },
    {
      tag: 'Revista',
      title: 'RCEJ - Revista do centro de estudos jurídicos',
      cover: Periodic2,
      author: 'Editora Fórum',
      date: 'Número 90, Ano 2022,Out/Dez - 2022',
      desc: 'A Revista do Centro de Estudos Jurídicos, da Procuradoria Geral do Estado de Pernambuco, reúne textos científicos, pareceres e trabalhos forenses relacionados ao exercício da advocacia pública, elaborados por procuradores, promotores, delegados, advogados, professores, magistrados e demais integrantes da carreira jurídica. Fundada pelo ex-procurador-geral do Estado Francisco Tadeu Barbosa de Alencar'
    },
    {
      tag: 'Revista',
      title: 'A&C - REVISTA DE DIREITO ADMINISTRATIVO E CONSTITUCIONAL',
      cover: Periodic3,
      author: 'Editora Fórum',
      date: 'Número 90, Ano 2022,Out/Dez - 2022',
      desc: 'A&C – Revista de Direito Administrativo e Constitucional, publicada pela Editora Fórum com o apoio do Instituto Paranaense de Direito Administrativo – IPDA e do Instituto de Direito Romeu Felipe Bacellar, tem sua linha editorial voltada para a divulgação das pesquisas desenvolvidas nas áreas de Direito Constitucional e Direito Administrativo'
    },
    {
      tag: 'Revista',
      title: 'RDPE - REVISTA DE DIREITO PÚBLICO DA ECONOMIA',
      cover: Periodic4,
      author: 'Editora Fórum',
      date: 'Número 80, Ano 2022,Out/Dez - 2022',
      desc: 'A Revista de Direito Público da Economia – RDPE visa explorar e condensar correntes de pensamento referentes ao Direito Público da Economia contemporâneo. Sua aposta é aprofundar e instigar o desenvolvimento de novas abordagens de investigação. Trata-se de afirmar uma nova perspectiva de conhecimento do Direito Público da Economia, resultado da conjugação das visões de estudiosos de diversas áreas'
    },
    {
      tag: 'Revista',
      title: 'RBDP - REVISTA BRASILEIRA DE DIREITO PÚBLICO',
      cover: Periodic5,
      author: 'Editora Fórum',
      date: 'Número 78, Ano 2022,Jul/Set - 2022',
      desc: 'A Revista Brasileira de Direito Público – RBDP oferece ao leitor visões e reflexões sobre o Direito que rege o Estado e suas relações com os cidadãos, abrangendo assuntos como o funcionamento de serviços públicos, processos de licitações, relações entre órgãos públicos e suas implicações perante a sociedade, entre outros tópicos.'
    },
    {
      tag: 'Revista',
      title: 'FDUA - FÓRUM DE DIREITO URBANO E AMBIENTAL',
      cover: Periodic6,
      author: 'Editora Fórum',
      date: 'Número 126, Ano 2022,Nov/Dez - 2022',
      desc: 'Neste atual contexto globalizado, onde o mundo exige respeito às normas ambientais e organização do espaço urbano, esse periódico possibilita aos leitores informação segura e atualizada, instrumento de melhoria contínua da qualidade de vida da comunidade. Primeira publicação especializada em Direito Urbano e Ambiental, apresenta doutrinas sobre responsabilidade urbana e sustentabilidade'
    }
  ];

  return (
    <S.Container onMouseLeave={dragStop}>
      <S.Wrapper>
        <h2>Revistas</h2>
        <a href="#">ver mais</a>
      </S.Wrapper>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}>
        {data.map(({ tag, title, cover, author, date, desc, link }: any) => (
          <Card
            tag={tag}
            title={title}
            cover={cover}
            author={author}
            date={date}
            desc={desc}
            link={link}
            itemId={title} // NOTE: itemId is required for track items
            key={title}
            onClick={handleItemClick(title)}
            selected={title === selected}
          />
        ))}
      </ScrollMenu>
    </S.Container>
  );
};
