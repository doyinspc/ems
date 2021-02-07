import axios from 'axios';
import {
    CLASSSTAFF_GET_ONE,
    CLASSSTAFF_GET_MULTIPLE,
    CLASSSTAFF_REGISTER_SUCCESS,
    CLASSSTAFF_REGISTER_FAIL,
    CLASSSTAFF_LOADING,
    CLASSSTAFF_LOADING_ERROR,
    CLASSSTAFF_UPDATE_SUCCESS,
    CLASSSTAFF_UPDATE_FAIL,
    CLASSSTAFF_DELETE_SUCCESS,
    CLASSSTAFF_DELETE_FAIL
} from "../../types/setting/classstaff";
import { MAIN_TOKEN, API_PATH_STAFF, axiosConfig1, axiosConfig } from '../common';

let TABLE_NAME = 'access';
const path = API_PATH_STAFF;

//GET ALL CLASSSTAFF 
export const getClassstaffs = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : CLASSSTAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CLASSSTAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLASSSTAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CLASSSTAFF 
export const getClassstaff = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CLASSSTAFF_GET_ONE,
        payload: id
    });  
};
//CLASSSTAFF DELETE
export const deleteClassstaff = (params, id) => (dispatch, getState) =>{
    axios.post(path, params, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSSTAFF_DELETE_SUCCESS,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSSTAFF_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CLASSSTAFF REGISTER
export const registerClassstaff = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSSTAFF_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSSTAFF_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CLASSSTAFF UPDATE
export const updateClassstaff = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSSTAFF_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSSTAFF_UPDATE_FAIL,
                payload: err
            })
        })
};
