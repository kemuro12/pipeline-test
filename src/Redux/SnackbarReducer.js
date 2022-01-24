const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const HIDE_SNACKBAR = "HIDE_SNACKBAR";

let initialState = {
    isShow: false,
    title: "",
    variant: null
}

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {...state, isShow: true, title: action.title, variant: action.variant};
        case HIDE_SNACKBAR:
            return {...state, isShow: false, title: initialState.title, variant: initialState.variant};
        default:
            return state;
    }
};

export const showSnackbar = (title, variant) => ({ type: SHOW_SNACKBAR, title, variant });
export const hideSnackbar = () => ({ type: HIDE_SNACKBAR });

export default snackbarReducer;