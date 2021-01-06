import axios from 'axios';
import {
    JOB_GET_ONE,
    JOB_GET_MULTIPLE,
    JOB_REGISTER_SUCCESS,
    JOB_REGISTER_FAIL,
    JOB_LOADING,
    JOB_LOADING_ERROR,
    JOB_UPDATE_SUCCESS,
    JOB_UPDATE_FAIL,
    JOB_DELETE_SUCCESS,
    JOB_DELETE_FAIL
} from "../../types/setting/job";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'jobs';
const path = API_PATH_SETTING;

//GET ALL JOB 
export const getJobs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : JOB_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: JOB_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : JOB_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE JOB 
export const getJob = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : JOB_GET_ONE,
        payload: id
    });  
};
//JOB DELETE
export const deleteJob = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: JOB_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : JOB_DELETE_FAIL,
                payload : err
            })
        })
        
}
//JOB REGISTER
export const registerJob = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: JOB_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : JOB_REGISTER_FAIL,
                payload: err
            })
        })
};
 //JOB UPDATE
export const updateJob = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: JOB_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : JOB_UPDATE_FAIL,
                payload: err
            })
        })
};
