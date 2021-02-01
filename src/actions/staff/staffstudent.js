import axios from 'axios';
import {
    STAFFSTUDENT_GET_ONE,
    STAFFSTUDENT_GET_MULTIPLE,
    STAFFSTUDENT_REGISTER_SUCCESS,
    STAFFSTUDENT_REGISTER_FAIL,
    STAFFSTUDENT_LOADING,
    STAFFSTUDENT_LOADING_ERROR,
    STAFFSTUDENT_UPDATE_SUCCESS,
    STAFFSTUDENT_UPDATE_FAIL,
    STAFFSTUDENT_DELETE_SUCCESS,
    STAFFSTUDENT_DELETE_FAIL
} from "../../types/staff/staffstudent";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from '../common';

let TABLE_NAME = 'staffstudents';
const path = API_PATH_STAFF;

//GET ALL STAFFSTUDENT 
export const getStaffstudents = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFSTUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFSTUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFSTUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFSTUDENT 
export const getStaffstudent = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFSTUDENT_GET_ONE,
        payload: id
    });  
};
//STAFFSTUDENT DELETE
export const deleteStaffstudent = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSTUDENT_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSTUDENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFSTUDENT REGISTER
export const registerStaffstudent = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSTUDENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSTUDENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFSTUDENT UPDATE
export const updateStaffstudent = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFSTUDENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFSTUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};
