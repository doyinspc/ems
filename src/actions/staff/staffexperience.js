import axios from 'axios';
import {
    STAFFEXPERIENCE_GET_ONE,
    STAFFEXPERIENCE_GET_MULTIPLE,
    STAFFEXPERIENCE_REGISTER_SUCCESS,
    STAFFEXPERIENCE_REGISTER_FAIL,
    STAFFEXPERIENCE_LOADING,
    STAFFEXPERIENCE_LOADING_ERROR,
    STAFFEXPERIENCE_UPDATE_SUCCESS,
    STAFFEXPERIENCE_UPDATE_FAIL,
    STAFFEXPERIENCE_DELETE_SUCCESS,
    STAFFEXPERIENCE_DELETE_FAIL
} from "./../../types/staff/staffexperience";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFEXPERIENCE 
export const getStaffexperiences = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFEXPERIENCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFEXPERIENCE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFEXPERIENCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFEXPERIENCE 
export const getStaffexperience = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFEXPERIENCE_GET_ONE,
        payload: id
    });  
};
//STAFFEXPERIENCE DELETE
export const deleteStaffexperience = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFEXPERIENCE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEXPERIENCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFEXPERIENCE REGISTER
export const registerStaffexperience = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFEXPERIENCE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEXPERIENCE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFEXPERIENCE UPDATE
export const updateStaffexperience = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFEXPERIENCE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFEXPERIENCE_UPDATE_FAIL,
                payload: err
            })
        })
};
