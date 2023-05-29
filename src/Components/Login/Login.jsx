import React from "react";

import "./Login.css";

export default function Login() {
  return (
    <>
      <h2 className="container__title">Личный кабинет</h2>

      <form className="row form-row" id="login-form" noValidate>
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
  );
}
