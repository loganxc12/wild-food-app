import React from "react";
import { NavLink } from "react-router-dom";

export default function Dropdown(props) {
     return (
          <div className="dropdown">
               <NavLink to="/dash" activeClassName="selected" exact>
                    <div className="dropdown-option">ADVENTURES</div>
               </NavLink>
               <NavLink to="/dash/list" activeClassName="selected">
                    <div className="dropdown-option">SPECIES</div>
               </NavLink>
               <NavLink to="/dash/calendar" activeClassName="selected">
                    <div className="dropdown-option">CALENDAR</div>
               </NavLink>
               <NavLink to="/dash/map" activeClassName="selected">
                    <div className="dropdown-option">MAP</div>
               </NavLink>
          </div>
     );
}