import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdventuresList extends Component {
     render() {
          return (
               <div className="adventures-list">
                    AdventuresList
                    <Link to="/adventure/add">
                         <button>ADD NEW ADVENTURE</button>
                    </Link>
               </div>
          );
     }
}

export default AdventuresList;