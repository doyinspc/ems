import {
    STAFFJOB_GET_MULTIPLE,
    STAFFJOB_GET_ONE,
    STAFFJOB_REGISTER_SUCCESS,
    STAFFJOB_REGISTER_FAIL,
    STAFFJOB_LOADING,
    STAFFJOB_LOADING_ERROR,
    STAFFJOB_ACTIVATE_FAIL,
    STAFFJOB_ACTIVATE_SUCCESS,
    STAFFJOB_UPDATE_SUCCESS,
    STAFFJOB_UPDATE_FAIL,
    STAFFJOB_DELETE_SUCCESS,
    STAFFJOB_DELETE_FAIL,
    STAFFJOB_EDIT
} from "./../../types/staff/staffjob";

let staffjobStore = JSON.parse(localStorage.getItem('staffjob'))

const initialState = {
    isLoading: false,
    staffjobs: staffjobStore ? staffjobStore : [],
    staffjob:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffjob = [...aluu];
    newStaffjob.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffjob;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFJOB_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFJOB_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFJOB_GET_MULTIPLE:
            localStorage.setItem('staffjob', JSON.stringify(action.payload));
            return {
                ...state,
                staffjobs : action.payload,
                msg:'DONE!!!'
            };
        case STAFFJOB_GET_ONE:
            let all = [...state.staffjobs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffjob : ses,
                MSG:"DONE!!!"
            };
        case STAFFJOB_REGISTER_SUCCESS:
            localStorage.setItem('staffjob', JSON.stringify([...state.staffjobs, action.payload]));
            return {
                ...state,
                staffjobs: [...state.staffjobs, action.payload],
                msg:action.msg
            }; 
        case STAFFJOB_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffjobs, action.payload);
            localStorage.setItem('staffjob', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffjobs: ac
            }
        case STAFFJOB_DELETE_SUCCESS:
            let rem = state.staffjobs.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffjob', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffjobs: rem
            }
        case STAFFJOB_UPDATE_SUCCESS:
            const findInd = state.staffjobs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffjobs];
            newState[findInd] = action.payload;
            localStorage.setItem('staffjob', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffjobs : newState,
                staffjob:action.payload
            }; 
        case STAFFJOB_LOADING_ERROR:
        case STAFFJOB_ACTIVATE_FAIL:
        case STAFFJOB_REGISTER_FAIL:
        case STAFFJOB_DELETE_FAIL:
        case STAFFJOB_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}