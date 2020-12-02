import {
    STAFFSUBJECT_GET_MULTIPLE,
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
                msg:'DONE!!!'
            };
        case STAFFSUBJECT_GET_ONE:
            let all = [...state.staffsubjects];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                staffsubject : ses,
                MSG:"DONE!!!"
            };
        case STAFFSUBJECT_REGISTER_SUCCESS:
            localStorage.setItem('staffsubject', JSON.stringify([...state.staffsubjects, action.payload]));
            return {
                ...state,
                staffsubjects: [...state.staffsubjects, action.payload],
                msg:action.msg
            }; 
        case STAFFSUBJECT_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffsubjects, action.payload);
            localStorage.setItem('staffsubject', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffsubjects: ac
            }
        case STAFFSUBJECT_DELETE_SUCCESS:
            let rem = state.staffsubjects.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffsubject', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffsubjects: rem
            }
        case STAFFSUBJECT_UPDATE_SUCCESS:
            const findInd = state.staffsubjects.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffsubjects];
            newState[findInd] = action.payload;
            localStorage.setItem('staffsubject', JSON.stringify(newState));
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