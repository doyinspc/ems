import {
    TERM_GET_MULTIPLE,
    TERM_GET_ONE,
    TERM_REGISTER_SUCCESS,
    TERM_REGISTER_FAIL,
    TERM_ACTIVE_SUCCESS,
    TERM_ACTIVE_FAIL,
    TERM_LOADING,
    TERM_LOADING_ERROR,
    TERM_ACTIVATE_FAIL,
    TERM_ACTIVATE_SUCCESS,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL,
    TERM_DELETE_SUCCESS,
    TERM_DELETE_FAIL,
    TERM_EDIT
} from "./../../types/setting/term";

let termStore = JSON.parse(localStorage.getItem('term'))

const initialState = {
    isLoading: false,
    terms: termStore ? termStore : [],
    term:{},
    msg: null,
    isEdit:-1,
    ref:null,
    currentTerm:{
        'termname':'2019 First term',
        'sessionid':1,
        'termid':1,
    }
}

const changeState = (aluu, actid) =>
{
    let newTerm = [...aluu];
    newTerm.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTerm;
}


export default function(state = initialState, action){
    switch (action.type) {
        case TERM_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case TERM_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case TERM_GET_MULTIPLE:
            localStorage.setItem('term', JSON.stringify(action.payload));
            return {
                ...state,
                terms : action.payload,
                msg:'DONE!!!'
            };
        case TERM_GET_ONE:
            let all = [...state.terms];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                term : ses,
                MSG:"DONE!!!"
            };
        case TERM_REGISTER_SUCCESS:
            localStorage.setItem('term', JSON.stringify([...state.terms, action.payload]));
            return {
                ...state,
                terms: [...state.terms, action.payload],
                msg:action.msg
            }; 
        case TERM_ACTIVE_SUCCESS:
            localStorage.setItem('activeterm', JSON.stringify(action.payload));
            return {
                ...state,
                termactive: action.payload,
                msg:action.msg
            }; 
        case TERM_ACTIVATE_SUCCESS:
            let ac = changeState(state.terms, action.payload);
            localStorage.setItem('term', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                terms: ac
            }
        case TERM_DELETE_SUCCESS:
            let rem = state.terms.filter(cat => cat.id != action.payload);
            localStorage.setItem('term', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                terms: rem
            }
        case TERM_UPDATE_SUCCESS:
            const findInd = state.terms.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.terms];
            console.log(action.payload);
            newState[findInd] = action.payload;
            localStorage.setItem('term', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                terms : newState,
                term:action.payload
            }; 
        case TERM_LOADING_ERROR:
        case TERM_ACTIVATE_FAIL:
        case TERM_REGISTER_FAIL:
        case TERM_ACTIVE_FAIL:
        case TERM_DELETE_FAIL:
        case TERM_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}