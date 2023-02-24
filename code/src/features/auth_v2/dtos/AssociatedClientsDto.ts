import { AssociatedBy } from '../model/AssociatedBy.enum';

export type AssociatedClientsDto = {
  name: string;
  id: string;
  contractedProducts: any[];
  associated_by: AssociatedBy;
  blocked: boolean;
}[];
