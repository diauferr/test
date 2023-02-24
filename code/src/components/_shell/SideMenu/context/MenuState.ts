export class MenuState {
  constructor(public isOpen = false) {}

  changeMenuState(menuState: boolean) {
    this.isOpen = menuState;

    return this.clone();
  }

  private clone = () => new MenuState(this.isOpen);
}
