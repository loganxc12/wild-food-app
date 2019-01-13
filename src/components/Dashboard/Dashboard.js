import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdventuresList from "../AdventuresList/AdventuresList";
import SpeciesList from "../SpeciesList/SpeciesList";
import Calendar from "../Calendar/Calendar";
import Map from "../Map/Map";


class Dashboard extends Component {

     render() {

          const { match } = this.props;

          return (
               <div className="dash-wrapper">
                    { match.path === "/dash/list" && <SpeciesList /> }
                    { match.path === "/dash/calendar" && <Calendar /> }
                    { match.path === "/dash/map" && <Map /> }
                    { match.path === "/dash" && <AdventuresList /> }
               </div>
          );

     }
     
}

export default Dashboard;