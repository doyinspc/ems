import {
    STAFFLESSONPLAN_GET_MULTIPLE,
    STAFFLESSONPLAN_GET_ONE,
    STAFFLESSONPLAN_REGISTER_SUCCESS,
    STAFFLESSONPLAN_REGISTER_FAIL,
    STAFFLESSONPLAN_LOADING,
    STAFFLESSONPLAN_LOADING_ERROR,
    STAFFLESSONPLAN_ACTIVATE_FAIL,
    STAFFLESSONPLAN_ACTIVATE_SUCCESS,
    STAFFLESSONPLAN_UPDATE_SUCCESS,
    STAFFLESSONPLAN_UPDATE_FAIL,
    STAFFLESSONPLAN_DELETE_SUCCESS,
    STAFFLESSONPLAN_DELETE_FAIL,
    STAFFLESSONPLAN_EDIT
} from "./../../types/staff/stafflessonplan";

let stafflessonplanStore = JSON.parse(localStorage.getItem('stafflessonplan'))

const initialState = {
    isLoading: false,
    stafflessonplans: stafflessonplanStore ? stafflessonplanStore : [],
    stafflessonplan:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStafflessonplan = [...aluu];
    newStafflessonplan.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStafflessonplan;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFLESSONPLAN_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFLESSONPLAN_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFLESSONPLAN_GET_MULTIPLE:
            localStorage.setItem('stafflessonplan', JSON.stringify(action.payload));
            return {
                ...state,
                stafflessonplans : action.payload,
                msg:'DONE!!!'
            };
        case STAFFLESSONPLAN_GET_ONE:
            let all = [...state.stafflessonplans];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                stafflessonplan : ses,
                MSG:"DONE!!!"
            };
        case STAFFLESSONPLAN_REGISTER_SUCCESS:
            localStorage.setItem('stafflessonplan', JSON.stringify([...state.stafflessonplans, action.payload]));
            return {
                ...state,
                stafflessonplans: [...state.stafflessonplans, action.payload],
                msg:action.msg
            }; 
        case STAFFLESSONPLAN_ACTIVATE_SUCCESS:
            let ac = changeState(state.stafflessonplans, action.payload);
            localStorage.setItem('stafflessonplan', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                stafflessonplans: ac
            }
        case STAFFLESSONPLAN_DELETE_SUCCESS:
            let rem = state.stafflessonplans.filter(cat => cat.id != action.payload);
            localStorage.setItem('stafflessonplan', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                stafflessonplans: rem
            }
        case STAFFLESSONPLAN_UPDATE_SUCCESS:
            const findInd = state.stafflessonplans.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.stafflessonplans];
            newState[findInd] = action.payload;
            localStorage.setItem('stafflessonplan', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                stafflessonplans : newState,
                stafflessonplan:action.payload
            }; 
        case STAFFLESSONPLAN_LOADING_ERROR:
        case STAFFLESSONPLAN_ACTIVATE_FAIL:
        case STAFFLESSONPLAN_REGISTER_FAIL:
        case STAFFLESSONPLAN_DELETE_FAIL:
        case STAFFLESSONPLAN_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}