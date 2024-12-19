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
    lists {
      nextToken
      __typename
    }
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
    lists {
      nextToken
      __typename
    }
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
    lists {
      nextToken
      __typename
    }
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
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      createdAt
      updatedAt
      __typename
    }
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
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      createdAt
      updatedAt
      __typename
    }
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
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAlbumListMutationVariables,
  APITypes.DeleteAlbumListMutation
>;
