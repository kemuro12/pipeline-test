import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
    width: 100%;
    border:4px solid #1B4266;
	box-sizing:border-box;
    color: #1B4266;
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 26px;
    @media screen and (max-width: 1100px){
        width:90%;
    }
    @media screen and (max-width: 959px){
        width:100%;
        max-width:460px;
    }
    @media screen and (max-width: 550px){
        max-width:360px;
        font-size:20px;
    }
    @media screen and (max-width: 400px){
        max-width:300px;
    }
    @media screen and (max-width: 340px){
        max-width:200px;
    }
`

const Title = styled.div`
    font-size:30px;
    @media screen and (max-width: 550px){
        font-size:24px;
    }
`

const SubTitle = styled.div`
    color: #EF8A1D;
`

const CapacityBlock = styled.div`
    display:flex;
    align-items:flex-end;
    padding: 15px 0;
`

const CapacityTotal = styled.div`
    font-size:112px;
    @media screen and (max-width: 1000px){
        font-size:100px;
    }
    @media screen and (max-width: 550px){
        font-size:70px;
    }
    @media screen and (max-width: 340px){
        font-size:46px;
    }
`

const CapacityMax = styled.div`
    margin:24px 35px;
    font-size:30px;
    white-space:nowrap;
    @media screen and (max-width: 550px){
        font-size:20px;
        margin:15px 15px;
    }
    @media screen and (max-width: 340px){
        margin: -4px 2px;
    }
`

const MainPadding = styled.div`
    padding: 40px 50px;
    @media screen and (max-width: 400px){
        padding: 18px 22px;
    }
`

const FillInfo = styled.div`
    background: #EF8A1D;
    color: white;
    width:fit-content;
    padding: 3px 24px 10px;
    font-size: 58px;
    margin-top:15px;
    @media screen and (max-width: 550px){
        font-size:40px;
    }
    @media screen and (max-width: 340px){
        font-size:24px;
    }
`

const CapacityInfo = ({ venue, total, capacity }) => {
    let full = Math.ceil((total / capacity) * 100);

    return (
        <MainDiv>
            <MainPadding>
                <Title>{String(venue).toUpperCase()}</Title>
                <SubTitle>Venue Occupancy</SubTitle>
                <CapacityBlock>
                    <CapacityTotal>{total}</CapacityTotal>
                    <CapacityMax>/ {capacity}</CapacityMax>
                </CapacityBlock>
                <FillInfo>{full}% full</FillInfo>
            </MainPadding>   
        </MainDiv>
    )
}

export default CapacityInfo;