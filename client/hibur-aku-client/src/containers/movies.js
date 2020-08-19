import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./style.css";
import CardMovie from "../components/cardMovie";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES,
    {fetchPolicy: 'no-cache'}
    );
  
  return (
    <>
      <section className="container">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Internal Server Error</h1>}
        <h1>Movies</h1>
        <div className="container-card">
          {data &&
            data.movies.map((movie) => <CardMovie movie={movie} key={movie._id} />)}
        </div>
      </section>
    </>
  );
}


