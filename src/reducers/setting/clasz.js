import {
    CLASZ_GET_MULTIPLE,
    CLASZ_GET_ONE,
    CLASZ_REGISTER_SUCCESS,
    CLASZ_REGISTER_FAIL,
    CLASZ_LOADING,
    CLASZ_LOADING_ERROR,
    CLASZ_ACTIVATE_FAIL,
    CLASZ_ACTIVATE_SUCCESS,
    CLASZ_UPDATE_SUCCESS,
    CLASZ_UPDATE_FAIL,
    CLASZ_DELETE_SUCCESS,
    CLASZ_DELETE_FAIL,
    CLASZ_EDIT
} from "./../../types/setting/clasz";

let claszStore = JSON.parse(localStorage.getItem('clasz'))

const initialState = {
    isLoading: false,
    claszs: claszStore ? claszStore : [],
    clasz:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newClasz = [...aluu];
    newClasz.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newClasz;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLASZ_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CLASZ_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLASZ_GET_MULTIPLE:
            localStorage.setItem('clasz', JSON.stringify(action.payload));
            return {
                ...state,
                claszs : action.payload,
                msg:'DONE!!!'
            };
        case CLASZ_GET_ONE:
            let all = [...state.claszs];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                clasz : ses,
                MSG:"DONE!!!"
            };
        case CLASZ_REGISTER_SUCCESS:
            localStorage.setItem('clasz', JSON.stringify([...state.claszs, action.payload]));
            return {
                ...state,
                claszs: [...state.claszs, action.payload],
                msg:action.msg
            }; 
        case CLASZ_ACTIVATE_SUCCESS:
            let ac = changeState(state.claszs, action.payload);
            localStorage.setItem('clasz', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                claszs: ac
            }
        case CLASZ_DELETE_SUCCESS:
            let rem = state.claszs.filter(cat => cat.id != action.payload);
            localStorage.setItem('clasz', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                claszs: rem
            }
        case CLASZ_UPDATE_SUCCESS:
            const findInd = state.claszs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.claszs];
            newState[findInd] = action.payload;
            localStorage.setItem('clasz', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                claszs : newState,
                clasz:action.payload
            }; 
        case CLASZ_LOADING_ERROR:
        case CLASZ_ACTIVATE_FAIL:
        case CLASZ_REGISTER_FAIL:
        case CLASZ_DELETE_FAIL:
        case CLASZ_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}