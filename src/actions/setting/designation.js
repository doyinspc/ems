import axios from 'axios';
import {
    DESIGNATION_GET_ONE,
    DESIGNATION_GET_MULTIPLE,
    DESIGNATION_REGISTER_SUCCESS,
    DESIGNATION_REGISTER_FAIL,
    DESIGNATION_LOADING,
    DESIGNATION_LOADING_ERROR,
    DESIGNATION_UPDATE_SUCCESS,
    DESIGNATION_UPDATE_FAIL,
    DESIGNATION_DELETE_SUCCESS,
    DESIGNATION_DELETE_FAIL
} from "../../types/setting/designation";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'designations';
const path = API_PATH_SETTING;

//GET ALL DESIGNATION 
export const getDesignations = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : DESIGNATION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: DESIGNATION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : DESIGNATION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE DESIGNATION 
export const getDesignation = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : DESIGNATION_GET_ONE,
        payload: id
    });  
};
//DESIGNATION DELETE
export const deleteDesignation = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: DESIGNATION_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : DESIGNATION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//DESIGNATION REGISTER
export const registerDesignation = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: DESIGNATION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : DESIGNATION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //DESIGNATION UPDATE
export const updateDesignation = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: DESIGNATION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : DESIGNATION_UPDATE_FAIL,
                payload: err
            })
        })
};
