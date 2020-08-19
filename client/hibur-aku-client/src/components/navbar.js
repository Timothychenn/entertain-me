import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";

function Navbar() {
  return (
    <section id="nav-bar">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="logo"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ACTION
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/addmovie">
                  Add Movie
                </Link>
                <Link className="dropdown-item" to="/addtvseries">
                  Add Tv Series
                </Link>
              </div>
            </li>
            <li className="nav-item active">
              <Link to="/movies" className="nav-link">
                MOVIES <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/tvseries" className="nav-link">
                TV SERIES <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/favorite" className="nav-link">
                FAVORITES <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
