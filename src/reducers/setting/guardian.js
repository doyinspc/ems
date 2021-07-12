import {
    GUARDIAN_GET_MULTIPLE,
    GUARDIAN_GET_ONE,
    GUARDIAN_REGISTER_SUCCESS,
    GUARDIAN_REGISTER_FAIL,
    GUARDIAN_LOADING,
    GUARDIAN_LOADING_ERROR,
    GUARDIAN_ACTIVATE_FAIL,
    GUARDIAN_ACTIVATE_SUCCESS,
    GUARDIAN_UPDATE_SUCCESS,
    GUARDIAN_UPDATE_FAIL,
    GUARDIAN_DELETE_SUCCESS,
    GUARDIAN_DELETE_FAIL,
    GUARDIAN_EDIT
} from "./../../types/setting/guardian";

let guardianStore = JSON.parse(localStorage.getItem('guardian'))
const initialState = {
    isLoading: false,
    guardians: guardianStore ? guardianStore : [],
    guardian: guardianStore ? guardianStore : {},
    msg: null,
    isEdit:-1,
    isLogin: false,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newGuardian = [...aluu];
    newGuardian.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newGuardian;
}


export default function(state = initialState, action){
    switch (action.type) {
        case GUARDIAN_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case GUARDIAN_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case GUARDIAN_GET_MULTIPLE:
            localStorage.setItem('guardian', JSON.stringify(action.payload));
            return {
                ...state,
                guardians : action.payload,
                guardian : action.payload,
                msg:'DONE!!!'
            };
        case GUARDIAN_GET_ONE:
            let all = [...state.guardians];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                guardian : ses,
                MSG:"DONE!!!"
            };
        case GUARDIAN_REGISTER_SUCCESS:
            console.log(action.payload)
            localStorage.setItem('guardian', JSON.stringify(action.payload));
            return {
                ...state,
                guardians: action.payload,
                guardian:action.payload,
                isLogin:true,
                msg:action.msg
            }; 
        case GUARDIAN_ACTIVATE_SUCCESS:
            let ac = changeState(state.guardians, action.payload);
            localStorage.setItem('guardian', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                guardians: ac
            }
        case GUARDIAN_DELETE_SUCCESS:
            let rem = state.guardians.filter(cat => cat.id != action.payload);
            localStorage.setItem('guardian', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                guardians: rem
            }
        case GUARDIAN_UPDATE_SUCCESS:
            const findInd = state.guardians.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.guardians];
            newState[findInd] = action.payload;
            localStorage.setItem('guardian', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                guardians : newState,
                guardian:action.payload
            }; 
        case GUARDIAN_DELETE_FAIL:
            
            return {
                ...state,
                isLoading: false,
                guardians :[],
                guardian :{}
            };
        case GUARDIAN_LOADING_ERROR:
        case GUARDIAN_ACTIVATE_FAIL:
        case GUARDIAN_REGISTER_FAIL:
        case GUARDIAN_DELETE_FAIL:
        case GUARDIAN_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}