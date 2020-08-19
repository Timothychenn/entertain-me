import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_MOVIES_ID = gql`
  query getMoviesId($_id: ID) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      message
    }
  }
`;

function DetailMovie() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { data } = useQuery(GET_MOVIES_ID, { variables: { _id: id }, fetchPolicy: 'no-cache' });
  const { title, overview, poster_path, popularity, tags } = data
    ? data.movie
    : {};
  const [deleteMovie, response] = useMutation(DELETE_MOVIE);

  function editHandler() {
    history.push(`${location.pathname}/edit`, { id: id });
  }

  async function deleteHandler() {
    try {
      await deleteMovie({ variables: { _id: id } });
      console.log(response);
      history.push("/movies");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="card mb-3" style={{ maxWidth: "800px" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={poster_path} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <p className="card-text">
                <small className="text-muted">Overview</small>
              </p>
              <p className="card-text">{overview}</p>
              <p className="card-text">
                <small className="text-muted">Popularity</small>
              </p>
              <p className="card-text">{popularity}</p>
              <p className="card-text">
                <small className="text-muted">Tags</small>
              </p>
              <p className="card-text">{tags}</p>
            </div>
            <div className="container-button">
              <button className="btn btn-primary" onClick={editHandler}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMovie;
