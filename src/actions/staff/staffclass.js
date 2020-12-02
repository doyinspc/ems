import axios from 'axios';
import {
    STAFFCLASS_GET_ONE,
    STAFFCLASS_GET_MULTIPLE,
    STAFFCLASS_REGISTER_SUCCESS,
    STAFFCLASS_REGISTER_FAIL,
    STAFFCLASS_LOADING,
    STAFFCLASS_LOADING_ERROR,
    STAFFCLASS_UPDATE_SUCCESS,
    STAFFCLASS_UPDATE_FAIL,
    STAFFCLASS_DELETE_SUCCESS,
    STAFFCLASS_DELETE_FAIL
} from "./../../types/staff/staffclass";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFCLASS 
export const getStaffclasss = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : STAFFCLASS_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFCLASS_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFCLASS_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFCLASS 
export const getStaffclass = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFCLASS_GET_ONE,
        payload: id
    });  
};
//STAFFCLASS DELETE
export const deleteStaffclass = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFCLASS_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASS_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFCLASS REGISTER
export const registerStaffclass = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFCLASS_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASS_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFCLASS UPDATE
export const updateStaffclass = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFCLASS_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFCLASS_UPDATE_FAIL,
                payload: err
            })
        })
};
