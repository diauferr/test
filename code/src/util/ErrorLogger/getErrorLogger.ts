import { Stage } from '../../enums/Stage.enum';
import { DevelopmentErrorLogger } from './DevelopmentErrorLogger';
import { IErrorLogger } from './IErrorLogger';
import { ProductionErrorLogger } from './ProductionErrorLogger';

export const getErrorLogger = (): IErrorLogger =>
  process.env.REACT_APP_ENVIRONMENT === Stage.Production
    ? new ProductionErrorLogger()
    : new DevelopmentErrorLogger();
