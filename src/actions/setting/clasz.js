import axios from 'axios';
import {
    CLASZ_GET_ONE,
    CLASZ_GET_MULTIPLE,
    CLASZ_REGISTER_SUCCESS,
    CLASZ_REGISTER_FAIL,
    CLASZ_LOADING,
    CLASZ_LOADING_ERROR,
    CLASZ_UPDATE_SUCCESS,
    CLASZ_UPDATE_FAIL,
    CLASZ_DELETE_SUCCESS,
    CLASZ_DELETE_FAIL
} from "../../types/setting/clasz";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'claszs';
const path = API_PATH_SETTING;

//GET ALL CLASZ 
export const getClaszs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CLASZ_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CLASZ_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLASZ_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CLASZ 
export const getClasz = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CLASZ_GET_ONE,
        payload: id
    });  
};
//CLASZ DELETE
export const deleteClasz = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CLASZ_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZ_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CLASZ REGISTER
export const registerClasz = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASZ_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZ_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CLASZ UPDATE
export const updateClasz = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASZ_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZ_UPDATE_FAIL,
                payload: err
            })
        })
};
