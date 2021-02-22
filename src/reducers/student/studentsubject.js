import { callReg, callSuccess } from "../../actions/common";
import {
    STUDENTSUBJECT_GET_MULTIPLE,
    STUDENTSUBJECT_GET_SUMMARY,
    STUDENTSUBJECT_GET_ONE,
    STUDENTSUBJECT_REGISTER_SUCCESS,
    STUDENTSUBJECT_REGISTER_FAIL,
    STUDENTSUBJECT_LOADING,
    STUDENTSUBJECT_LOADING_ERROR,
    STUDENTSUBJECT_ACTIVATE_FAIL,
    STUDENTSUBJECT_ACTIVATE_SUCCESS,
    STUDENTSUBJECT_UPDATE_SUCCESS,
    STUDENTSUBJECT_UPDATE_FAIL,
    STUDENTSUBJECT_DELETE_SUCCESS,
    STUDENTSUBJECT_DELETE_FAIL,
    STUDENTSUBJECT_EDIT
} from "./../../types/student/studentsubject";

let studentsubjectStore = JSON.parse(localStorage.getItem('studentsubject'))

const initialState = {
    isLoading: false,
    studentsubjects: studentsubjectStore ? studentsubjectStore : [],
    studentsubject:{},
    studentsubjectsummary:[],
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentsubject = [...aluu];
    newStudentsubject.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentsubject;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTSUBJECT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTSUBJECT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTSUBJECT_GET_MULTIPLE:
            localStorage.setItem('studentsubject', JSON.stringify(action.payload));
            return {
                ...state,
                studentsubjects : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTSUBJECT_GET_SUMMARY:
            return {
                ...state,
                studentsubjectsummary : action.payload
            };
        case STUDENTSUBJECT_GET_ONE:
            let all = [...state.studentsubjects];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                studentsubject : ses,
                MSG:"DONE!!!"
            };
        case STUDENTSUBJECT_REGISTER_SUCCESS:
            localStorage.setItem('studentsubject', JSON.stringify([...state.studentsubjects, action.payload]));
            callReg()
            return {
                ...state,
                studentsubjects: [...state.studentsubjects, action.payload],
                msg:action.msg
            }; 
        case STUDENTSUBJECT_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentsubjects, action.payload);
            localStorage.setItem('studentsubject', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                studentsubjects: ac
            }
        case STUDENTSUBJECT_DELETE_SUCCESS:
            let rem = state.studentsubjects.filter(cat => parseInt(cat.cid) !== parseInt(action.payload));
            localStorage.setItem('studentsubject', JSON.stringify(rem));
            callReg()
            return{
                ...state,
                msg:'DONE!!!',
                studentsubjects: rem
            }
        case STUDENTSUBJECT_UPDATE_SUCCESS:
            const findInd = state.studentsubjects.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentsubjects];
            newState[findInd] = action.payload;
            localStorage.setItem('studentsubject', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                studentsubjects : newState,
                studentsubject:action.payload
            }; 
        case STUDENTSUBJECT_LOADING_ERROR:
        case STUDENTSUBJECT_ACTIVATE_FAIL:
        case STUDENTSUBJECT_REGISTER_FAIL:
        case STUDENTSUBJECT_DELETE_FAIL:
        case STUDENTSUBJECT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}