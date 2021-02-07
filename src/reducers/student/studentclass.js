import { callReg, callSuccess } from "../../actions/common";
import {
    STUDENTCLASS_GET_MULTIPLE,
    STUDENTCLASS_GET_SUMMARY,
    STUDENTCLASS_GET_ONE,
    STUDENTCLASS_REGISTER_SUCCESS,
    STUDENTCLASS_REGISTER_FAIL,
    STUDENTCLASS_LOADING,
    STUDENTCLASS_LOADING_ERROR,
    STUDENTCLASS_ACTIVATE_FAIL,
    STUDENTCLASS_ACTIVATE_SUCCESS,
    STUDENTCLASS_UPDATE_SUCCESS,
    STUDENTCLASS_UPDATE_FAIL,
    STUDENTCLASS_DELETE_SUCCESS,
    STUDENTCLASS_DELETE_FAIL,
    STUDENTCLASS_EDIT
} from "./../../types/student/studentclass";

let studentclassStore = JSON.parse(localStorage.getItem('studentclass'))

const initialState = {
    isLoading: false,
    studentclasss: studentclassStore ? studentclassStore : [],
    studentclass:{},
    studentclasssummary:[],
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentclass = [...aluu];
    newStudentclass.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentclass;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTCLASS_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTCLASS_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTCLASS_GET_MULTIPLE:
            localStorage.setItem('studentclass', JSON.stringify(action.payload));
            return {
                ...state,
                studentclasss : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTCLASS_GET_SUMMARY:
            return {
                ...state,
                studentclasssummary : action.payload
            };
        case STUDENTCLASS_GET_ONE:
            let all = [...state.studentclasss];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                studentclass : ses,
                MSG:"DONE!!!"
            };
        case STUDENTCLASS_REGISTER_SUCCESS:
            localStorage.setItem('studentclass', JSON.stringify([...state.studentclasss, action.payload]));
            callReg()
            return {
                ...state,
                studentclasss: [...state.studentclasss, action.payload],
                msg:action.msg
            }; 
        case STUDENTCLASS_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentclasss, action.payload);
            localStorage.setItem('studentclass', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                studentclasss: ac
            }
        case STUDENTCLASS_DELETE_SUCCESS:
            let rem = state.studentclasss.filter(cat => parseInt(cat.cid) !== parseInt(action.payload));
            localStorage.setItem('studentclass', JSON.stringify(rem));
            callReg()
            return{
                ...state,
                msg:'DONE!!!',
                studentclasss: rem
            }
        case STUDENTCLASS_UPDATE_SUCCESS:
            const findInd = state.studentclasss.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentclasss];
            newState[findInd] = action.payload;
            localStorage.setItem('studentclass', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                studentclasss : newState,
                studentclass:action.payload
            }; 
        case STUDENTCLASS_LOADING_ERROR:
        case STUDENTCLASS_ACTIVATE_FAIL:
        case STUDENTCLASS_REGISTER_FAIL:
        case STUDENTCLASS_DELETE_FAIL:
        case STUDENTCLASS_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}