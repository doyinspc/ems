import axios from 'axios';
import {
    ADMISSIONFORM_GET_ONE,
    ADMISSIONFORM_GET_MULTIPLE,
    ADMISSIONFORM_REGISTER_SUCCESS,
    ADMISSIONFORM_REGISTER_FAIL,
    ADMISSIONFORM_LOADING,
    ADMISSIONFORM_LOADING_ERROR,
    ADMISSIONFORM_UPDATE_SUCCESS,
    ADMISSIONFORM_UPDATE_FAIL,
    ADMISSIONFORM_DELETE_SUCCESS,
    ADMISSIONFORM_DELETE_FAIL
} from "../../types/setting/admissionform";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'admissionforms';
const path = API_PATH_SETTING;

//GET ALL ADMISSIONFORM 
export const getAdmissionforms = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : ADMISSIONFORM_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ADMISSIONFORM_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ADMISSIONFORM_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ADMISSIONFORM 
export const getAdmissionform = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ADMISSIONFORM_GET_ONE,
        payload: id
    });  
};
//ADMISSIONFORM DELETE
export const deleteAdmissionform = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ADMISSIONFORM_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSIONFORM_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ADMISSIONFORM REGISTER
export const registerAdmissionform = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ADMISSIONFORM_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSIONFORM_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ADMISSIONFORM UPDATE
export const updateAdmissionform = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ADMISSIONFORM_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ADMISSIONFORM_UPDATE_FAIL,
                payload: err
            })
        })
};
