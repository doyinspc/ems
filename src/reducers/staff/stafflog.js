import {
    STAFFLOG_GET_MULTIPLE,
    STAFFLOG_GET_ONE,
    STAFFLOG_REGISTER_SUCCESS,
    STAFFLOG_REGISTER_FAIL,
    STAFFLOG_LOADING,
    STAFFLOG_LOADING_ERROR,
    STAFFLOG_ACTIVATE_FAIL,
    STAFFLOG_ACTIVATE_SUCCESS,
    STAFFLOG_UPDATE_SUCCESS,
    STAFFLOG_UPDATE_FAIL,
    STAFFLOG_DELETE_SUCCESS,
    STAFFLOG_DELETE_FAIL,
    STAFFLOG_EDIT
} from "./../../types/staff/stafflog";

let stafflogStore = JSON.parse(localStorage.getItem('stafflog'))

const initialState = {
    isLoading: false,
    stafflogs: stafflogStore ? stafflogStore : [],
    stafflog:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStafflog = [...aluu];
    newStafflog.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStafflog;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFLOG_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFLOG_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFLOG_GET_MULTIPLE:
            localStorage.setItem('stafflog', JSON.stringify(action.payload));
            return {
                ...state,
                stafflogs : action.payload,
                msg:'DONE!!!'
            };
        case STAFFLOG_GET_ONE:
            let all = [...state.stafflogs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                stafflog : ses,
                MSG:"DONE!!!"
            };
        case STAFFLOG_REGISTER_SUCCESS:
            localStorage.setItem('stafflog', JSON.stringify([...state.stafflogs, action.payload]));
            return {
                ...state,
                stafflogs: [...state.stafflogs, action.payload],
                msg:action.msg
            }; 
        case STAFFLOG_ACTIVATE_SUCCESS:
            let ac = changeState(state.stafflogs, action.payload);
            localStorage.setItem('stafflog', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                stafflogs: ac
            }
        case STAFFLOG_DELETE_SUCCESS:
            let rem = state.stafflogs.filter(cat => cat.id != action.payload);
            localStorage.setItem('stafflog', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                stafflogs: rem
            }
        case STAFFLOG_UPDATE_SUCCESS:
            const findInd = state.stafflogs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.stafflogs];
            newState[findInd] = action.payload;
            localStorage.setItem('stafflog', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                stafflogs : newState,
                stafflog:action.payload
            }; 
        case STAFFLOG_LOADING_ERROR:
        case STAFFLOG_ACTIVATE_FAIL:
        case STAFFLOG_REGISTER_FAIL:
        case STAFFLOG_DELETE_FAIL:
        case STAFFLOG_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}