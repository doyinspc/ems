import {
    STAFFSTUDENT_GET_MULTIPLE,
    STAFFSTUDENT_GET_ONE,
    STAFFSTUDENT_REGISTER_SUCCESS,
    STAFFSTUDENT_REGISTER_FAIL,
    STAFFSTUDENT_LOADING,
    STAFFSTUDENT_LOADING_ERROR,
    STAFFSTUDENT_ACTIVATE_FAIL,
    STAFFSTUDENT_ACTIVATE_SUCCESS,
    STAFFSTUDENT_UPDATE_SUCCESS,
    STAFFSTUDENT_UPDATE_FAIL,
    STAFFSTUDENT_DELETE_SUCCESS,
    STAFFSTUDENT_DELETE_FAIL,
    STAFFSTUDENT_EDIT
} from "./../../types/staff/staffstudent";

let staffstudentStore = JSON.parse(localStorage.getItem('staffstudent'))

const initialState = {
    isLoading: false,
    staffstudents: staffstudentStore ? staffstudentStore : [],
    staffstudent:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffstudent = [...aluu];
    newStaffstudent.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffstudent;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFSTUDENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFSTUDENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFSTUDENT_GET_MULTIPLE:
            localStorage.setItem('staffstudent', JSON.stringify(action.payload));
            return {
                ...state,
                staffstudents : action.payload,
                msg:'DONE!!!'
            };
        case STAFFSTUDENT_GET_ONE:
            let all = [...state.staffstudents];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                staffstudent : ses,
                MSG:"DONE!!!"
            };
        case STAFFSTUDENT_REGISTER_SUCCESS:
            localStorage.setItem('staffstudent', JSON.stringify([...state.staffstudents, action.payload]));
            return {
                ...state,
                staffstudents: [...state.staffstudents, action.payload],
                msg:action.msg
            }; 
        case STAFFSTUDENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffstudents, action.payload);
            localStorage.setItem('staffstudent', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffstudents: ac
            }
        case STAFFSTUDENT_DELETE_SUCCESS:
            let rem = state.staffstudents.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffstudent', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffstudents: rem
            }
        case STAFFSTUDENT_UPDATE_SUCCESS:
            const findInd = state.staffstudents.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffstudents];
            newState[findInd] = action.payload;
            localStorage.setItem('staffstudent', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffstudents : newState,
                staffstudent:action.payload
            }; 
        case STAFFSTUDENT_LOADING_ERROR:
        case STAFFSTUDENT_ACTIVATE_FAIL:
        case STAFFSTUDENT_REGISTER_FAIL:
        case STAFFSTUDENT_DELETE_FAIL:
        case STAFFSTUDENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}