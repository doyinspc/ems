import axios from 'axios';
import {
    TERM_GET_ONE,
    TERM_GET_MULTIPLE,
    TERM_REGISTER_SUCCESS,
    TERM_REGISTER_FAIL,
    TERM_ACTIVE_SUCCESS,
    TERM_ACTIVE_FAIL,
    TERM_LOADING,
    TERM_LOADING_ERROR,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL,
    TERM_DELETE_SUCCESS,
    TERM_DELETE_FAIL
} from "../../types/setting/term";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'terms';
const path = API_PATH_SETTING;

//GET ALL TERM 
export const getTerms = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : TERM_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: TERM_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : TERM_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE TERM 
export const getTerm = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : TERM_GET_ONE,
        payload: id
    });  
};
//TERM DELETE
export const deleteTerm = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: TERM_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : TERM_DELETE_FAIL,
                payload : err
            })
        })
        
}
//TERM REGISTER
export const registerTerm = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: TERM_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : TERM_REGISTER_FAIL,
                payload: err
            })
        })
};

//TERM REGISTER
export const setActiveTerm = data => dispatch => {
     //body
     axios.post(path, data, axiosConfig1)
     .then(res => {
         dispatch({
             type: TERM_GET_MULTIPLE,
             payload: res.data.data
         })
     })
     .catch(err => {
         dispatch({
             type : TERM_UPDATE_FAIL,
             payload: err
         })
     })
};
 //TERM UPDATE
export const updateTerm = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: TERM_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : TERM_UPDATE_FAIL,
                payload: err
            })
        })
};
