import axios from 'axios';
import {
    STAFFREPORT_GET_ONE,
    STAFFREPORT_GET_MULTIPLE,
    STAFFREPORT_REGISTER_SUCCESS,
    STAFFREPORT_REGISTER_FAIL,
    STAFFREPORT_LOADING,
    STAFFREPORT_LOADING_ERROR,
    STAFFREPORT_UPDATE_SUCCESS,
    STAFFREPORT_UPDATE_FAIL,
    STAFFREPORT_DELETE_SUCCESS,
    STAFFREPORT_DELETE_FAIL
} from "./../../types/staff/staffreport";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFREPORT 
export const getStaffreports = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFREPORT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFREPORT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFREPORT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFREPORT 
export const getStaffreport = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFREPORT_GET_ONE,
        payload: id
    });  
};
//STAFFREPORT DELETE
export const deleteStaffreport = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFREPORT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFREPORT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFREPORT REGISTER
export const registerStaffreport = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFREPORT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFREPORT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFREPORT UPDATE
export const updateStaffreport = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFREPORT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFREPORT_UPDATE_FAIL,
                payload: err
            })
        })
};
