export const togglePlayed = /* GraphQL */ `
mutation TogglePlayed($id: ID!, $played: Boolean!) {
    updateAlbumList(input: { id: $id, played: $played }) {
      id
      played
    }
  }
`;

export const toggleHidden = /* GraphQL */ `
  mutation ToggleAlbumHidden($id: ID!, $hideAlbum: Boolean!) {
    updateAlbum(input: { id: $id, hideAlbum: $hideAlbum }) {
      id
      hideAlbum
    }
  }
`;