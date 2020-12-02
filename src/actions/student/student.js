import axios from 'axios';
import {
    STUDENT_GET_ONE,
    STUDENT_GET_MULTIPLE,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_LOADING,
    STUDENT_LOADING_ERROR,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL
} from "./../../types/student/student";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'students';
const path = API_PATH_SETTING;

//GET ALL STUDENT 
export const getStudents = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : STUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENT 
export const getStudent = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENT_GET_ONE,
        payload: id
    });  
};
//STUDENT DELETE
export const deleteStudent = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENT REGISTER
export const registerStudent = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENT UPDATE
export const updateStudent = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};
