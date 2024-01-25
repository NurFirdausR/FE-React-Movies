import React, { useState } from "react";
import Input from "./form/Input";
import { useNavigate,  useOutletContext } from "react-router-dom";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setJwtToken} = useOutletContext();
  const {setAlertClassName} = useOutletContext();
  const {setAlertMessage} = useOutletContext();
  const {toggleRefresh} = useOutletContext();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // build the request payload
    let payload =  {
      email: email,
      password: password,
    }

    const requestOptions = {
      method: "POST",
      header: {
        "Content-Type" : "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload)
    }

    fetch(`${process.env.REACT_APP_BACKEND}/authenticate`,requestOptions)
    .then((response) => response.json())
    .then((data) =>{
        if (data.error) {
            setAlertClassName("alert-danger")
            setAlertMessage(data.message)
        }else{
          setJwtToken(data.access_token)
         setAlertClassName("d-none")
         setAlertMessage("")
         toggleRefresh(true)
         navigate("/")
        }
    }).catch(error => {
      setAlertClassName("alert-danger")
      setAlertMessage(error.message)

    })
  };
  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            title="Email Address"
            type="email"
            className="form-control"
            name="email"
            autoComplete="email-new"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            title="Password"
            type="password"
            className="form-control"
            name="password"
            autoComplete="password-new"
            onChange={(e) => setPassword(e.target.value)}
          />
          <hr />
          <Input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
