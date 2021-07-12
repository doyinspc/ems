import {
    ADMISSIONFORM_GET_MULTIPLE,
    ADMISSIONFORM_GET_ONE,
    ADMISSIONFORM_REGISTER_SUCCESS,
    ADMISSIONFORM_REGISTER_FAIL,
    ADMISSIONFORM_LOADING,
    ADMISSIONFORM_LOADING_ERROR,
    ADMISSIONFORM_ACTIVATE_FAIL,
    ADMISSIONFORM_ACTIVATE_SUCCESS,
    ADMISSIONFORM_UPDATE_SUCCESS,
    ADMISSIONFORM_UPDATE_FAIL,
    ADMISSIONFORM_DELETE_SUCCESS,
    ADMISSIONFORM_DELETE_FAIL,
    ADMISSIONFORM_EDIT
} from "./../../types/setting/admissionform";

let admissionformStore = JSON.parse(localStorage.getItem('admissionform'))
const initialState = {
    isLoading: false,
    admissionforms: admissionformStore ? admissionformStore : [],
    admissionform:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newAdmissionform = [...aluu];
    newAdmissionform.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newAdmissionform;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ADMISSIONFORM_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ADMISSIONFORM_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ADMISSIONFORM_GET_MULTIPLE:
            localStorage.setItem('admissionform', JSON.stringify(action.payload));
            return {
                ...state,
                admissionforms : action.payload,
                msg:'DONE!!!'
            };
        case ADMISSIONFORM_GET_ONE:
            let all = [...state.admissionforms];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                admissionform : ses,
                MSG:"DONE!!!"
            };
        case ADMISSIONFORM_REGISTER_SUCCESS:
            localStorage.setItem('admissionform', JSON.stringify([...state.admissionforms, action.payload]));
            return {
                ...state,
                admissionforms: [...state.admissionforms, action.payload],
                msg:action.msg
            }; 
        case ADMISSIONFORM_ACTIVATE_SUCCESS:
            let ac = changeState(state.admissionforms, action.payload);
            localStorage.setItem('admissionform', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                admissionforms: ac
            }
        case ADMISSIONFORM_DELETE_SUCCESS:
            let rem = state.admissionforms.filter(cat => cat.id != action.payload);
            localStorage.setItem('admissionform', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                admissionforms: rem
            }
        case ADMISSIONFORM_UPDATE_SUCCESS:
            const findInd = state.admissionforms.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.admissionforms];
            newState[findInd] = action.payload;
            localStorage.setItem('admissionform', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                admissionforms : newState,
                admissionform:action.payload
            }; 
        case ADMISSIONFORM_LOADING_ERROR:
        case ADMISSIONFORM_ACTIVATE_FAIL:
        case ADMISSIONFORM_REGISTER_FAIL:
        case ADMISSIONFORM_DELETE_FAIL:
        case ADMISSIONFORM_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}