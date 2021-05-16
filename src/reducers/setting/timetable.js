import { callSuccess } from "../../actions/common";
import {
    TIMETABLE_GET_MULTIPLE,
    TIMETABLE_GET_ONE,
    TIMETABLE_REGISTER_SUCCESS,
    TIMETABLE_REGISTER_FAIL,
    TIMETABLE_LOADING,
    TIMETABLE_LOADING_ERROR,
    TIMETABLE_ACTIVATE_FAIL,
    TIMETABLE_ACTIVATE_SUCCESS,
    TIMETABLE_UPDATE_SUCCESS,
    TIMETABLE_UPDATE_FAIL,
    TIMETABLE_DELETE_SUCCESS,
    TIMETABLE_DELETE_FAIL,
    TIMETABLE_EDIT
} from "./../../types/setting/timetable";

let timetableStore = JSON.parse(localStorage.getItem('timetable'))

const initialState = {
    isLoading: false,
    timetables: timetableStore ? timetableStore : [],
    timetable:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newTimetable = [...aluu];
    newTimetable.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTimetable;
}
export default function(state = initialState, action){
    switch (action.type) {
        case TIMETABLE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case TIMETABLE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case TIMETABLE_GET_MULTIPLE:
            localStorage.setItem('timetable', JSON.stringify(action.payload));
            return {
                ...state,
                timetables : action.payload,
                msg:'DONE!!!'
            };
        case TIMETABLE_GET_ONE:
            let all = [...state.timetables];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            
            return {
                ...state,
                timetable : ses,
                MSG:"DONE!!!"
            };
        case TIMETABLE_REGISTER_SUCCESS:
            localStorage.setItem('timetable', JSON.stringify([...state.timetables, action.payload]));
            callSuccess()
            return {
                ...state,
                timetables: [...state.timetables, action.payload],
                msg:action.msg
            }; 
        case TIMETABLE_ACTIVATE_SUCCESS:
            let ac = changeState(state.timetables, action.payload);
            localStorage.setItem('timetable', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                timetables: ac
            }
        case TIMETABLE_DELETE_SUCCESS:
            let rem = state.timetables.filter(cat => cat.id != action.payload);
            localStorage.setItem('timetable', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                timetables: rem
            }
        case TIMETABLE_UPDATE_SUCCESS:
            const findInd = state.timetables.findIndex(cat => parseInt(cat.id) == parseInt(action.payload.id));
            let newState = [...state.timetables];
            newState[findInd] = action.payload;
            localStorage.setItem('timetable', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                timetables : newState,
                timetable:action.payload
            }; 
        case TIMETABLE_LOADING_ERROR:
        case TIMETABLE_ACTIVATE_FAIL:
        case TIMETABLE_REGISTER_FAIL:
        case TIMETABLE_DELETE_FAIL:
        case TIMETABLE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}