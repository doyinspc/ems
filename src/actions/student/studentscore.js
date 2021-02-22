import axios from 'axios';
import {
    STUDENTSCORE_GET_ONE,
    STUDENTSCORE_GET_MULTIPLE,
    STUDENTSCORE_GET_SUMMARY,
    STUDENTSCORE_GET_SINGLE,
    STUDENTSCORE_REGISTER_SUCCESS,
    STUDENTSCORE_REGISTER_FAIL,
    STUDENTSCORE_LOADING,
    STUDENTSCORE_LOADING_ERROR,
    STUDENTSCORE_UPDATE_SUCCESS,
    STUDENTSCORE_SET_SUCCESS,
    STUDENTSCORE_SET_FAIL,
    STUDENTSCORE_SET_LOAD,
    STUDENTSCORE_UPDATE_FAIL,
    STUDENTSCORE_DELETE_SUCCESS,
    STUDENTSCORE_DELETE_FAIL
} from "./../../types/student/studentscore";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';
const path = API_PATH_SETTING;

//GET ALL STUDENTSCORE 
export const getStudentscores = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTSCORE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTSCORE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTSCORE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENTSCORE 
export const getStudentscoreSummary = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTSCORE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTSCORE_GET_SUMMARY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTSCORE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENTSCORE 
export const getStudentscoresSingle = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTSCORE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTSCORE_GET_SINGLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTSCORE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTSCORE 
export const getStudentscore = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTSCORE_GET_ONE,
        payload: id
    });  
};
//STUDENTSCORE DELETE
export const deleteStudentscore = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSCORE_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTSCORE REGISTER
export const registerStudentscore = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSCORE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSCORE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTSCORE UPDATE
export const updateStudentscore = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSCORE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSCORE_UPDATE_FAIL,
                payload: err
            })
        })
};
//STUDENTSCORE UPDATE
export const setStudentscore = (data) => (dispatch, getState) => {
    //body
    dispatch({type : STUDENTSCORE_SET_LOAD});
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSCORE_SET_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSCORE_SET_FAIL,
                payload: err
            })
        })
};