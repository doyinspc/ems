import {
    MAINTENANCETRANSACTION_GET_MULTIPLE,
    MAINTENANCETRANSACTION_GET_ONE,
    MAINTENANCETRANSACTION_REGISTER_SUCCESS,
    MAINTENANCETRANSACTION_REGISTER_FAIL,
    MAINTENANCETRANSACTION_LOADING,
    MAINTENANCETRANSACTION_LOADING_ERROR,
    MAINTENANCETRANSACTION_ACTIVATE_FAIL,
    MAINTENANCETRANSACTION_ACTIVATE_SUCCESS,
    MAINTENANCETRANSACTION_UPDATE_SUCCESS,
    MAINTENANCETRANSACTION_UPDATE_FAIL,
    MAINTENANCETRANSACTION_DELETE_SUCCESS,
    MAINTENANCETRANSACTION_DELETE_FAIL,
    MAINTENANCETRANSACTION_EDIT
} from "./../../types/setting/maintenancetransaction";

let maintenancetransactionStore = JSON.parse(localStorage.getItem('maintenancetransaction'))

const initialState = {
    isLoading: false,
    maintenancetransactions: maintenancetransactionStore ? maintenancetransactionStore : [],
    maintenancetransaction:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaintenancetransaction = [...aluu];
    newMaintenancetransaction.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaintenancetransaction;
}
export default function(state = initialState, action){
    switch (action.type) {
        case MAINTENANCETRANSACTION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MAINTENANCETRANSACTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MAINTENANCETRANSACTION_GET_MULTIPLE:
            localStorage.setItem('maintenancetransaction', JSON.stringify(action.payload));
            return {
                ...state,
                maintenancetransactions : action.payload,
                msg:'DONE!!!'
            };
        case MAINTENANCETRANSACTION_GET_ONE:
            let all = [...state.maintenancetransactions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                maintenancetransaction : ses,
                MSG:"DONE!!!"
            };
        case MAINTENANCETRANSACTION_REGISTER_SUCCESS:
            localStorage.setItem('maintenancetransaction', JSON.stringify([...state.maintenancetransactions, action.payload]));
            return {
                ...state,
                maintenancetransactions: [...state.maintenancetransactions, action.payload],
                msg:action.msg
            }; 
        case MAINTENANCETRANSACTION_ACTIVATE_SUCCESS:
            let ac = changeState(state.maintenancetransactions, action.payload);
            localStorage.setItem('maintenancetransaction', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancetransactions: ac
            }
        case MAINTENANCETRANSACTION_DELETE_SUCCESS:
            let rem = state.maintenancetransactions.filter(cat => cat.id != action.payload);
            localStorage.setItem('maintenancetransaction', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancetransactions: rem
            }
        case MAINTENANCETRANSACTION_UPDATE_SUCCESS:
            const findInd = state.maintenancetransactions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.maintenancetransactions];
            newState[findInd] = action.payload;
            localStorage.setItem('maintenancetransaction', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                maintenancetransactions : newState,
                maintenancetransaction:action.payload
            }; 
        case MAINTENANCETRANSACTION_LOADING_ERROR:
        case MAINTENANCETRANSACTION_ACTIVATE_FAIL:
        case MAINTENANCETRANSACTION_REGISTER_FAIL:
        case MAINTENANCETRANSACTION_DELETE_FAIL:
        case MAINTENANCETRANSACTION_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}