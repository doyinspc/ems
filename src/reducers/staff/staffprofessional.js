import {
    STAFFPROFESSIONAL_GET_MULTIPLE,
    STAFFPROFESSIONAL_GET_ONE,
    STAFFPROFESSIONAL_REGISTER_SUCCESS,
    STAFFPROFESSIONAL_REGISTER_FAIL,
    STAFFPROFESSIONAL_LOADING,
    STAFFPROFESSIONAL_LOADING_ERROR,
    STAFFPROFESSIONAL_ACTIVATE_FAIL,
    STAFFPROFESSIONAL_ACTIVATE_SUCCESS,
    STAFFPROFESSIONAL_UPDATE_SUCCESS,
    STAFFPROFESSIONAL_UPDATE_FAIL,
    STAFFPROFESSIONAL_DELETE_SUCCESS,
    STAFFPROFESSIONAL_DELETE_FAIL,
    STAFFPROFESSIONAL_EDIT
} from "./../../types/staff/staffprofessional";

let staffprofessionalStore = JSON.parse(localStorage.getItem('staffprofessional'))

const initialState = {
    isLoading: false,
    staffprofessionals: staffprofessionalStore ? staffprofessionalStore : [],
    staffprofessional:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffprofessional = [...aluu];
    newStaffprofessional.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffprofessional;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFPROFESSIONAL_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFPROFESSIONAL_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFPROFESSIONAL_GET_MULTIPLE:
            localStorage.setItem('staffprofessional', JSON.stringify(action.payload));
            return {
                ...state,
                staffprofessionals : action.payload,
                msg:'DONE!!!'
            };
        case STAFFPROFESSIONAL_GET_ONE:
            let all = [...state.staffprofessionals];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffprofessional : ses,
                MSG:"DONE!!!"
            };
        case STAFFPROFESSIONAL_REGISTER_SUCCESS:
            localStorage.setItem('staffprofessional', JSON.stringify([...state.staffprofessionals, action.payload]));
            return {
                ...state,
                staffprofessionals: [...state.staffprofessionals, action.payload],
                msg:action.msg
            }; 
        case STAFFPROFESSIONAL_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffprofessionals, action.payload);
            localStorage.setItem('staffprofessional', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffprofessionals: ac
            }
        case STAFFPROFESSIONAL_DELETE_SUCCESS:
            let rem = state.staffprofessionals.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffprofessional', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffprofessionals: rem
            }
        case STAFFPROFESSIONAL_UPDATE_SUCCESS:
            const findInd = state.staffprofessionals.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffprofessionals];
            newState[findInd] = action.payload;
            localStorage.setItem('staffprofessional', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffprofessionals : newState,
                staffprofessional:action.payload
            }; 
        case STAFFPROFESSIONAL_LOADING_ERROR:
        case STAFFPROFESSIONAL_ACTIVATE_FAIL:
        case STAFFPROFESSIONAL_REGISTER_FAIL:
        case STAFFPROFESSIONAL_DELETE_FAIL:
        case STAFFPROFESSIONAL_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}