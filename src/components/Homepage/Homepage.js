import React from "react";
import { Link } from "react-router-dom";

export default function Homepage(props) {
     return (
          <div className="homepage-hero">
               <div className="homepage-banner">
                    <h1>Track Your Wild Food Adventures Through The Seasons</h1>
                    <button>Learn More</button> 
                    <Link to="/login"><button>Sign up</button></Link>
               </div>
          </div>
     );
}