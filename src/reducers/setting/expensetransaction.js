import {
    EXPENSETRANSACTION_GET_MULTIPLE,
    EXPENSETRANSACTION_GET_ONE,
    EXPENSETRANSACTION_REGISTER_SUCCESS,
    EXPENSETRANSACTION_REGISTER_FAIL,
    EXPENSETRANSACTION_LOADING,
    EXPENSETRANSACTION_LOADING_ERROR,
    EXPENSETRANSACTION_ACTIVATE_FAIL,
    EXPENSETRANSACTION_ACTIVATE_SUCCESS,
    EXPENSETRANSACTION_UPDATE_SUCCESS,
    EXPENSETRANSACTION_UPDATE_FAIL,
    EXPENSETRANSACTION_DELETE_SUCCESS,
    EXPENSETRANSACTION_DELETE_FAIL,
    EXPENSETRANSACTION_EDIT
} from "./../../types/setting/expensetransaction";

let expensetransactionStore = JSON.parse(localStorage.getItem('expensetransaction'))

const initialState = {
    isLoading: false,
    expensetransactions: expensetransactionStore ? expensetransactionStore : [],
    expensetransaction:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newExpensetransaction = [...aluu];
    newExpensetransaction.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newExpensetransaction;
}
export default function(state = initialState, action){
    switch (action.type) {
        case EXPENSETRANSACTION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case EXPENSETRANSACTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case EXPENSETRANSACTION_GET_MULTIPLE:
            localStorage.setItem('expensetransaction', JSON.stringify(action.payload));
            return {
                ...state,
                expensetransactions : action.payload,
                msg:'DONE!!!'
            };
        case EXPENSETRANSACTION_GET_ONE:
            let all = [...state.expensetransactions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                expensetransaction : ses,
                MSG:"DONE!!!"
            };
        case EXPENSETRANSACTION_REGISTER_SUCCESS:
            localStorage.setItem('expensetransaction', JSON.stringify([...state.expensetransactions, action.payload]));
            return {
                ...state,
                expensetransactions: [...state.expensetransactions, action.payload],
                msg:action.msg
            }; 
        case EXPENSETRANSACTION_ACTIVATE_SUCCESS:
            let ac = changeState(state.expensetransactions, action.payload);
            localStorage.setItem('expensetransaction', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                expensetransactions: ac
            }
        case EXPENSETRANSACTION_DELETE_SUCCESS:
            let rem = state.expensetransactions.filter(cat => cat.id != action.payload);
            localStorage.setItem('expensetransaction', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                expensetransactions: rem
            }
        case EXPENSETRANSACTION_UPDATE_SUCCESS:
            const findInd = state.expensetransactions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.expensetransactions];
            newState[findInd] = action.payload;
            localStorage.setItem('expensetransaction', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                expensetransactions : newState,
                expensetransaction:action.payload
            }; 
        case EXPENSETRANSACTION_LOADING_ERROR:
        case EXPENSETRANSACTION_ACTIVATE_FAIL:
        case EXPENSETRANSACTION_REGISTER_FAIL:
        case EXPENSETRANSACTION_DELETE_FAIL:
        case EXPENSETRANSACTION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}