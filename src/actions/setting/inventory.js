import axios from 'axios';
import {
    INVENTORY_GET_ONE,
    INVENTORY_GET_MULTIPLE,
    INVENTORY_REGISTER_SUCCESS,
    INVENTORY_REGISTER_FAIL,
    INVENTORY_LOADING,
    INVENTORY_LOADING_ERROR,
    INVENTORY_UPDATE_SUCCESS,
    INVENTORY_UPDATE_FAIL,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_DELETE_FAIL
} from "../../types/setting/inventory";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'inventorys';
const path = API_PATH_SETTING;

//GET ALL INVENTORY 
export const getInventorys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : INVENTORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: INVENTORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : INVENTORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE INVENTORY 
export const getInventory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : INVENTORY_GET_ONE,
        payload: id
    });  
};
//INVENTORY DELETE
export const deleteInventory = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: INVENTORY_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//INVENTORY REGISTER
export const registerInventory = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //INVENTORY UPDATE
export const updateInventory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORY_UPDATE_FAIL,
                payload: err
            })
        })
};
