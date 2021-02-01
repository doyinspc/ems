import axios from 'axios';
import {
    THEME_GET_ONE,
    THEME_GET_MULTIPLE,
    THEME_GET_SUMMARY,
    THEME_GET_DROPDOWNS,
    THEME_REGISTER_SUCCESS,
    THEME_REGISTER_FAIL,
    THEME_LOADING,
    THEME_LOADING_ERROR,
    THEME_UPDATE_SUCCESS,
    THEME_UPDATE_FAIL,
    THEME_DELETE_SUCCESS,
    THEME_DELETE_FAIL
} from "../../types/setting/theme";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'themes';
const path = API_PATH_SETTING;

//GET ALL THEME 
export const getThemes = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : THEME_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: THEME_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : THEME_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL THEME 
export const getThemesummary = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = 'themesummary';

    dispatch({type : THEME_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: THEME_GET_SUMMARY,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : THEME_LOADING_ERROR,
                    payload:err
                })
            })
};

//GET ALL THEME 
export const getThemedropdowns = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : THEME_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: THEME_GET_DROPDOWNS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : THEME_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE THEME 
export const getTheme = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : THEME_GET_ONE,
        payload: id
    });  
};
//THEME DELETE
export const deleteTheme = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: THEME_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_DELETE_FAIL,
                payload : err
            })
        })
        
}
//THEME REGISTER
export const registerTheme = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: THEME_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_REGISTER_FAIL,
                payload: err
            })
        })
};
 //THEME UPDATE
export const updateTheme = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: THEME_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_UPDATE_FAIL,
                payload: err
            })
        })
};
