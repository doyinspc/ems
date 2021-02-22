import axios from 'axios';
import {
    STUDENTSUBJECT_GET_ONE,
    STUDENTSUBJECT_GET_MULTIPLE,
    STUDENTSUBJECT_GET_SUMMARY,
    STUDENTSUBJECT_REGISTER_SUCCESS,
    STUDENTSUBJECT_REGISTER_FAIL,
    STUDENTSUBJECT_LOADING,
    STUDENTSUBJECT_LOADING_ERROR,
    STUDENTSUBJECT_UPDATE_SUCCESS,
    STUDENTSUBJECT_UPDATE_FAIL,
    STUDENTSUBJECT_DELETE_SUCCESS,
    STUDENTSUBJECT_DELETE_FAIL
} from "./../../types/student/studentsubject";

import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

const path = API_PATH_SETTING;

//GET ALL STUDENTSUBJECT 
export const getStudentsubjects = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTSUBJECT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTSUBJECT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTSUBJECT_LOADING_ERROR,
                    payload:err
                })
            })
};

//GET ALL STUDENTSUBJECT 
export const getStudentsubjectSummary = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTSUBJECT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTSUBJECT_GET_SUMMARY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTSUBJECT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTSUBJECT 
export const getStudentsubject = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTSUBJECT_GET_ONE,
        payload: id
    });  
};
//STUDENTSUBJECT DELETE
export const deleteStudentsubject = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSUBJECT_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSUBJECT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTSUBJECT REGISTER
export const registerStudentsubject = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSUBJECT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSUBJECT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTSUBJECT UPDATE
export const updateStudentsubject = (data) => (dispatch, getState) => {
    //body
    console.log(data)
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTSUBJECT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTSUBJECT_UPDATE_FAIL,
                payload: err
            })
        })
};
