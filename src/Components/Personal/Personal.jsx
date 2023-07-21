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


      

      <br />
    </>
  );
}
