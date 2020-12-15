import axios from 'axios';
import {
    STAFFJOB_GET_ONE,
    STAFFJOB_GET_MULTIPLE,
    STAFFJOB_REGISTER_SUCCESS,
    STAFFJOB_REGISTER_FAIL,
    STAFFJOB_LOADING,
    STAFFJOB_LOADING_ERROR,
    STAFFJOB_UPDATE_SUCCESS,
    STAFFJOB_UPDATE_FAIL,
    STAFFJOB_DELETE_SUCCESS,
    STAFFJOB_DELETE_FAIL
} from "./../../types/staff/staffjob";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL STAFFJOB 
export const getStaffjobs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : STAFFJOB_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFFJOB_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFFJOB_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFFJOB 
export const getStaffjob = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFFJOB_GET_ONE,
        payload: id
    });  
};
//STAFFJOB DELETE
export const deleteStaffjob = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFFJOB_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFJOB_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFFJOB REGISTER
export const registerStaffjob = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFJOB_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFJOB_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFFJOB UPDATE
export const updateStaffjob = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFFJOB_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFFJOB_UPDATE_FAIL,
                payload: err
            })
        })
};
