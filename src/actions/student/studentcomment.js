import axios from 'axios';
import {
    STUDENTCOMMENT_GET_ONE,
    STUDENTCOMMENT_GET_MULTIPLE,
    STUDENTCOMMENT_GET_SUMMARY,
    STUDENTCOMMENT_REGISTER_SUCCESS,
    STUDENTCOMMENT_REGISTER_FAIL,
    STUDENTCOMMENT_LOADING,
    STUDENTCOMMENT_LOADING_ERROR,
    STUDENTCOMMENT_UPDATE_SUCCESS,
    STUDENTCOMMENT_UPDATE_FAIL,
    STUDENTCOMMENT_DELETE_SUCCESS,
    STUDENTCOMMENT_DELETE_FAIL
} from "./../../types/student/studentcomment";

import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

const path = API_PATH_SETTING;

//GET ALL STUDENTCOMMENT 
export const getStudentcomments = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTCOMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTCOMMENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTCOMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};

//GET ALL STUDENTCOMMENT 
export const getStudentcommentSummary = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTCOMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTCOMMENT_GET_SUMMARY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTCOMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTCOMMENT 
export const getStudentcomment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTCOMMENT_GET_ONE,
        payload: id
    });  
};
//STUDENTCOMMENT DELETE
export const deleteStudentcomment = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTCOMMENT_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCOMMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTCOMMENT REGISTER
export const registerStudentcomment = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTCOMMENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCOMMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTCOMMENT UPDATE
export const updateStudentcomment = (data) => (dispatch, getState) => {
    //body
    console.log(data)
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTCOMMENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCOMMENT_UPDATE_FAIL,
                payload: err
            })
        })
};
