import axios from 'axios';
import {
    STAFFEDUCATION_GET_ONE,
    STAFFEDUCATION_GET_MULTIPLE,
    STAFFEDUCATION_REGISTER_SUCCESS,
    STAFFEDUCATION_REGISTER_FAIL,
    STAFFEDUCATION_LOADING,
    STAFFEDUCATION_LOADING_ERROR,
    STAFFEDUCATION_UPDATE_SUCCESS,
    STAFFEDUCATION_UPDATE_FAIL,
    STAFFEDUCATION_DELETE_SUCCESS,
    STAFFEDUCATION_DELETE_FAIL
} from "./../../types/staff/staffeducation";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFEDUCATION 
export const getStaffeducations = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFEDUCATION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFEDUCATION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFEDUCATION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFEDUCATION 
export const getStaffeducation = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFEDUCATION_GET_ONE,
        payload: id
    });  
};
//STAFFEDUCATION DELETE
export const deleteStaffeducation = (params, id )=> (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFEDUCATION_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEDUCATION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFEDUCATION REGISTER
export const registerStaffeducation = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFEDUCATION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEDUCATION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFEDUCATION UPDATE
export const updateStaffeducation = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFEDUCATION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEDUCATION_UPDATE_FAIL,
                payload: err
            })
        })
};
