import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to="/settings"
          className="brand-logo right"
          style={{ cursor: "pointer" }}
        >
          <i className="material-icons">settings</i>
        </Link>
        <ul>
          <li>
            <Link to="/">Tarea Activa</Link>
          </li>
          <li>
            <Link to="/tasks">Todas las tareas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
