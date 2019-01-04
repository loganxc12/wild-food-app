import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header(props) {
     return (
          <div className="header">
               <div className="logo">
                    <Link to="/">Made of Place</Link>
               </div>
               <div className="nav">
                    <NavLink to="/dash">Dashboard</NavLink>
                    <NavLink to="/login">Login</NavLink>
               </div>
          </div>
     );
}