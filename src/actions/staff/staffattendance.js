import axios from 'axios';
import {
    STAFFATTENDANCE_GET_ONE,
    STAFFATTENDANCE_GET_MULTIPLE,
    STAFFATTENDANCE_GET_DAILY,
    STAFFATTENDANCE_REGISTER_SUCCESS,
    STAFFATTENDANCE_REGISTER_DAILY,
    STAFFATTENDANCE_REGISTER_FAIL,
    STAFFATTENDANCE_LOADING,
    STAFFATTENDANCE_LOADING_ERROR,
    STAFFATTENDANCE_UPDATE_SUCCESS,
    STAFFATTENDANCE_UPDATE_DAILY,
    STAFFATTENDANCE_UPDATE_FAIL,
    STAFFATTENDANCE_DELETE_SUCCESS,
    STAFFATTENDANCE_DELETE_DAILY,
    STAFFATTENDANCE_DELETE_FAIL
} from "./../../types/staff/staffattendance";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFATTENDANCE 
export const getStaffattendances = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFATTENDANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFATTENDANCE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFATTENDANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STAFFATTENDANCE 
export const getStaffattendancedailys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFATTENDANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFATTENDANCE_GET_DAILY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFATTENDANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFATTENDANCE 
export const getStaffattendance = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFATTENDANCE_GET_ONE,
        payload: id
    });  
};
//GET SINGLE STAFFATTENDANCE 
export const getStaffattendancedaily = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFATTENDANCE_GET_ONE,
        payload: id
    });  
};
//STAFFATTENDANCE DELETE
export const deleteStaffattendance = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFATTENDANCE DELETE
export const deleteStaffattendancedaily = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_DELETE_DAILY,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFATTENDANCE REGISTER
export const registerStaffattendance = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
//STAFFATTENDANCE REGISTER
export const registerStaffattendancedaily = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_REGISTER_DAILY,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFATTENDANCE UPDATE
export const updateStaffattendance = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
export const updateStaffattendancedaily = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFATTENDANCE_UPDATE_DAILY,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFATTENDANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
