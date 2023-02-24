import { RequestProgressInfo } from '../RequestProgressInfo';
import { PeriodicInfoModel } from './PeriodicInfoModel';

/**
 * Classe com o conteudo do campo state do contexto de periodico.
 * @see PeriodicContextProvider
 */
export class PeriodicContextModel {
  periodicRequest = new RequestProgressInfo<PeriodicInfoModel | any>(
    null,
    true
  );

  editionsRequest = new RequestProgressInfo();

  articlesRequest = new RequestProgressInfo();
}
