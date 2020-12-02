import axios from 'axios';
import {
    CAUNIT_GET_ONE,
    CAUNIT_GET_MULTIPLE,
    CAUNIT_REGISTER_SUCCESS,
    CAUNIT_REGISTER_FAIL,
    CAUNIT_LOADING,
    CAUNIT_LOADING_ERROR,
    CAUNIT_UPDATE_SUCCESS,
    CAUNIT_UPDATE_FAIL,
    CAUNIT_DELETE_SUCCESS,
    CAUNIT_DELETE_FAIL
} from "../../types/setting/caunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'caunits';
const path = API_PATH_SETTING;

//GET ALL CAUNIT 
export const getCaunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CAUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CAUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CAUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CAUNIT 
export const getCaunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CAUNIT_GET_ONE,
        payload: id
    });  
};
//CAUNIT DELETE
export const deleteCaunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CAUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CAUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CAUNIT REGISTER
export const registerCaunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CAUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CAUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CAUNIT UPDATE
export const updateCaunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CAUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CAUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
