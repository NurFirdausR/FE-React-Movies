import { useCallback, useState } from "react";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import { useEffect } from "react";
import Navtop from "./components/Navtop";
import bgimage from "./images/background.jpg"
function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("");
  const [tickInterval, setTickInterval] = useState(null);
  const [jwtToken, setJwtToken] = useState(""); // Initialize jwtToken state with value from localStorage
  const navigate = useNavigate();
  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });
    navigate("/login");
  };
    const location = useLocation();

  if (location.pathname === '/login') {
      if (jwtToken) {
        navigate("/");
      }
  }

  const toggleRefresh = useCallback(
    (status) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };

          fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user is not logged in", error);
            });
        }, 60000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );
  useEffect(() => {
    // Fetch token on component mount if not already present
    if (!jwtToken) {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log("Error fetching token:", error);
          // Optionally handle error
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="text-light bg-image"     style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', // Ensures the background covers at least the full viewport height
      width: '100vw',
    }}>
  
      <Navtop jwtToken={jwtToken} logOut={logOut} />
      
      <div >
        <div >
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
