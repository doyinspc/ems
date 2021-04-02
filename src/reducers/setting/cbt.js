import { callSuccess } from "../../actions/common";
import {
    CBT_GET_MULTIPLE,
    CBT_GET_ONE,
    CBT_REGISTER_SUCCESS,
    CBT_REGISTER_FAIL,
    CBT_LOADING,
    CBT_LOADING_ERROR,
    CBT_ACTIVATE_FAIL,
    CBT_ACTIVATE_SUCCESS,
    CBT_UPDATE_SUCCESS,
    CBT_UPDATE_FAIL,
    CBT_DELETE_SUCCESS,
    CBT_DELETE_FAIL,
    CBT_EDIT
} from "./../../types/setting/cbt";

let cbtStore = JSON.parse(localStorage.getItem('cbt'))

const initialState = {
    isLoading: false,
    cbts: cbtStore ? cbtStore : [],
    cbt:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCbt = [...aluu];
    newCbt.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCbt;
}
export default function(state = initialState, action){
    switch (action.type) {
        case CBT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CBT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CBT_GET_MULTIPLE:
            localStorage.setItem('cbt', JSON.stringify(action.payload));
            return {
                ...state,
                cbts : action.payload,
                msg:'DONE!!!'
            };
        case CBT_GET_ONE:
            let all = [...state.cbts];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                cbt : ses,
                MSG:"DONE!!!"
            };
        case CBT_REGISTER_SUCCESS:
            localStorage.setItem('cbt', JSON.stringify([...state.cbts, action.payload]));
            callSuccess()
            return {
                ...state,
                cbts: [...state.cbts, action.payload],
                msg:action.msg
            }; 
        case CBT_ACTIVATE_SUCCESS:
            let ac = changeState(state.cbts, action.payload);
            localStorage.setItem('cbt', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                cbts: ac
            }
        case CBT_DELETE_SUCCESS:
            let rem = state.cbts.filter(cat => cat.id != action.payload);
            localStorage.setItem('cbt', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                cbts: rem
            }
        case CBT_UPDATE_SUCCESS:
            const findInd = state.cbts.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.cbts];
            newState[findInd] = action.payload;
            localStorage.setItem('cbt', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                cbts : newState,
                cbt:action.payload
            }; 
        case CBT_LOADING_ERROR:
        case CBT_ACTIVATE_FAIL:
        case CBT_REGISTER_FAIL:
        case CBT_DELETE_FAIL:
        case CBT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}