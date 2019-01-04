const axios = require("axios");

module.exports = {

     login: (req, res) => {
          const { code } = req.query;
          console.log("--------code", code);

          const payload = {
               client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
               client_secret: process.env.AUTH0_CLIENT_SECRET,
               code, 
               grant_type: "authorization_code",
               redirect_uri: `http://${req.headers.host}/auth/callback`
          }
          //SEND CODE RECIEVED IN URL TO AUTH0 WITH ABOVE PAYLOAD OBJECT TO GET ACCESS TOKEN.
          function tradeCodeForAccessToken() {
               return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);    
          }
          //RECIEVE ACCESS TOKEN AND SEND BACK TO AUTH0 TO GET USER INFO.
          function tradeAccessTokenForUserInfo(accessTokenResponse) {
               const accessToken = accessTokenResponse.data.access_token;
               return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
          }
          //RECIEVE USER INFO AND CHECK FOR MATCH IN DB. IF FOUND, SET USER TO SESSION, IF NOT
          //FOUND, CREATE NEW USER IN DB AND SET TO SESSION. 
          function storeUserInfoInDatabase(userInfoResponse) {
               console.log("user info", userInfoResponse.data);
               const user = response.data;
               return req.app.get("db").find_user_by_auth0_id([user.sub]).then(users => {
                    if (users.length) {
                         req.session.user = {
                              auth0_id: users[0].auth0_id,
                              profile_name: users[0].profile_name,
                              picture: users[0].picture,
                              email: users[0].email
                         };
                         res.redirect("/dash");
                    } else {
                         return req.app.get("db").create_user([
                              user.name,
                              user.email,
                              user.picture,
                              user.sub
                         ]).then(newUsers => {
                              req.session.user = newUsers[0];
                              res.redirect("/dash");
                         })
                    }
               })
          }
          //CALL ABOVE FUNCTIONS IN SUCCESSION, CHAINING .THEN'S
          tradeCodeForAccessToken()
               .then(tradeAccessTokenForUserInfo)
               .then(storeUserInfoInDataBase)
               .catch(error => {
                    console.log('error in /auth/callback', error);
                    res.status(500).send('Something went wrong on the server');
               })

     }

}