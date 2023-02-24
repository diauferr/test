import { MenuState } from './MenuState';

export function MenuReducer(state: MenuState, { type, payload }: any) {
  switch (type) {
    case 'changeMenuState':
      return state.changeMenuState(payload);
    default:
      return state;
  }
}
