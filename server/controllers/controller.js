
module.exports = {

     postAdventure: (req, res) => {
          const dbInstance = req.app.get("db");
          const { title, date, location, description, images, species } = req.body;
          // const { id } = req.session.user;
          const user_id = 1;
          //Insert single adventure into adventures table.
          dbInstance.create_adventure([ title, date, location, description, images, user_id ])
               .then(adventures => {
                    const adventure = adventures[0];
                    //Get all species stored in db for user in session.
                    dbInstance.read_species([ user_id ])
                         .then(allSpeciesInDb => {
                              //Loop over species array passed with Adventure (in req.body) and check each species 
                              //object against array of All species.
                              species.forEach(item => {
                                   const searchKey = item.scientificName.toLowerCase();
                                   const match = allSpeciesInDb.find(el => {
                                        return el.scientific_name.toLowerCase() === searchKey;
                                   })
                                   //If there's a match (if species already exists for user), just create new line_items entry.
                                   if (match) {
                                        dbInstance.create_line_item([ match.id, adventure.id ])
                                   } 
                                   //If no match, first create a new entry in the species table and then create a new line_items entry.
                                   else {
                                        const { name, scientificName, season, imageUrl, description } = item;
                                        dbInstance.create_species([ name, scientificName, season, imageUrl, description, user_id ])
                                             .then(species => {
                                                  dbInstance.create_line_item([ species[0].id, adventure.id ])
                                             })
                                   }
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
               .then(adventures => {
                    res.status(200).send(adventures)
               })
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in readAdventures method"});
                    console.log(error);
               })
     },

     readSpecies: (req, res) => {
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.read_species([ user_id ])
               .then(species => res.status(200).send(species))
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in readAdventures method"});
                    console.log(error);
               })
     }


}

