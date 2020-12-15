import {
    STAFFEXPERIENCE_GET_MULTIPLE,
    STAFFEXPERIENCE_GET_ONE,
    STAFFEXPERIENCE_REGISTER_SUCCESS,
    STAFFEXPERIENCE_REGISTER_FAIL,
    STAFFEXPERIENCE_LOADING,
    STAFFEXPERIENCE_LOADING_ERROR,
    STAFFEXPERIENCE_ACTIVATE_FAIL,
    STAFFEXPERIENCE_ACTIVATE_SUCCESS,
    STAFFEXPERIENCE_UPDATE_SUCCESS,
    STAFFEXPERIENCE_UPDATE_FAIL,
    STAFFEXPERIENCE_DELETE_SUCCESS,
    STAFFEXPERIENCE_DELETE_FAIL,
    STAFFEXPERIENCE_EDIT
} from "./../../types/staff/staffexperience";

let staffexperienceStore = JSON.parse(localStorage.getItem('staffexperience'))

const initialState = {
    isLoading: false,
    staffexperiences: staffexperienceStore ? staffexperienceStore : [],
    staffexperience:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffexperience = [...aluu];
    newStaffexperience.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffexperience;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFEXPERIENCE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFEXPERIENCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFEXPERIENCE_GET_MULTIPLE:
            localStorage.setItem('staffexperience', JSON.stringify(action.payload));
            return {
                ...state,
                staffexperiences : action.payload,
                msg:'DONE!!!'
            };
        case STAFFEXPERIENCE_GET_ONE:
            let all = [...state.staffexperiences];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffexperience : ses,
                MSG:"DONE!!!"
            };
        case STAFFEXPERIENCE_REGISTER_SUCCESS:
            localStorage.setItem('staffexperience', JSON.stringify([...state.staffexperiences, action.payload]));
            return {
                ...state,
                staffexperiences: [...state.staffexperiences, action.payload],
                msg:action.msg
            }; 
        case STAFFEXPERIENCE_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffexperiences, action.payload);
            localStorage.setItem('staffexperience', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffexperiences: ac
            }
        case STAFFEXPERIENCE_DELETE_SUCCESS:
            let rem = state.staffexperiences.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffexperience', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffexperiences: rem
            }
        case STAFFEXPERIENCE_UPDATE_SUCCESS:
            const findInd = state.staffexperiences.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffexperiences];
            newState[findInd] = action.payload;
            localStorage.setItem('staffexperience', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffexperiences : newState,
                staffexperience:action.payload
            }; 
        case STAFFEXPERIENCE_LOADING_ERROR:
        case STAFFEXPERIENCE_ACTIVATE_FAIL:
        case STAFFEXPERIENCE_REGISTER_FAIL:
        case STAFFEXPERIENCE_DELETE_FAIL:
        case STAFFEXPERIENCE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}