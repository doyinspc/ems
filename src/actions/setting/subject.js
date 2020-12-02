import axios from 'axios';
import {
    SUBJECT_GET_ONE,
    SUBJECT_GET_MULTIPLE,
    SUBJECT_REGISTER_SUCCESS,
    SUBJECT_REGISTER_FAIL,
    SUBJECT_LOADING,
    SUBJECT_LOADING_ERROR,
    SUBJECT_UPDATE_SUCCESS,
    SUBJECT_UPDATE_FAIL,
    SUBJECT_DELETE_SUCCESS,
    SUBJECT_DELETE_FAIL
} from "./../../types/setting/subject";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'subjects';
const path = API_PATH_SETTING;

//GET ALL SUBJECT 
export const getSubjects = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : SUBJECT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SUBJECT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SUBJECT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SUBJECT 
export const getSubject = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SUBJECT_GET_ONE,
        payload: id
    });  
};
//SUBJECT DELETE
export const deleteSubject = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SUBJECT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SUBJECT REGISTER
export const registerSubject = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SUBJECT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SUBJECT UPDATE
export const updateSubject = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SUBJECT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_UPDATE_FAIL,
                payload: err
            })
        })
};
