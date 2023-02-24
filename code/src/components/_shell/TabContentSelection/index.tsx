import React from 'react';
import { ContentTypeName } from '../../../pages/pesquisa/enums/ContentTypeName';
import { UserSession } from '../../../models/auth/UserSession';
import { ProductType } from '../../../enums/ProductType';
import { withRouter } from 'react-router';
import { useSearchFilter } from '../../../pages/pesquisa/hooks/useSearchFilter';
import { useContractedProducts } from '../../../Hooks/useContractedProducts';
import { Container, TabPane, Tabs } from './styles';

export const contentSelectionHeight = 65;

const menuByProductType = [
  {
    type: ProductType.Periodics,
    menu: {
      name: ContentTypeName.PERIODIC,
      text: 'Revistas',
      value: ContentTypeName.PERIODIC
    }
  },
  {
    type: ProductType.Books,
    menu: {
      name: ContentTypeName.BOOK,
      text: 'Livros',
      value: ContentTypeName.BOOK
    }
  },
  {
    type: ProductType.Videos,
    menu: {
      name: ContentTypeName.VIDEO,
      text: 'Vídeos',
      value: ContentTypeName.VIDEO
    }
  },
  {
    type: ProductType.Clipping,
    menu: {
      name: ContentTypeName.NEWSLETTER,
      text: 'Informativos',
      value: ContentTypeName.NEWSLETTER
    }
  },
  {
    type: ProductType.Codes,

    menu: {
      name: ContentTypeName.CODE,
      text: 'Códigos',
      value: ContentTypeName.CODE
    }
  }
  // {
  // 	type: ProductType.Legislation,

  // 	menu: {
  // 		name: ContentTypeName.LEGISLATION,
  // 		text: "Legislação Comentada",
  // 		value: ContentTypeName.LEGISLATION,
  // 	},
  // },
];

interface IProps {
  match?: any;
  history?: any;
  user?: UserSession;
}

const TabContentSelection = ({ history, user }: IProps) => {
  const { hasAccessToProduct } = useContractedProducts();
  const { contentType, filter } = useSearchFilter();

  let menuOptions: any[] = [];

  menuByProductType.forEach((m) => {
    if (hasAccessToProduct(m.type)) {
      menuOptions.push(m.menu);
    }
  });

  menuOptions.unshift({
    text: 'Todos',
    value: ContentTypeName.ALL,
    name: ContentTypeName.ALL
  });

  const [currentSelectedOption] = menuOptions.filter(
    (o) => o.name === contentType
  );

  if (!user) return null;

  const action = (tabText: string) => {
    const { REACT_APP_NEW_BOOK_VERSION } = process.env;
    const newBookVersion = String(REACT_APP_NEW_BOOK_VERSION) === 'true';
    const contentType = menuOptions.filter((o) => o.text === tabText)[0].name;
    const newFilter = filter.eraseSpecificFilters();
    const versionPage =
      contentType === ContentTypeName.VIDEO ||
      (contentType === ContentTypeName.BOOK && newBookVersion)
        ? 'conteudo'
        : 'pesquisa';

    const versionQueryString =
      contentType === ContentTypeName.VIDEO ||
      (contentType === ContentTypeName.BOOK && newBookVersion)
        ? 'v=2'
        : newFilter.convertToQueryString();

    history.push(`/${versionPage}/${contentType}?${versionQueryString}`);
  };

  const activeKey =
    contentType && currentSelectedOption
      ? menuOptions.filter((o) => o.name === contentType)[0].text
      : '';

  return (
    <Container>
      <Tabs size="small" activeKey={activeKey} onTabClick={action}>
        {menuOptions.map((opt) => (
          <TabPane tab={opt.text} key={opt.text} />
        ))}
      </Tabs>
    </Container>
  );
};

export default withRouter(TabContentSelection);
