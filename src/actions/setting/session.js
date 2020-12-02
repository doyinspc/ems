import axios from 'axios';
import {
    SESSION_GET_ONE,
    SESSION_GET_MULTIPLE,
    SESSION_REGISTER_SUCCESS,
    SESSION_REGISTER_FAIL,
    SESSION_LOADING,
    SESSION_LOADING_ERROR,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
    SESSION_DELETE_SUCCESS,
    SESSION_DELETE_FAIL
} from "./../../types/setting/session";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'sessions';
const path = API_PATH_SETTING;

//GET ALL SESSION 
export const getSessions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : SESSION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SESSION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SESSION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SESSION 
export const getSession = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SESSION_GET_ONE,
        payload: id
    });  
};
//SESSION DELETE
export const deleteSession = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SESSION_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SESSION REGISTER
export const registerSession = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SESSION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SESSION UPDATE
export const updateSession = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SESSION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_UPDATE_FAIL,
                payload: err
            })
        })
};
