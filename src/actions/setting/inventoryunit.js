import axios from 'axios';
import {
    INVENTORYUNIT_GET_ONE,
    INVENTORYUNIT_GET_MULTIPLE,
    INVENTORYUNIT_REGISTER_SUCCESS,
    INVENTORYUNIT_REGISTER_FAIL,
    INVENTORYUNIT_LOADING,
    INVENTORYUNIT_LOADING_ERROR,
    INVENTORYUNIT_UPDATE_SUCCESS,
    INVENTORYUNIT_UPDATE_FAIL,
    INVENTORYUNIT_DELETE_SUCCESS,
    INVENTORYUNIT_DELETE_FAIL
} from "../../types/setting/inventoryunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'inventoryunits';
const path = API_PATH_SETTING;

//GET ALL INVENTORYUNIT 
export const getInventoryunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : INVENTORYUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: INVENTORYUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : INVENTORYUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE INVENTORYUNIT 
export const getInventoryunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : INVENTORYUNIT_GET_ONE,
        payload: id
    });  
};
//INVENTORYUNIT DELETE
export const deleteInventoryunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: INVENTORYUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//INVENTORYUNIT REGISTER
export const registerInventoryunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //INVENTORYUNIT UPDATE
export const updateInventoryunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
