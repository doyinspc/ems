import {
    PENMANAGER_GET_MULTIPLE,
    PENMANAGER_GET_ONE,
    PENMANAGER_REGISTER_SUCCESS,
    PENMANAGER_REGISTER_FAIL,
    PENMANAGER_LOADING,
    PENMANAGER_LOADING_ERROR,
    PENMANAGER_ACTIVATE_FAIL,
    PENMANAGER_ACTIVATE_SUCCESS,
    PENMANAGER_UPDATE_SUCCESS,
    PENMANAGER_UPDATE_FAIL,
    PENMANAGER_DELETE_SUCCESS,
    PENMANAGER_DELETE_FAIL,
    PENMANAGER_EDIT
} from "./../../types/setting/penmanager";

let penmanagerStore = JSON.parse(localStorage.getItem('penmanager'))

const initialState = {
    isLoading: false,
    penmanagers: penmanagerStore ? penmanagerStore : [],
    penmanager:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newPenmanager = [...aluu];
    newPenmanager.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newPenmanager;
}


export default function(state = initialState, action){
    switch (action.type) {
        case PENMANAGER_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case PENMANAGER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case PENMANAGER_GET_MULTIPLE:
            localStorage.setItem('penmanager', JSON.stringify(action.payload));
            return {
                ...state,
                penmanagers : action.payload,
                msg:'DONE!!!'
            };
        case PENMANAGER_GET_ONE:
            let all = [...state.penmanagers];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                penmanager : ses,
                MSG:"DONE!!!"
            };
        case PENMANAGER_REGISTER_SUCCESS:
            localStorage.setItem('penmanager', JSON.stringify([...state.penmanagers, action.payload]));
            return {
                ...state,
                penmanagers: [...state.penmanagers, action.payload],
                msg:action.msg
            }; 
        case PENMANAGER_ACTIVATE_SUCCESS:
            let ac = changeState(state.penmanagers, action.payload);
            localStorage.setItem('penmanager', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                penmanagers: ac
            }
        case PENMANAGER_DELETE_SUCCESS:
            let rem = state.penmanagers.filter(cat => cat.id != action.payload);
            localStorage.setItem('penmanager', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                penmanagers: rem
            }
        case PENMANAGER_UPDATE_SUCCESS:
            const findInd = state.penmanagers.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.penmanagers];
            newState[findInd] = action.payload;
            localStorage.setItem('penmanager', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                penmanagers : newState,
                penmanager:action.payload
            }; 
        case PENMANAGER_LOADING_ERROR:
        case PENMANAGER_ACTIVATE_FAIL:
        case PENMANAGER_REGISTER_FAIL:
        case PENMANAGER_DELETE_FAIL:
        case PENMANAGER_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}