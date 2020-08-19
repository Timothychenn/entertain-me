import React from "react";
import client, {GET_FAVORITE_MOVIES} from '../config/apollo'

function FavoriteCard(props) {
  const { _id, title, poster_path } = props.movie;

  function removeHandler() {
    const {favoriteMovies} = client.readQuery({query: GET_FAVORITE_MOVIES})
    const filteredMovies = favoriteMovies.filter(movie => movie._id !== _id)
    client.writeQuery({
      query: GET_FAVORITE_MOVIES,
      data: {
        favoriteMovies: filteredMovies,
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
        <button className="btn btn-danger" onClick={removeHandler}>
        <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default FavoriteCard;
