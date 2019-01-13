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
               <div className="login-hero">
                    <div className="banner-wrapper">
                         <div className="banner">
                              <h1>LOGIN OR SIGN UP</h1>
                              <p>Have an account or want to make one? Click the button below to start your journey.</p>
                              <button onClick={this.login}>LET'S GO <i className="fas fa-long-arrow-alt-right"></i></button>
                         </div>
                    </div>
               </div>
          );
     }
     
}

