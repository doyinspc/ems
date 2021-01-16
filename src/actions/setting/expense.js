import axios from 'axios';
import {
    EXPENSE_GET_ONE,
    EXPENSE_GET_MULTIPLE,
    EXPENSE_REGISTER_SUCCESS,
    EXPENSE_REGISTER_FAIL,
    EXPENSE_LOADING,
    EXPENSE_LOADING_ERROR,
    EXPENSE_UPDATE_SUCCESS,
    EXPENSE_UPDATE_FAIL,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL
} from "../../types/setting/expense";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'expenses';
const path = API_PATH_SETTING;

//GET ALL EXPENSE 
export const getExpenses = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : EXPENSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: EXPENSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EXPENSE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE EXPENSE 
export const getExpense = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : EXPENSE_GET_ONE,
        payload: id
    });  
};
//EXPENSE DELETE
export const deleteExpense = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: EXPENSE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//EXPENSE REGISTER
export const registerExpense = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //EXPENSE UPDATE
export const updateExpense = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSE_UPDATE_FAIL,
                payload: err
            })
        })
};
