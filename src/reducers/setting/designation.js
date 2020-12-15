import {
    DESIGNATION_GET_MULTIPLE,
    DESIGNATION_GET_ONE,
    DESIGNATION_REGISTER_SUCCESS,
    DESIGNATION_REGISTER_FAIL,
    DESIGNATION_LOADING,
    DESIGNATION_LOADING_ERROR,
    DESIGNATION_ACTIVATE_FAIL,
    DESIGNATION_ACTIVATE_SUCCESS,
    DESIGNATION_UPDATE_SUCCESS,
    DESIGNATION_UPDATE_FAIL,
    DESIGNATION_DELETE_SUCCESS,
    DESIGNATION_DELETE_FAIL,
    DESIGNATION_EDIT
} from "./../../types/setting/designation";

let designationStore = JSON.parse(localStorage.getItem('designation'))

const initialState = {
    isLoading: false,
    designations: designationStore ? designationStore : [],
    designation:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newDesignation = [...aluu];
    newDesignation.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newDesignation;
}


export default function(state = initialState, action){
    switch (action.type) {
        case DESIGNATION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case DESIGNATION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case DESIGNATION_GET_MULTIPLE:
            localStorage.setItem('designation', JSON.stringify(action.payload));
            return {
                ...state,
                designations : action.payload,
                msg:'DONE!!!'
            };
        case DESIGNATION_GET_ONE:
            let all = [...state.designations];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                designation : ses,
                MSG:"DONE!!!"
            };
        case DESIGNATION_REGISTER_SUCCESS:
            localStorage.setItem('designation', JSON.stringify([...state.designations, action.payload]));
            return {
                ...state,
                designations: [...state.designations, action.payload],
                msg:action.msg
            }; 
        case DESIGNATION_ACTIVATE_SUCCESS:
            let ac = changeState(state.designations, action.payload);
            localStorage.setItem('designation', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                designations: ac
            }
        case DESIGNATION_DELETE_SUCCESS:
            let rem = state.designations.filter(cat => cat.id != action.payload);
            localStorage.setItem('designation', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                designations: rem
            }
        case DESIGNATION_UPDATE_SUCCESS:
            const findInd = state.designations.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.designations];
            newState[findInd] = action.payload;
            localStorage.setItem('designation', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                designations : newState,
                designation:action.payload
            }; 
        case DESIGNATION_LOADING_ERROR:
        case DESIGNATION_ACTIVATE_FAIL:
        case DESIGNATION_REGISTER_FAIL:
        case DESIGNATION_DELETE_FAIL:
        case DESIGNATION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}