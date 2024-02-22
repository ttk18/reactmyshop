import React, { useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
let NavBar = () => {
  let _userContent = useContext(UserContext);
  let _navigate = useNavigate();

  let onLogOutClick = () => {
    _userContent.setUser({
      ..._userContent.user,
      isLoginIn: false,
      currentUserId: null,
      currentUserName: null,
    });
    _navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary bg-gradient">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            eCommerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {_userContent.user.isLoginIn ? (
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/dashboard">
                    <i className="fa fa-dashboard"></i> Dashboard
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {!_userContent.user.isLoginIn ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-light"
                    aria-current="page"
                    to="/"
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {!_userContent.user.isLoginIn ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link text-light"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          {_userContent.user.isLoginIn ? (
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    role="button"
                    className="nav-link dropdown-toggle text-light"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user-circle"></i>{" "}
                    {_userContent.user.currentUserName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={onLogOutClick}
                      >
                        LogOut
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
