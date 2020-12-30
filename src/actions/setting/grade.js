import axios from 'axios';
import {
    GRADE_GET_ONE,
    GRADE_GET_MULTIPLE,
    GRADE_REGISTER_SUCCESS,
    GRADE_REGISTER_FAIL,
    GRADE_LOADING,
    GRADE_LOADING_ERROR,
    GRADE_UPDATE_SUCCESS,
    GRADE_UPDATE_FAIL,
    GRADE_DELETE_SUCCESS,
    GRADE_DELETE_FAIL
} from "../../types/setting/grade";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'grades';
const path = API_PATH_SETTING;

//GET ALL GRADE 
export const getGrades = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : GRADE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: GRADE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : GRADE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE GRADE 
export const getGrade = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : GRADE_GET_ONE,
        payload: id
    });  
};
//GRADE DELETE
export const deleteGrade = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: GRADE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//GRADE REGISTER
export const registerGrade = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GRADE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //GRADE UPDATE
export const updateGrade = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GRADE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_UPDATE_FAIL,
                payload: err
            })
        })
};
