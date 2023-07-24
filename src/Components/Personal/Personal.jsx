import React, { useState } from "react";

import "./Personal.css";
import { useRef } from "react";
import { useContext } from "react";
import Context from "../../context";
import { useEffect } from "react";

export default function Personal() {
  const { logged } = useContext(Context);

  const [userData, setUserData] = useState(null);
  const [reportsCount, setReportsCount] = useState(0);

  const [pageLim, setPageLim] = useState(10);
  const [page, setPage] = useState(0);

  const [objects, setObjects] = useState(null);
  const [objectsData, setObjectsData] = useState(null);

  const requestTokenDialog = useRef();

  const fetchUserData = () => {
    fetch("http://localhost:8555/auth/user/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setUserData(data);
        });
      }
    });
  };

  const fetchReportsCount = () => {
    fetch("http://localhost:8555/reports/count/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setReportsCount(data);
        });
      }
    });
  };

  const fetchObjects = () => {
    fetch("http://localhost:8555/reports/objects/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setObjects(data);
        });
      }
    });
  };

  const fetchObject = (objId) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8555/reports/objects/${objId}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // include, *same-origin, omit
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            response
              .json()
              .then((data) => {
                resolve(data);
              })
              .catch((err) => reject(err));
          }
        })
        .catch((err) => reject(err));
    });
  };

  const requestToken = () => {
    fetch("http://localhost:8555/auth/token/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (!response.ok) {
        requestTokenDialog.current.classList.add(
          "request-token-modal__wrapper_show"
        );
      } else {
        response.json().then((data) => {
          const content = document.getElementById("request-token__content");
          content.innerText = "Токен скопирован в буфер обмена";
          navigator.clipboard.writeText(data["access_token"]);
          requestTokenDialog.current.classList.add(
            "request-token-modal__wrapper_show"
          );
        });
      }
    });
  };

  useEffect(() => {
    if (!logged) return;

    fetchUserData();
    fetchReportsCount();
    fetchObjects();
  }, [logged]);

  useEffect(() => {
    if (!objects) return;
    console.log("objects:", objects);
    fetchObject(objects[0])
      .then((data) => {
        if (!data) return;
        console.log("test object:", data);
        setObjectsData(data);
      })
      .catch(() => {
        return;
      });
  }, [page, objects]);

  return (
    <>
      {!userData ? (
        ""
      ) : (
        <table className="table">
          <tbody>
            <tr>
              <td>Имя пользователя:</td>
              <td>{userData.username}</td>
            </tr>

            <tr>
              <td>Уровень лицензии:</td>
              <td>{userData.license_level}</td>
            </tr>

            <tr>
              <td>Дата окончания лицензии:</td>
              <td>{userData.license_end_date}</td>
            </tr>

            <tr>
              <td>Лимит:</td>
              <td>{userData.limit}</td>
            </tr>

            <tr>
              <td>Выдано:</td>
              <td>{reportsCount ? reportsCount : "-"}</td>
            </tr>

            <tr>
              <td>Остаток:</td>
              <td>{reportsCount ? userData.limit - reportsCount : "-"}</td>
            </tr>
          </tbody>
        </table>
      )}

      <br />

      <div className="request-token__wrapper">
        <button
          type="button"
          className="btn-out btn btn-success btn-lg w-100 w-lg-50 align-center"
          id="get-token-btn"
          onClick={requestToken}
        >
          Получить токен
        </button>
        <a href="#">Просмотр инструкции к api</a>
      </div>

<div className="request-report__wrapper">
        <div className="request-report__description">
          Уникальный номер протокола формируется по номеру объекта, лаб.номеру и
          типу испытания, поэтому для разных протоколов эти параметры должны
          отличаться. Например, для одной пробы два разных протокола будут с
          одинаковыми номерами объекта и лаб.номерами, но тип опыта нужно
          вводить разный.
        </div>
        <form className="row g-3" id="request-report">
          <div className="col-md-4">
            <label for="inputObj">Объект *</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupObjInfo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <div className="form-info-box">Внутренний номер объекта</div>
              </span>
              <input
                type="text"
                className="form-control"
                id="inputObj"
                name="inputObj"
                placeholder="111-11"
                required
                aria-describedby="inputGroupObjInfo"
              />
              
            </div>
          </div>
          <div className="col-md-4">
            <label for="inputLabNo">Лаб.№ *</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupLabInfo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <div className="form-info-box">Лабораторный номер пробы</div>
              </span>
              <input
                type="text"
                className="form-control"
                id="inputLabNo"
                name="inputLabNo"
                placeholder="A1-1/AA"
                required
                aria-describedby="inputGroupLabInfo"
              />
              
            </div>
          </div>
          <div className="col-md-4">
            <label for="inputType">Тип испытания *</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupTypeInfo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <div className="form-info-box">Тип испытания</div>
              </span>
              <input
                type="text"
                className="form-control"
                id="inputType"
                name="inputType"
                placeholder="FC, FCE, вибро, консолидация и т.д."
                required
                aria-describedby="inputGroupTypeInfo"
              />
              
            </div>
          </div>
          <div className="col-6">
            <label for="inputParam_1">Параметр</label>
            <input
              type="text"
              className="form-control"
              id="inputParam_1"
              name="inputParam_1"
              placeholder="Дата выдачи протокола"
              aria-describedby="validationFeedback"
            />
            <div className="invalid-feedback" id="validationFeedback">
              Пожалуйста, заполните это поле.
            </div>
          </div>
          <div className="col-6">
            <label for="inputParam_1_val">Значение</label>
            <input
              type="text"
              className="form-control"
              id="inputParam_1_val"
              name="inputParam_1"
              placeholder="01.09.2022"
              aria-describedby="validationFeedback"
            />
            <div className="invalid-feedback" id="validationFeedback">
              Пожалуйста, заполните это поле.
            </div>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="inputParam_2"
              name="inputParam_2"
              placeholder=""
              aria-describedby="validationFeedback"
            />
            <div className="invalid-feedback" id="validationFeedback">
              Пожалуйста, заполните это поле.
            </div>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="inputParam_2_val"
              name="inputParam_2"
              placeholder=""
              aria-describedby="validationFeedback"
            />
            <div className="invalid-feedback" id="validationFeedback">
              Пожалуйста, заполните это поле.
            </div>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="inputParam_3"
              name="inputParam_3"
              placeholder=""
              aria-describedby="validationFeedback"
            />
            
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="inputParam_3_val"
              name="inputParam_3"
              placeholder=""
              aria-describedby="validationFeedback"
            />
            
          </div>
          <div className="request-form__actions">
            <button
              type="button"
              className="btn btn-outline-secondary request-form__action"
              id="request-form-add-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary request-form__action"
              id="request-form-delete-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn-out btn btn-success btn-lg w-100 w-lg-50 align-center"
              id="request-report-submit-btn"
              disabled
            >
              Отправить
            </button>
          </div>
        </form>
        <div className="request-report-succses" id="request-report-succses">
          Данные успешно отправлены!
          <div className="request-report-succses__sub">
            Дождитесь загрузки QR-кода
          </div>
        </div>
      </div>
      

      <br />

      
    </>
  );
}
