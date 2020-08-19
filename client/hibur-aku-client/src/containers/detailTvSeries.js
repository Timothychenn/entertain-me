import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_TV_SERIES_ID = gql`
  query getTvSeriesId($_id: ID) {
    tvseriesId(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_TV_SERIES = gql`
  mutation deleteTvSeries($_id: ID) {
    deleteTvSeries(_id: $_id) {
      message
    }
  }
`;

function DetailTvSeries() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { data } = useQuery(GET_TV_SERIES_ID, { variables: { _id: id }, fetchPolicy: "no-cache" });
  const { title, overview, poster_path, popularity, tags } = data
    ? data.tvseriesId
    : {};
  const [deleteTvSeries, response] = useMutation(DELETE_TV_SERIES);

  function editHandler() {
    history.push(`${location.pathname}/edit`);
  }

  async function deleteHandler() {
    try {
      await deleteTvSeries({ variables: { _id: id } });
      console.log(response);
      history.push("/tvseries");
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

export default DetailTvSeries;
