import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
    color: white;
    width: 100%;
    font-size: 70px;
    font-weight: 300;
    text-align:center;
    padding-bottom:55px;
    @media screen and (max-width: 959px){
        font-size: 60px;
        
    }
    @media screen and (max-width: 459px){
        font-size: 40px;
        padding-bottom:25px;
    }
`

const DateDiv = styled.div`
    color: white;
    font-weight: 700;
    font-size: 24px;
    margin-top: 16px;
    letter-spacing: 1px;
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Clock = props => {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        let interval = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <MainDiv>
            <DateDiv>{ MONTHS[time.getMonth()] + " " + time.getDate() }</DateDiv>
            {getParsedDate(time)}
            
        </MainDiv>
    )
}

export default Clock;