import React from "react";
import { Link } from "react-router-dom";

export default function Homepage(props) {
     return (
          <div className="homepage-hero">
               <div className="banner-wrapper">
                    <div className="banner">
                         <h1>TRACK YOUR WILD FOOD FORAGING ADVENTURES THROUGH THE SEASONS</h1>
                         <p>Wild Fed is a tool to help you learn your land. Use our simple dashboard to create a personal catalog of foraging 
                              trips, record species as you learn them, and view your coveted harvest locations on an interactive map.</p>
                         <Link to="/login"><button>JOIN FOR FREE <i className="fas fa-long-arrow-alt-right"></i></button></Link>
                    </div>
               </div>
          </div>
     );
}