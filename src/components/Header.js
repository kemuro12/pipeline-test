import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import { login, logout } from '../Redux/UserReducer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link, NavLink, useLocation} from "react-router-dom";
import HeaderClock from './HeaderClock';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {

    },
  }));

const ButtonLogin = styled(Button)`
    @media screen and (max-width: 550px){
        margin-top:20px;
    }
`

const Header = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [fields, setFields] = useState({
        "login": "",
        "password": ""
    })
    const handleOnchange = ev => setFields({ ...fields, [ev.target.name]: ev.target.value })
    const isFetching = useSelector(state => state.user.isFetching);
    const user = useSelector(state => state.user.user);
    
    const handleLogin = async () => {
        let res = await dispatch(login(fields["login"], fields["password"] ))
        if(res) setOpen(false);
    }

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
    }

    return (
        <AppBar position="static">
            <Toolbar style={{ display: "flex", justifyContent:"space-between", flexWrap:"wrap" }}>
                <Typography variant="h6" className={classes.title}>
                    <NavLink to="/" style={{textDecoration: "none", color:"white" }}>
                        { process.env.REACT_APP_HEAD_TITLE }
                    </NavLink>
                </Typography>

                {
                    location.pathname !== "/admin" && <HeaderClock />
                }   

                    { user ? 
                        <div>
                            <Button style={{color: "white"}} onClick={(e) => setAnchorEl(e.currentTarget)}>{user.login}</Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem component={Link} to={`/admin`} onClick={() => setAnchorEl(null)}>Admin page</MenuItem>
                                <MenuItem onClick={handleLogout}>Log out</MenuItem>
                            </Menu>
                        </div>
                    : 
                        <ButtonLogin onClick={() => setOpen(true)} color="inherit">Sign in</ButtonLogin>
                    }
            </Toolbar>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle>Sign in</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <AccountCircle style={{fontSize: 38}} />
                        </Grid>
                        <Grid item>
                            <TextField label="Login" onChange={handleOnchange} name="login" variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <LockIcon style={{fontSize: 38}}/>
                        </Grid>
                        <Grid item>
                            <TextField type="password" onChange={handleOnchange} name="password" label="Password" variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{margin: "10px"}}>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Close
                    </Button>
                    <Button onClick={handleLogin} color="primary" variant="contained">
                        Sign in
                    </Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    )
}

export default Header;