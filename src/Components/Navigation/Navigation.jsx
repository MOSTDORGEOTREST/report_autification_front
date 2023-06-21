import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import Login from "../Login/Login";

import "./Navigation.css";

import logo from "./logo.png";

import Home from "../Home/Home";
// import NotFound from '../NotFound/NotFound'

export default function Navigation() {
  const [toggleNav, setToggleNav] = useState(false);

  function openNav() {
    // const body = document.getElementById('body')
    // body.classList.add('body-hidden')
    setToggleNav(true);
  }

  function closeNav() {
    // const body = document.getElementById('body')
    // body.classList.remove('body-hidden')
    setToggleNav(false);
  }

  function wrapperClick(event) {
    // console.log(event.target, event.currentTarget)
    if (event.target === event.currentTarget) {
      closeNav();
    }
  }

  const scrollWithOffset = (el) => {
    const elementPosition = el.offsetTop - 30;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="wrapper">
      <header className="navbar-mdgt">
        <nav className="container-fluid-mdgt container-mdgt">
          <NavLink to="#" className="navbar-brand">
            <img className="navbar-brand__icon" src={logo} alt="Логотип" />
          </NavLink>

          <div
            className={
              toggleNav
                ? "navbar-collapse-wrapper navbar-collapse-wrapper-show"
                : "navbar-collapse-wrapper"
            }
            id="navbar-collapse-wrapper"
            onClick={wrapperClick}
          >
            <div
              className={
                toggleNav
                  ? "navbar-collapse navbar-collapse-show"
                  : "navbar-collapse"
              }
              id="navbar-collapse"
            >
              <ul className="navbar-nav" onClick={wrapperClick}>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={closeNav}>
                    Главная
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavHashLink
                    className="nav-link"
                    smooth
                    to="/#about"
                    onClick={closeNav}
                    scroll={(el) => scrollWithOffset(el)}

                  >
                    Описание проекта
                  </NavHashLink>
                </li>

                <li className="nav-item">
                  <NavHashLink
                    className="nav-link"
                    smooth
                    to="/#license"
                    onClick={closeNav}
                    scroll={(el) => scrollWithOffset(el)}

                  >
                    Покупка
                  </NavHashLink>
                </li>

                <li className="nav-item">
                  <NavHashLink
                    className="nav-link"
                    smooth
                    to="/#contact"
                    onClick={closeNav}
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    Контакты
                  </NavHashLink>
                </li>
                <li className="nav-item">
                  <NavHashLink
                    className="nav-link"
                    smooth
                    to="/login"
                    onClick={closeNav}
                  >
                    Личный кабинет
                  </NavHashLink>
                </li>
                <li className="nav-item">
                  <NavHashLink
                    className="nav-link"
                    smooth
                    to="/login"
                    onClick={closeNav}
                    scroll={(el) => scrollWithOffset(el)}

                  >
                    Личный кабинет
                  </NavHashLink>
                </li>
              </ul>

              <div className="nav__close" id="nav-close" onClick={closeNav}>
                <i className="ri-close-line"></i>
              </div>
            </div>
          </div>

          <div className="nav__toggle" id="nav-toggle" onClick={openNav}>
            <i className="ri-menu-line"></i>
          </div>
        </nav>
      </header>

      <div className="content__container container-mdgt">
        {/* <h2 class="container__title">
					{% block content_title %} {% endblock %}
				</h2> */}
        <>
        <Routes>
            <Route
              path="/"
              element={<Home />}
              errorElement={<div>Error!</div>}
            />
            <Route 
              path="/login"
              element={<Login />}
              errorElement={<div>Error!</div>}
            />
            {/* 404 Page */}
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </>
      </div>
    </div>
  );
}
