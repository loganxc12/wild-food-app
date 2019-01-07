//INITIAL STATE OBJECT
const INITIAL_STATE = {
     user: null,
     adventures: []
}

//REDUCER
function reducer(state = INITIAL_STATE, action) {
     console.log("REDUCER HIT!");

     switch(action.type) {

          case UPDATE_USER_DATA: 
               return Object.assign( {}, state, {user: action.payload} );

          case UPDATE_ADVENTURES: 
               return Object.assign( {}, state, {adventures: action.payload} );

          default: return state;

     }

}

//ACTION TYPES
const UPDATE_USER_DATA = "UPDATE_USER_DATA";
const UPDATE_ADVENTURES = "UPDATE_ADVENTURES";

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



export default reducer;