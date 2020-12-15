import axios from 'axios';
import {
    STUDENTCLASS_GET_ONE,
    STUDENTCLASS_GET_MULTIPLE,
    STUDENTCLASS_REGISTER_SUCCESS,
    STUDENTCLASS_REGISTER_FAIL,
    STUDENTCLASS_LOADING,
    STUDENTCLASS_LOADING_ERROR,
    STUDENTCLASS_UPDATE_SUCCESS,
    STUDENTCLASS_UPDATE_FAIL,
    STUDENTCLASS_DELETE_SUCCESS,
    STUDENTCLASS_DELETE_FAIL
} from "./../../types/student/studentclass";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

const path = API_PATH_SETTING;

//GET ALL STUDENTCLASS 
export const getStudentclasss = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STUDENTCLASS_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENTCLASS_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENTCLASS_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENTCLASS 
export const getStudentclass = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENTCLASS_GET_ONE,
        payload: id
    });  
};
//STUDENTCLASS DELETE
export const deleteStudentclass = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENTCLASS_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCLASS_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENTCLASS REGISTER
export const registerStudentclass = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTCLASS_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCLASS_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENTCLASS UPDATE
export const updateStudentclass = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENTCLASS_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENTCLASS_UPDATE_FAIL,
                payload: err
            })
        })
};
