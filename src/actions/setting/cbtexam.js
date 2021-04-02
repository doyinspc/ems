import axios from 'axios';
import {
    CBTEXAM_GET_ONE,
    CBTEXAM_GET_MULTIPLE,
    CBTEXAM_REGISTER_SUCCESS,
    CBTEXAM_REGISTER_FAIL,
    CBTEXAM_LOADING,
    CBTEXAM_LOADING_ERROR,
    CBTEXAM_UPDATE_SUCCESS,
    CBTEXAM_UPDATE_FAIL,
    CBTEXAM_DELETE_SUCCESS,
    CBTEXAM_DELETE_FAIL
} from "../../types/setting/cbtexam";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'cbtexams';
const path = API_PATH_SETTING;

//GET ALL CBTEXAM 
export const getCbtexams = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CBTEXAM_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CBTEXAM_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CBTEXAM_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CBTEXAM 
export const getCbtexam = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CBTEXAM_GET_ONE,
        payload: id
    });  
};
//CBTEXAM DELETE
export const deleteCbtexam = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CBTEXAM_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CBTEXAM_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CBTEXAM REGISTER
export const registerCbtexam = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CBTEXAM_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CBTEXAM_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CBTEXAM UPDATE
export const updateCbtexam = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CBTEXAM_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CBTEXAM_UPDATE_FAIL,
                payload: err
            })
        })
};
