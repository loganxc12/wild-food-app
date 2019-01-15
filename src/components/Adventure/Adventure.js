import React, { Component } from "react";

class Adventure extends Component {

     constructor(props) {
          super(props);
     }

     render() {
          return (
               <div className="adventure-wrapper">
                    <div className="adventure-hero">
                         <div className="adventure-title-wrapper">
                              <h1>FALL ACORN HARVEST</h1>
                              <div className="adventure-details">
                                   <h3>OCTOBER 3, 2018</h3>
                                   <h3><i className="fas fa-map-marker-alt"></i> MAIDEN'S CLIFF, CAMDEN, MAINE</h3>
                              </div>
                              <div className="adventure-photos">
                                   <button>+ ADD PHOTOS</button>
                                   <h3><i className="fas fa-image"></i> SEE ALL PHOTOS</h3>
                              </div>
                         </div>
                    </div>
                    <div className="adventure-overview">
                         <div className="species-box">
                              <div className="species-box-content">
                                   <h2>SPECIES FOUND ON THIS ADVENTURE:</h2>
                                   <ul>
                                        <li>ACORN <i className="fas fa-long-arrow-alt-right"></i></li>
                                        <li>LION'S MANE <i className="fas fa-long-arrow-alt-right"></i></li>
                                        <li>NANNYBERRY <i className="fas fa-long-arrow-alt-right"></i></li>
                                        <li>CHAGA <i className="fas fa-long-arrow-alt-right"></i></li>
                                        <li>JUNIPER <i className="fas fa-long-arrow-alt-right"></i></li>
                                   </ul>
                              </div>
                         </div>
                         <div className="map-box">
                              <div className="map-preview"></div>
                         </div>
                    </div>
                    <div className="description-box">
                         <div className="description-box-content">
                              <h2>DESCRIPTION:</h2>
                              <p>Write to your heart’s content about this foraging trip: where you went, what you found, essential gear you packed, new 
                              species you learned or discovered for the first time, species you learned or discovered for the first time. for the first time…
                              Write to your heart’s content about this foraging trip: where you went, what you found, essential gear you packed, new 
                              species you learned or discovered for the first time, species you learned or discovered for the first time. for the first time…

                              Write to your heart’s content about this foraging trip: where you went, what you found, essential gear you packed, new 
                              species you learned or discovered for the first time, species you learned or discovered for the first time. for the first time…
                              Write to your heart’s content about this foraging trip: where you went, what you found, essential gear you packed, new 
                              species you learned or discovered for the first time, species you learned or discovered for the first time. for the first time
                              </p>                         
                         </div>
                    </div>
                    <div className="settings-box">
                         <div className="edit-delete-box">
                              <div className="edit">EDIT</div>
                              <div className="delete">DELETE</div>
                         </div>
                         <i className="fas fa-cog"></i>
                    </div>               
               </div>
          );
     }
     
}

export default Adventure;