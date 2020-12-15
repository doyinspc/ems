import axios from 'axios';
import {
    PENMANAGER_GET_ONE,
    PENMANAGER_GET_MULTIPLE,
    PENMANAGER_REGISTER_SUCCESS,
    PENMANAGER_REGISTER_FAIL,
    PENMANAGER_LOADING,
    PENMANAGER_LOADING_ERROR,
    PENMANAGER_UPDATE_SUCCESS,
    PENMANAGER_UPDATE_FAIL,
    PENMANAGER_DELETE_SUCCESS,
    PENMANAGER_DELETE_FAIL
} from "../../types/setting/penmanager";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'penmanagers';
const path = API_PATH_SETTING;

//GET ALL PENMANAGER 
export const getPenmanagers = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : PENMANAGER_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: PENMANAGER_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : PENMANAGER_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE PENMANAGER 
export const getPenmanager = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : PENMANAGER_GET_ONE,
        payload: id
    });  
};
//PENMANAGER DELETE
export const deletePenmanager = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: PENMANAGER_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : PENMANAGER_DELETE_FAIL,
                payload : err
            })
        })
        
}
//PENMANAGER REGISTER
export const registerPenmanager = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: PENMANAGER_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : PENMANAGER_REGISTER_FAIL,
                payload: err
            })
        })
};
 //PENMANAGER UPDATE
export const updatePenmanager = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: PENMANAGER_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : PENMANAGER_UPDATE_FAIL,
                payload: err
            })
        })
};
