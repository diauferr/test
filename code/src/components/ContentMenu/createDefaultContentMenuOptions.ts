export enum ContentMenuOptionType {
  Folder,
  ShareByEmail,
  QuoteModel
}

interface IParams {
  onClickCallbacks: {
    setFolderModalVisibility: (isVisible: boolean) => any;
    setEmailModalVisibility: (isVisible: boolean) => any;
    setQuoteModalVisibility: (isVisible: boolean) => any;
  };
  disabledOptions: ContentMenuOptionType[];
}

interface IDefaultContentMenuOption {
  text: string;
  onClick: (isVisible: boolean) => any;
  icon: string;
  type: ContentMenuOptionType;
}

export function createDefaultContentMenuOptions({
  onClickCallbacks,
  disabledOptions
}: IParams): IDefaultContentMenuOption[] {
  return [
    {
      text: 'Adicionar à pasta',
      icon: 'folder',
      onClick: onClickCallbacks.setFolderModalVisibility,
      type: ContentMenuOptionType.Folder
    },
    // {
    // 	text: "Enviar por e-mail",
    // 	icon: "mail",
    // 	onClick: onClickCallbacks.setEmailModalVisibility,
    // 	type: ContentMenuOptionType.ShareByEmail,
    // },
    {
      text: 'Referência Bibliográfica',
      icon: 'edit',
      onClick: onClickCallbacks.setQuoteModalVisibility,
      type: ContentMenuOptionType.QuoteModel
    }
  ].filter((opt) => !disabledOptions.some((disabled) => disabled === opt.type));
}
