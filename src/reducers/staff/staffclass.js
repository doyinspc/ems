import {
    STAFFCLASS_GET_MULTIPLE,
    STAFFCLASS_GET_ONE,
    STAFFCLASS_REGISTER_SUCCESS,
    STAFFCLASS_REGISTER_FAIL,
    STAFFCLASS_LOADING,
    STAFFCLASS_LOADING_ERROR,
    STAFFCLASS_ACTIVATE_FAIL,
    STAFFCLASS_ACTIVATE_SUCCESS,
    STAFFCLASS_UPDATE_SUCCESS,
    STAFFCLASS_UPDATE_FAIL,
    STAFFCLASS_DELETE_SUCCESS,
    STAFFCLASS_DELETE_FAIL,
    STAFFCLASS_EDIT
} from "./../../types/staff/staffclass";

let staffclassStore = JSON.parse(localStorage.getItem('staffclass'))

const initialState = {
    isLoading: false,
    staffclasss: staffclassStore ? staffclassStore : [],
    staffclass:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffclass = [...aluu];
    newStaffclass.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffclass;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFCLASS_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFCLASS_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFCLASS_GET_MULTIPLE:
            localStorage.setItem('staffclass', JSON.stringify(action.payload));
            return {
                ...state,
                staffclasss : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case STAFFCLASS_GET_ONE:
            let all = [...state.staffclasss];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffclass : ses,
                MSG:"DONE!!!"
            };
        case STAFFCLASS_REGISTER_SUCCESS:
            localStorage.setItem('staffclass', JSON.stringify([...state.staffclasss, action.payload]));
            return {
                ...state,
                staffclasss: [...state.staffclasss, action.payload],
                msg:action.msg
            }; 
        case STAFFCLASS_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffclasss, action.payload);
            localStorage.setItem('staffclass', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffclasss: ac
            }
        case STAFFCLASS_DELETE_SUCCESS:
            let rem = state.staffclasss.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffclass', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffclasss: rem
            }
        case STAFFCLASS_UPDATE_SUCCESS:
            const findInd = state.staffclasss.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffclasss];
            newState[findInd] = action.payload;
            localStorage.setItem('staffclass', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffclasss : newState,
                staffclass:action.payload
            }; 
        case STAFFCLASS_LOADING_ERROR:
        case STAFFCLASS_ACTIVATE_FAIL:
        case STAFFCLASS_REGISTER_FAIL:
        case STAFFCLASS_DELETE_FAIL:
        case STAFFCLASS_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}