/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAlbum = /* GraphQL */ `mutation CreateAlbum(
  $input: CreateAlbumInput!
  $condition: ModelAlbumConditionInput
) {
  createAlbum(input: $input, condition: $condition) {
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
    imageUrl
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
    imageUrl
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAlbumMutationVariables,
  APITypes.DeleteAlbumMutation
>;
