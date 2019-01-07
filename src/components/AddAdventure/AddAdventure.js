import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

class AddAdventure extends Component {

     constructor(props) {
          super(props);
          this.state = {
               title: "",
               location: "",
               description: "",
               redirect: false
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.postAdventureToServer = this.postAdventureToServer.bind(this);
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     postAdventureToServer() {
          const { title, location, description } = this.state;
          const newAdventure = { title, location, description };
          axios.post("/api/adventures", newAdventure).then(response => {
               this.setState({ redirect: true })
          })
     }

     render() {
          const { redirect } = this.state;
          
          if (redirect) {
               return <Redirect to="/dash" />;
          }

          return (
               <div className="App">
                    <div className="add-adventure-wrapper">
                         <input onChange={this.handleInputChange} name="title" placeholder="Title"></input>
                         <input onChange={this.handleInputChange} name="location" placeholder="Location"></input>
                         <input onChange={this.handleInputChange} name="description" placeholder="Description"></input>
                         <button onClick={this.postAdventureToServer}>Save</button>
                    </div>
               </div>
          );
     }

}

export default AddAdventure;