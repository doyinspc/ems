import { callReg, callSuccess } from "../../actions/common";
import {
    STAFFEDUCATION_GET_MULTIPLE,
    STAFFEDUCATION_GET_ONE,
    STAFFEDUCATION_REGISTER_SUCCESS,
    STAFFEDUCATION_REGISTER_FAIL,
    STAFFEDUCATION_LOADING,
    STAFFEDUCATION_LOADING_ERROR,
    STAFFEDUCATION_ACTIVATE_FAIL,
    STAFFEDUCATION_ACTIVATE_SUCCESS,
    STAFFEDUCATION_UPDATE_SUCCESS,
    STAFFEDUCATION_UPDATE_FAIL,
    STAFFEDUCATION_DELETE_SUCCESS,
    STAFFEDUCATION_DELETE_FAIL,
    STAFFEDUCATION_EDIT
} from "./../../types/staff/staffeducation";

let staffeducationStore = JSON.parse(localStorage.getItem('staffeducation'))

const initialState = {
    isLoading: false,
    staffeducations: staffeducationStore ? staffeducationStore : [],
    staffeducation:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffeducation = [...aluu];
    newStaffeducation.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffeducation;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFEDUCATION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFEDUCATION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFEDUCATION_GET_MULTIPLE:
            localStorage.setItem('staffeducation', JSON.stringify(action.payload));
            return {
                ...state,
                staffeducations : action.payload,
                msg:'DONE!!!'
            };
        case STAFFEDUCATION_GET_ONE:
            let all = [...state.staffeducations];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffeducation : ses,
                MSG:"DONE!!!"
            };
        case STAFFEDUCATION_REGISTER_SUCCESS:
            localStorage.setItem('staffeducation', JSON.stringify([...state.staffeducations, action.payload]));
            callReg()
            return {
                ...state,
                staffeducations: [...state.staffeducations, action.payload],
                msg:action.msg
            }; 
        case STAFFEDUCATION_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffeducations, action.payload);
            localStorage.setItem('staffeducation', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffeducations: ac
            }
        case STAFFEDUCATION_DELETE_SUCCESS:
            let rem = state.staffeducations.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffeducation', JSON.stringify(rem));
            return{
                ...state,
                staffeducations: rem
            }
        case STAFFEDUCATION_UPDATE_SUCCESS:
            const findInd = state.staffeducations.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffeducations];
            newState[findInd] = action.payload;
            localStorage.setItem('staffeducation', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                staffeducations : newState,
                staffeducation:action.payload
            }; 
        case STAFFEDUCATION_LOADING_ERROR:
        case STAFFEDUCATION_ACTIVATE_FAIL:
        case STAFFEDUCATION_REGISTER_FAIL:
        case STAFFEDUCATION_DELETE_FAIL:
        case STAFFEDUCATION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}