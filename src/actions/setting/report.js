import axios from 'axios';
import {
    REPORT_GET_ONE,
    REPORT_GET_MULTIPLE,
    REPORT_REGISTER_SUCCESS,
    REPORT_REGISTER_FAIL,
    REPORT_LOADING,
    REPORT_LOADING_ERROR,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,
    REPORT_DELETE_SUCCESS,
    REPORT_DELETE_FAIL
} from "../../types/setting/report";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'reports';
const path = API_PATH_SETTING;

//GET ALL REPORT 
export const getReports = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : REPORT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: REPORT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : REPORT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE REPORT 
export const getReport = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : REPORT_GET_ONE,
        payload: id
    });  
};
//REPORT DELETE
export const deleteReport = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: REPORT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : REPORT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//REPORT REGISTER
export const registerReport = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: REPORT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : REPORT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //REPORT UPDATE
export const updateReport = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: REPORT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : REPORT_UPDATE_FAIL,
                payload: err
            })
        })
};
