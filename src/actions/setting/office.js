import axios from 'axios';
import {
    OFFICE_GET_ONE,
    OFFICE_GET_MULTIPLE,
    OFFICE_REGISTER_SUCCESS,
    OFFICE_REGISTER_FAIL,
    OFFICE_LOADING,
    OFFICE_LOADING_ERROR,
    OFFICE_UPDATE_SUCCESS,
    OFFICE_UPDATE_FAIL,
    OFFICE_DELETE_SUCCESS,
    OFFICE_DELETE_FAIL
} from "../../types/setting/office";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'offices';
const path = API_PATH_SETTING;

//GET ALL OFFICE 
export const getOffices = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : OFFICE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: OFFICE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : OFFICE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE OFFICE 
export const getOffice = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : OFFICE_GET_ONE,
        payload: id
    });  
};
//OFFICE DELETE
export const deleteOffice = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: OFFICE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : OFFICE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//OFFICE REGISTER
export const registerOffice = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: OFFICE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : OFFICE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //OFFICE UPDATE
export const updateOffice = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: OFFICE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : OFFICE_UPDATE_FAIL,
                payload: err
            })
        })
};
