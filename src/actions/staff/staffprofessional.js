import axios from 'axios';
import {
    STAFFPROFESSIONAL_GET_ONE,
    STAFFPROFESSIONAL_GET_MULTIPLE,
    STAFFPROFESSIONAL_REGISTER_SUCCESS,
    STAFFPROFESSIONAL_REGISTER_FAIL,
    STAFFPROFESSIONAL_LOADING,
    STAFFPROFESSIONAL_LOADING_ERROR,
    STAFFPROFESSIONAL_UPDATE_SUCCESS,
    STAFFPROFESSIONAL_UPDATE_FAIL,
    STAFFPROFESSIONAL_DELETE_SUCCESS,
    STAFFPROFESSIONAL_DELETE_FAIL
} from "./../../types/staff/staffprofessional";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFPROFESSIONAL 
export const getStaffprofessionals = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFPROFESSIONAL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFPROFESSIONAL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFPROFESSIONAL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFPROFESSIONAL 
export const getStaffprofessional = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFPROFESSIONAL_GET_ONE,
        payload: id
    });  
};
//STAFFPROFESSIONAL DELETE
export const deleteStaffprofessional = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFPROFESSIONAL_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFPROFESSIONAL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFPROFESSIONAL REGISTER
export const registerStaffprofessional = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFPROFESSIONAL_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFPROFESSIONAL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFPROFESSIONAL UPDATE
export const updateStaffprofessional = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFPROFESSIONAL_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFPROFESSIONAL_UPDATE_FAIL,
                payload: err
            })
        })
};
