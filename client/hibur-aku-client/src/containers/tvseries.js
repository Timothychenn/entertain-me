import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./style.css";
import CardTvSeries from "../components/cardTvSeries";

const GET_TV_SERIES = gql`
  query getTvSeries {
    tvseries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function TvSeries() {
  const { error, loading, data } = useQuery(GET_TV_SERIES, {fetchPolicy: 'no-cache'});

  return (
    <>
      <section className="container">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Internal Server Error</h1>}
        <h1>Tv Series</h1>
        <div className="container-card">
          {data &&
            data.tvseries.map((tvseries) => <CardTvSeries tvseries={tvseries} key={tvseries._id} />)}
        </div>
      </section>
    </>
  );
}

export default TvSeries;
