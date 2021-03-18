import axios from 'axios';
import {
    COMMENT_GET_ONE,
    COMMENT_GET_MULTIPLE,
    COMMENT_REGISTER_SUCCESS,
    COMMENT_REGISTER_FAIL,
    COMMENT_LOADING,
    COMMENT_LOADING_ERROR,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL
} from "../../types/setting/comment";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'comments';
const path = API_PATH_SETTING;

//GET ALL COMMENT 
export const getComments = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : COMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COMMENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COMMENT 
export const getComment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COMMENT_GET_ONE,
        payload: id
    });  
};
//COMMENT DELETE
export const deleteComment = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COMMENT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : COMMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COMMENT REGISTER
export const registerComment = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COMMENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COMMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COMMENT UPDATE
export const updateComment = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COMMENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COMMENT_UPDATE_FAIL,
                payload: err
            })
        })
};
