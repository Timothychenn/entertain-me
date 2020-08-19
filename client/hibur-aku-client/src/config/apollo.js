import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://54.254.192.114:4000/",
  cache: new InMemoryCache(),
});

export const GET_FAVORITE_MOVIES = gql`
  query {
    favoriteMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_FAVORITE_TV_SERIES = gql`
  query {
    favoriteTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

client.writeQuery({
  query: GET_FAVORITE_MOVIES,
  data: {
    favoriteMovies: [],
  },
});

export default client;
