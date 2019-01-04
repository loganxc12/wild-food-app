//INITIAL STATE OBJECT
const INITIAL_STATE = {
     user: null
}

//REDUCER
function reducer(state = INITIAL_STATE, action) {
     console.log("REDUCER HIT!");

     switch(action.type) {

          case UPDATE_USER_DATA: 
               return Object.assign( {}, state, {user: action.payload} );

          default: return state;

     }

}

//ACTION TYPES
const UPDATE_USER_DATA = "UPDATE_USER_DATA";

//ACTION CREATORS
export function updateUserData(userData) {
     return {
          type: UPDATE_USER_DATA,
          payload: userData
     }
}

export default reducer;