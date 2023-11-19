import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-0 border-bottom p-4">
      <Link
        to="/home"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span className="fs-4">IUDMOVIES</span>
      </Link>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/generos" className="nav-link">
            Generos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/productoras" className="nav-link">
            Productoras
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
