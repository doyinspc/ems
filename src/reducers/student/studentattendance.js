import {
    STUDENTATTENDANCE_GET_MULTIPLE,
    STUDENTATTENDANCE_GET_DAILY,
    STUDENTATTENDANCE_GET_ONE,
    STUDENTATTENDANCE_REGISTER_SUCCESS,
    STUDENTATTENDANCE_REGISTER_DAILY,
    STUDENTATTENDANCE_REGISTER_FAIL,
    STUDENTATTENDANCE_LOADING,
    STUDENTATTENDANCE_LOADING_ERROR,
    STUDENTATTENDANCE_ACTIVATE_FAIL,
    STUDENTATTENDANCE_ACTIVATE_SUCCESS,
    STUDENTATTENDANCE_UPDATE_SUCCESS,
    STUDENTATTENDANCE_UPDATE_DAILY,
    STUDENTATTENDANCE_UPDATE_FAIL,
    STUDENTATTENDANCE_DELETE_SUCCESS,
    STUDENTATTENDANCE_DELETE_DAILY,
    STUDENTATTENDANCE_DELETE_FAIL,
    STUDENTATTENDANCE_EDIT
} from "./../../types/student/studentattendance";

let studentattendanceStore = JSON.parse(localStorage.getItem('studentattendance'))
let studentattendancedailyStore = JSON.parse(localStorage.getItem('studentattendancedaily'))

const initialState = {
    isLoading: false,
    studentattendances: studentattendanceStore ? studentattendanceStore : [],
    studentattendancedailys: studentattendancedailyStore ? studentattendancedailyStore : [],
    studentattendance:{},
    studentattendancedaily:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentattendance = [...aluu];
    newStudentattendance.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentattendance;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTATTENDANCE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTATTENDANCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTATTENDANCE_GET_MULTIPLE:
            localStorage.setItem('studentattendance', JSON.stringify(action.payload));
            return {
                ...state,
                studentattendances : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTATTENDANCE_GET_DAILY:
            localStorage.setItem('studentattendancedaily', JSON.stringify(action.payload));
            return {
                ...state,
                studentattendancedailys : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTATTENDANCE_GET_ONE:
            let all = [...state.studentattendances];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                studentattendance : ses,
                MSG:"DONE!!!"
            };
        case STUDENTATTENDANCE_REGISTER_SUCCESS:
            localStorage.setItem('studentattendance', JSON.stringify([...state.studentattendances, action.payload]));
            return {
                ...state,
                studentattendances: [...state.studentattendances, action.payload],
                msg:action.msg
            };
        case STUDENTATTENDANCE_REGISTER_DAILY:
            localStorage.setItem('studentattendance', JSON.stringify([...state.studentattendancedailys, action.payload]));
            return {
                ...state,
                studentattendancedailys: [...state.studentattendancedailys, action.payload],
                msg:action.msg
            }; 
        case STUDENTATTENDANCE_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentattendances, action.payload);
            localStorage.setItem('studentattendance', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                studentattendances: ac
            }
        case STUDENTATTENDANCE_DELETE_SUCCESS:
            let rem = state.studentattendances.filter(cat => cat.id != action.payload);
            localStorage.setItem('studentattendance', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                studentattendances: rem
            }
        case STUDENTATTENDANCE_DELETE_DAILY:
            let rem1 = state.studentattendancedailys.filter(cat => cat.id != action.payload);
            localStorage.setItem('studentattendancedaily', JSON.stringify(rem1));
            return{
                ...state,
                msg:'DONE!!!',
                studentattendances: rem1
            }
        case STUDENTATTENDANCE_UPDATE_SUCCESS:
            const findInd = state.studentattendances.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentattendances];
            newState[findInd] = action.payload;
            localStorage.setItem('studentattendance', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                studentattendances : newState,
                studentattendance:action.payload
            };
        case STUDENTATTENDANCE_UPDATE_DAILY:
            const findInds = state.studentattendancedailys.findIndex(cat => cat.id == action.payload.id);
            let newStates = [...state.studentattendancedailys];
            newState[findInds] = action.payload;
            localStorage.setItem('studentattendancedaily', JSON.stringify(newStates));
            return {
                ...state,
                ...action.payload,
                studentattendancedailys : newStates,
                studentattendancedaily:action.payload
            }; 
        case STUDENTATTENDANCE_LOADING_ERROR:
        case STUDENTATTENDANCE_ACTIVATE_FAIL:
        case STUDENTATTENDANCE_REGISTER_FAIL:
        case STUDENTATTENDANCE_DELETE_FAIL:
        case STUDENTATTENDANCE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}