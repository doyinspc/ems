import {
    EXPENSE_GET_MULTIPLE,
    EXPENSE_GET_ONE,
    EXPENSE_REGISTER_SUCCESS,
    EXPENSE_REGISTER_FAIL,
    EXPENSE_LOADING,
    EXPENSE_LOADING_ERROR,
    EXPENSE_ACTIVATE_FAIL,
    EXPENSE_ACTIVATE_SUCCESS,
    EXPENSE_UPDATE_SUCCESS,
    EXPENSE_UPDATE_FAIL,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL,
    EXPENSE_EDIT
} from "./../../types/setting/expense";

let expenseStore = JSON.parse(localStorage.getItem('expense'))

const initialState = {
    isLoading: false,
    expenses: expenseStore ? expenseStore : [],
    expense:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newExpense = [...aluu];
    newExpense.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newExpense;
}
export default function(state = initialState, action){
    switch (action.type) {
        case EXPENSE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case EXPENSE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case EXPENSE_GET_MULTIPLE:
            localStorage.setItem('expense', JSON.stringify(action.payload));
            return {
                ...state,
                expenses : action.payload,
                msg:'DONE!!!'
            };
        case EXPENSE_GET_ONE:
            let all = [...state.expenses];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                expense : ses,
                MSG:"DONE!!!"
            };
        case EXPENSE_REGISTER_SUCCESS:
            localStorage.setItem('expense', JSON.stringify([...state.expenses, action.payload]));
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
                msg:action.msg
            }; 
        case EXPENSE_ACTIVATE_SUCCESS:
            let ac = changeState(state.expenses, action.payload);
            localStorage.setItem('expense', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                expenses: ac
            }
        case EXPENSE_DELETE_SUCCESS:
            let rem = state.expenses.filter(cat => cat.id != action.payload);
            localStorage.setItem('expense', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                expenses: rem
            }
        case EXPENSE_UPDATE_SUCCESS:
            const findInd = state.expenses.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.expenses];
            newState[findInd] = action.payload;
            localStorage.setItem('expense', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                expenses : newState,
                expense:action.payload
            }; 
        case EXPENSE_LOADING_ERROR:
        case EXPENSE_ACTIVATE_FAIL:
        case EXPENSE_REGISTER_FAIL:
        case EXPENSE_DELETE_FAIL:
        case EXPENSE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}