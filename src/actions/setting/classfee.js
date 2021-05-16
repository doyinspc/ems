import axios from 'axios';
import {
    CLASSFEE_GET_ONE,
    CLASSFEE_GET_MULTIPLE,
    CLASSFEE_REGISTER_SUCCESS,
    CLASSFEE_REGISTER_FAIL,
    CLASSFEE_LOADING,
    CLASSFEE_LOADING_ERROR,
    CLASSFEE_UPDATE_SUCCESS,
    CLASSFEE_UPDATE_FAIL,
    CLASSFEE_DELETE_SUCCESS,
    CLASSFEE_DELETE_FAIL
} from "../../types/setting/classfee";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'classfees';
const path = API_PATH_SETTING;

//GET ALL CLASSFEE 
export const getClassfees = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : CLASSFEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CLASSFEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLASSFEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CLASSFEE 
export const getClassfee = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CLASSFEE_GET_ONE,
        payload: id
    });  
};
//CLASSFEE DELETE
export const deleteClassfee = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CLASSFEE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSFEE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CLASSFEE REGISTER
export const registerClassfee = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSFEE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSFEE_REGISTER_FAIL,
                payload: err
            })
        })
};
//CLASSFEE REGISTER
export const insertClassfee = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSFEE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSFEE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CLASSFEE UPDATE
export const updateClassfee = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLASSFEE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLASSFEE_UPDATE_FAIL,
                payload: err
            })
        })
};
