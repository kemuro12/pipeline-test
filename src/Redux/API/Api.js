import * as axios from "axios";

//axios.defaults.baseURL = 'https://festival.ipst-dev.com/api';
//axios.defaults.baseURL = 'https://firelight.ipst-dev.com/api';
axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_ADRESS}/api`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const getToken = () => {
    let tk = window.localStorage.getItem('auth_token')
    if (tk === undefined || tk === ''){
        return;
    }
    return tk;
}

axios.interceptors.request.use((config) => {
    let token = getToken();
    if(token !== undefined){
        //config.onDownloadProgress = handleUploadProgress
        config.headers['Authorization'] = 'bearer ' + token;
    }
    return config;
}, (error) =>{
    return Promise.reject(error);
})


export const usersAPI = {
    login(login, password) {
        return axios.post('/auth/login', {login, password});
    },
    getUser() {
        return axios.get('/auth/me');
    },
    getUsersApi(page) {
        return axios.get('/users?page=' + page);
    },
    register(login, password) {
        return axios.post('/auth/register', {login, password});
    },
    deleteUserApi(id) {
        return axios.delete('/user/' + id);
    }
}

export const pointAPI = {
    getPoints(start, stop, split){
        return axios.get(`/get-metrics?start=${start}&stop=${stop}&every=${split}`)
    },
    getMax(venue, start, stop){
        return axios.get(`/get-max?venue=${venue}&start=${start}&stop=${stop}`)
    },
    createPoint(id, action){
        return axios.get(`/update-metrics?id=${id}&action=${action}`)
    },
    getInfo(){
        return axios.get(`/metrics-info`)
    },
    getVenueInfo(start, stop, split, venue){
        return axios.get(`/get-metrics?start=${start}&stop=${stop}&every=${split}&venue=${venue}`)
    },
    removeInfo(id){
        return axios.get(`/remove-metrics?id=${id}`)
    },
    getInflux(pageSize, page){
        return axios.get(`/get-data?page=${page}&pageSize=${pageSize}`)
    }
}

export const venueAPI = {
    getAll() {
        return axios.get(`/venue`)
    },
    updateOne(id, payload){
        return axios.put(`/venue/${id}`, payload)
    }
}