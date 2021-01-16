import axios from 'axios';
import {
    ACCOUNT_GET_ONE,
    ACCOUNT_GET_MULTIPLE,
    ACCOUNT_REGISTER_SUCCESS,
    ACCOUNT_REGISTER_FAIL,
    ACCOUNT_LOADING,
    ACCOUNT_LOADING_ERROR,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL
} from "../../types/setting/account";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'accounts';
const path = API_PATH_SETTING;

//GET ALL ACCOUNT 
export const getAccounts = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : ACCOUNT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ACCOUNT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ACCOUNT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ACCOUNT 
export const getAccount = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ACCOUNT_GET_ONE,
        payload: id
    });  
};
//ACCOUNT DELETE
export const deleteAccount = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ACCOUNT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : ACCOUNT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ACCOUNT REGISTER
export const registerAccount = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ACCOUNT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ACCOUNT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ACCOUNT UPDATE
export const updateAccount = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ACCOUNT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ACCOUNT_UPDATE_FAIL,
                payload: err
            })
        })
};
