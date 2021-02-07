import axios from 'axios';
import {
    STUDENTFEE_GET_ONE,
    STUDENTFEE_GET_MULTIPLE,
    STUDENTFEE_GET_SUMMARY,
    STUDENTFEE_GET_SINGLE,
    STUDENTFEE_REGISTER_SUCCESS,
    STUDENTFEE_REGISTER_FAIL,
    STUDENTFEE_LOADING,
    STUDENTFEE_LOADING_ERROR,
    STUDENTFEE_UPDATE_SUCCESS,
    STUDENTFEE_SET_SUCCESS,
    STUDENTFEE_SET_FAIL,
    STUDENTFEE_SET_LOAD,
    STUDENTFEE_UPDATE_FAIL,
    STUDENTFEE_DELETE_SUCCESS,
    STUDENTFEE_DELETE_FAIL
} from "./../../types/student/studentfee";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';
const path = API_PATH_SETTING;

//GET ALL STUDENTFEE 
export const getStudentfees = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTFEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTFEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTFEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENTFEE 
export const getStudentfeeSummary = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTFEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTFEE_GET_SUMMARY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTFEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENTFEE 
export const getStudentfeesSingle = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTFEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTFEE_GET_SINGLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTFEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTFEE 
export const getStudentfee = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTFEE_GET_ONE,
        payload: id
    });  
};
//STUDENTFEE DELETE
export const deleteStudentfee = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENTFEE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTFEE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTFEE REGISTER
export const registerStudentfee = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTFEE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTFEE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTFEE UPDATE
export const updateStudentfee = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTFEE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTFEE_UPDATE_FAIL,
                payload: err
            })
        })
};
//STUDENTFEE UPDATE
export const setStudentfee = (data) => (dispatch, getState) => {
    //body
    dispatch({type : STUDENTFEE_SET_LOAD});
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTFEE_SET_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTFEE_SET_FAIL,
                payload: err
            })
        })
};