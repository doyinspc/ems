import axios from 'axios';
import {
    STUDENTATTENDANCE_GET_ONE,
    STUDENTATTENDANCE_GET_MULTIPLE,
    STUDENTATTENDANCE_GET_DAILY,
    STUDENTATTENDANCE_REGISTER_SUCCESS,
    STUDENTATTENDANCE_REGISTER_DAILY,
    STUDENTATTENDANCE_REGISTER_FAIL,
    STUDENTATTENDANCE_LOADING,
    STUDENTATTENDANCE_LOADING_ERROR,
    STUDENTATTENDANCE_UPDATE_SUCCESS,
    STUDENTATTENDANCE_UPDATE_DAILY,
    STUDENTATTENDANCE_UPDATE_FAIL,
    STUDENTATTENDANCE_DELETE_SUCCESS,
    STUDENTATTENDANCE_DELETE_DAILY,
    STUDENTATTENDANCE_DELETE_FAIL
} from "./../../types/student/studentattendance";
import { MAIN_TOKEN, API_PATH_STUDENT, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STUDENT;

//GET ALL STUDENTATTENDANCE 
export const getStudentattendances = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTATTENDANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTATTENDANCE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTATTENDANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENTATTENDANCE 
export const getStudentattendancedailys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTATTENDANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTATTENDANCE_GET_DAILY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTATTENDANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTATTENDANCE 
export const getStudentattendance = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTATTENDANCE_GET_ONE,
        payload: id
    });  
};
//GET SINGLE STUDENTATTENDANCE 
export const getStudentattendancedaily = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTATTENDANCE_GET_ONE,
        payload: id
    });  
};
//STUDENTATTENDANCE DELETE
export const deleteStudentattendance = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTATTENDANCE DELETE
export const deleteStudentattendancedaily = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_DELETE_DAILY,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTATTENDANCE REGISTER
export const registerStudentattendance = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
//STUDENTATTENDANCE REGISTER
export const registerStudentattendancedaily = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_REGISTER_DAILY,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTATTENDANCE UPDATE
export const updateStudentattendance = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
export const updateStudentattendancedaily = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTATTENDANCE_UPDATE_DAILY,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTATTENDANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
