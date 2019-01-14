import React, { Component } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserData } from "../../ducks/reducer";
import Dropdown from "./Dropdown";
import logo from "./logo.png";

class Header extends Component {
     constructor(props) {
          super(props);
          this.state = {
            dropdown: true
          }
          this.logout = this.logout.bind(this);
     }

     componentDidMount() {
          axios.get("/auth/user-data").then(response => {
               const { updateUserData } = this.props;
               updateUserData(response.data.user);
          });
     }

     logout() {
          axios.post("/auth/logout").then(response => {
               const { updateUserData } = this.props;
               if (!response.data) { updateUserData(null); }
          });
     }

     render() {
          const { dropdown } = this.state;
          const { user } = this.props;

          const header = (
              <div className="header">
                  <div className="nav-left">
                    <NavLink to="/">ABOUT</NavLink>
                    <NavLink to="/adventure/add">+ NEW ADVENTURE</NavLink>
                  </div>
                  <div className="logo">
                        <Link to="/"><img src={logo}/></Link>
                  </div>
                  <div className="nav-right">
                        {
                        user ?
                        <Link to="/"><a onClick={this.logout}>LOGOUT</a></Link>
                      : <NavLink to="/login">LOGIN</NavLink>
                        }
                        { user && <img src={user.picture} alt="profile"/> }
                  </div>
              </div>
          );
          
          return dropdown ? (
               <div className="header-wrapper">
                    { header }
                    <Dropdown /> 
               </div>
          ) :  <div className="header-wrapper">
                    { header } 
               </div>
     }
     
}

function mapStateToProps(reduxState) {
     const { user } = reduxState;
     return { user };
}

export default connect(mapStateToProps, { updateUserData })(Header);