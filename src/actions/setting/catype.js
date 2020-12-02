import axios from 'axios';
import {
    CATYPE_GET_ONE,
    CATYPE_GET_MULTIPLE,
    CATYPE_REGISTER_SUCCESS,
    CATYPE_REGISTER_FAIL,
    CATYPE_LOADING,
    CATYPE_LOADING_ERROR,
    CATYPE_UPDATE_SUCCESS,
    CATYPE_UPDATE_FAIL,
    CATYPE_DELETE_SUCCESS,
    CATYPE_DELETE_FAIL
} from "./../../types/setting/catype";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from '../common';

let TABLE_NAME = 'catypes';
const path = API_PATH_SETTING;

//GET ALL CATYPE 
export const getCatypes = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CATYPE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CATYPE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CATYPE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CATYPE 
export const getCatype = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CATYPE_GET_ONE,
        payload: id
    });  
};
//CATYPE DELETE
export const deleteCatype = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CATYPE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CATYPE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CATYPE REGISTER
export const registerCatype = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CATYPE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATYPE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CATYPE UPDATE
export const updateCatype = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CATYPE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CATYPE_UPDATE_FAIL,
                payload: err
            })
        })
};
