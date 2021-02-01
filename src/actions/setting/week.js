import axios from 'axios';
import {
    WEEK_GET_ONE,
    WEEK_GET_MULTIPLE,
    WEEK_REGISTER_SUCCESS,
    WEEK_REGISTER_FAIL,
    WEEK_LOADING,
    WEEK_LOADING_ERROR,
    WEEK_UPDATE_SUCCESS,
    WEEK_UPDATE_FAIL,
    WEEK_DELETE_SUCCESS,
    WEEK_DELETE_FAIL
} from "../../types/setting/week";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from '../common';

let TABLE_NAME = 'weeks';
const path = API_PATH_SETTING;

//GET ALL WEEK 
export const getWeeks = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : WEEK_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: WEEK_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : WEEK_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE WEEK 
export const getWeek = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : WEEK_GET_ONE,
        payload: id
    });  
};
//WEEK DELETE
export const deleteWeek = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: WEEK_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : WEEK_DELETE_FAIL,
                payload : err
            })
        })
        
}
//WEEK REGISTER
export const registerWeek = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: WEEK_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : WEEK_REGISTER_FAIL,
                payload: err
            })
        })
};
 //WEEK UPDATE
export const updateWeek = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: WEEK_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : WEEK_UPDATE_FAIL,
                payload: err
            })
        })
};
