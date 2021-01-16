import axios from 'axios';
import {
    EXPENSEUNIT_GET_ONE,
    EXPENSEUNIT_GET_MULTIPLE,
    EXPENSEUNIT_REGISTER_SUCCESS,
    EXPENSEUNIT_REGISTER_FAIL,
    EXPENSEUNIT_LOADING,
    EXPENSEUNIT_LOADING_ERROR,
    EXPENSEUNIT_UPDATE_SUCCESS,
    EXPENSEUNIT_UPDATE_FAIL,
    EXPENSEUNIT_DELETE_SUCCESS,
    EXPENSEUNIT_DELETE_FAIL
} from "../../types/setting/expenseunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'expenseunits';
const path = API_PATH_SETTING;

//GET ALL EXPENSEUNIT 
export const getExpenseunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : EXPENSEUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: EXPENSEUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EXPENSEUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE EXPENSEUNIT 
export const getExpenseunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : EXPENSEUNIT_GET_ONE,
        payload: id
    });  
};
//EXPENSEUNIT DELETE
export const deleteExpenseunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: EXPENSEUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSEUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//EXPENSEUNIT REGISTER
export const registerExpenseunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSEUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSEUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //EXPENSEUNIT UPDATE
export const updateExpenseunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSEUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSEUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
