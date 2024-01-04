import React, { useState } from "react";
import Input from "./form/input";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setJwtToken} = useOutletContext();
  const {setAlertClassName} = useOutletContext();
  const {setAlertMessage} = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email/pass",email,password)
    if (email == "nurfirdaus@gmail.com" && password == "password") {
      setJwtToken("abc")  
      setAlertClassName("d-none")
      setAlertMessage("")
      navigate("/")
    }else{
      setAlertClassName("alert-danger")
      setAlertMessage("Email or Password wrong!")

    }
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
