import axios from 'axios';
import {
    LEVEL_GET_ONE,
    LEVEL_GET_MULTIPLE,
    LEVEL_REGISTER_SUCCESS,
    LEVEL_REGISTER_FAIL,
    LEVEL_LOADING,
    LEVEL_LOADING_ERROR,
    LEVEL_UPDATE_SUCCESS,
    LEVEL_UPDATE_FAIL,
    LEVEL_DELETE_SUCCESS,
    LEVEL_DELETE_FAIL
} from "../../types/setting/level";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'levels';
const path = API_PATH_SETTING;

//GET ALL LEVEL 
export const getLevels = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : LEVEL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: LEVEL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : LEVEL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE LEVEL 
export const getLevel = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : LEVEL_GET_ONE,
        payload: id
    });  
};
//LEVEL DELETE
export const deleteLevel = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: LEVEL_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//LEVEL REGISTER
export const registerLevel = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: LEVEL_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //LEVEL UPDATE
export const updateLevel = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: LEVEL_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_UPDATE_FAIL,
                payload: err
            })
        })
};
