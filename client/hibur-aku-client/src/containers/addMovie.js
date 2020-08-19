import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

const ADD_MOVIES = gql`
  mutation addMovies(
    $title: String
    $overview: String
    $poster_path: String
    $popularity: Int
    $tags: String
  ) {
    addMovie(
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

function AddMovie() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");
  const [showError, setShowError] = useState(false);
  const [addMovies, response] = useMutation(ADD_MOVIES, { errorPolicy: "all" });
  const { loading, error, data } = response;
  console.log(error, loading, data);

  function submitFormHandler(event) {
    event.preventDefault();
    if (title && overview && poster_path && popularity && tags) {
      addMovies({
        variables: {
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
      <h1>Add New Movie</h1>
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
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddMovie;
