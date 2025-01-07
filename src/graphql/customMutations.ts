export const togglePlayed = /* GraphQL */ `
mutation TogglePlayed($id: ID!, $played: Boolean!) {
    updateAlbumList(input: { id: $id, played: $played }) {
      id
      played
    }
  }
`;