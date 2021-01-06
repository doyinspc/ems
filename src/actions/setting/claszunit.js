
import axios from 'axios';
import {
    CLASZUNIT_GET_ONE,
    CLASZUNIT_GET_MULTIPLE,
    CLASZUNIT_REGISTER_SUCCESS,
    CLASZUNIT_REGISTER_FAIL,
    CLASZUNIT_LOADING,
    CLASZUNIT_LOADING_ERROR,
    CLASZUNIT_UPDATE_SUCCESS,
    CLASZUNIT_UPDATE_FAIL,
    CLASZUNIT_DELETE_SUCCESS,
    CLASZUNIT_DELETE_FAIL
} from "./../../types/setting/claszunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'claszunits';
const path = API_PATH_SETTING;

//GET ALL CLASZUNIT 
export const getClaszunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CLASZUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CLASZUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLASZUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CLASZUNIT 
export const getClaszunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CLASZUNIT_GET_ONE,
        payload: id
    });  
};
//CLASZUNIT DELETE
export const deleteClaszunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CLASZUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CLASZUNIT REGISTER
export const registerClaszunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASZUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CLASZUNIT UPDATE
export const updateClaszunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASZUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASZUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
