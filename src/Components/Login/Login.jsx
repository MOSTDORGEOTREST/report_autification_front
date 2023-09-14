import React from "react";

import "./Login.css";
import { useRef } from "react";
import { useContext } from "react";
import Context from "../../context";
import { useEffect } from "react";
import Personal from "../Personal/Personal";

export default function Login() {
  const form = useRef();

  const { logged, setLogged } = useContext(Context);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}auth/user/`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (!response.ok) {
        setLogged(false);
      } else {
        setLogged(true);
      }
    });
  }, [setLogged]);

  function checkForm(username, password) {
    if (username === "" || password === "") {
      return false;
    } else {
      return true;
    }
  }

  function login(username, password, gotoUrl = null) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}auth/sign-in/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "X-Requested-With": "XMLHttpRequest",
      },
      body: `grant_type=password&username=${username}&password=${password}`,
    }).then((response) => {
      if (!response.ok) {
        setLogged(false);
        const inputs = document.querySelectorAll("#login-form input");
        inputs.forEach((input) => {
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");
        });
      } else {
        setLogged(true);
      }
    });
  }

  function formSbmt(event) {
    event.preventDefault();
    event.stopPropagation();

    const inputs = document.querySelectorAll("#login-form input");
    inputs.forEach((input) => {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    });

    if (!checkForm(form.current.username.value, form.current.password.value)) {
      inputs.forEach((input) => {
        input.classList.add("is-invalid");
      });
      return
    }

    login(form.current.username.value, form.current.password.value);
  }

  return (
    <>
      {!logged ? (
        <>
          <h2 className="container__title">Личный кабинет</h2>
          <form
            ref={form}
            className="row form-row"
            id="login-form"
            noValidate
            onSubmit={formSbmt}
          >
            <div className="col-12">
              <label for="username">Имя пользователя:</label>
              <input
                className="form-control"
                id="username"
                placeholder="Введите имя"
                aria-describedby="validationServer"
                required
              />
            </div>
            <div className="col-12">
              <label for="password">Пароль:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Введите пароль"
                aria-describedby="validationServer"
                required
              />
              <div id="validationServer" className="invalid-feedback">
                Не верные имя пользователя или пароль.
              </div>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success btn-test align-center"
                id="mdgt-btn"
              >
                Войти
              </button>
            </div>
          </form>
        </>
      ) : (
        <Personal/>
      )}
    </>
  );
}
