import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getInfoForComplex } from '../Redux/PointReducer';

const MainDiv = styled.div`
    color: white;
    font-size: 32px;
    font-weight: 300;
    text-align:center;
    position:relative;
    margin-top:-12px;
    letter-spacing:1px;
    margin-left: -290px;
    @media screen and (max-width: 1000px){
        margin-left: 0;
    }
    @media screen and (max-width: 550px){
        padding:20px 0;
        margin-top:0;  
    }
`

const RefreshTime = styled.div`
    font-size:12px;
    position:absolute;
    top:36px;
    white-space:nowrap;
    @media screen and (max-width: 550px){
        top:58px;
    }
`

const getParsedDate = date => {
    let h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
    
    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
    if(s < 10) s = '0' + s;
             
    return `${h}:${m}:${s}`;
}

const HeaderClock = props => {
    const [time, setTime] = useState(new Date())
    const [fetchTime, setFetchTime] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        let interval = setInterval(() => setTime(new Date()), 1000)
        let intevalToFetch = setInterval(() => setFetchTime(fetchTime - 1), 1000)
        if(fetchTime === 0){
            dispatch(getInfoForComplex()); 
            setFetchTime(10);
        }
        return () => {
            clearInterval(interval);
            clearInterval(intevalToFetch);
        }
    }, [fetchTime])

    return (
        <MainDiv>
            {getParsedDate(time)}    
            <RefreshTime>{fetchTime} seconds to refresh</RefreshTime>
        </MainDiv>
    )
}

export default HeaderClock;