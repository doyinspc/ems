import axios from 'axios';
import {
    STAFFSUBJECTREPORT_GET_ONE,
    STAFFSUBJECTREPORT_GET_MULTIPLE,
    STAFFSUBJECTREPORT_REGISTER_SUCCESS,
    STAFFSUBJECTREPORT_REGISTER_FAIL,
    STAFFSUBJECTREPORT_LOADING,
    STAFFSUBJECTREPORT_LOADING_ERROR,
    STAFFSUBJECTREPORT_UPDATE_SUCCESS,
    STAFFSUBJECTREPORT_UPDATE_FAIL,
    STAFFSUBJECTREPORT_DELETE_SUCCESS,
    STAFFSUBJECTREPORT_DELETE_FAIL
} from "./../../types/staff/staffsubjectreport";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFSUBJECTREPORT 
export const getStaffsubjectreports = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFSUBJECTREPORT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFSUBJECTREPORT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFSUBJECTREPORT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFSUBJECTREPORT 
export const getStaffsubjectreport = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFSUBJECTREPORT_GET_ONE,
        payload: id
    });  
};
//STAFFSUBJECTREPORT DELETE
export const deleteStaffsubjectreport = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFSUBJECTREPORT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECTREPORT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFSUBJECTREPORT REGISTER
export const registerStaffsubjectreport = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSUBJECTREPORT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECTREPORT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFSUBJECTREPORT UPDATE
export const updateStaffsubjectreport = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSUBJECTREPORT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECTREPORT_UPDATE_FAIL,
                payload: err
            })
        })
};
