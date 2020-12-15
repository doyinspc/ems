import axios from 'axios';
import {
    STAFFLESSONPLAN_GET_ONE,
    STAFFLESSONPLAN_GET_MULTIPLE,
    STAFFLESSONPLAN_REGISTER_SUCCESS,
    STAFFLESSONPLAN_REGISTER_FAIL,
    STAFFLESSONPLAN_LOADING,
    STAFFLESSONPLAN_LOADING_ERROR,
    STAFFLESSONPLAN_UPDATE_SUCCESS,
    STAFFLESSONPLAN_UPDATE_FAIL,
    STAFFLESSONPLAN_DELETE_SUCCESS,
    STAFFLESSONPLAN_DELETE_FAIL
} from "./../../types/staff/stafflessonplan";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFLESSONPLAN 
export const getStafflessonplans = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFLESSONPLAN_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFLESSONPLAN_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFLESSONPLAN_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFLESSONPLAN 
export const getStafflessonplan = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFLESSONPLAN_GET_ONE,
        payload: id
    });  
};
//STAFFLESSONPLAN DELETE
export const deleteStafflessonplan = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFLESSONPLAN_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLESSONPLAN_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFLESSONPLAN REGISTER
export const registerStafflessonplan = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLESSONPLAN_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLESSONPLAN_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFLESSONPLAN UPDATE
export const updateStafflessonplan = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLESSONPLAN_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLESSONPLAN_UPDATE_FAIL,
                payload: err
            })
        })
};
