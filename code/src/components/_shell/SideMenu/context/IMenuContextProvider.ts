import { MenuState } from './MenuState';

export interface IMenuContextProvider {
  state: MenuState;
  menuOptions: any[];
  changeMenuState: (isOpen: boolean) => any;
}
