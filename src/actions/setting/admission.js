import axios from 'axios';
import {
    ADMISSION_GET_ONE,
    ADMISSION_GET_MULTIPLE,
    ADMISSION_REGISTER_SUCCESS,
    ADMISSION_REGISTER_FAIL,
    ADMISSION_LOADING,
    ADMISSION_LOADING_ERROR,
    ADMISSION_UPDATE_SUCCESS,
    ADMISSION_UPDATE_FAIL,
    ADMISSION_DELETE_SUCCESS,
    ADMISSION_DELETE_FAIL
} from "../../types/setting/admission";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'admissions';
const path = API_PATH_SETTING;

//GET ALL ADMISSION 
export const getAdmissions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : ADMISSION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ADMISSION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ADMISSION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ADMISSION 
export const getAdmission = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ADMISSION_GET_ONE,
        payload: id
    });  
};
//ADMISSION DELETE
export const deleteAdmission = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ADMISSION_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ADMISSION REGISTER
export const registerAdmission = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ADMISSION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ADMISSION UPDATE
export const updateAdmission = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ADMISSION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSION_UPDATE_FAIL,
                payload: err
            })
        })
};
