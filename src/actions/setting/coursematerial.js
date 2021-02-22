import axios from 'axios';
import {
    COURSEMATERIAL_GET_ONE,
    COURSEMATERIAL_GET_MULTIPLE,
    COURSEMATERIAL_REGISTER_SUCCESS,
    COURSEMATERIAL_REGISTER_FAIL,
    COURSEMATERIAL_LOADING,
    COURSEMATERIAL_LOADING_ERROR,
    COURSEMATERIAL_UPDATE_SUCCESS,
    COURSEMATERIAL_UPDATE_FAIL,
    COURSEMATERIAL_DELETE_SUCCESS,
    COURSEMATERIAL_DELETE_FAIL
} from "../../types/setting/coursematerial";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from '../common';

let TABLE_NAME = 'coursematerials';
const path = API_PATH_SETTING;

//GET ALL COURSEMATERIAL 
export const getCoursematerials = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : COURSEMATERIAL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSEMATERIAL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSEMATERIAL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSEMATERIAL 
export const getCoursematerial = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSEMATERIAL_GET_ONE,
        payload: id
    });  
};
//COURSEMATERIAL DELETE
export const deleteCoursematerial = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSEMATERIAL REGISTER
export const registerCoursematerial = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSEMATERIAL UPDATE
export const updateCoursematerial = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_UPDATE_FAIL,
                payload: err
            })
        })
};
