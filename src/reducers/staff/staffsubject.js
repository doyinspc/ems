import { callSuccess } from "../../actions/common";
import {
    STAFFSUBJECT_GET_MULTIPLE,
    STAFFSUBJECT_GET_SUMMARY,
    STAFFSUBJECT_GET_ONE,
    STAFFSUBJECT_REGISTER_SUCCESS,
    STAFFSUBJECT_REGISTER_FAIL,
    STAFFSUBJECT_LOADING,
    STAFFSUBJECT_LOADING_ERROR,
    STAFFSUBJECT_ACTIVATE_FAIL,
    STAFFSUBJECT_ACTIVATE_SUCCESS,
    STAFFSUBJECT_UPDATE_SUCCESS,
    STAFFSUBJECT_UPDATE_FAIL,
    STAFFSUBJECT_DELETE_SUCCESS,
    STAFFSUBJECT_DELETE_FAIL,
    STAFFSUBJECT_EDIT
} from "./../../types/staff/staffsubject";

let staffsubjectStore = JSON.parse(localStorage.getItem('staffsubject'))

const initialState = {
    isLoading: false,
    staffsubjects: staffsubjectStore ? staffsubjectStore : [],
    staffsubject:{},
    msg: null,
    isEdit:-1,
    ref:null,
    staffsubjectsummary:[]
}

const changeState = (aluu, actid) =>
{
    let newStaffsubject = [...aluu];
    newStaffsubject.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffsubject;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFSUBJECT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFSUBJECT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFSUBJECT_GET_MULTIPLE:
            localStorage.setItem('staffsubject', JSON.stringify(action.payload));
            return {
                ...state,
                staffsubjects : action.payload,
                isLoading : true,
                msg:'DONE!!!'
            };
        case STAFFSUBJECT_GET_SUMMARY:
            return {
                ...state,
                staffsubjectsummary : action.payload
            };
        case STAFFSUBJECT_GET_ONE:
            let all = [...state.staffsubjects];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffsubject : ses,
                MSG:"DONE!!!"
            };
        case STAFFSUBJECT_REGISTER_SUCCESS:
            localStorage.setItem('staffsubject', JSON.stringify([...state.staffsubjects, action.payload]));
            callSuccess()
            return {
                ...state,
                staffsubjects: [...state.staffsubjects, action.payload],
                msg:action.msg
            }; 
        case STAFFSUBJECT_ACTIVATE_SUCCESS:
            let newStatei = [...state.staffsubjects];
            const findIndi = newStatei.findIndex(cat => cat.id == action.payload.id);
            newStatei[findIndi] = action.payload;
            localStorage.setItem('staffsubject', JSON.stringify(newStatei));
            callSuccess('Ok')
            return{
                ...state,
                msg:'DONE!!!',
                staffsubjects: newStatei
            }
        case STAFFSUBJECT_DELETE_SUCCESS:
            let rem = state.staffsubjects.filter(cat =>parseInt(cat.id) !== parseInt(action.payload));
            localStorage.setItem('staffsubject', JSON.stringify(rem));
            callSuccess()
            return{
                ...state,
                staffsubjects: rem
            }
        case STAFFSUBJECT_UPDATE_SUCCESS:
            let newState = [...state.staffsubjects];
            const findInd = state.staffsubjects.findIndex(cat => cat.id == action.payload.id);
            newState[findInd] = action.payload;
            localStorage.setItem('staffsubject', JSON.stringify(newState));
            callSuccess('Ok')
            return {
                ...state,
                ...action.payload,
                staffsubjects : newState,
                staffsubject:action.payload
            }; 
        case STAFFSUBJECT_LOADING_ERROR:
        case STAFFSUBJECT_ACTIVATE_FAIL:
        case STAFFSUBJECT_REGISTER_FAIL:
        case STAFFSUBJECT_DELETE_FAIL:
        case STAFFSUBJECT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}