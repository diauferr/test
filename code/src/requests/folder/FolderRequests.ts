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

import { ContentType } from '../../enums/ContentType';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { FolderModel } from '../../models/folder/FolderModel';
import { InviteModel } from '../../models/folder/InviteModel';
import { http_client } from '../../util/http_client';

const BASE_URL = process.env.REACT_APP_FOLDERS_API;

export class FolderRequests {
  public static async sendFolderInvitation(
    to: string,
    folder_id: string,
    folder_name: string
  ) {
    return http_client.post(`${BASE_URL}/invites`, {
      to,
      folder_id,
      folder_name
    });
  }

  public static async getInvites() {
    return http_client.get<InviteModel[]>(`${BASE_URL}/invites`);
  }

  public static async acceptedFolderInvitation(folder_id: string) {
    return http_client.post(`${BASE_URL}/invites/accept`, {
      folder_id
    });
  }

  public static async refuseFolderInvitation(folder_id: string) {
    return http_client.delete(`${BASE_URL}/invites/${folder_id}`);
  }

  public static async addContentToFolder(
    folderId: string,
    searchResult: ContentSearchResult
  ) {
    return http_client.post(`${BASE_URL}/${folderId}/contents`, {
      ...searchResult,
      tags: [],
      editionId: searchResult.editionId || 0,
      parentId: searchResult.parentId || 0,
      total: 0,
      articleType: searchResult.articleType || 0
    });
  }

  public static async removeContentFromFolder(
    folderId: string,
    contentType: ContentType,
    title: string
  ) {
    return http_client.delete(`${BASE_URL}/${folderId}/contents`, {
      contentType,
      title
    });
  }

  public static async createNewFolder(folderName: string) {
    const result = await http_client.post<any>(BASE_URL, {
      folderName
    });
    return this.convertDtoToModel(result.data);
  }

  public static async getFolders() {
    const result = await http_client.get<any>(BASE_URL);
    return result.data.map(this.convertDtoToModel);
  }

  public static async removeFolder(folderId: string) {
    return http_client.delete(`${BASE_URL}/${folderId}`);
  }

  public static async renameFolder(folderId: string, folderName: string) {
    const result = await http_client.put(`${BASE_URL}/${folderId}`, {
      folderName
    });
    return this.convertDtoToModel(result.data);
  }

  public static async removeUserFromFolder(folderId: string, email: string) {
    return http_client.delete(`${BASE_URL}/${folderId}/guests/${email}`);
  }

  private static convertDtoToModel(dto: any) {
    return new FolderModel(
      dto.id,
      dto.name,
      dto.associatedUsers,
      dto.contents,
      dto.lastContentInclusion
    );
  }
}
