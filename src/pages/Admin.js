import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInfo, getVenues, removeInfo, updateCapacity } from '../Redux/PointReducer';
import { Button, Paper, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DataTable from '../components/DataTable';

const Wrapper = styled.div`
    max-width: 1080px;
    width:100%;
    margin:0 auto;
    padding:0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:100px;
`

const PaperContainer = styled(Paper)`
    width: 200px;
    margin-top:50px;
`

const PaperContainerTable = styled(Paper)`
    width: 1000px;
    margin-top:90px;
`

const Admin = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInfo())  
        dispatch(getVenues())  
    }, [])
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);
    const info = useSelector(state => state.points.info);
    const venues = useSelector(state => state.points.venues);

    const [fields, setFields] = useState({ }) 

    const handleItemClick = (e, venue) => {
        setAnchorEl(e.currentTarget)
        setSelected(venue)
    }

    const handleInputChange = ev => setFields({ ...fields, [ev.target.name]: ev.target.value })

    const handleSaveChanges = () => {
        dispatch(updateCapacity(fields))
    }

    const handleRemoveData = () => {
        dispatch(removeInfo(selected))
        setAnchorEl(null)
        setSelected(null)
    }

    const applyDisabled = Object.keys(fields).length;

    return (
        <Wrapper>
            <PaperContainer elevation={3} style={{ width:260 }}>
                <List>
                    <ListItem>
                        <ListItemText primary={"Title"} />
                        <ListItemSecondaryAction>
                            Capacity
                        </ListItemSecondaryAction>
                    </ListItem>
                    {
                        venues && venues.map((el, index) => 
                            <ListItem key={index}>
                                <ListItemText primary={el.title} />
                                <ListItemSecondaryAction>
                                    <TextField value={fields[el.id] || el.capacity} name={el.id} style={{ width:75 }} onChange={handleInputChange} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                </List>
                <div style={{ width:"100%", display: "flex", justifyContent: "flex-end",padding:"10px" }}>
                    <Button disabled={ !applyDisabled } onClick={handleSaveChanges} variant="contained" color="secondary" size="small">Apply changes</Button>
                </div>
                
            </PaperContainer>

            <PaperContainerTable elevation={3}>
                <DataTable />
            </PaperContainerTable>


            <PaperContainer elevation={3}>
                <List>
                    <ListItem>
                        <ListItemText primary={"Venue"} />
                        <ListItemSecondaryAction>
                            Count
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {
                        info && info.map((el, index) => 
                            <ListItem button key={index} onClick={(e) => handleItemClick(e, el.venue)}>
                                <ListItemText primary={el.venue} />
                                <ListItemSecondaryAction>
                                    { el._value }
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }

                </List>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={handleRemoveData}>Remove data</MenuItem>
                </Menu>
            </PaperContainer>

        </Wrapper>
    )
}

export default Admin;