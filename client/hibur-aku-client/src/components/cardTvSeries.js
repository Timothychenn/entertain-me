import React from "react";
import { useHistory } from "react-router-dom";

function CardTvSeries(props) {
  const { _id, title, poster_path } = props.tvseries;
  const history = useHistory();

  function detailHandler() {
    history.push(`/tvseries/${_id}`);
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
      </div>
    </div>
  );
}

export default CardTvSeries;
