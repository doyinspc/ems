import axios from 'axios';
import {
    FEE_GET_ONE,
    FEE_GET_MULTIPLE,
    FEE_REGISTER_SUCCESS,
    FEE_REGISTER_FAIL,
    FEE_LOADING,
    FEE_LOADING_ERROR,
    FEE_UPDATE_SUCCESS,
    FEE_UPDATE_FAIL,
    FEE_DELETE_SUCCESS,
    FEE_DELETE_FAIL
} from "../../types/setting/fee";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'fees';
const path = API_PATH_SETTING;

//GET ALL FEE 
export const getFees = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : FEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: FEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : FEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE FEE 
export const getFee = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : FEE_GET_ONE,
        payload: id
    });  
};
//FEE DELETE
export const deleteFee = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: FEE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//FEE REGISTER
export const registerFee = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: FEE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //FEE UPDATE
export const updateFee = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: FEE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_UPDATE_FAIL,
                payload: err
            })
        })
};
