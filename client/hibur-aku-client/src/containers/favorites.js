import React from "react";
import { GET_FAVORITE_MOVIES } from "../config/apollo";
import { useQuery } from "@apollo/client";
import FavoriteCard from "../components/favoriteCard";

function Favorite() {
  const { data } = useQuery(GET_FAVORITE_MOVIES);

  return (
    <section className="container">
      <h1>Favorite Movies</h1>
      <div className="container-card">
        {data.favoriteMovies.length > 0 ? (
          data.favoriteMovies.map((movie) => (
            <FavoriteCard movie={movie} key={movie._id} />
          ))
        ) : (
          <h2 style={{ alignItems: "center", width: "100%" }}>Empty movies</h2>
        )}
      </div>
    </section>
  );
}

export default Favorite;
