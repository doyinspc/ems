import axios from 'axios';
import {
    STAFFCLASSREPORT_GET_ONE,
    STAFFCLASSREPORT_GET_MULTIPLE,
    STAFFCLASSREPORT_REGISTER_SUCCESS,
    STAFFCLASSREPORT_REGISTER_FAIL,
    STAFFCLASSREPORT_LOADING,
    STAFFCLASSREPORT_LOADING_ERROR,
    STAFFCLASSREPORT_UPDATE_SUCCESS,
    STAFFCLASSREPORT_UPDATE_FAIL,
    STAFFCLASSREPORT_DELETE_SUCCESS,
    STAFFCLASSREPORT_DELETE_FAIL
} from "./../../types/staff/staffclassreport";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFCLASSREPORT 
export const getStaffclassreports = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFCLASSREPORT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFCLASSREPORT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFCLASSREPORT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFCLASSREPORT 
export const getStaffclassreport = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFCLASSREPORT_GET_ONE,
        payload: id
    });  
};
//STAFFCLASSREPORT DELETE
export const deleteStaffclassreport = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFCLASSREPORT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASSREPORT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFCLASSREPORT REGISTER
export const registerStaffclassreport = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFCLASSREPORT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASSREPORT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFCLASSREPORT UPDATE
export const updateStaffclassreport = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFCLASSREPORT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASSREPORT_UPDATE_FAIL,
                payload: err
            })
        })
};
