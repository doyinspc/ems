import axios from 'axios';
import {
    STAFFSUBJECT_GET_ONE,
    STAFFSUBJECT_GET_MULTIPLE,
    STAFFSUBJECT_REGISTER_SUCCESS,
    STAFFSUBJECT_REGISTER_FAIL,
    STAFFSUBJECT_LOADING,
    STAFFSUBJECT_LOADING_ERROR,
    STAFFSUBJECT_UPDATE_SUCCESS,
    STAFFSUBJECT_UPDATE_FAIL,
    STAFFSUBJECT_DELETE_SUCCESS,
    STAFFSUBJECT_DELETE_FAIL
} from "./../../types/staff/staffsubject";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'staffsubjects';
const path = API_PATH_STAFF;

//GET ALL STAFFSUBJECT 
export const getStaffsubjects = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFSUBJECT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFSUBJECT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFSUBJECT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFSUBJECT 
export const getStaffsubject = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFSUBJECT_GET_ONE,
        payload: id
    });  
};
//STAFFSUBJECT DELETE
export const deleteStaffsubject = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFSUBJECT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFSUBJECT REGISTER
export const registerStaffsubject = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSUBJECT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFSUBJECT UPDATE
export const updateStaffsubject = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSUBJECT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSUBJECT_UPDATE_FAIL,
                payload: err
            })
        })
};
