import {
    STAFFATTENDANCE_GET_MULTIPLE,
    STAFFATTENDANCE_GET_DAILY,
    STAFFATTENDANCE_GET_ONE,
    STAFFATTENDANCE_REGISTER_SUCCESS,
    STAFFATTENDANCE_REGISTER_DAILY,
    STAFFATTENDANCE_REGISTER_FAIL,
    STAFFATTENDANCE_LOADING,
    STAFFATTENDANCE_LOADING_ERROR,
    STAFFATTENDANCE_ACTIVATE_FAIL,
    STAFFATTENDANCE_ACTIVATE_SUCCESS,
    STAFFATTENDANCE_UPDATE_SUCCESS,
    STAFFATTENDANCE_UPDATE_DAILY,
    STAFFATTENDANCE_UPDATE_FAIL,
    STAFFATTENDANCE_DELETE_SUCCESS,
    STAFFATTENDANCE_DELETE_DAILY,
    STAFFATTENDANCE_DELETE_FAIL,
    STAFFATTENDANCE_EDIT
} from "./../../types/staff/staffattendance";

let staffattendanceStore = JSON.parse(localStorage.getItem('staffattendance'))
let staffattendancedailyStore = JSON.parse(localStorage.getItem('staffattendancedaily'))

const initialState = {
    isLoading: false,
    staffattendances: staffattendanceStore ? staffattendanceStore : [],
    staffattendancedailys: staffattendancedailyStore ? staffattendancedailyStore : [],
    staffattendance:{},
    staffattendancedaily:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffattendance = [...aluu];
    newStaffattendance.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffattendance;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFATTENDANCE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFATTENDANCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFATTENDANCE_GET_MULTIPLE:
            localStorage.setItem('staffattendance', JSON.stringify(action.payload));
            return {
                ...state,
                staffattendances : action.payload,
                msg:'DONE!!!'
            };
        case STAFFATTENDANCE_GET_DAILY:
            localStorage.setItem('staffattendancedaily', JSON.stringify(action.payload));
            return {
                ...state,
                staffattendancedailys : action.payload,
                msg:'DONE!!!'
            };
        case STAFFATTENDANCE_GET_ONE:
            let all = [...state.staffattendances];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                staffattendance : ses,
                MSG:"DONE!!!"
            };
        case STAFFATTENDANCE_REGISTER_SUCCESS:
            localStorage.setItem('staffattendance', JSON.stringify([...state.staffattendances, action.payload]));
            return {
                ...state,
                staffattendances: [...state.staffattendances, action.payload],
                msg:action.msg
            };
        case STAFFATTENDANCE_REGISTER_DAILY:
            localStorage.setItem('staffattendance', JSON.stringify([...state.staffattendancedailys, action.payload]));
            return {
                ...state,
                staffattendancedailys: [...state.staffattendancedailys, action.payload],
                msg:action.msg
            }; 
        case STAFFATTENDANCE_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffattendances, action.payload);
            localStorage.setItem('staffattendance', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffattendances: ac
            }
        case STAFFATTENDANCE_DELETE_SUCCESS:
            let rem = state.staffattendances.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffattendance', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffattendances: rem
            }
        case STAFFATTENDANCE_DELETE_DAILY:
            let rem1 = state.staffattendancedailys.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffattendancedaily', JSON.stringify(rem1));
            return{
                ...state,
                msg:'DONE!!!',
                staffattendances: rem1
            }
        case STAFFATTENDANCE_UPDATE_SUCCESS:
            const findInd = state.staffattendances.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffattendances];
            newState[findInd] = action.payload;
            localStorage.setItem('staffattendance', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffattendances : newState,
                staffattendance:action.payload
            };
        case STAFFATTENDANCE_UPDATE_DAILY:
            const findInds = state.staffattendancedailys.findIndex(cat => cat.id == action.payload.id);
            let newStates = [...state.staffattendancedailys];
            newState[findInds] = action.payload;
            localStorage.setItem('staffattendancedaily', JSON.stringify(newStates));
            return {
                ...state,
                ...action.payload,
                staffattendancedailys : newStates,
                staffattendancedaily:action.payload
            }; 
        case STAFFATTENDANCE_LOADING_ERROR:
        case STAFFATTENDANCE_ACTIVATE_FAIL:
        case STAFFATTENDANCE_REGISTER_FAIL:
        case STAFFATTENDANCE_DELETE_FAIL:
        case STAFFATTENDANCE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}