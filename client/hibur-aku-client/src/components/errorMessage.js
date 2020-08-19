import React from "react";

function ErrorMessage(props) {
  const { dismissAlert } = props;
  return (
    <div className="container" style={{justifyContent: "center", width: "80%" }}>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Please fill all the required field!</strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={dismissAlert}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
