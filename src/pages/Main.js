import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInfoForComplex, getPoints, getVenues } from '../Redux/PointReducer';
import { Button, CircularProgress } from '@material-ui/core';
import CapacityInfo from '../components/CapacityInfo';
import ComplexInfo from '../components/ComplexInfo'
import Grid from '@material-ui/core/Grid';
import BarGraph from '../components/graph/BarGraph';
import DatePickers from '../components/DatePickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { differenceInMinutes } from 'date-fns';

const Wrapper = styled.div`
    max-width: 1080px;
    width:100%;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    overflow:hidden;
    align-items: center;
`

const FillContainer = styled.div`
    width: 100%;
    margin: 70px;
    display: flex;
	flex-wrap:wrap;
	justify-content:space-between;
    gap: 20px;
`

const ContainerComplex = styled(Grid)`
    width:100%;
`

const CustomSkeleton = styled(Skeleton)`
    z-index: 10;
    width: 100%;
    height: 103%;
    position: absolute;
    top: -10px;
`

const Main = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        let start = new Date();
        start.setHours(0, 0, 0, 0)
        let stop = new Date();
        let split = "1h";
        let diff = differenceInMinutes(stop, start)
        if(diff < 300) split = "10m";
        setIsLoading(true)
        dispatch(getVenues())
        dispatch(getPoints(start.getTime(), stop.getTime(), split))
        await dispatch(getInfoForComplex())
        setIsLoading(false)
    }, [])
    
    const data = useSelector(state => state.points.complexInfo);
    const points = useSelector(state => state.points.points);
    const isFetching = useSelector(state => state.points.isLoading);
    const venues = useSelector(state => state.points.venues);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.down('md')); 

    let maxBarY = 100; 
    if(points) maxBarY = Math.max.apply(Math, points.map(o => o._value)) + 10;

    if(isLoading) return (
        <Wrapper>
            <CircularProgress style={{ margin: "50px auto" }} />    
        </Wrapper>
    )

    return (
        <Wrapper>
            <FillContainer>
                <Grid container spacing={isSmall ? 0 : 3} >
                    {
                        data && Object.keys(data).map(key => {
                            let capacity = 3500;
                            let current = venues.find(v => v.title === key);
                            if(current) capacity = current.capacity;
                            return (
                                <Grid key={key}  item xs={12} sm={12} md={6} style={{ display:"flex", justifyContent: "center" }}>
                                    <CapacityInfo 
                                        venue={key} 
                                        total={data[key].total} 
                                        capacity={ capacity } 
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>            
            </FillContainer>
                    
            <ContainerComplex container spacing={isMedium ? 4 : 0}>
                {
                    data && Object.keys(data).map(key => 
                        <ComplexInfo key={key} capacity={venues.find(v => v.title === key)} title={key} total={data[key].totalToday} accumulated={data[key].max} data={data[key].data} />
                    )
                }
            </ContainerComplex>

            <div style={{height: "640px", width: "100%", marginTop: "50px"}}>
                <DatePickers />
                <div style={{position: "relative", width: "100%", height: isSmall ? "240px" : "400px"}}>
                    {
                        isFetching && <CustomSkeleton variant="rect" animation="wave"/>
                    }
                    
                    <BarGraph maxY={maxBarY} data={points} />
                </div>
                
            </div>
            
        </Wrapper>
        
    )
}

export default Main;