import React from 'react'
import { Link } from 'react-router-dom'
const Navtop = ({ jwtToken, logOut })=> {
    
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-transparant ">
        <div className="container-fluid m-2">
          <Link className="navbar-brand text-light fw-bold" to="#">
            GoMovies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            GoMovies
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link to="/" className=" text-light list-group-item list-group-item-action">
                  Home
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  to="/movies"
                  className=" text-light list-group-item list-group-item-action"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  to="/genres"
                  className=" text-light list-group-item list-group-item-action"
                >
                  Genres
                </Link>
              </li>
              {jwtToken !== "" && (
                <>
                  <li className="nav-item me-5">
                    <Link
                      to="/admin/movie/0"
                      className="text-light list-group-item list-group-item-action"
                    >
                      Add Movie
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link
                      to="/manage-catalogue"
                      className="text-light list-group-item list-group-item-action"
                    >
                      Manage Catalog
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link
                      to="/graphql"
                      className="text-light list-group-item list-group-item-action"
                    >
                      Search
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex">
              {jwtToken === "" ? (
                <Link to="/login">
                  <span className="btn btn-md btn-secondary fw-bold">Login</span>
                </Link>
              ) : (
                <a href="#!" onClick={logOut}>
                  <span className="btn btn-md btn-danger">Logout</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navtop