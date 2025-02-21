/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AlbumList = {
  __typename: "AlbumList",
  id: string,
  albumId: string,
  listId: string,
  played: boolean,
  album: Album,
  list: List,
  createdAt: string,
  updatedAt: string,
};

export type Album = {
  __typename: "Album",
  id: string,
  name: string,
  artist: string,
  spotifyUrl: string,
  release_date: string,
  imageUrl?: string | null,
  genres?: Array< string | null > | null,
  hideAlbum?: boolean | null,
  lists?: ModelAlbumListConnection | null,
  ListeningPileEntry?: ListeningPileEntry | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAlbumListConnection = {
  __typename: "ModelAlbumListConnection",
  items:  Array<AlbumList | null >,
  nextToken?: string | null,
};

export type ListeningPileEntry = {
  __typename: "ListeningPileEntry",
  id: string,
  albumId: string,
  order: number,
  album: Album,
  createdAt: string,
  updatedAt: string,
};

export type List = {
  __typename: "List",
  id: string,
  name: string,
  albums?: ModelAlbumListConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateListeningPileEntryInput = {
  id: string,
  albumId?: string | null,
  order?: number | null,
};

export type ModelListFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
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

export type ModelListConnection = {
  __typename: "ModelListConnection",
  items:  Array<List | null >,
  nextToken?: string | null,
};

export type CreateListInput = {
  id?: string | null,
  name: string,
};

export type ModelListConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelListConditionInput | null > | null,
  or?: Array< ModelListConditionInput | null > | null,
  not?: ModelListConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateListInput = {
  id: string,
  name?: string | null,
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
  genres?: Array< string | null > | null,
  hideAlbum?: boolean | null,
};

export type ModelAlbumConditionInput = {
  name?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  spotifyUrl?: ModelStringInput | null,
  release_date?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  genres?: ModelStringInput | null,
  hideAlbum?: ModelBooleanInput | null,
  and?: Array< ModelAlbumConditionInput | null > | null,
  or?: Array< ModelAlbumConditionInput | null > | null,
  not?: ModelAlbumConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAlbumInput = {
  id: string,
  name?: string | null,
  artist?: string | null,
  spotifyUrl?: string | null,
  release_date?: string | null,
  imageUrl?: string | null,
  genres?: Array< string | null > | null,
  hideAlbum?: boolean | null,
};

export type DeleteAlbumInput = {
  id: string,
};

export type CreateAlbumListInput = {
  id?: string | null,
  albumId: string,
  listId: string,
  played: boolean,
};

export type ModelAlbumListConditionInput = {
  albumId?: ModelIDInput | null,
  listId?: ModelIDInput | null,
  played?: ModelBooleanInput | null,
  and?: Array< ModelAlbumListConditionInput | null > | null,
  or?: Array< ModelAlbumListConditionInput | null > | null,
  not?: ModelAlbumListConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateAlbumListInput = {
  id: string,
  albumId?: string | null,
  listId?: string | null,
  played?: boolean | null,
};

export type DeleteAlbumListInput = {
  id: string,
};

export type CreateListeningPileEntryInput = {
  id?: string | null,
  albumId: string,
  order: number,
};

export type ModelListeningPileEntryConditionInput = {
  albumId?: ModelIDInput | null,
  order?: ModelIntInput | null,
  and?: Array< ModelListeningPileEntryConditionInput | null > | null,
  or?: Array< ModelListeningPileEntryConditionInput | null > | null,
  not?: ModelListeningPileEntryConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type DeleteListeningPileEntryInput = {
  id: string,
};

export type ModelAlbumFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  spotifyUrl?: ModelStringInput | null,
  release_date?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  genres?: ModelStringInput | null,
  hideAlbum?: ModelBooleanInput | null,
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

export type ModelAlbumListFilterInput = {
  id?: ModelIDInput | null,
  albumId?: ModelIDInput | null,
  listId?: ModelIDInput | null,
  played?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAlbumListFilterInput | null > | null,
  or?: Array< ModelAlbumListFilterInput | null > | null,
  not?: ModelAlbumListFilterInput | null,
};

export type ModelListeningPileEntryFilterInput = {
  id?: ModelIDInput | null,
  albumId?: ModelIDInput | null,
  order?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelListeningPileEntryFilterInput | null > | null,
  or?: Array< ModelListeningPileEntryFilterInput | null > | null,
  not?: ModelListeningPileEntryFilterInput | null,
};

export type ModelListeningPileEntryConnection = {
  __typename: "ModelListeningPileEntryConnection",
  items:  Array<ListeningPileEntry | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


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
  genres?: ModelSubscriptionStringInput | null,
  hideAlbum?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAlbumFilterInput | null > | null,
  or?: Array< ModelSubscriptionAlbumFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionAlbumListFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  albumId?: ModelSubscriptionIDInput | null,
  listId?: ModelSubscriptionIDInput | null,
  played?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAlbumListFilterInput | null > | null,
  or?: Array< ModelSubscriptionAlbumListFilterInput | null > | null,
};

export type ModelSubscriptionListeningPileEntryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  albumId?: ModelSubscriptionIDInput | null,
  order?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionListeningPileEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionListeningPileEntryFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type TogglePlayedMutationVariables = {
  id: string,
  played: boolean,
};

export type TogglePlayedMutation = {
  updateAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    played: boolean,
  } | null,
};

export type ToggleAlbumHiddenMutationVariables = {
  id: string,
  hideAlbum: boolean,
};

export type ToggleAlbumHiddenMutation = {
  updateAlbum?:  {
    __typename: "Album",
    id: string,
    hideAlbum?: boolean | null,
  } | null,
};

export type ReorderListeningPileMutationVariables = {
  input: UpdateListeningPileEntryInput,
};

export type ReorderListeningPileMutation = {
  updateListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    updatedAt: string,
  } | null,
};

export type ListListsWithAlbumsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  albumLimit?: number | null,
  albumNextToken?: string | null,
};

export type ListListsWithAlbumsQuery = {
  listLists?:  {
    __typename: "ModelListConnection",
    items:  Array< {
      __typename: "List",
      id: string,
      name: string,
      albums?:  {
        __typename: "ModelAlbumListConnection",
        items:  Array< {
          __typename: "AlbumList",
          id: string,
          played: boolean,
          album:  {
            __typename: "Album",
            id: string,
            name: string,
            artist: string,
            spotifyUrl: string,
            release_date: string,
            imageUrl?: string | null,
            createdAt: string,
            updatedAt: string,
          },
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUnplayedAlbumsQueryVariables = {
  listId: string,
  nextToken?: string | null,
  limit?: number | null,
};

export type GetUnplayedAlbumsQuery = {
  listAlbumLists?:  {
    __typename: "ModelAlbumListConnection",
    items:  Array< {
      __typename: "AlbumList",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string,
        artist: string,
        spotifyUrl: string,
        release_date: string,
        imageUrl?: string | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null >,
    nextToken?: string | null,
  } | null,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAlbumListMutationVariables = {
  input: CreateAlbumListInput,
  condition?: ModelAlbumListConditionInput | null,
};

export type CreateAlbumListMutation = {
  createAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAlbumListMutationVariables = {
  input: UpdateAlbumListInput,
  condition?: ModelAlbumListConditionInput | null,
};

export type UpdateAlbumListMutation = {
  updateAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAlbumListMutationVariables = {
  input: DeleteAlbumListInput,
  condition?: ModelAlbumListConditionInput | null,
};

export type DeleteAlbumListMutation = {
  deleteAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateListeningPileEntryMutationVariables = {
  input: CreateListeningPileEntryInput,
  condition?: ModelListeningPileEntryConditionInput | null,
};

export type CreateListeningPileEntryMutation = {
  createListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateListeningPileEntryMutationVariables = {
  input: UpdateListeningPileEntryInput,
  condition?: ModelListeningPileEntryConditionInput | null,
};

export type UpdateListeningPileEntryMutation = {
  updateListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteListeningPileEntryMutationVariables = {
  input: DeleteListeningPileEntryInput,
  condition?: ModelListeningPileEntryConditionInput | null,
};

export type DeleteListeningPileEntryMutation = {
  deleteListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
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
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAlbumListQueryVariables = {
  id: string,
};

export type GetAlbumListQuery = {
  getAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAlbumListsQueryVariables = {
  filter?: ModelAlbumListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlbumListsQuery = {
  listAlbumLists?:  {
    __typename: "ModelAlbumListConnection",
    items:  Array< {
      __typename: "AlbumList",
      id: string,
      albumId: string,
      listId: string,
      played: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetListeningPileEntryQueryVariables = {
  id: string,
};

export type GetListeningPileEntryQuery = {
  getListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListListeningPileEntriesQueryVariables = {
  filter?: ModelListeningPileEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListeningPileEntriesQuery = {
  listListeningPileEntries?:  {
    __typename: "ModelListeningPileEntryConnection",
    items:  Array< {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AlbumListsByAlbumIdAndIdQueryVariables = {
  albumId: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlbumListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AlbumListsByAlbumIdAndIdQuery = {
  albumListsByAlbumIdAndId?:  {
    __typename: "ModelAlbumListConnection",
    items:  Array< {
      __typename: "AlbumList",
      id: string,
      albumId: string,
      listId: string,
      played: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AlbumListsByListIdAndIdQueryVariables = {
  listId: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlbumListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AlbumListsByListIdAndIdQuery = {
  albumListsByListIdAndId?:  {
    __typename: "ModelAlbumListConnection",
    items:  Array< {
      __typename: "AlbumList",
      id: string,
      albumId: string,
      listId: string,
      played: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListeningPileEntriesByAlbumIdAndIdQueryVariables = {
  albumId: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelListeningPileEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListeningPileEntriesByAlbumIdAndIdQuery = {
  listeningPileEntriesByAlbumIdAndId?:  {
    __typename: "ModelListeningPileEntryConnection",
    items:  Array< {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    albums?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
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
    genres?: Array< string | null > | null,
    hideAlbum?: boolean | null,
    lists?:  {
      __typename: "ModelAlbumListConnection",
      nextToken?: string | null,
    } | null,
    ListeningPileEntry?:  {
      __typename: "ListeningPileEntry",
      id: string,
      albumId: string,
      order: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAlbumListSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumListFilterInput | null,
};

export type OnCreateAlbumListSubscription = {
  onCreateAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAlbumListSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumListFilterInput | null,
};

export type OnUpdateAlbumListSubscription = {
  onUpdateAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAlbumListSubscriptionVariables = {
  filter?: ModelSubscriptionAlbumListFilterInput | null,
};

export type OnDeleteAlbumListSubscription = {
  onDeleteAlbumList?:  {
    __typename: "AlbumList",
    id: string,
    albumId: string,
    listId: string,
    played: boolean,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    list:  {
      __typename: "List",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateListeningPileEntrySubscriptionVariables = {
  filter?: ModelSubscriptionListeningPileEntryFilterInput | null,
};

export type OnCreateListeningPileEntrySubscription = {
  onCreateListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateListeningPileEntrySubscriptionVariables = {
  filter?: ModelSubscriptionListeningPileEntryFilterInput | null,
};

export type OnUpdateListeningPileEntrySubscription = {
  onUpdateListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteListeningPileEntrySubscriptionVariables = {
  filter?: ModelSubscriptionListeningPileEntryFilterInput | null,
};

export type OnDeleteListeningPileEntrySubscription = {
  onDeleteListeningPileEntry?:  {
    __typename: "ListeningPileEntry",
    id: string,
    albumId: string,
    order: number,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      artist: string,
      spotifyUrl: string,
      release_date: string,
      imageUrl?: string | null,
      genres?: Array< string | null > | null,
      hideAlbum?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
