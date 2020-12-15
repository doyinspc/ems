import axios from 'axios';
import {
    STAFFACCESS_GET_ONE,
    STAFFACCESS_GET_MULTIPLE,
    STAFFACCESS_REGISTER_SUCCESS,
    STAFFACCESS_REGISTER_FAIL,
    STAFFACCESS_LOADING,
    STAFFACCESS_LOADING_ERROR,
    STAFFACCESS_UPDATE_SUCCESS,
    STAFFACCESS_UPDATE_FAIL,
    STAFFACCESS_DELETE_SUCCESS,
    STAFFACCESS_DELETE_FAIL
} from "./../../types/staff/staffaccess";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFACCESS 
export const getStaffaccesss = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFACCESS_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFACCESS_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFACCESS_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFACCESS 
export const getStaffaccess = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFACCESS_GET_ONE,
        payload: id
    });  
};
//STAFFACCESS DELETE
export const deleteStaffaccess = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFACCESS_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFACCESS_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFACCESS REGISTER
export const registerStaffaccess = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFACCESS_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFACCESS_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFACCESS UPDATE
export const updateStaffaccess = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFACCESS_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFACCESS_UPDATE_FAIL,
                payload: err
            })
        })
};
