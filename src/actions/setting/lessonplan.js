import axios from 'axios';
import {
    LESSONPLAN_GET_ONE,
    LESSONPLAN_GET_MULTIPLE,
    LESSONPLAN_GET_DETAIL,
    LESSONPLAN_REGISTER_SUCCESS,
    LESSONPLAN_REGISTER_FAIL,
    LESSONPLAN_LOADING,
    LESSONPLAN_DETAIL_LOADING,
    LESSONPLAN_LOADING_ERROR,
    LESSONPLAN_UPDATE_SUCCESS,
    LESSONPLAN_UPDATE_FAIL,
    LESSONPLAN_DELETE_SUCCESS,
    LESSONPLAN_DELETE_FAIL
} from "../../types/setting/lessonplan";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'lessonplans';
const path = API_PATH_SETTING;

//GET ALL LESSONPLAN 
export const getLessonplans = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : LESSONPLAN_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: LESSONPLAN_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : LESSONPLAN_LOADING_ERROR,
                    payload:err
                })
            })
};
export const getLessonplanDetails = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : LESSONPLAN_DETAIL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: LESSONPLAN_GET_DETAIL,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : LESSONPLAN_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE LESSONPLAN 
export const getLessonplan = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : LESSONPLAN_GET_ONE,
        payload: id
    });  
};
//LESSONPLAN DELETE
export const deleteLessonplan = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: LESSONPLAN_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : LESSONPLAN_DELETE_FAIL,
                payload : err
            })
        })
        
}
//LESSONPLAN REGISTER
export const registerLessonplan = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: LESSONPLAN_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : LESSONPLAN_REGISTER_FAIL,
                payload: err
            })
        })
};
 //LESSONPLAN UPDATE
export const updateLessonplan = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: LESSONPLAN_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : LESSONPLAN_UPDATE_FAIL,
                payload: err
            })
        })
};
