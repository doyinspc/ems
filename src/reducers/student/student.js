import { callError, callReg, callSuccess } from "../../actions/common";
import {
    STUDENT_GET_MULTIPLE,
    STUDENT_GET_SEARCH,
    STUDENT_GET_BIRTHDAY,
    STUDENT_GET_ONE,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_LOADING,
    STUDENT_LOADING_ERROR,
    STUDENT_ACTIVATE_FAIL,
    STUDENT_ACTIVATE_SUCCESS,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,
    STUDENT_EDIT
} from "./../../types/student/student";


let studentStore = JSON.parse(localStorage.getItem('student'))

const initialState = {
    isLoading: false,
    students: studentStore ? studentStore : [],
    student:{},
    msg: null,
    isEdit:-1,
    ref:null,
    result:[],
    birthday:[]
}

const changeState = (aluu, actid) =>
{
    let newStudent = [...aluu];
    newStudent.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudent;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENT_GET_MULTIPLE:
            localStorage.setItem('student', JSON.stringify(action.payload));
            return {
                ...state,
                students : action.payload,
                msg:'DONE!!!'
            };
        case STUDENT_GET_SEARCH:
            return {
                ...state,
                result: action.payload
            };
        case STUDENT_GET_BIRTHDAY:
            return {
                ...state,
                birthday: action.payload
            };
        case STUDENT_GET_ONE:
            let all = [...state.students];
            
            let ses = all.filter(rw=>rw !== null).filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                student : ses,
                ref:null,
                MSG:"DONE!!!"
            };
        case STUDENT_REGISTER_SUCCESS:
            let alls = [...state.students];
            alls.push(action.payload)
            localStorage.setItem('student', JSON.stringify(alls));
            callReg()
            return {
                ...state,
                students: alls,
                student:action.payload,
                ref:action.payload.id,
                msg:action.msg
            }; 
        case STUDENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.students, action.payload);
            localStorage.setItem('student', JSON.stringify(ac));
            callSuccess()
            return{
                ...state,
                msg:'DONE!!!',
                students: ac
            }
        case STUDENT_DELETE_SUCCESS:
            let rem = state.students.filter(cat => cat.id != action.payload);
            localStorage.setItem('student', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                students: rem
            }
        case STUDENT_UPDATE_SUCCESS:
            const findInd = state.students.findIndex(cat =>parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.students];
            newState[findInd] = action.payload;
            localStorage.setItem('student', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                students : newState,
                student:action.payload
            }; 
        case STUDENT_LOADING_ERROR:
        case STUDENT_ACTIVATE_FAIL:
        case STUDENT_REGISTER_FAIL:
        case STUDENT_DELETE_FAIL:
        case STUDENT_UPDATE_FAIL:
        callError('Failed: Probably you are trying to use a admission number that already exist.')
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}