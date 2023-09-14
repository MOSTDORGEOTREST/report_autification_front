import React, { useEffect, useState } from "react";

import "./Report.css";
import { useParams } from "react-router-dom";

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!id) return;
    getReport(id);
  }, []);

  const getReport = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}reports/?id=${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
    }).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((data) => {
          setReport(data);
          console.log(report);
        });
      }
    });
  };

  return (
    <>
      {report ? (
        <div class="report-wrapper">
        <div class="table__container">
          <div class="table-header">
            <img
              class="table-header__logo"
              src="https://s3.timeweb.com/cw78444-3db3e634-248a-495a-8c38-9f7322725c84/georeport/static/images/lock.gif"
            />
            <div class="table-header__wrapper">
              <div class="table-header__title-wrapper">
                <div class="table-header__title_main">title</div>
              </div>
              <a href='#' target="_blank" class="table-header__url"></a>
            </div>
          </div>
          <table class="table__table">
            <tbody class="table__tbody">
              {/* {% for key, value in res.items() %} */}
              <tr class="table__tr">
                <td class="table__td">key</td>
                <td class="table__td">value</td>
              </tr>
              {/* {% endfor %} */}
            </tbody>
          </table>
        </div>
      
        {/* {% if files.items()|length > 0 %} */}
        <div class="table__container table__container-additional">
          <div class="table-header">
            <div class="table-header__wrapper">
              <div class="table-header__title-wrapper">
                <div class="table-header__title_main">Дополнительные файлы</div>
              </div>
          </div>
          </div>
          <table class="table__table table__table-additional">
              <tbody class="table__tbody">
                {/* // {% for key, value in files.items() %}
                // <tr class="table__tr table__tr-additional">
                //   <td class="table__td">
                //     {% if value.split('.')[-1] in ['png', 'jpg'] %}<a href="{{value}}" target="_blank" 
                //       >{{ key }}</a
                //     >
                //     <img src="{{value}}" alt="" />{% else %}<a href="{{value}}" target="_blank"
                //       >{{ key }}</a
                //     >
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
        <div class="table__container table__container-additional">
          <div class="table-header">
            <div class="table-header__wrapper">
              <div class="table-header__title-wrapper">
                <div class="table-header__title_main">Справочные файлы</div>
              </div>
          </div>
          </div>
          <table class="table__table table__table-additional">
              <tbody class="table__tbody">
                {/* // {% for key, value in test_type_files.items() %}
                <tr class="table__tr table__tr-additional">
                  <td class="table__td">
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
