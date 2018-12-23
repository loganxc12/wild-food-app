import React, { Component } from 'react';
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import routes from "./routes";
import './App.css';

class App extends Component {
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