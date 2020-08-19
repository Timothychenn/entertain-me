import React from "react";
import { useHistory } from "react-router-dom";
import client, { GET_FAVORITE_MOVIES } from "../config/apollo";

function CardMovie(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.movie;
  const history = useHistory();

  function detailHandler() {
    history.push(`/movies/${_id}`);
  }

  function favoriteHandler() {
    const { favoriteMovies } = client.readQuery({ query: GET_FAVORITE_MOVIES });
    console.log(favoriteMovies);
    client.writeQuery({
      query: GET_FAVORITE_MOVIES,
      data: {
        favoriteMovies: [
          ...favoriteMovies,
          {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        ],
      },
    });
  }

  return (
    <div
      className="card border-dark mb-3"
      style={{ width: "225px", height: "450px" }}
    >
      <img
        src={poster_path}
        className="card-img-top"
        alt="..."
        style={{ height: "300px" }}
      />
      <div className="card-body" style={{ padding: "10px", marginTop: "10px" }}>
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={detailHandler}>
        <i className="fa fa-info fa-lg" aria-hidden="true"></i>
        </button>
        <button className="btn btn-danger" onClick={favoriteHandler}>
        <i className="fa fa-star" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default CardMovie;
