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

import React from 'react';
import { ProductType } from '../../../enums/ProductType';

interface IProps {
  contractedProducts: any[];
}

export const ClientProductsList = ({ contractedProducts }: IProps) => {
  const arrayTypes = contractedProducts.map((i) => i.type);
  const uniqueArray = Array.from(new Set(arrayTypes));

  return (
    <ul className="contracted-products-list">
      {uniqueArray.map((product, i) => (
        <li key={`product ${i}`}>
          <Product {...{ product }} />
        </li>
      ))}
    </ul>
  );
};

const menuByProductType = [
  {
    type: ProductType.Periodics,
    text: 'Revistas'
  },
  {
    type: ProductType.Books,
    text: 'Livros'
  },
  {
    type: ProductType.Videos,
    text: 'Videos'
  },
  {
    type: ProductType.Codes,
    text: 'Códigos'
  },
  {
    type: ProductType.Clipping,
    text: 'Informativo'
  }
];

interface IProductProps {
  product: any;
}

const Product: React.FC<IProductProps> = ({ product }) => {
  const menuItem = menuByProductType.find((mi) => mi.type === product);

  if (!menuItem) {
    return null;
  }

  return (
    <div>
      <span>{menuItem.text}</span>
    </div>
  );
};
