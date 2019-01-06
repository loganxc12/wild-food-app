import React, { Component } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import routes from "./routes";
import "./App.css";

class App extends Component {
     // constructor(props) {
     //      super(props);
     //      this.state = {
     //           user: null
     //      }
     // }

     // componentDidMount() {
     //      axios.get("/auth/user-data").then(response => {
     //           console.log("componentDidMount", response.data.user);
     //           const { updateUserData } = this.props;
     //           updateUserData(response.data.user);
     //           // this.setState({ user: response.data.user || null });
     //      });
     // }

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
