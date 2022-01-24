import { usersAPI } from "./API/Api";
import { showSnackbar } from "./SnackbarReducer";
import axios from 'axios';

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_USER = "SET_USER";

let initialState = {
    user: null,
    isFetching: false
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_FETCHING: return { ...state, isFetching: action.isFetching }
        case SET_USER: return { ...state, user: action.user }
        default:
            return state;
    }
};

export const toggleIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setUser = user => ({ type: SET_USER, user })

export const login = (login, password) => async dispatch => {
    try{
        dispatch(toggleIsFetching(true));
        let resp = await usersAPI.login(login, password)
        localStorage.setItem('auth_token', resp.data.data.token);
        dispatch(setUser(resp.data.data))
        dispatch(toggleIsFetching(false));
        dispatch(showSnackbar("success login", "success"))
        return true;
    }catch(e){
        console.log(e)
        dispatch(toggleIsFetching(false));
        dispatch(showSnackbar(e.response.data.message || e.message, "error"))
        return false;
    }
}

export const getUserData = () => async dispatch => {
    try{
        let resp = await usersAPI.getUser()
        dispatch(setUser(resp.data.data))
    }catch(e){
        localStorage.removeItem("auth_token")
        //dispatch(showSnackbar(e.response.data.message || e.message, "error"))
    }
    
};

export const logout = () => async dispatch => {
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common["Authorization"];
    dispatch(setUser(false));
    dispatch(showSnackbar("Success logout", "success"))
}

/*
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setAuthUserData = (user, isAuth) => ({type: SET_USER_DATA, user, isAuth});
export const setAuth = (isAuth) => ({type: SET_IS_AUTH, isAuth});
export const setUsersData = (users, countUsers) => ({type: SET_USERS_DATA, users, countUsers});

export const getUsers = (page = 1) => (dispatch) => {
    usersAPI.getUsersApi(page)
        .then(response => {
            if (response.data.status === true)
                dispatch(setUsersData(response.data.data, response.data.count));
        })
}










export const register = (login, password) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.register(login, password)
        .then(response => {
            if (!response.data.status === false) {
                dispatch(toggleIsFetching(false));
                dispatch(getUsers());
                dispatch(showSnackbar("User created successfully", "success"))
            }
        })
        .catch(() => {
            dispatch(toggleIsFetching(false));
            dispatch(stopSubmit("login", {_error: "This login already exists"}));
            dispatch(showSnackbar("This login already exists", "error"))
        });
};

export const deleteUser = (id) => (dispatch) => {
    usersAPI.deleteUserApi(id)
        .then(response => {
            if (!response.data.status === false) {
                dispatch(getUsers());
                dispatch(showSnackbar("User was deleted", "success"))
            }
        })
}

*/
export default userReducer;