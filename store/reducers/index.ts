import { ActionTypes, ADD_LOGIN, ADD_PAGEDATA } from "../constants/action-types"

const initialState = {
    loggedin: Boolean(false),
    username:  String("simon"),
    password: String("1234"),
    pagedata: {}
}

function rootReducer(state = initialState, action: ActionTypes ) {

    switch(action.type) {
        case ADD_LOGIN:
            return { ...state, loggedin: action.payload }
        case ADD_PAGEDATA:
            return { ...state, pagedata: action.payload }
        default:
            return state;
    }

}

export default rootReducer;