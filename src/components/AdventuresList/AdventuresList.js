import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AdventuresList extends Component {
     constructor(props) {
          super(props);
          this.getAdventuresFromServer = this.getAdventuresFromServer.bind(this);
     }

     componentDidMount() {
          this.getAdventuresFromServer();
     }

     getAdventuresFromServer() {
          axios.get("/api/adventures").then(adventures => {
               console.log(adventures);
          })
     }

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