import { useCallback, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import { useEffect } from "react";


function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("");
  const [tickInterval,setTickInterval] = useState(null)
  const [jwtToken, setJwtToken] = useState(""); // Initialize jwtToken state with value from localStorage
  const navigate = useNavigate();
  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include"
    }
    fetch(`/logout`,requestOptions)
    .catch(error => {
      console.log("error logging out",error)
    })
    .finally(() => {
      setJwtToken("")
      toggleRefresh(false)
    })
    navigate("/login")
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      console.log("turning on ticking");
      let i  = setInterval(() => {

        const requestOptions = {
          method: "GET",
          credentials: "include",
        }

        fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token)
          }
        })
        .catch(error => {
          console.log("user is not logged in",error);
        })
      }, 60000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
    } else {
      console.log("turning off ticking");
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])
 useEffect(() => {

  
    // Fetch token on component mount if not already present
    if (!jwtToken) {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token)
            toggleRefresh(true);
          }
        })
        .catch(error => {
          console.log("Error fetching token:", error);
          // Optionally handle error
        });
    }
  }, [jwtToken, toggleRefresh]);
  
 
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <Link to="/login">
              <span className="mt-3 btn btn-md btn-primary">Login</span>
            </Link>
          ) : (
            <a href="#!" onClick={logOut}>
              <span className="mt-3 btn btn-md btn-danger">Logout</span>
            </a>
          )}
        </div>
        <hr />
      </div>

      <div className="row">
        <div className="col-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/movies"
                className="list-group-item list-group-item-action"
              >
                Movies
              </Link>
              <Link
                to="/genres"
                className="list-group-item list-group-item-action"
              >
                Genres
              </Link>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/admin/movie/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/manage-catalogue"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Catalog
                  </Link>
                  <Link
                    to="/graphql"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-10">
          <Alert message={alertMessage} className={alertClassName} />

          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertMessage,
              setAlertClassName,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
