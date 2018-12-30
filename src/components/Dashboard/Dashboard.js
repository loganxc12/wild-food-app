import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdventuresList from "../AdventuresList/AdventuresList";
import SpeciesList from "../SpeciesList/SpeciesList";
import Calendar from "../Calendar/Calendar";
import Map from "../Map/Map";


class Dashboard extends Component {

     render() {

          const { match } = this.props;
          console.log(match.path);
          return (
               <div className="dash-container">
                    Dashboard
                    <div className="dash-nav">
                         <Link to="/dash">My Adventures</Link>
                         <Link to="/dash/list">Species List</Link>
                         <Link to="/dash/calendar">Seasonal Calendar</Link>
                         <Link to="/dash/map">Map</Link>
                    </div>
                    <div className="dash">
                         { match.path === "/dash/list" && <SpeciesList /> }
                         { match.path === "/dash/calendar" && <Calendar /> }
                         { match.path === "/dash/map" && <Map /> }
                         { match.path === "/dash" && <AdventuresList /> }
                    </div>

               </div>
          );

     }
     
}

export default Dashboard;