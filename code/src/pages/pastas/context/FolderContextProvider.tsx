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

import React, { useEffect, useReducer } from 'react';
import { FolderModel } from '../../../models/folder/FolderModel';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { doRequestAndDispatchProgressActions } from '../../../util/dispatchRequestProgressActions';
import {
  addNewFolder,
  folderReducer,
  removeFolder,
  renameFolder,
  setCurrentFolderId,
  removeContentFromFolder
} from './folder-reducer';
import { FolderContextState } from './FolderContextState';

// @ts-ignore
export const FolderContext = React.createContext();

interface IProps {
  children: any;
}

export const FolderContextProvider = ({ children }: IProps) => {
  const [state, dispatch]: [FolderContextState, (action: any) => any] =
    useReducer(folderReducer, new FolderContextState());

  function getFoldersFromApi() {
    doRequestAndDispatchProgressActions(
      'getFoldersRequest',
      state,
      dispatch,
      () => FolderRequests.getFolders()
    );
  }

  useEffect(() => {
    getFoldersFromApi();
  }, []);

  return (
    <FolderContext.Provider
      value={{
        state,
        renameFolder: (folder: FolderModel) => dispatch(renameFolder(folder)),
        addNewFolder: (folder: FolderModel) => dispatch(addNewFolder(folder)),
        removeFolder: (folderId: string) => dispatch(removeFolder(folderId)),
        setCurrentFolderId: (folderId: string) =>
          dispatch(setCurrentFolderId(folderId)),
        removeContentFromFolder: (
          folderId: string,
          contentId: number,
          contentTitle: string
        ) =>
          dispatch(removeContentFromFolder(folderId, contentId, contentTitle)),
        updateAssociatedUsers: (folderId: string, userEmail: string) =>
          dispatch({
            type: 'updateAssociatedUsers',
            payload: { folderId, userEmail }
          }),
        getFoldersFromApi
      }}>
      {children}
    </FolderContext.Provider>
  );
};
