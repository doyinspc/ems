import {
    STAFFLEAVE_GET_MULTIPLE,
    STAFFLEAVE_GET_ONE,
    STAFFLEAVE_REGISTER_SUCCESS,
    STAFFLEAVE_REGISTER_FAIL,
    STAFFLEAVE_LOADING,
    STAFFLEAVE_LOADING_ERROR,
    STAFFLEAVE_ACTIVATE_FAIL,
    STAFFLEAVE_ACTIVATE_SUCCESS,
    STAFFLEAVE_UPDATE_SUCCESS,
    STAFFLEAVE_UPDATE_FAIL,
    STAFFLEAVE_DELETE_SUCCESS,
    STAFFLEAVE_DELETE_FAIL,
    STAFFLEAVE_EDIT
} from "./../../types/staff/staffleave";

let staffleaveStore = JSON.parse(localStorage.getItem('staffleave'))

const initialState = {
    isLoading: false,
    staffleaves: staffleaveStore ? staffleaveStore : [],
    staffleave:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffleave = [...aluu];
    newStaffleave.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffleave;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFLEAVE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFLEAVE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFLEAVE_GET_MULTIPLE:
            localStorage.setItem('staffleave', JSON.stringify(action.payload));
            return {
                ...state,
                staffleaves : action.payload,
                msg:'DONE!!!'
            };
        case STAFFLEAVE_GET_ONE:
            let all = [...state.staffleaves];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffleave : ses,
                MSG:"DONE!!!"
            };
        case STAFFLEAVE_REGISTER_SUCCESS:
            localStorage.setItem('staffleave', JSON.stringify([...state.staffleaves, action.payload]));
            return {
                ...state,
                staffleaves: [...state.staffleaves, action.payload],
                msg:action.msg
            }; 
        case STAFFLEAVE_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffleaves, action.payload);
            localStorage.setItem('staffleave', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffleaves: ac
            }
        case STAFFLEAVE_DELETE_SUCCESS:
            let rem = state.staffleaves.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffleave', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffleaves: rem
            }
        case STAFFLEAVE_UPDATE_SUCCESS:
            const findInd = state.staffleaves.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffleaves];
            newState[findInd] = action.payload;
            localStorage.setItem('staffleave', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffleaves : newState,
                staffleave:action.payload
            }; 
        case STAFFLEAVE_LOADING_ERROR:
        case STAFFLEAVE_ACTIVATE_FAIL:
        case STAFFLEAVE_REGISTER_FAIL:
        case STAFFLEAVE_DELETE_FAIL:
        case STAFFLEAVE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}