import {
    CAUNIT_GET_MULTIPLE,
    CAUNIT_GET_ONE,
    CAUNIT_REGISTER_SUCCESS,
    CAUNIT_REGISTER_FAIL,
    CAUNIT_LOADING,
    CAUNIT_LOADING_ERROR,
    CAUNIT_ACTIVATE_FAIL,
    CAUNIT_ACTIVATE_SUCCESS,
    CAUNIT_UPDATE_SUCCESS,
    CAUNIT_UPDATE_FAIL,
    CAUNIT_DELETE_SUCCESS,
    CAUNIT_DELETE_FAIL,
    CAUNIT_EDIT
} from "./../../types/setting/caunit";

let caunitStore = JSON.parse(localStorage.getItem('caunit'))

const initialState = {
    isLoading: false,
    caunits: caunitStore ? caunitStore : [],
    caunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCaunit = [...aluu];
    newCaunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCaunit;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CAUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CAUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CAUNIT_GET_MULTIPLE:
            localStorage.setItem('caunit', JSON.stringify(action.payload));
            return {
                ...state,
                caunits : action.payload,
                msg:'DONE!!!'
            };
        case CAUNIT_GET_ONE:
            let all = [...state.caunits];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                caunit : ses,
                MSG:"DONE!!!"
            };
        case CAUNIT_REGISTER_SUCCESS:
            localStorage.setItem('caunit', JSON.stringify([...state.caunits, action.payload]));
            return {
                ...state,
                caunits: [...state.caunits, action.payload],
                msg:action.msg
            }; 
        case CAUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.caunits, action.payload);
            localStorage.setItem('caunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                caunits: ac
            }
        case CAUNIT_DELETE_SUCCESS:
            let rem = state.caunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('caunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                caunits: rem
            }
        case CAUNIT_UPDATE_SUCCESS:
            const findInd = state.caunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.caunits];
            newState[findInd] = action.payload;
            localStorage.setItem('caunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                caunits : newState,
                caunit:action.payload
            }; 
        case CAUNIT_LOADING_ERROR:
        case CAUNIT_ACTIVATE_FAIL:
        case CAUNIT_REGISTER_FAIL:
        case CAUNIT_DELETE_FAIL:
        case CAUNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}