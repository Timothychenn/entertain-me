import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

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

const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $_id: ID
    $title: String
    $overview: String
    $poster_path: String
    $popularity: Int
    $tags: String
  ) {
    updateMovie(
      _id: $_id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      message
    }
  }
`;

function EditMovie() {
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const { data } = useQuery(GET_MOVIES_ID, { variables: { _id: id }, fetchPolicy: 'no-cache' });

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");
  const [showError, setShowError] = useState(false);

  const [updateMovie, response] = useMutation(UPDATE_MOVIE, {
    errorPolicy: "all",
  });
  console.log(response)

  useEffect(() => {
    if (data) {
      setTitle(data.movie.title);
      setOverview(data.movie.overview);
      setPoster_path(data.movie.poster_path);
      setPopularity(data.movie.popularity);
      setTags(JSON.parse(data.movie.tags)[0]);
    }
  }, [data]);

  function submitFormHandler(e) {
    e.preventDefault();
    if (title && overview && poster_path && popularity && tags) {
      updateMovie({
        variables: {
          _id: id,
          title,
          overview,
          poster_path,
          popularity: Number(popularity),
          tags,
        },
      });
      history.push("/movies");
    } else {
      setShowError(true);
    }
  }

  function dismissAlert() {
    setShowError(false);
  }

  return (
    <>
      {showError && <ErrorMessage dismissAlert={dismissAlert} />}
      <h1>Update Movie</h1>
      <div className="container-form">
        <form onSubmit={submitFormHandler}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Overview</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setOverview(e.target.value);
              }}
              value={overview}
            />
          </div>
          <div className="form-group">
            <label>Poster Path</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setPoster_path(e.target.value);
              }}
              value={poster_path}
            />
          </div>
          <div className="form-group">
            <label>Popularity</label>
            <input
              type="number"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setPopularity(e.target.value);
              }}
              value={popularity}
            />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setTags(e.target.value);
              }}
              value={tags}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary center">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditMovie;
