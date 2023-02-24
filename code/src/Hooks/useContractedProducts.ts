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

import { ProductType } from '../enums/ProductType';
import { useAuthCtx } from '../features/auth_v2/hooks/useAuthCtx';

export function useContractedProducts() {
  const { session } = useAuthCtx();

  if (!session) {
    return {
      hasAccessToProduct(productType: ProductType) {
        return false;
      }
    };
  }
  // TODO - Realizar controle de permissão pelo DB via contracted_products.
  session.client.contracted_products.push({
    type: ProductType.Legislation,
    codGroup: 7,
    titulo: 'Legislação Comentada'
  });
  return {
    hasAccessToProduct(productType: ProductType) {
      return session.client.contracted_products.some(
        (p) => p.type === productType
      );
    }
  };
}
