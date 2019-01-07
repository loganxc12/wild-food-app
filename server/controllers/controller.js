
module.exports = {

     postAdventure: (req, res) => {
          const dbInstance = req.app.get("db");
          const { title, location, description } = req.body;
          const { id } = req.session.user;
          dbInstance.create_adventure([ title, location, description, id ])
               .then(adventures => {
                    res.status(200).send(adventures);
               })
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in postAdventure method"});
                    console.log(error);
               })
     }


}