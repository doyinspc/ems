import {
    EXPENSEUNIT_GET_MULTIPLE,
    EXPENSEUNIT_GET_ONE,
    EXPENSEUNIT_REGISTER_SUCCESS,
    EXPENSEUNIT_REGISTER_FAIL,
    EXPENSEUNIT_LOADING,
    EXPENSEUNIT_LOADING_ERROR,
    EXPENSEUNIT_ACTIVATE_FAIL,
    EXPENSEUNIT_ACTIVATE_SUCCESS,
    EXPENSEUNIT_UPDATE_SUCCESS,
    EXPENSEUNIT_UPDATE_FAIL,
    EXPENSEUNIT_DELETE_SUCCESS,
    EXPENSEUNIT_DELETE_FAIL,
    EXPENSEUNIT_EDIT
} from "./../../types/setting/expenseunit";

let expenseunitStore = JSON.parse(localStorage.getItem('expenseunit'))

const initialState = {
    isLoading: false,
    expenseunits: expenseunitStore ? expenseunitStore : [],
    expenseunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newExpenseunit = [...aluu];
    newExpenseunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newExpenseunit;
}
export default function(state = initialState, action){
    switch (action.type) {
        case EXPENSEUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case EXPENSEUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case EXPENSEUNIT_GET_MULTIPLE:
            localStorage.setItem('expenseunit', JSON.stringify(action.payload));
            return {
                ...state,
                expenseunits : action.payload,
                msg:'DONE!!!'
            };
        case EXPENSEUNIT_GET_ONE:
            let all = [...state.expenseunits];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                expenseunit : ses,
                MSG:"DONE!!!"
            };
        case EXPENSEUNIT_REGISTER_SUCCESS:
            localStorage.setItem('expenseunit', JSON.stringify([...state.expenseunits, action.payload]));
            return {
                ...state,
                expenseunits: [...state.expenseunits, action.payload],
                msg:action.msg
            }; 
        case EXPENSEUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.expenseunits, action.payload);
            localStorage.setItem('expenseunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                expenseunits: ac
            }
        case EXPENSEUNIT_DELETE_SUCCESS:
            let rem = state.expenseunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('expenseunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                expenseunits: rem
            }
        case EXPENSEUNIT_UPDATE_SUCCESS:
            const findInd = state.expenseunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.expenseunits];
            newState[findInd] = action.payload;
            localStorage.setItem('expenseunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                expenseunits : newState,
                expenseunit:action.payload
            }; 
        case EXPENSEUNIT_LOADING_ERROR:
        case EXPENSEUNIT_ACTIVATE_FAIL:
        case EXPENSEUNIT_REGISTER_FAIL:
        case EXPENSEUNIT_DELETE_FAIL:
        case EXPENSEUNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}