import axios from 'axios';
import {
    SCHOOL_GET_ONE,
    SCHOOL_GET_MULTIPLE,
    SCHOOL_GET_DROPDOWNS,
    SCHOOL_REGISTER_SUCCESS,
    SCHOOL_REGISTER_FAIL,
    SCHOOL_LOADING,
    SCHOOL_LOADING_ERROR,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,
    SCHOOL_DELETE_SUCCESS,
    SCHOOL_DELETE_FAIL
} from "../../types/setting/school";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'schools';
const path = API_PATH_SETTING;

//GET ALL SCHOOL 
export const getSchools = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : SCHOOL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SCHOOL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SCHOOL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL SCHOOL 
export const getSchooldropdowns = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : SCHOOL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SCHOOL_GET_DROPDOWNS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SCHOOL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SCHOOL 
export const getSchool = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SCHOOL_GET_ONE,
        payload: id
    });  
};
//SCHOOL DELETE
export const deleteSchool = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SCHOOL_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SCHOOL REGISTER
export const registerSchool = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SCHOOL_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SCHOOL UPDATE
export const updateSchool = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: SCHOOL_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_UPDATE_FAIL,
                payload: err
            })
        })
};
