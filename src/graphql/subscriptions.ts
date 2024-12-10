/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateList = /* GraphQL */ `subscription OnCreateList($filter: ModelSubscriptionListFilterInput) {
  onCreateList(filter: $filter) {
    id
    name
    albums {
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
    createdAt
    updatedAt
    albumListsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateListSubscriptionVariables,
  APITypes.OnCreateListSubscription
>;
export const onUpdateList = /* GraphQL */ `subscription OnUpdateList($filter: ModelSubscriptionListFilterInput) {
  onUpdateList(filter: $filter) {
    id
    name
    albums {
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
    createdAt
    updatedAt
    albumListsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateListSubscriptionVariables,
  APITypes.OnUpdateListSubscription
>;
export const onDeleteList = /* GraphQL */ `subscription OnDeleteList($filter: ModelSubscriptionListFilterInput) {
  onDeleteList(filter: $filter) {
    id
    name
    albums {
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
    createdAt
    updatedAt
    albumListsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteListSubscriptionVariables,
  APITypes.OnDeleteListSubscription
>;
export const onCreateAlbum = /* GraphQL */ `subscription OnCreateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
  onCreateAlbum(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAlbumSubscriptionVariables,
  APITypes.OnCreateAlbumSubscription
>;
export const onUpdateAlbum = /* GraphQL */ `subscription OnUpdateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
  onUpdateAlbum(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAlbumSubscriptionVariables,
  APITypes.OnUpdateAlbumSubscription
>;
export const onDeleteAlbum = /* GraphQL */ `subscription OnDeleteAlbum($filter: ModelSubscriptionAlbumFilterInput) {
  onDeleteAlbum(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAlbumSubscriptionVariables,
  APITypes.OnDeleteAlbumSubscription
>;
