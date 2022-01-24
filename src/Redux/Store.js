import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import userReducer from "./UserReducer";
import pointReducer from "./PointReducer";
import snackbarReducer from "./SnackbarReducer";


let reducers = combineReducers({
    user: userReducer,
    points: pointReducer,
    snackbar: snackbarReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;