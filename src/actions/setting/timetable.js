import axios from 'axios';
import {
    TIMETABLE_GET_ONE,
    TIMETABLE_GET_MULTIPLE,
    TIMETABLE_REGISTER_SUCCESS,
    TIMETABLE_REGISTER_FAIL,
    TIMETABLE_LOADING,
    TIMETABLE_LOADING_ERROR,
    TIMETABLE_UPDATE_SUCCESS,
    TIMETABLE_UPDATE_FAIL,
    TIMETABLE_DELETE_SUCCESS,
    TIMETABLE_DELETE_FAIL
} from "../../types/setting/timetable";
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from './../common';

let TABLE_NAME = 'timetables';
const path = API_PATH_SETTING;

//GET ALL TIMETABLE 
export const getTimetables = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    params.table = TABLE_NAME;

    dispatch({type : TIMETABLE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: TIMETABLE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : TIMETABLE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE TIMETABLE 
export const getTimetable = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : TIMETABLE_GET_ONE,
        payload: id
    });  
};
//TIMETABLE DELETE
export const deleteTimetable = params => (dispatch, getState) =>{
    axios.POST(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: TIMETABLE_DELETE_SUCCESS,
                payload: params.id
            })
        })
        .catch(err => {
            dispatch({
                type : TIMETABLE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//TIMETABLE REGISTER
export const registerTimetable = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: TIMETABLE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : TIMETABLE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //TIMETABLE UPDATE
export const updateTimetable = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: TIMETABLE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : TIMETABLE_UPDATE_FAIL,
                payload: err
            })
        })
};
