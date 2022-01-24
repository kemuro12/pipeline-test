import { set, setDate, setHours, setMinutes, setSeconds, subHours } from "date-fns";
import { pointAPI, venueAPI } from "./API/Api";
import { showSnackbar } from "./SnackbarReducer";

const SET_POINTS = "SET_POINTS";
const SET_INFO = "SET_INFO";
const REMOVE_INFO = "REMOVE_INFO";
const SET_COMPLEX_INFO = "SET_COMPLEX_INFO";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const SET_INFLUX = "SET_INFLUX";
const SET_VENUES = "SET_VENUES";

let initialState = {
    info: null,
    points: null,
    complexInfo: null,
    isFetching: false,
    isLoading: false,
    influx: [],
    venues: []
}

const pointReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_POINTS: return { ...state, points: action.points }
        case SET_INFO: return { ...state, info: action.info }
        case REMOVE_INFO: return { ...state, info: state.info.filter(el => el.venue !== action.venue) }
        case SET_COMPLEX_INFO: return { ...state, complexInfo: { ...state.complexInfo,  [action.venue]: action.info} }
        case TOGGLE_IS_FETCHING: return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_LOADING: return { ...state, isLoading: action.isLoading }
        case SET_INFLUX: return { ...state, influx: action.influx }
        case SET_VENUES: return { ...state, venues: action.venues }
        default:
            return state;
    }
};

const getParsedDate = date => {
    let h = date.getHours(),
    m = date.getMinutes();
    
    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
             
    return `${h}:${m}`;
}

export const setPoints = points => ({ type: SET_POINTS, points })
export const setInfo = info => ({ type: SET_INFO, info })
export const filterInfo = venue => ({ type: REMOVE_INFO, venue })
export const setComplexInfo = (venue, info) => ({ type: SET_COMPLEX_INFO, venue, info })
export const toggleIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsLoading = isLoading => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setInflux = influx => ({ type: SET_INFLUX, influx })
export const setVenues = venues => ({ type:SET_VENUES, venues })

export const getPoints = (start, stop, split) => async dispatch => {
    try{
        dispatch(toggleIsLoading(true))
        let res = await pointAPI.getPoints(start, stop, split)
        let data = res.data.data;
        data.forEach(el => {
            el._time = getParsedDate(new Date(el._time))
        })
        dispatch(setPoints(res.data.data))
        dispatch(toggleIsLoading(false))
    }catch(e){
        dispatch(showSnackbar(e.message || e.response.data.message, "error"))
        dispatch(toggleIsLoading(false))
    }
}

export const createPoint = ({ id, action }) => async dispatch => {
    try{
        let res = await pointAPI.createPoint(id, action)
        dispatch(showSnackbar("Point success created", "success"))
    }catch(e){
        dispatch(showSnackbar(e.message, "error"))
    }
}

export const getInfo = () => async dispatch => {
    try{
        let res = await pointAPI.getInfo()
        dispatch(setInfo(res.data.data))
        return res.data.data;
    }catch(e){
        console.log(e)
        dispatch(showSnackbar(e.message, "error"))
    }
}

export const getInfoForComplex = () => async dispatch => {
    try{
        dispatch(toggleIsFetching(true))
        let res = await dispatch(getInfo());

        let stop = new Date();
        let start = subHours(stop, 1);
        let split = "1m";

        if(!res.length) dispatch(toggleIsFetching(false))

        res = res.filter(el => el.venue !== "")

        res.forEach(async el => {
            /*
            let date_start = new Date(new Date().toLocaleString("en-US", {timeZone: "Australia/Melbourne"}));
            date_start = set(date_start, { hours: 0, minutes: 0, seconds: 0 })
            let date_stop = new Date(new Date().toLocaleString("en-US", {timeZone: "Australia/Melbourne"}));
            date_stop = set(date_start, { hours: 23, minutes: 59, seconds: 59 })
            */

            let date_start = new Date();
            date_start = set(date_start, { hours: 0, minutes: 0, seconds: 0 })
            let date_stop = new Date();
            date_stop = set(date_start, { hours: 23, minutes: 59, seconds: 59 })

            let r = await pointAPI.getVenueInfo(start.getTime(), stop.getTime(), split, el.venue)
            let max = (await pointAPI.getMax(el.venue, date_start.getTime(), date_stop.getTime())).data;
            let total = 0;
            if(r.data.data.length) total = r.data.data[r.data.data.length - 1]._value;
            r.data.data.forEach(el => {
                el._time = getParsedDate(new Date(el._time))
            })
            dispatch(setComplexInfo(el.venue, {
                data: r.data.data,
                totalToday: max.today,
                max: max.all,
                total
            }))
            dispatch(toggleIsFetching(false))
        })
        
    }catch(e){
        dispatch(showSnackbar(e.message, "error"))
    }
}

export const removeInfo = venue => async dispatch => {
    try{
        let res = await pointAPI.removeInfo(venue)
        dispatch(filterInfo(venue))
        dispatch(showSnackbar(`All data with venue = ${venue} was removed`, "success"))
    }catch(e){
        dispatch(showSnackbar(e.message, "error"))
    }
}

export const getInflux = (pageSize, page) => async dispatch => {
    try{
        dispatch(toggleIsFetching(true))
        let res = await pointAPI.getInflux(pageSize, page);
        
        dispatch(setInflux(res.data))
        dispatch(toggleIsFetching(false))
    }catch(e){
        console.log(e)
        dispatch(showSnackbar(e.message, "error"))
    }
}


export const getVenues = () => {
    return async dispatch => {
        let response = await venueAPI.getAll();
        dispatch(setVenues(response.data.data))
    }
}

export const updateCapacity = fields => {
    return async dispatch => {
        let promises = []
        Object.keys(fields).forEach(id => {
            let payload = {
                capacity: fields[id]
            }
            promises.push( new Promise((resolve, reject) => resolve(venueAPI.updateOne(id, payload)) ))
        })

        await Promise.all(promises);
        dispatch(showSnackbar(`Success update`, "success"))
    }
}

export default pointReducer;