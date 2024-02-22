import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
let Login = () => {
  let [email, setEmail] = useState("truongkiet1822002@gmail.com");
  let [password, setPassword] = useState("");
  let userContext = useContext(UserContext);
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  let [LoginMessage, setLoginMessage] = useState("");
  let Navigate = useNavigate();
  let onLoginClick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirty[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          userContext.setUser({
            ...userContext.user,
            isLoginIn: true,
            currentUserId: responseBody[0]?.id,
            currentUserName: responseBody[0]?.fullname,
          });
          localStorage.setItem("isLogin", true);
          localStorage.setItem("userId", responseBody[0]?.id);
          localStorage.setItem("username", responseBody[0]?.fullname);

          Navigate("/dashboard");
        } else {
          setLoginMessage(
            <span className="text-danger">Invalid login, please try again</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-danger">Unnable to connect to json server</span>
        );
      }
    }
  };
  let validate = () => {
    let errorData = {};

    // email
    errorData.email = [];
    if (!email) {
      errorData.email.push("Email can't be blank");
    }

    const validateEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\w+([-.]\w+)*/;
    if (email) {
      if (!validateEmailRegex.test(email)) {
        errorData.email.push("Email not valid");
      }
    }

    // password
    errorData.password = [];
    if (!password) {
      errorData.password.push("Password can't be blank");
    }

    const validatePasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (password) {
      if (!validatePasswordRegex.test(password)) {
        errorData.password.push("Password should be 6 to 15 characters long");
      }
    }
    setErrors(errorData);
  };
  useEffect(validate, [email, password]);
  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };
  useEffect(() => {
    document.title = "Login - eCommerce";
  });
  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg-my-2">
          <div className="card-header border-bottom border-success">
            <h4>Login</h4>
            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
                // console.log(dirty[control]);
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>
          <div className="card-body card-bottom card-success">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={(event) => {
                  // console.log(event.target.name);
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />
              <div className="text-danger form-text">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />
              <div className="text-danger form-text">
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{LoginMessage}</div>
            <button className="btn btn-primary" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
