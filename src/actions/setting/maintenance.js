import axios from 'axios';
import {
    MAINTENANCE_GET_ONE,
    MAINTENANCE_GET_MULTIPLE,
    MAINTENANCE_REGISTER_SUCCESS,
    MAINTENANCE_REGISTER_FAIL,
    MAINTENANCE_LOADING,
    MAINTENANCE_LOADING_ERROR,
    MAINTENANCE_UPDATE_SUCCESS,
    MAINTENANCE_UPDATE_FAIL,
    MAINTENANCE_DELETE_SUCCESS,
    MAINTENANCE_DELETE_FAIL
} from "../../types/setting/maintenance";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'maintenances';
const path = API_PATH_SETTING;

//GET ALL MAINTENANCE 
export const getMaintenances = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : MAINTENANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCE 
export const getMaintenance = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCE_GET_ONE,
        payload: id
    });  
};
//MAINTENANCE DELETE
export const deleteMaintenance = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCE REGISTER
export const registerMaintenance = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCE UPDATE
export const updateMaintenance = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
