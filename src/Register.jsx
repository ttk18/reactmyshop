import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

let Register = () => {
  let userContext = useContext(UserContext);
  let Navigate = useNavigate();
  let [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfbirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: "",
  });

  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USE" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "Japan" },
    { id: 5, countryName: "France" },
    { id: 6, countryName: "Brazil" },
    { id: 7, countryName: "Mexico" },
  ]);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfbirth: [],
    gender: [],
    country: [],
    receiveNewsLetters: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfbirth: false,
    gender: false,
    country: false,
    receiveNewsLetters: false,
  });

  let [messages, setMessages] = useState("");

  let validate = () => {
    let errorData = {};
    // email
    errorData.email = [];
    if (!state.email) {
      errorData.email.push("Email can't be blank");
    }

    const validateEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\w+([-.]\w+)*/;
    if (state.email) {
      if (!validateEmailRegex.test(state.email)) {
        errorData.email.push("Email not valid");
      }
    }

    // password
    errorData.password = [];
    if (!state.password) {
      errorData.password.push("Password can't be blank");
    }

    const validatePasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (state.password) {
      if (!validatePasswordRegex.test(state.password)) {
        errorData.password.push("Password should be 6 to 15 characters long");
      }
    }
    // fullName
    errorData.fullName = [];
    if (!state.fullName) {
      errorData.fullName.push("Full Name can't be blank");
    }

    // dateOfbirth
    errorData.dateOfbirth = [];
    if (!state.dateOfbirth) {
      errorData.dateOfbirth.push("Date of Birth can't be blank");
    }

    // gender
    errorData.gender = [];
    if (!state.gender) {
      errorData.gender.push("Please select gender");
    }

    // country
    errorData.country = [];
    if (!state.country) {
      errorData.country.push("Please select country");
    }

    setErrors(errorData);
  };

  let onRegisterClick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      let response = await fetch("http://localhost:5005/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dateOfbirth: state.dateOfbirth,
          gender: state.gender,
          country: state.country,
          receiveNewsLetters: state.receiveNewsLetters,
        }),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        setMessages(
          <span className="text-success">Successfully Registered</span>
        );
        let responseBody = await response.json();
        userContext.setUser({
          ...userContext.user,
          isLoginIn: true,
          currentUserId: responseBody[0]?.id,
          currentUserName: responseBody[0]?.fullname,
        });
        localStorage.setItem("isLogin", true);
        localStorage.setItem("userId", responseBody[0]?.id);
        localStorage.setItem("username", responseBody[0]?.fullname);
        setTimeout(() => {
          Navigate("/dashboard");
        }, 3000);
      } else {
        setMessages(
          <span className="text-danger">Errors in databbase connection</span>
        );
      }
    } else {
      setMessages(<span className="text-danger">Errors</span>);
    }
  };

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
    document.title = "Register - eCommerce";
  });

  useEffect(validate, [state]);

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-primary text-center"
            >
              Register
            </h4>
            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
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
          <div className="card-body border-bottom border-primary">
            <div className="row mb-2">
              <label htmlFor="email" className="col-lg-4">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={state.email}
                  name="email"
                  id="email"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger form-text">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="password" className="col-lg-4">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={state.password}
                  name="password"
                  id="password"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
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
            <div className="row mb-2">
              <label htmlFor="fullName" className="col-lg-4">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={state.fullName}
                  name="fullName"
                  id="fullName"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger form-text">
                  {dirty["fullName"] && errors["fullName"][0]
                    ? errors["fullName"]
                    : ""}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="dateOfbirth" className="col-lg-4">
                Date of birth
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  value={state.dateOfbirth}
                  name="dateOfbirth"
                  id="dateOfbirth"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger form-text">
                  {dirty["dateOfbirth"] && errors["dateOfbirth"][0]
                    ? errors["dateOfbirth"]
                    : ""}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="" className="col-lg-4">
                Gender
              </label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="male"
                    name="gender"
                    id="male"
                    checked={state.gender === "male" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />
                  <label htmlFor="male" className="form-check-inline">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="female"
                    name="gender"
                    id="female"
                    checked={state.gender === "female" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />
                  <label htmlFor="female" className="form-check-inline">
                    Female
                  </label>
                </div>
                <div className="text-danger form-text">
                  {dirty["gender"] && errors["gender"][0]
                    ? errors["gender"]
                    : ""}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="country" className="col-lg-4">
                Country
              </label>
              <div className="col-lg-8">
                <select
                  className="form-control"
                  value={state.country}
                  name="country"
                  id="country"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                >
                  <option>Please select country</option>
                  {countries.map((items) => {
                    return (
                      <option key={items.id} value={items.id}>
                        {items.countryName}
                      </option>
                    );
                  })}
                </select>
                <div className="text-danger form-text">
                  {dirty["country"] && errors["country"][0]
                    ? errors["country"]
                    : ""}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="" className="col-lg-4"></label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="true"
                    name="receiveNewsLetters"
                    id="receiveNewsLetters"
                    checked={state.receiveNewsLetters === true ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.checked,
                      });
                    }}
                  />
                  <label
                    htmlFor="receiveNewsLetters"
                    className="form-check-inline"
                  >
                    Receive News Letters
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer border-primary text-center">
            <div className="m-1">{messages}</div>
            <div className="btn btn-primary m-2" onClick={onRegisterClick}>
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
