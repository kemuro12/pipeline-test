import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header'
import {Redirect, Route, Switch} from "react-router-dom";
import Main from './pages/Main'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";
import { hideSnackbar } from './Redux/SnackbarReducer';
import Admin from './pages/Admin';
import { getUserData } from './Redux/UserReducer';



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.localStorage.getItem('auth_token')) {
            dispatch(getUserData());
        }
    }, [])

    const open = useSelector(state => state.snackbar.isShow);
    const title = useSelector(state => state.snackbar.title);
    const variant = useSelector(state => state.snackbar.variant);
    const user = useSelector(state => state.user.user);

    const handleSnackClose = () => dispatch(hideSnackbar())    

    return (
        <>
            <Header />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2500}
                open={open}
                onClose={handleSnackClose}
            >
                <Alert severity={variant || "info"} onClose={handleSnackClose}>
                    {title}
                </Alert>       
            </Snackbar>

            <Switch>
                <Route exact path='/' component={Main}/>
                {
                    user && <Route exact path='/admin' component={Admin}/>
                }
                <Route path="*"> <Redirect to="/" /> </Route>
            </Switch>
        </>
    );
}

export default App;
