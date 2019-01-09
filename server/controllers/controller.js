
module.exports = {

     postAdventure: (req, res) => {
          const dbInstance = req.app.get("db");
          const { title, date, location, description, images, species } = req.body;
          // const { id } = req.session.user;
          const user_id = 1;
          //Insert single adventure into adventures table.
          dbInstance.create_adventure([ title, date, location, description, user_id ])
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
// var allSpecies =  [ 
//    { id: 1,
//      name: 'github',
//      scientific_name: '',
//      season: '',
//      image_url: '',
//      description: '',
//      user_id: 1 },
//    { id: 2,
//      name: 'auth0-mini',
//      scientific_name: '',
//      season: '',
//      image_url: '',
//      description: '',
//      user_id: 1 },
//    { id: 3,
//      name: 'Acorn ',
//      scientific_name: '',
//      season: '',
//      image_url: '',
//      description: '',
//      user_id: 1 } 
// ]

// var species = [ 
//      { name: 'Duck',
//        scientificName: '',
//        season: '',
//        description: '',
//        imageUrl: '' 
//      } 
// ] 

 //Compare item to all species array (array method w/ callback)
                                   //If exists, just add to line_items
                                   //If not, create_species and add to line_items
                                   // const { name, scientificName, season, imageUrl, description } = item;
                                   // dbInstance.create_species([ name, scientificName, season, imageUrl, description ])
                                   //      .then(species => {
                                   //           //SpeciesId and AdventureId
                                   //           //Create_line_item
          
                                   //      })

       //get all species SQL CALL
                         //.THEN
                              
                    //For each species associated with adventure, insert single species into species table.