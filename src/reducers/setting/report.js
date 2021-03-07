import { callError, callReg, callSuccess } from "../../actions/common";
import {
    REPORT_GET_MULTIPLE,
    REPORT_GET_ONE,
    REPORT_REGISTER_SUCCESS,
    REPORT_REGISTER_FAIL,
    REPORT_LOADING,
    REPORT_LOADING_ERROR,
    REPORT_ACTIVATE_FAIL,
    REPORT_ACTIVATE_SUCCESS,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,
    REPORT_DELETE_SUCCESS,
    REPORT_DELETE_FAIL,
    REPORT_EDIT
} from "./../../types/setting/report";

let reportStore = JSON.parse(localStorage.getItem('report'))

const initialState = {
    isLoading: false,
    reports: reportStore ? reportStore : [],
    report:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newReport = [...aluu];
    newReport.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newReport;
}
export default function(state = initialState, action){
    switch (action.type) {
        case REPORT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case REPORT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case REPORT_GET_MULTIPLE:
            localStorage.setItem('report', JSON.stringify(action.payload));
            return {
                ...state,
                reports : action.payload,
                msg:'DONE!!!'
            };
        case REPORT_GET_ONE:
            let all = [...state.reports];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                report : ses,
                MSG:"DONE!!!"
            };
        case REPORT_REGISTER_SUCCESS:
            localStorage.setItem('report', JSON.stringify([...state.reports, action.payload]));
            callSuccess()
            return {
                ...state,
                reports: [...state.reports, action.payload],
                report: action.payload,
                msg:action.msg
            }; 
        case REPORT_ACTIVATE_SUCCESS:
            let ac = changeState(state.reports, action.payload);
            localStorage.setItem('report', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                reports: ac
            }
        case REPORT_DELETE_SUCCESS:
            let rem = state.reports.filter(cat => cat.id != action.payload);
            localStorage.setItem('report', JSON.stringify(rem));
            callError('Failed to load')
            return{
                ...state,
                msg:'DONE!!!',
                reports: rem
            }
        case REPORT_UPDATE_SUCCESS:
            const findInd = state.reports.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.reports];
            newState[findInd] = action.payload;
            localStorage.setItem('report', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                reports : newState,
                report:action.payload
            }; 
        case REPORT_LOADING_ERROR:
        case REPORT_ACTIVATE_FAIL:
        case REPORT_REGISTER_FAIL:
        case REPORT_DELETE_FAIL:
        case REPORT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}