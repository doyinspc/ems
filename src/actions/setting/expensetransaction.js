import axios from 'axios';
import {
    EXPENSETRANSACTION_GET_ONE,
    EXPENSETRANSACTION_GET_MULTIPLE,
    EXPENSETRANSACTION_REGISTER_SUCCESS,
    EXPENSETRANSACTION_REGISTER_FAIL,
    EXPENSETRANSACTION_LOADING,
    EXPENSETRANSACTION_LOADING_ERROR,
    EXPENSETRANSACTION_UPDATE_SUCCESS,
    EXPENSETRANSACTION_UPDATE_FAIL,
    EXPENSETRANSACTION_DELETE_SUCCESS,
    EXPENSETRANSACTION_DELETE_FAIL
} from "../../types/setting/expensetransaction";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'expensetransactions';
const path = API_PATH_SETTING;

//GET ALL EXPENSETRANSACTION 
export const getExpensetransactions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : EXPENSETRANSACTION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: EXPENSETRANSACTION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EXPENSETRANSACTION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE EXPENSETRANSACTION 
export const getExpensetransaction = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : EXPENSETRANSACTION_GET_ONE,
        payload: id
    });  
};
//EXPENSETRANSACTION DELETE
export const deleteExpensetransaction = (params, id) => (dispatch, getState) =>{
    axios.post(path, {params}, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSETRANSACTION_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSETRANSACTION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//EXPENSETRANSACTION REGISTER
export const registerExpensetransaction = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSETRANSACTION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSETRANSACTION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //EXPENSETRANSACTION UPDATE
export const updateExpensetransaction = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: EXPENSETRANSACTION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : EXPENSETRANSACTION_UPDATE_FAIL,
                payload: err
            })
        })
};
