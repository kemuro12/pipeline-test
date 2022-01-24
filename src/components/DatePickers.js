import React, { useState } from 'react';
import styled from 'styled-components'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPoints } from '../Redux/PointReducer';
import { differenceInMinutes, format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 230,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const MainDiv = styled.div`
    padding: 20px 0 40px;
    display: flex;
    gap: 15px;
    align-items:flex-end;
    flex-wrap:wrap;
`

const CustomField = styled(TextField)`
    color:white;
    @media screen and (max-width: 700px){
        flex-basis: 100%;
        margin:0 8px;
    }
`

const CustomButton= styled(Button)`
    margin-left: 20px;
    @media screen and (max-width: 700px){
        flex-basis: 100%;
        margin: 0 8px;
        padding: 8px 0px;
    }
`

const HelpIcon = styled.div`
    margin-left: -55px;
    margin-top: 17px;
    z-index: 10;
    @media screen and (max-width: 700px){
        margin-left: 8px;
        margin-top: 0;
    }
`


const DatePickers = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [fields, setFields] = useState({
        "range_start": format((new Date()).setHours(0, 0, 0, 0),"yyyy-MM-dd'T'HH:mm"),
        "range_end": format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        "split": differenceInMinutes(new Date(), (new Date()).setHours(0, 0, 0, 0)) < 300 ? "10m" : "1h",
    })

    const handleOnchange = ev => setFields({ ...fields, [ev.target.name]: ev.target.value })

    const handleClick = () => {
        let start = new Date(fields.range_start);
        let stop = new Date(fields.range_end);
        dispatch(getPoints(start.getTime(), stop.getTime(), fields.split))
    }

    return (
        <MainDiv>
            <CustomField
                name="range_start"
                label="Range start"
                value={fields["range_start"]}
                type="datetime-local"
                onChange={handleOnchange}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <CustomField
                name="range_end"
                label="Range end"
                value={fields["range_end"]}
                type="datetime-local"
                onChange={handleOnchange}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <CustomField name="split" onChange={handleOnchange} value={fields["split"]} label="Interval" style={{width: "140px"}} />
            
            <HelpIcon>
                <HelpOutlineIcon 
                    style={{fontSize: "32px", color: "#949494"}} 
                    onMouseEnter={(e) =>  setAnchorEl(e.currentTarget)}
                    onMouseLeave={() => setAnchorEl(null)} 
                />
            </HelpIcon>

            <CustomButton onClick={handleClick} variant="contained" color="secondary" size="small">Apply</CustomButton>

            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                onClose={() => setAnchorEl(null)}
                disableRestoreFocus
            >
                <div>
                    available units: <b>m</b>, <b>h</b>, <b>d</b><br></br>
                    example: 5h30m - 5 hours 30 mins
                </div>
            </Popover>
            
        </MainDiv>
    )
}

export default DatePickers;