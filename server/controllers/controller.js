
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
                              console.log("---allSpecies", allSpeciesInDb);
                              //Loop over species array passed with Adventure (in req.body) and check each species 
                              //object against array of All species.
                              species.forEach(item => {
                                   const searchKey = item.scientific_name.toLowerCase();
                                   const match = allSpeciesInDb.find(el => {
                                        return el.scientific_name.toLowerCase() === searchKey;
                                   })
                                   //If there's a match (if species already exists for user), just create new line_items entry.
                                   if (match) {
                                        dbInstance.create_line_item([ match.id, adventure.id, user_id ])
                                   } 
                                   //If no match, first create a new entry in the species table and then create a new line_items entry.
                                   else {
                                        const { name, scientific_name, image_url, description } = item;
                                        dbInstance.create_species([ name, scientific_name, image_url, description, user_id ])
                                             .then(species => {
                                                  console.log("---newlyCreatedSpecies", species);
                                                  dbInstance.create_line_item([ species[0].id, adventure.id, user_id ])
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

     readSingleAdventure: (req, res) => {
          const { id } = req.params;
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.read_single_adventure([ id, user_id ])
               .then(adventures => {
                    console.log(adventures)
                    const { id } = adventures[0];
                    dbInstance.read_species_for_adventure([ id ])
                         .then(species => {
                              console.log(species);
                              res.status(200).send({ adventures, species });
                         })
               })
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in readSingleAdventure method"});
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
                    res.status(500).send({errorMessage: "Error in readSpecies method"});
                    console.log(error);
               })
     },

     postSpecies: (req, res) => {
          const dbInstance = req.app.get("db");
          const { name, scientific_name, image_url, description } = req.body;
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.create_species([ name, scientific_name, image_url, description, user_id ])
               .then(species => res.status(200).send(species))
               .catch(error => {
                    res.status(500).send({errorMessage: "Error in postSpecies method"});
                    console.log(error);
               })
     },

     updateSpecies: (req, res) => {
          const { id } = req.params;
          const { name, scientific_name, image_url, description } = req.body;
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.update_species([ id, user_id, name, scientific_name, image_url, description ])
               .then(species => res.status(200).send(species))
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in deleteSpecies method"});
                    console.log(error);
               })
     },

     deleteSpecies: (req, res) => {
          const { id } = req.params;
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.delete_species([ id, user_id ])
               .then(species => res.status(200).send(species))
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in deleteSpecies method"});
                    console.log(error);
               })
     },

     deleteAdventure: (req, res) => {
          const { id } = req.params;
          const dbInstance = req.app.get("db");
          // const { id } = req.session.user;
          const user_id = 1;
          dbInstance.delete_adventure([ id, user_id ])
               .then(adventures => res.status(200).send(adventures))
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in deleteAdventure method"});
                    console.log(error);
               })
     }


}

