
module.exports = {

     postAdventure: (req, res) => {
          const dbInstance = req.app.get("db");
          const { title, date, location, description } = req.body;
          const { id } = req.session.user;
          dbInstance.create_adventure([ title, date, location, description, id ])
               .then(adventures => {
                    res.status(200).send(adventures);
               })
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in postAdventure method"});
                    console.log(error);
               })
     },

     readAdventures: (req, res) => {
          if (!req.session.user) { res.send(); }
          const dbInstance = req.app.get("db");
          const { id } = req.session.user;
          dbInstance.read_adventures([ id ]) 
               .then(adventures => res.status(200).send(adventures) )
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in readAdventures method"});
                    console.log(error);
               })
     }


}