import axios from 'axios';
import {
    DEPARTMENT_GET_ONE,
    DEPARTMENT_GET_MULTIPLE,
    DEPARTMENT_REGISTER_SUCCESS,
    DEPARTMENT_REGISTER_FAIL,
    DEPARTMENT_LOADING,
    DEPARTMENT_LOADING_ERROR,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAIL,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAIL
} from "../../types/setting/department";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'departments';
const path = API_PATH_SETTING;

//GET ALL DEPARTMENT 
export const getDepartments = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : DEPARTMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: DEPARTMENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : DEPARTMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE DEPARTMENT 
export const getDepartment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : DEPARTMENT_GET_ONE,
        payload: id
    });  
};
//DEPARTMENT DELETE
export const deleteDepartment = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: DEPARTMENT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//DEPARTMENT REGISTER
export const registerDepartment = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: DEPARTMENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //DEPARTMENT UPDATE
export const updateDepartment = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: DEPARTMENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_UPDATE_FAIL,
                payload: err
            })
        })
};
