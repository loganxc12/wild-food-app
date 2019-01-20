import React, { Component } from "react";
import AdventuresList from "../AdventuresList/AdventuresList";
import SpeciesList from "../SpeciesList/SpeciesList";
import Calendar from "../Calendar/Calendar";
import BigMap from "../Map/BigMap";


class Dashboard extends Component {

     render() {

          const { match } = this.props;

          return (
               <div className="dash-wrapper">
                    { match.path === "/dash/list" && <SpeciesList /> }
                    { match.path === "/dash/calendar" && <Calendar /> }
                    { match.path === "/dash/map" && <BigMap /> }
                    { match.path === "/dash" && <AdventuresList /> }
               </div>
          );

     }
     
}

export default Dashboard;