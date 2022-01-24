import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import BarGraph from './graph/BarGraph';

const MainDiv = styled(Grid)`
    width: 100%;
    min-height: 360px;
    display: flex;
    margin-bottom: 30px;
    border:4px solid #1B4266;
    box-sizing:border-box;
`

const LeftBar = styled(Grid)`
    width: 50%;
    background: white;
    color:#1B4266;
    font-weight: 700;
    font-size: 24px;
    @media screen and (max-width: 740px){
        font-size:20px;
        width:30%;
    }
`

const Title = styled.div`
    font-size:30px;
    @media screen and (max-width: 740px){
        font-size:24px;
    }
`

const Total = styled.div`
    font-size:100px;
    color: #EF8A1D;
    @media screen and (max-width: 740px){
        font-size:70px;
    }
`

const Divide = styled.div`
    border-top:5px solid #1B4266;
    margin:8px 0;
    width:90%;
    @media screen and (max-width: 740px){
        border-top:3px solid #1B4266;
    }
`

const LeftAccumulated = styled.div`
    margin-top: 20px;
    font-size:22px;
    & span{ font-weight: 500; font-size:18px; }
    @media screen and (max-width: 740px){
        margin-top: 60px;
    }
`

const LeftAccumulatedTotal = styled.div`
    color: #EF8A1D;
    width: 50%;
    padding-top:5px;
    @media screen and (max-width: 740px){
        font-size:26px;
    }
`

const MainPadding = styled.div`
    padding: 20px 50px;
    @media screen and (max-width: 959px){
        padding: 10px 15px;
    }
`

const RightBar = styled(Grid)`
    width: 50%;
    background: #4F5965;
    @media screen and (max-width: 340px){
        font-size:24px;
    }
`

const ComplexInfo = ({ title, data, total, accumulated, capacity }) => {
    return (
        <Grid item xs={12}>
            <MainDiv container>
                <LeftBar item xs={12} sm={4} md={6}>
                    <MainPadding>
                        <Title>{ String(title).toUpperCase() }</Title> 

                        <Title style={{marginTop: "20px"}}>Total Today</Title>      

                        <Total>{total}</Total>
                        <Divide></Divide>

                        <LeftAccumulated>
                            Accumulated Event Total<br></br>
                            <span>Since Wed 21 July 2021</span>
                        </LeftAccumulated>

                        <LeftAccumulatedTotal>{ accumulated }</LeftAccumulatedTotal>
                    </MainPadding>
                                    
                </LeftBar>

                <RightBar item xs={12} sm={8} md={6}>
                    <Clock />
                    <div style={{width: "98%", height: "200px", margin: "0 auto"}}>
                        <BarGraph data={data} maxY={capacity.capacity || 3500} labelX="Persons in the last 1 hours" noXAxis colorText="white" />
                    </div>
                    
                </RightBar>
            </MainDiv>
        </Grid>
    )
}

export default ComplexInfo;