import React, { useEffect, useState } from "react";

import "./Report.css";
import { useParams } from "react-router-dom";

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [additional, setAdditional] = useState(null);

  useEffect(() => {
    if (!id) return;
    getReport(id);
    getAdditional(id);
  }, []);

  const getReport = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_IP}reports/?id=${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setReport(data);
          console.log(data);
        });
      }
    });
  };

  const getAdditional = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_IP}files/?report_id=${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setAdditional(data);
          console.log(data);
        });
      }
    });
  };

  return (
    <>
      {report ? (
        <div className="report-wrapper">
          <div className="table__container">
            <div className="table-header">
              <img
                className="table-header__logo"
                src="https://s3.timeweb.com/cw78444-3db3e634-248a-495a-8c38-9f7322725c84/georeport/static/images/lock.gif"
              />
              <div className="table-header__wrapper">
                <div className="table-header__title-wrapper">
                  <div className="table-header__title_main">title</div>
                </div>
                <a href="#" target="_blank" className="table-header__url"></a>
              </div>
            </div>
            <table className="table__table">
              <tbody className="table__tbody">
                {report ? (
                  <>
                    <tr className="table__tr">
                      <td className="table__td">Номер объекта</td>
                      <td className="table__td">{report.object_number}</td>
                    </tr>
                    <tr className="table__tr">
                      <td className="table__td">Лабораторый номер</td>
                      <td className="table__td">{report.laboratory_number}</td>
                    </tr>
                    <tr className="table__tr">
                      <td className="table__td">Дата выдачи протокола</td>
                      <td className="table__td">
                        {new Date(report.datetime).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="table__tr">
                      <td className="table__td">Тип опыта</td>
                      <td className="table__td">{report.test_type}</td>
                    </tr>
                    {Object.keys(report.data).map((key) => {
                      return (
                        <tr className="table__tr" key={key}>
                          <td className="table__td">{key}</td>
                          <td className="table__td">{report.data[key]}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>

          {/* {% if files.items()|length > 0 %} */}
          <div className="table__container table__container-additional">
            <div className="table-header">
              <div className="table-header__wrapper">
                <div className="table-header__title-wrapper">
                  <div className="table-header__title_main">
                    Дополнительные файлы
                  </div>
                </div>
              </div>
            </div>
            <table className="table__table table__table-additional">
              <tbody className="table__tbody">
                {additional
                  ? additional.map((file) => {
                    const filenameArr = file.filename.split(".")
                    console.log(filenameArr[filenameArr.length-1]);
                      return (
                        <tr className="table__tr table__tr-additional">
                          <td className="table__td">
                            {["png", "jpg"].includes(filenameArr[filenameArr.length-1]) ? (
                              <>
                                <a href={file.link} target="_blank">
                                  {file.filename}
                                </a>
                                <img src={'..'+file.link} alt="" />
                              </>
                            ) : (
                              <a href={file.link} target="_blank">
                                {file.filename}
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
                {/* // {% for key, value in files.items() %}
                // <tr className="table__tr table__tr-additional">
                //   <td className="table__td">
                //     {% if value.split('.')[-1] in ['png', 'jpg'] %}<a href="{{value}}" target="_blank" >{{ key }}</a><img src="{{value}}" alt="" />
                {% else %}<a href="{{value}}" target="_blank">{{ key }}</a>
                //     // {% endif%}
                //   </td>
                // </tr>
                // {% endfor %} */}
              </tbody>
            </table>
          </div>
          {/* // {% else %} */}
          <div></div>
          {/* // {% endif %} */}

          {/* // {% if test_type_files.items()|length > 0 %} */}
          <div className="table__container table__container-additional">
            <div className="table-header">
              <div className="table-header__wrapper">
                <div className="table-header__title-wrapper">
                  <div className="table-header__title_main">
                    Справочные файлы
                  </div>
                </div>
              </div>
            </div>
            <table className="table__table table__table-additional">
              <tbody className="table__tbody">
                {/* // {% for key, value in test_type_files.items() %}
                <tr className="table__tr table__tr-additional">
                  <td className="table__td">
                    // {% if value.split('.')[-1] in ['png', 'jpg'] %}<a href="{{value}}" target="_blank"
                    //   >{{ key }}</a
                    // >
                    // <img src="value" alt="" />{% else %}<a href="{{value}}" target="_blank"
                    //   >{{ key }}</a
                    // >
                    // {% endif%}
                  </td>
                </tr> */}
                {/* // { endfor } */}
              </tbody>
            </table>
          </div>
          {/* // { else } */}
          <div></div>
          {/* // { endif } */}
        </div>
      ) : (
        "Данные по отчету не найдены."
      )}
    </>
  );
}
