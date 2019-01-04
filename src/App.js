import React, { Component } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import routes from "./routes";
import { connect } from "react-redux";
import { updateUserData } from "./ducks/reducer";
import "./App.css";

class App extends Component {
     constructor(props) {
          super(props);
          this.state = {
               user: null
          }
     }

     componentDidMount() {
          axios.get("/auth/user-data").then(response => {
               updateUserData(response.data.user);
               this.setState({ user: response.data.user || null });
          });
     }

     render() {
          return (
               <div className="App">
                    <Header />
                    { routes }
               </div>
          );
     }
}

export default connect(null, { updateUserData })(App);
