const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: String
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: String
  }

  type Response {
    message: String
  }

  type Query {
    movie(_id: ID): Movie
    movies: [Movie]
    tvseriesId(_id: ID): TvSeries
    tvseries: [TvSeries]
  }

  type Mutation {
    addMovie(
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: String
    ): Response

    updateMovie(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: String
    ): Response

    deleteMovie(_id: ID): Response

    addTvSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: String
    ): Response

    updateTvSeries(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: String
    ): Response

    deleteTvSeries(_id: ID): Response
  }
`;

const resolvers = {
  Query: {
    async movies() {
      const response = await axios.get("http://localhost:3001/movies");
      return response.data.movies;
    },
    async movie(parent, args) {
      const { _id } = args;
      const response = await axios.get(`http://localhost:3001/movies/${_id}`);
      return response.data.movies;
    },
    async tvseries() {
      const response = await axios.get("http://localhost:3002/tvseries");
      return response.data.tvSeries;
    },
    async tvseriesId(parent, args) {
        const { _id } = args;
        const response = await axios.get(`http://localhost:3002/tvseries/${_id}`);
        return response.data.tvSeries;
      },
  },
  Mutation: {
    async addMovie(parent, args) {
      const { title, overview, poster_path, popularity, tags } = args;

      const response = await axios.post("http://localhost:3001/movies", {
        title,
        overview,
        poster_path,
        popularity,
        tags: `["${tags}"]`,
      });

      return response.data;
    },
    async updateMovie(parent, args) {
      const { _id, title, overview, poster_path, popularity, tags } = args;

      const response = await axios.put(`http://localhost:3001/movies/${_id}`, {
        title,
        overview,
        poster_path,
        popularity,
        tags: `["${tags}"]`,
      });

      return response.data;
    },
    async deleteMovie(parent, args) {
      const { _id } = args;

      const response = await axios.delete(
        `http://localhost:3001/movies/${_id}`
      );

      return response.data;
    },
    async addTvSeries(parent, args) {
      const { title, overview, poster_path, popularity, tags } = args;

      const response = await axios.post("http://localhost:3002/tvseries", {
        title,
        overview,
        poster_path,
        popularity,
        tags: `["${tags}"]`,
      });

      return response.data;
    },
    async updateTvSeries(parent, args) {
      const { _id, title, overview, poster_path, popularity, tags } = args;

      const response = await axios.put(
        `http://localhost:3002/tvseries/${_id}`,
        {
          title,
          overview,
          poster_path,
          popularity,
          tags: `["${tags}"]`,
        }
      );

      return response.data;
    },
    async deleteTvSeries(parent, args) {
      const { _id } = args;

      const response = await axios.delete(
        `http://localhost:3002/tvseries/${_id}`
      );

      return response.data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
