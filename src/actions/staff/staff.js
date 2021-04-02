import axios from 'axios';
import {
    STAFF_GET_ONE,
    STAFF_GET_MULTIPLE,
    STAFF_GET_ALL,
    STAFF_GET_BIRTHDAY,
    STAFF_GET_SEARCH,
    STAFF_REGISTER_SUCCESS,
    STAFF_REGISTER_FAIL,
    STAFF_LOADING,
    STAFF_LOADING_ERROR,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL
} from "./../../types/staff/staff";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'staffs';
const path = API_PATH_STAFF;

//GET ALL STAFF 
export const getStaffs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STAFF 
export const getStaffAll = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                      
                dispatch({
                    type: STAFF_GET_ALL,
                    payload: res.data
                 })
            })
            .catch(err => {
                dispatch({
                   type : STAFF_LOADING_ERROR,
                   payload:err
                })
            })
};

export const searchStaff = params => (dispatch, getState) => {

    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_SEARCH,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};

export const birthday = params => (dispatch, getState) => {

    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_BIRTHDAY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};

//GET SINGLE STAFF 
export const getStaff = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFF_GET_ONE,
        payload: id
    });  
};
//STAFF DELETE
export const deleteStaff = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFF_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFF REGISTER
export const registerStaff = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFF_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFF UPDATE
export const updateStaff = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFF_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_UPDATE_FAIL,
                payload: err
            })
        })
};
