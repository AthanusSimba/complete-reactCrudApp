import axios from 'axios';
import { returnErrors } from "./messages";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";


// Check the token and load users
export const loadUser = () =>(dispatch, getState) => {
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
    })
}

// Login User
export const login = (username, password) =>(dispatch) => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request Body
    const body = JSON.stringify({username, password});
    console.log(body)
    axios.post('/api/auth/login', body, config)
        .then(res=>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
    })
}


//Register User
export const register = (username, email, password) =>(dispatch) => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //Request Body
    const body = JSON.stringify({username, email, password});
    axios.post('/api/auth/register', body, config)
        .then(res=>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
    })
}


//LOGOUT USER
export const logout = () =>(dispatch, getState) => {
    axios.post('/api/auth/logout',null, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status));

    })
}

// setup config with token -helper function
export const tokenConfig = getState =>{
    //Get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config;
}