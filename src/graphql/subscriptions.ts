/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAlbum = /* GraphQL */ `subscription OnCreateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
  onCreateAlbum(filter: $filter) {
    id
    name
    artist
    spotifyUrl
    imageUrl
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
    imageUrl
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
    imageUrl
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAlbumSubscriptionVariables,
  APITypes.OnDeleteAlbumSubscription
>;
