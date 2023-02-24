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

import { useCallback, useReducer } from 'react';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';

export class ModalState {
  constructor(
    public folderModal = false,
    public emailModal = false,
    public quoteModal = false
  ) {}
}

// actions
const setModalVisibilityType = 'setModalVisibleActionType';
const setModalVisibility = (modalName: string, isVisible) => ({
  type: setModalVisibilityType,
  payload: {
    modalName,
    isVisible
  }
});

const closeAllModalsType = 'closeAllModals';
const closeAllModals = () => ({ type: closeAllModalsType });

// reducer
function modalVisibilityReducer(state: ModalState, action) {
  if (action.type === setModalVisibilityType) {
    const newState = { ...state };
    Object.keys(newState).forEach((key) => (newState[key] = false));
    newState[action.payload.modalName] = action.payload.isVisible;

    return newState;
  }

  if (action.type === closeAllModalsType) return new ModalState();

  return state;
}

export function useContentModalState() {
  const [state, dispatch] = useReducer(
    modalVisibilityReducer,
    new ModalState()
  );
  const { is_authenticated_with_email, show_auth_modal } = useAuthCtx();

  const changeModalVisibility = useCallback(
    (modalName: string, isVisible: boolean, needAuth = true) => {
      if (needAuth && !is_authenticated_with_email()) {
        show_auth_modal();
      } else {
        dispatch(setModalVisibility(modalName, isVisible));
      }
    },
    [is_authenticated_with_email]
  );

  return {
    state,
    setFolderModalVisibility: (isVisible: boolean) =>
      changeModalVisibility('folderModal', isVisible),
    setEmailModalVisibility: (isVisible: boolean) =>
      changeModalVisibility('emailModal', isVisible),
    setQuoteModalVisibility: (isVisible: boolean) =>
      changeModalVisibility('quoteModal', isVisible, false),
    closeAllModals: () => dispatch(closeAllModals())
  };
}
