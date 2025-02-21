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
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
export const onCreateAlbumList = /* GraphQL */ `subscription OnCreateAlbumList($filter: ModelSubscriptionAlbumListFilterInput) {
  onCreateAlbumList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAlbumListSubscriptionVariables,
  APITypes.OnCreateAlbumListSubscription
>;
export const onUpdateAlbumList = /* GraphQL */ `subscription OnUpdateAlbumList($filter: ModelSubscriptionAlbumListFilterInput) {
  onUpdateAlbumList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAlbumListSubscriptionVariables,
  APITypes.OnUpdateAlbumListSubscription
>;
export const onDeleteAlbumList = /* GraphQL */ `subscription OnDeleteAlbumList($filter: ModelSubscriptionAlbumListFilterInput) {
  onDeleteAlbumList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAlbumListSubscriptionVariables,
  APITypes.OnDeleteAlbumListSubscription
>;
export const onCreateListeningPileEntry = /* GraphQL */ `subscription OnCreateListeningPileEntry(
  $filter: ModelSubscriptionListeningPileEntryFilterInput
) {
  onCreateListeningPileEntry(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateListeningPileEntrySubscriptionVariables,
  APITypes.OnCreateListeningPileEntrySubscription
>;
export const onUpdateListeningPileEntry = /* GraphQL */ `subscription OnUpdateListeningPileEntry(
  $filter: ModelSubscriptionListeningPileEntryFilterInput
) {
  onUpdateListeningPileEntry(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateListeningPileEntrySubscriptionVariables,
  APITypes.OnUpdateListeningPileEntrySubscription
>;
export const onDeleteListeningPileEntry = /* GraphQL */ `subscription OnDeleteListeningPileEntry(
  $filter: ModelSubscriptionListeningPileEntryFilterInput
) {
  onDeleteListeningPileEntry(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteListeningPileEntrySubscriptionVariables,
  APITypes.OnDeleteListeningPileEntrySubscription
>;
