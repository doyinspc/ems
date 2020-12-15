import {
    STAFFACCESS_GET_MULTIPLE,
    STAFFACCESS_GET_ONE,
    STAFFACCESS_REGISTER_SUCCESS,
    STAFFACCESS_REGISTER_FAIL,
    STAFFACCESS_LOADING,
    STAFFACCESS_LOADING_ERROR,
    STAFFACCESS_ACTIVATE_FAIL,
    STAFFACCESS_ACTIVATE_SUCCESS,
    STAFFACCESS_UPDATE_SUCCESS,
    STAFFACCESS_UPDATE_FAIL,
    STAFFACCESS_DELETE_SUCCESS,
    STAFFACCESS_DELETE_FAIL,
    STAFFACCESS_EDIT
} from "./../../types/staff/staffaccess";

let staffaccessStore = JSON.parse(localStorage.getItem('staffaccess'))

const initialState = {
    isLoading: false,
    staffaccesss: staffaccessStore ? staffaccessStore : [],
    staffaccess:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffaccess = [...aluu];
    newStaffaccess.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffaccess;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFACCESS_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFACCESS_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFACCESS_GET_MULTIPLE:
            localStorage.setItem('staffaccess', JSON.stringify(action.payload));
            return {
                ...state,
                staffaccesss : action.payload,
                msg:'DONE!!!'
            };
        case STAFFACCESS_GET_ONE:
            let all = [...state.staffaccesss];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffaccess : ses,
                MSG:"DONE!!!"
            };
        case STAFFACCESS_REGISTER_SUCCESS:
            localStorage.setItem('staffaccess', JSON.stringify([...state.staffaccesss, action.payload]));
            return {
                ...state,
                staffaccesss: [...state.staffaccesss, action.payload],
                msg:action.msg
            }; 
        case STAFFACCESS_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffaccesss, action.payload);
            localStorage.setItem('staffaccess', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffaccesss: ac
            }
        case STAFFACCESS_DELETE_SUCCESS:
            let rem = state.staffaccesss.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffaccess', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffaccesss: rem
            }
        case STAFFACCESS_UPDATE_SUCCESS:
            const findInd = state.staffaccesss.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffaccesss];
            newState[findInd] = action.payload;
            localStorage.setItem('staffaccess', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffaccesss : newState,
                staffaccess:action.payload
            }; 
        case STAFFACCESS_LOADING_ERROR:
        case STAFFACCESS_ACTIVATE_FAIL:
        case STAFFACCESS_REGISTER_FAIL:
        case STAFFACCESS_DELETE_FAIL:
        case STAFFACCESS_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}