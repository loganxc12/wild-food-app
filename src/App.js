import React, { Component } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import routes from "./routes";
import "./App.css";

class App extends Component {
     constructor(props) {
          super(props);
          this.state = {
               user: null
          }
     }

     componentDidMount() {
          axios.get("/api/user-data").then(response => {
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

export default App;