import {
    CLASZUNIT_GET_MULTIPLE,
    CLASZUNIT_GET_ONE,
    CLASZUNIT_REGISTER_SUCCESS,
    CLASZUNIT_REGISTER_FAIL,
    CLASZUNIT_LOADING,
    CLASZUNIT_LOADING_ERROR,
    CLASZUNIT_ACTIVATE_FAIL,
    CLASZUNIT_ACTIVATE_SUCCESS,
    CLASZUNIT_UPDATE_SUCCESS,
    CLASZUNIT_UPDATE_FAIL,
    CLASZUNIT_DELETE_SUCCESS,
    CLASZUNIT_DELETE_FAIL,
    CLASZUNIT_EDIT
} from "./../../types/setting/clazunit";

let claszunitStore = JSON.parse(localStorage.getItem('claszunit'))

const initialState = {
    isLoading: false,
    claszunits: claszunitStore ? claszunitStore : [],
    claszunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newClaszunit = [...aluu];
    newClaszunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newClaszunit;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLASZUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CLASZUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLASZUNIT_GET_MULTIPLE:
            localStorage.setItem('claszunit', JSON.stringify(action.payload));
            return {
                ...state,
                claszunits : action.payload,
                msg:'DONE!!!'
            };
        case CLASZUNIT_GET_ONE:
            let all = [...state.claszunits];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                claszunit : ses,
                MSG:"DONE!!!"
            };
        case CLASZUNIT_REGISTER_SUCCESS:
            localStorage.setItem('claszunit', JSON.stringify([...state.claszunits, action.payload]));
            return {
                ...state,
                claszunits: [...state.claszunits, action.payload],
                msg:action.msg
            }; 
        case CLASZUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.claszunits, action.payload);
            localStorage.setItem('claszunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                claszunits: ac
            }
        case CLASZUNIT_DELETE_SUCCESS:
            let rem = state.claszunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('claszunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                claszunits: rem
            }
        case CLASZUNIT_UPDATE_SUCCESS:
            const findInd = state.claszunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.claszunits];
            newState[findInd] = action.payload;
            localStorage.setItem('claszunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                claszunits : newState,
                claszunit:action.payload
            }; 
        case CLASZUNIT_LOADING_ERROR:
        case CLASZUNIT_ACTIVATE_FAIL:
        case CLASZUNIT_REGISTER_FAIL:
        case CLASZUNIT_DELETE_FAIL:
        case CLASZUNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}