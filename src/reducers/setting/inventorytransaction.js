import {
    INVENTORYTRANSACTION_GET_MULTIPLE,
    INVENTORYTRANSACTION_GET_ONE,
    INVENTORYTRANSACTION_REGISTER_SUCCESS,
    INVENTORYTRANSACTION_REGISTER_FAIL,
    INVENTORYTRANSACTION_LOADING,
    INVENTORYTRANSACTION_LOADING_ERROR,
    INVENTORYTRANSACTION_ACTIVATE_FAIL,
    INVENTORYTRANSACTION_ACTIVATE_SUCCESS,
    INVENTORYTRANSACTION_UPDATE_SUCCESS,
    INVENTORYTRANSACTION_UPDATE_FAIL,
    INVENTORYTRANSACTION_DELETE_SUCCESS,
    INVENTORYTRANSACTION_DELETE_FAIL,
    INVENTORYTRANSACTION_EDIT
} from "./../../types/setting/inventorytransaction";

let inventorytransactionStore = JSON.parse(localStorage.getItem('inventorytransaction'))

const initialState = {
    isLoading: false,
    inventorytransactions: inventorytransactionStore ? inventorytransactionStore : [],
    inventorytransaction:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newInventorytransaction = [...aluu];
    newInventorytransaction.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newInventorytransaction;
}
export default function(state = initialState, action){
    switch (action.type) {
        case INVENTORYTRANSACTION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case INVENTORYTRANSACTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INVENTORYTRANSACTION_GET_MULTIPLE:
            localStorage.setItem('inventorytransaction', JSON.stringify(action.payload));
            return {
                ...state,
                inventorytransactions : action.payload,
                msg:'DONE!!!'
            };
        case INVENTORYTRANSACTION_GET_ONE:
            let all = [...state.inventorytransactions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                inventorytransaction : ses,
                MSG:"DONE!!!"
            };
        case INVENTORYTRANSACTION_REGISTER_SUCCESS:
            localStorage.setItem('inventorytransaction', JSON.stringify([...state.inventorytransactions, action.payload]));
            return {
                ...state,
                inventorytransactions: [...state.inventorytransactions, action.payload],
                msg:action.msg
            }; 
        case INVENTORYTRANSACTION_ACTIVATE_SUCCESS:
            let ac = changeState(state.inventorytransactions, action.payload);
            localStorage.setItem('inventorytransaction', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                inventorytransactions: ac
            }
        case INVENTORYTRANSACTION_DELETE_SUCCESS:
            let rem = state.inventorytransactions.filter(cat => cat.id != action.payload);
            localStorage.setItem('inventorytransaction', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                inventorytransactions: rem
            }
        case INVENTORYTRANSACTION_UPDATE_SUCCESS:
            const findInd = state.inventorytransactions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.inventorytransactions];
            newState[findInd] = action.payload;
            localStorage.setItem('inventorytransaction', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                inventorytransactions : newState,
                inventorytransaction:action.payload
            }; 
        case INVENTORYTRANSACTION_LOADING_ERROR:
        case INVENTORYTRANSACTION_ACTIVATE_FAIL:
        case INVENTORYTRANSACTION_REGISTER_FAIL:
        case INVENTORYTRANSACTION_DELETE_FAIL:
        case INVENTORYTRANSACTION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}