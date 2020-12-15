import axios from 'axios';
import {
    CA_GET_ONE,
    CA_GET_MULTIPLE,
    CA_REGISTER_SUCCESS,
    CA_REGISTER_FAIL,
    CA_LOADING,
    CA_LOADING_ERROR,
    CA_UPDATE_SUCCESS,
    CA_UPDATE_FAIL,
    CA_DELETE_SUCCESS,
    CA_DELETE_FAIL
} from "../../types/setting/ca";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'cas';
const path = API_PATH_SETTING;

//GET ALL CA 
export const getCas = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;

    dispatch({type : CA_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CA_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CA_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CA 
export const getCa = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CA_GET_ONE,
        payload: id
    });  
};
//CA DELETE
export const deleteCa = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CA_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : CA_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CA REGISTER
export const registerCa = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CA_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CA_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CA UPDATE
export const updateCa = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CA_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CA_UPDATE_FAIL,
                payload: err
            })
        })
};
