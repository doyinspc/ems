
import axios from 'axios';
import {
    UNIT_GET_ONE,
    UNIT_GET_MULTIPLE,
    UNIT_REGISTER_SUCCESS,
    UNIT_REGISTER_FAIL,
    UNIT_LOADING,
    UNIT_LOADING_ERROR,
    UNIT_UPDATE_SUCCESS,
    UNIT_UPDATE_FAIL,
    UNIT_DELETE_SUCCESS,
    UNIT_DELETE_FAIL
} from "./../../types/setting/unit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'units';
const path = API_PATH_SETTING;

//GET ALL UNIT 
export const getUnits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : UNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: UNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : UNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE UNIT 
export const getUnit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : UNIT_GET_ONE,
        payload: id
    });  
};
//UNIT DELETE
export const deleteUnit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: UNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : UNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//UNIT REGISTER
export const registerUnit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: UNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : UNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //UNIT UPDATE
export const updateUnit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: UNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : UNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
