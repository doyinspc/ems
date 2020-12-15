import axios from 'axios';
import {
    STAFFLOG_GET_ONE,
    STAFFLOG_GET_MULTIPLE,
    STAFFLOG_REGISTER_SUCCESS,
    STAFFLOG_REGISTER_FAIL,
    STAFFLOG_LOADING,
    STAFFLOG_LOADING_ERROR,
    STAFFLOG_UPDATE_SUCCESS,
    STAFFLOG_UPDATE_FAIL,
    STAFFLOG_DELETE_SUCCESS,
    STAFFLOG_DELETE_FAIL
} from "./../../types/staff/stafflog";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFLOG 
export const getStafflogs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFLOG_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFLOG_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFLOG_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFLOG 
export const getStafflog = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFLOG_GET_ONE,
        payload: id
    });  
};
//STAFFLOG DELETE
export const deleteStafflog = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFLOG_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLOG_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFLOG REGISTER
export const registerStafflog = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLOG_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLOG_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFLOG UPDATE
export const updateStafflog = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLOG_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLOG_UPDATE_FAIL,
                payload: err
            })
        })
};
