import axios from 'axios';
import {
    STAFFLEAVE_GET_ONE,
    STAFFLEAVE_GET_MULTIPLE,
    STAFFLEAVE_REGISTER_SUCCESS,
    STAFFLEAVE_REGISTER_FAIL,
    STAFFLEAVE_LOADING,
    STAFFLEAVE_LOADING_ERROR,
    STAFFLEAVE_UPDATE_SUCCESS,
    STAFFLEAVE_UPDATE_FAIL,
    STAFFLEAVE_DELETE_SUCCESS,
    STAFFLEAVE_DELETE_FAIL
} from "./../../types/staff/staffleave";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFLEAVE 
export const getStaffleaves = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFLEAVE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFLEAVE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFLEAVE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFLEAVE 
export const getStaffleave = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFLEAVE_GET_ONE,
        payload: id
    });  
};
//STAFFLEAVE DELETE
export const deleteStaffleave = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFLEAVE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLEAVE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFLEAVE REGISTER
export const registerStaffleave = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLEAVE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLEAVE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFLEAVE UPDATE
export const updateStaffleave = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFLEAVE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFLEAVE_UPDATE_FAIL,
                payload: err
            })
        })
};
