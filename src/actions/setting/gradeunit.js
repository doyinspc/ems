import axios from 'axios';
import {
    GRADEUNIT_GET_ONE,
    GRADEUNIT_GET_MULTIPLE,
    GRADEUNIT_REGISTER_SUCCESS,
    GRADEUNIT_REGISTER_FAIL,
    GRADEUNIT_LOADING,
    GRADEUNIT_LOADING_ERROR,
    GRADEUNIT_UPDATE_SUCCESS,
    GRADEUNIT_UPDATE_FAIL,
    GRADEUNIT_DELETE_SUCCESS,
    GRADEUNIT_DELETE_FAIL
} from "../../types/setting/gradeunit";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'gradeunits';
const path = API_PATH_SETTING;

//GET ALL GRADEUNIT 
export const getGradeunits = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : GRADEUNIT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: GRADEUNIT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : GRADEUNIT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE GRADEUNIT 
export const getGradeunit = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : GRADEUNIT_GET_ONE,
        payload: id
    });  
};
//GRADEUNIT DELETE
export const deleteGradeunit = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: GRADEUNIT_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : GRADEUNIT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//GRADEUNIT REGISTER
export const registerGradeunit = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GRADEUNIT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADEUNIT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //GRADEUNIT UPDATE
export const updateGradeunit = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: GRADEUNIT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADEUNIT_UPDATE_FAIL,
                payload: err
            })
        })
};
