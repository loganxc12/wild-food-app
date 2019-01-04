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
                    <img src="https://lh3.googleusercontent.com/-L5ZBF9qE7-c/XCvH6DNhRoI/AAAAAAAAAss/QefxaaXDln4x02hXG18XtPaSFolXOK3kwCEwYBhgL/w140-h140-p/54067e13-2346-4634-91fd-cda8f9b83c6b"/>
               </div>
          </div>
     );
}