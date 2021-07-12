import axios from 'axios';
import {
    GUARDIAN_GET_ONE,
    GUARDIAN_GET_MULTIPLE,
    GUARDIAN_REGISTER_SUCCESS,
    GUARDIAN_REGISTER_FAIL,
    GUARDIAN_LOADING,
    GUARDIAN_LOADING_ERROR,
    GUARDIAN_UPDATE_SUCCESS,
    GUARDIAN_UPDATE_FAIL,
    GUARDIAN_DELETE_SUCCESS,
    GUARDIAN_DELETE_FAIL
} from "./../../types/setting/guardian";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

const path = API_PATH_SETTING;

//GET ALL GUARDIAN 
export const getGuardians = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : GUARDIAN_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: GUARDIAN_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : GUARDIAN_LOADING_ERROR,
                    payload:err
                })
            })
    };
//GET SINGLE GUARDIAN 
export const getGuardian = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : GUARDIAN_GET_ONE,
        payload: id
    });  
};
//GUARDIAN DELETE
export const deleteGuardian = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: GUARDIAN_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : GUARDIAN_DELETE_FAIL,
                payload: err
            })
        })
        
}
//GUARDIAN REGISTER
export const registerGuardian = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GUARDIAN_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GUARDIAN_REGISTER_FAIL,
                payload: err
            })
        })
};
//GUARDIAN REGISTER
export const logoutGuardian = data => dispatch => {
    axios.post(path, data)
        .then(res => {
            dispatch({
                type: GUARDIAN_DELETE_FAIL
            })
        })
        .catch(err => {
            dispatch({
                type : GUARDIAN_DELETE_FAIL
            })
        })
};
 //GUARDIAN UPDATE
export const updateGuardian = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GUARDIAN_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GUARDIAN_UPDATE_FAIL,
                payload: err
            })
        })
};
