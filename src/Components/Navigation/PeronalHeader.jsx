import "./PersonalHeader.css";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Context from "../../context";

import {signOut} from '../../Utils/login'

export default function PersonalHeader() {
  const { setLogged } = useContext(Context);

  return (
    <>
      <header className="navbar-mdgt">
        <nav className="container-fluid-mdgt container-mdgt container-fluid-mdgt-personal">
          <NavLink to="/" className="navbar-brand">
            <img
              className="navbar-brand__icon"
              src="https://s3.timeweb.com/cw78444-3db3e634-248a-495a-8c38-9f7322725c84/georeport/static/images/logo.png"
            />
            {/* <!-- <div className="navbar-brand__line"></div>
			<div className="navbar-brand__title">
				GEOREPORT
				<div className="navbar-brand__title-sub">
					by mdgt
				</div>
			</div> --> */}
          </NavLink>

          <div
            className="navbar-collapse-wrapper-personal"
            id="navbar-collapse-wrapper-personal"
          >
            <div
              className="navbar-collapse-personal"
              id="navbar-collapse-personal"
            >
              <ul className="navbar-nav navbar-nav-personal">
                <li className="nav-item-personal">
                  <NavLink
                    to="/"
                    className="nav-link-personal"
                    data-goto="home"
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item-personal">
                  <button
                    className="nav-link-personal"
                    id="btn-out"
                    onClick={()=>signOut(setLogged)}
                  >
                    Выйти
                  </button>
                </li>
              </ul>

              <div className="nav__close-personal" id="nav-close-personal">
                <i className="ri-close-line"></i>
              </div>
            </div>
          </div>

          <div className="nav__toggle-personal" id="nav-toggle-personal">
            <i className="ri-menu-line"></i>
          </div>
        </nav>
      </header>
    </>
  );
}
