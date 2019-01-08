//INITIAL STATE OBJECT
const INITIAL_STATE = {
     user: null,
     adventures: [],
     showAddSpeciesModal: false
}

//REDUCER
function reducer(state = INITIAL_STATE, action) {
     console.log("REDUCER HIT!");

     switch(action.type) {

          case UPDATE_USER_DATA: 
               return Object.assign( {}, state, {user: action.payload} );

          case UPDATE_ADVENTURES: 
               return Object.assign( {}, state, {adventures: action.payload} );
          
          case TOGGLE_ADD_SPECIES_MODAL: 
               return Object.assign( {}, state, {showAddSpeciesModal: action.payload} );

          default: return state;

     }

}

//ACTION TYPES
const UPDATE_USER_DATA = "UPDATE_USER_DATA";
const UPDATE_ADVENTURES = "UPDATE_ADVENTURES";
const TOGGLE_ADD_SPECIES_MODAL = "TOGGLE_ADD_SPECIES_MODAL";

//ACTION CREATORS
export function updateUserData(userData) {
     return {
          type: UPDATE_USER_DATA,
          payload: userData
     }
}

export function updateAdventures(adventures) {
     return {
          type: UPDATE_ADVENTURES,
          payload: adventures
     }
}

export function toggleAddSpeciesModal(val) {
     return {
          type: TOGGLE_ADD_SPECIES_MODAL,
          payload: val
     }
}



export default reducer;