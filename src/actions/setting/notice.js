import axios from 'axios';
import {
    NOTICE_GET_ONE,
    NOTICE_GET_MULTIPLE,
    NOTICE_REGISTER_SUCCESS,
    NOTICE_REGISTER_FAIL,
    NOTICE_LOADING,
    NOTICE_LOADING_ERROR,
    NOTICE_UPDATE_SUCCESS,
    NOTICE_UPDATE_FAIL,
    NOTICE_DELETE_SUCCESS,
    NOTICE_DELETE_FAIL
} from "../../types/setting/notice";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'notices';
const path = API_PATH_SETTING;

//GET ALL NOTICE 
export const getNotices = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : NOTICE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: NOTICE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : NOTICE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE NOTICE 
export const getNotice = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : NOTICE_GET_ONE,
        payload: id
    });  
};
//NOTICE DELETE
export const deleteNotice = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: NOTICE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : NOTICE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//NOTICE REGISTER
export const registerNotice = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: NOTICE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : NOTICE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //NOTICE UPDATE
export const updateNotice = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: NOTICE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : NOTICE_UPDATE_FAIL,
                payload: err
            })
        })
};
