import {
    ACCOUNT_GET_MULTIPLE,
    ACCOUNT_GET_ONE,
    ACCOUNT_REGISTER_SUCCESS,
    ACCOUNT_REGISTER_FAIL,
    ACCOUNT_LOADING,
    ACCOUNT_LOADING_ERROR,
    ACCOUNT_ACTIVATE_FAIL,
    ACCOUNT_ACTIVATE_SUCCESS,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL,
    ACCOUNT_EDIT
} from "./../../types/setting/account";

let accountStore = JSON.parse(localStorage.getItem('account'))

const initialState = {
    isLoading: false,
    accounts: accountStore ? accountStore : [],
    account:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newAccount = [...aluu];
    newAccount.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newAccount;
}
export default function(state = initialState, action){
    switch (action.type) {
        case ACCOUNT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ACCOUNT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ACCOUNT_GET_MULTIPLE:
            localStorage.setItem('account', JSON.stringify(action.payload));
            return {
                ...state,
                accounts : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case ACCOUNT_GET_ONE:
            let all = [...state.accounts];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                account : ses,
                MSG:"DONE!!!"
            };
        case ACCOUNT_REGISTER_SUCCESS:
            localStorage.setItem('account', JSON.stringify([...state.accounts, action.payload]));
            return {
                ...state,
                accounts: [...state.accounts, action.payload],
                msg:action.msg
            }; 
        case ACCOUNT_ACTIVATE_SUCCESS:
            let ac = changeState(state.accounts, action.payload);
            localStorage.setItem('account', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                accounts: ac
            }
        case ACCOUNT_DELETE_SUCCESS:
            let rem = state.accounts.filter(cat => cat.id != action.payload);
            localStorage.setItem('account', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                accounts: rem
            }
        case ACCOUNT_UPDATE_SUCCESS:
            const findInd = state.accounts.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.accounts];
            newState[findInd] = action.payload;
            localStorage.setItem('account', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                accounts : newState,
                account:action.payload
            }; 
        case ACCOUNT_LOADING_ERROR:
        case ACCOUNT_ACTIVATE_FAIL:
        case ACCOUNT_REGISTER_FAIL:
        case ACCOUNT_DELETE_FAIL:
        case ACCOUNT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}