import axios from 'axios';
import {
    ASSESSMENT_GET_ONE,
    ASSESSMENT_GET_MULTIPLE,
    ASSESSMENT_REGISTER_SUCCESS,
    ASSESSMENT_REGISTER_FAIL,
    ASSESSMENT_LOADING,
    ASSESSMENT_LOADING_ERROR,
    ASSESSMENT_UPDATE_SUCCESS,
    ASSESSMENT_UPDATE_FAIL,
    ASSESSMENT_DELETE_SUCCESS,
    ASSESSMENT_DELETE_FAIL
} from "../../types/setting/assessment";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'assessments';
const path = API_PATH_SETTING;

//GET ALL ASSESSMENT 
export const getAssessments = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : ASSESSMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ASSESSMENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ASSESSMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ASSESSMENT 
export const getAssessment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ASSESSMENT_GET_ONE,
        payload: id
    });  
};
//ASSESSMENT DELETE
export const deleteAssessment = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ASSESSMENT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : ASSESSMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ASSESSMENT REGISTER
export const registerAssessment = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ASSESSMENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ASSESSMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ASSESSMENT UPDATE
export const updateAssessment = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ASSESSMENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ASSESSMENT_UPDATE_FAIL,
                payload: err
            })
        })
};
