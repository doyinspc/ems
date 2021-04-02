import axios from 'axios';
import {
    CBT_GET_ONE,
    CBT_GET_MULTIPLE,
    CBT_REGISTER_SUCCESS,
    CBT_REGISTER_FAIL,
    CBT_LOADING,
    CBT_LOADING_ERROR,
    CBT_UPDATE_SUCCESS,
    CBT_UPDATE_FAIL,
    CBT_DELETE_SUCCESS,
    CBT_DELETE_FAIL
} from "../../types/setting/cbt";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'cbts';
const path = API_PATH_SETTING;

//GET ALL CBT 
export const getCbts = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CBT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CBT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CBT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CBT 
export const getCbt = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CBT_GET_ONE,
        payload: id
    });  
};
//CBT DELETE
export const deleteCbt = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CBT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CBT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CBT REGISTER
export const registerCbt = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CBT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CBT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CBT UPDATE
export const updateCbt = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CBT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CBT_UPDATE_FAIL,
                payload: err
            })
        })
};
