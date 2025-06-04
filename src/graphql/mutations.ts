/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
    __generatedMutationInput: InputType;
    __generatedMutationOutput: OutputType;
};

export const addAlbumToList = /* GraphQL */ `mutation AddAlbumToList($albumId: ID!, $listId: ID!) {
  addAlbumToList(albumId: $albumId, listId: $listId) {
    id
    name
    albums {
      nextToken
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.AddAlbumToListMutationVariables,
    APITypes.AddAlbumToListMutation
>;
export const createList = /* GraphQL */ `mutation CreateList(
  $input: CreateListInput!
  $condition: ModelListConditionInput
) {
  createList(input: $input, condition: $condition) {
    id
    name
    albums {
      nextToken
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateListMutationVariables,
    APITypes.CreateListMutation
>;
export const updateList = /* GraphQL */ `mutation UpdateList(
  $input: UpdateListInput!
  $condition: ModelListConditionInput
) {
  updateList(input: $input, condition: $condition) {
    id
    name
    albums {
      nextToken
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateListMutationVariables,
    APITypes.UpdateListMutation
>;
export const deleteList = /* GraphQL */ `mutation DeleteList(
  $input: DeleteListInput!
  $condition: ModelListConditionInput
) {
  deleteList(input: $input, condition: $condition) {
    id
    name
    albums {
      nextToken
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteListMutationVariables,
    APITypes.DeleteListMutation
>;
export const createAlbum = /* GraphQL */ `mutation CreateAlbum(
  $input: CreateAlbumInput!
  $condition: ModelAlbumConditionInput
) {
  createAlbum(input: $input, condition: $condition) {
    id
    name
    artist
    spotifyUrl
    release_date
    imageUrl
    genres
    hideAlbum
    lists {
      nextToken
      __typename
    }
    ListeningPileEntry {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateAlbumMutationVariables,
    APITypes.CreateAlbumMutation
>;
export const updateAlbum = /* GraphQL */ `mutation UpdateAlbum(
  $input: UpdateAlbumInput!
  $condition: ModelAlbumConditionInput
) {
  updateAlbum(input: $input, condition: $condition) {
    id
    name
    artist
    spotifyUrl
    release_date
    imageUrl
    genres
    hideAlbum
    lists {
      nextToken
      __typename
    }
    ListeningPileEntry {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateAlbumMutationVariables,
    APITypes.UpdateAlbumMutation
>;
export const deleteAlbum = /* GraphQL */ `mutation DeleteAlbum(
  $input: DeleteAlbumInput!
  $condition: ModelAlbumConditionInput
) {
  deleteAlbum(input: $input, condition: $condition) {
    id
    name
    artist
    spotifyUrl
    release_date
    imageUrl
    genres
    hideAlbum
    lists {
      nextToken
      __typename
    }
    ListeningPileEntry {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteAlbumMutationVariables,
    APITypes.DeleteAlbumMutation
>;
export const createAlbumList = /* GraphQL */ `mutation CreateAlbumList(
  $input: CreateAlbumListInput!
  $condition: ModelAlbumListConditionInput
) {
  createAlbumList(input: $input, condition: $condition) {
    id
    albumId
    listId
    played
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateAlbumListMutationVariables,
    APITypes.CreateAlbumListMutation
>;
export const updateAlbumList = /* GraphQL */ `mutation UpdateAlbumList(
  $input: UpdateAlbumListInput!
  $condition: ModelAlbumListConditionInput
) {
  updateAlbumList(input: $input, condition: $condition) {
    id
    albumId
    listId
    played
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateAlbumListMutationVariables,
    APITypes.UpdateAlbumListMutation
>;
export const deleteAlbumList = /* GraphQL */ `mutation DeleteAlbumList(
  $input: DeleteAlbumListInput!
  $condition: ModelAlbumListConditionInput
) {
  deleteAlbumList(input: $input, condition: $condition) {
    id
    albumId
    listId
    played
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteAlbumListMutationVariables,
    APITypes.DeleteAlbumListMutation
>;
export const createListeningPileEntry = /* GraphQL */ `mutation CreateListeningPileEntry(
  $input: CreateListeningPileEntryInput!
  $condition: ModelListeningPileEntryConditionInput
) {
  createListeningPileEntry(input: $input, condition: $condition) {
    id
    albumId
    order
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateListeningPileEntryMutationVariables,
    APITypes.CreateListeningPileEntryMutation
>;
export const updateListeningPileEntry = /* GraphQL */ `mutation UpdateListeningPileEntry(
  $input: UpdateListeningPileEntryInput!
  $condition: ModelListeningPileEntryConditionInput
) {
  updateListeningPileEntry(input: $input, condition: $condition) {
    id
    albumId
    order
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateListeningPileEntryMutationVariables,
    APITypes.UpdateListeningPileEntryMutation
>;
export const deleteListeningPileEntry = /* GraphQL */ `mutation DeleteListeningPileEntry(
  $input: DeleteListeningPileEntryInput!
  $condition: ModelListeningPileEntryConditionInput
) {
  deleteListeningPileEntry(input: $input, condition: $condition) {
    id
    albumId
    order
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteListeningPileEntryMutationVariables,
    APITypes.DeleteListeningPileEntryMutation
>;
