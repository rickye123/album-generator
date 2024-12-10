/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type List = {
  __typename: "List",
  id: string,
  name: string,
  albums?:  Array<Album | null > | null,
  createdAt: string,
  updatedAt: string,
  albumListsId?: string | null,
};

export type Album = {
  __typename: "Album",
  id: string,
  name: string,
  artist: string,
  spotifyUrl: string,
  release_date: string,
  imageUrl?: string | null,
  lists?: ModelListConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelListConnection = {
  __typename: "ModelListConnection",
  items:  Array<List | null >,
  nextToken?: string | null,
};

export type CreateListInput = {
  id?: string | null,
  name: string,
  albumListsId?: string | null,
};

export type ModelListConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelListConditionInput | null > | null,
  or?: Array< ModelListConditionInput | null > | null,
  not?: ModelListConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  albumListsId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateListInput = {
  id: string,
  name?: string | null,
  albumListsId?: string | null,
};

export type DeleteListInput = {
  id: string,
};

export type CreateAlbumInput = {
  id?: string | null,
  name: string,
  artist: string,
  spotifyUrl: string,
  release_date: string,
  imageUrl?: string | null,
};

export type ModelAlbumConditionInput = {
  name?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  spotifyUrl?: ModelStringInput | null,
  release_date?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  and?: Array< ModelAlbumConditionInput | null > | null,
  or?: Array< ModelAlbumConditionInput | null > | null,
  not?: ModelAlbumConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateAlbumInput = {
  id: string,
  name?: string | null,
  artist?: string | null,
  spotifyUrl?: string | null,
  release_date?: string | null,
  imageUrl?: string | null,
};

export type DeleteAlbumInput = {
  id: string,
};

export type ModelListFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
  albumListsId?: ModelIDInput | null,
};

export type ModelAlbumFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  spotifyUrl?: ModelStringInput | null,
  release_date?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAlbumFilterInput | null > | null,
  or?: Array< ModelAlbumFilterInput | null > | null,
  not?: ModelAlbumFilterInput | null,
};

export type ModelAlbumConnection = {
  __typename: "ModelAlbumConnection",
  items:  Array<Album | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionListFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionListFilterInput | null > | null,
  or?: Array< ModelSubscriptionListFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAlbumFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  artist?: ModelSubscriptionStringInput | null,
  spotifyUrl?: ModelSubscriptionStringInput | null,
  release_date?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAlbumFilterInput | null > | null,
  or?: Array< ModelSubscriptionAlbumFilterInput | null > | null,
  albumListsId?: ModelSubscriptionIDInput | null,
};

export type AddAlbumToListMutationVariables = {
  albumId: string,
  listId: string,
};

export type AddAlbumToListMutation = {
  addAlbumToList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type CreateListMutationVariables = {
  input: CreateListInput,
  condition?: ModelListConditionInput | null,
};

export type CreateListMutation = {
  createList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type UpdateListMutationVariables = {
  input: UpdateListInput,
  condition?: ModelListConditionInput | null,
};

export type UpdateListMutation = {
  updateList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type DeleteListMutationVariables = {
  input: DeleteListInput,
  condition?: ModelListConditionInput | null,
};

export type DeleteListMutation = {
  deleteList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type CreateAlbumMutationVariables = {
  input: CreateAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type CreateAlbumMutation = {
  createAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAlbumMutationVariables = {
  input: UpdateAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type UpdateAlbumMutation = {
  updateAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAlbumMutationVariables = {
  input: DeleteAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type DeleteAlbumMutation = {
  deleteAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetListQueryVariables = {
  id: string,
};

export type GetListQuery = {
  getList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type ListListsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListsQuery = {
  listLists?:  {
    __typename: "ModelListConnection",
    items:  Array< {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      albumListsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAlbumQueryVariables = {
  id: string,
};

export type GetAlbumQuery = {
  getAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAlbumsQueryVariables = {
  filter?: ModelAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlbumsQuery = {
  listAlbums?:  {
    __typename: "ModelAlbumConnection",
    items:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
};

export type OnCreateListSubscription = {
  onCreateList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type OnUpdateListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
};

export type OnUpdateListSubscription = {
  onUpdateList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type OnDeleteListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
};

export type OnDeleteListSubscription = {
  onDeleteList?:  {
    __typename: "List",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    albumListsId?: string | null,
  } | null,
};

export type OnCreateAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumFilterInput | null,
};

export type OnCreateAlbumSubscription = {
  onCreateAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumFilterInput | null,
};

export type OnUpdateAlbumSubscription = {
  onUpdateAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumFilterInput | null,
};

export type OnDeleteAlbumSubscription = {
  onDeleteAlbum?:  {
    __typename: "Album",
    id: string,
    name: string,
    artist: string,
    spotifyUrl: string,
    release_date: string,
    imageUrl?: string | null,
    lists?:  {
      __typename: "ModelListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
