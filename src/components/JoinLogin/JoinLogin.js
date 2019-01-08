import React, { Component } from "react";

export default class JoinLogin extends Component {
     
     constructor(props) {
          super(props);
          this.login = this.login.bind(this);
     }

     login() {
          const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
          window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
     }

     render() {
          return (
               <div>
                    <h1>Login or Sign Up</h1>
                    <button className="general-button" onClick={this.login}>Login</button>
               </div>
          );
     }
     
}

