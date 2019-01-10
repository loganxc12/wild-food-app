import React, { Component } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserData } from "../../ducks/reducer";

class Header extends Component {
     constructor(props) {
          super(props);
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
          const { user } = this.props;
          
          return (
               <div className="header">
                    <div className="logo">
                         <Link to="/">Wild Fed</Link>
                    </div>
                    <div className="nav">
                         <NavLink to="/dash">Dashboard</NavLink>
                         {
                         user ?
                         <Link to="/"><button onClick={this.logout}>Logout</button></Link>
                       : <NavLink to="/login">Login</NavLink>
                         }
                         { user && <img src={user.picture} alt="profile"/> }
                    </div>
               </div>
          );
     }
     
}

function mapStateToProps(reduxState) {
     const { user } = reduxState;
     return { user };
}

export default connect(mapStateToProps, { updateUserData })(Header);