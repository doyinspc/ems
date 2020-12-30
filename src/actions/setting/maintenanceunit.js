import axios from 'axios';
import {
    MAINTENANCEUNIT_GET_ONE,
    MAINTENANCEUNIT_GET_MULTIPLE,
    MAINTENANCEUNIT_REGISTER_SUCCESS,
    MAINTENANCEUNIT_REGISTER_FAIL,
    MAINTENANCEUNIT_LOADING,
    MAINTENANCEUNIT_LOADING_ERROR,
    MAINTENANCEUNIT_UPDATE_SUCCESS,
    MAINTENANCEUNIT_UPDATE_FAIL,
    MAINTENANCEUNIT_DELETE_SUCCESS,
    MAINTENANCEUNIT_DELETE_FAIL
} from "../../types/setting/maintenanceunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'maintenanceunits';
const path = API_PATH_SETTING;

//GET ALL MAINTENANCEUNIT 
export const getMaintenanceunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : MAINTENANCEUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCEUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCEUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCEUNIT 
export const getMaintenanceunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCEUNIT_GET_ONE,
        payload: id
    });  
};
//MAINTENANCEUNIT DELETE
export const deleteMaintenanceunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCEUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCEUNIT REGISTER
export const registerMaintenanceunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCEUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCEUNIT UPDATE
export const updateMaintenanceunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCEUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
