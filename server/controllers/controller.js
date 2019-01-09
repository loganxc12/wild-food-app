
module.exports = {

     postAdventure: (req, res) => {
          console.log(req.body);
          const dbInstance = req.app.get("db");
          const { title, date, location, description, images, species } = req.body;
          // const { id } = req.session.user;
          const user_id = 1;
          //Insert single adventure into adventures table.
          dbInstance.create_adventure([ title, date, location, description, user_id ])
               .then(adventures => {
                    //get all species SQL CALL
                         //.THEN
                              
                    //For each species associated with adventure, insert single species into species table.
                    species.forEach(item => {
                         //Compare item to all species array (array method w/ callback)
                         //If exists, just add to line_items
                         //If not, create_species and add to line_items
                         const { name, scientificName, season, imageUrl, description } = item;
                         dbInstance.create_species([ name, scientificName, season, imageUrl, description ])
                              .then(species => {
                                   //SpeciesId and AdventureId
                                   //Create_line_item

                              })
                    })
                    res.status(200).send(adventures);
               })
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in postAdventure method"});
                    console.log(error);
               })
     },

     readAdventures: (req, res) => {
          // if (!req.session.user) { res.send(); }
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.read_adventures([ user_id ]) 
               .then(adventures => res.status(200).send(adventures) )
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in readAdventures method"});
                    console.log(error);
               })
     }


}

// for (var i = 0; i < species.length; i++) {
//      const { name, scientificName, season, imageUrl, description } = species[i];
//      dbInstance.create_species([ name, scientificName, season, imageUrl, description, id ])
//           .then(species => {
//                //SpeciesId and AdventureId
//                //Create_line_item
//                console.log("Hello");
//           })
// }