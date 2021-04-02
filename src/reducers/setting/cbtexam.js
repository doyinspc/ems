import { callReg, callSuccess } from "../../actions/common";
import {
    CBTEXAM_GET_MULTIPLE,
    CBTEXAM_GET_ONE,
    CBTEXAM_REGISTER_SUCCESS,
    CBTEXAM_REGISTER_FAIL,
    CBTEXAM_LOADING,
    CBTEXAM_LOADING_ERROR,
    CBTEXAM_ACTIVATE_FAIL,
    CBTEXAM_ACTIVATE_SUCCESS,
    CBTEXAM_UPDATE_SUCCESS,
    CBTEXAM_UPDATE_FAIL,
    CBTEXAM_DELETE_SUCCESS,
    CBTEXAM_DELETE_FAIL,
    CBTEXAM_EDIT
} from "./../../types/setting/cbtexam";

let cbtexamStore = JSON.parse(localStorage.getItem('cbtexam'))

const initialState = {
    isLoading: false,
    cbtexams: cbtexamStore ? cbtexamStore : [],
    cbtexam:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCbtexam = [...aluu];
    newCbtexam.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCbtexam;
}
export default function(state = initialState, action){
    switch (action.type) {
        case CBTEXAM_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CBTEXAM_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CBTEXAM_GET_MULTIPLE:
            localStorage.setItem('cbtexam', JSON.stringify(action.payload));
            return {
                ...state,
                cbtexams : action.payload,
                msg:'DONE!!!'
            };
        case CBTEXAM_GET_ONE:
            let all = [...state.cbtexams];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                cbtexam : ses,
                MSG:"DONE!!!"
            };
        case CBTEXAM_REGISTER_SUCCESS:
            localStorage.setItem('cbtexam', JSON.stringify([...state.cbtexams, action.payload]));
            callSuccess()
            return {
                ...state,
                cbtexams: [...state.cbtexams, action.payload],
                msg:action.msg
            }; 
        case CBTEXAM_ACTIVATE_SUCCESS:
            let ac = changeState(state.cbtexams, action.payload);
            localStorage.setItem('cbtexam', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                cbtexams: ac
            }
        case CBTEXAM_DELETE_SUCCESS:
            let rem = state.cbtexams.filter(cat => cat.id != action.payload);
            localStorage.setItem('cbtexam', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                cbtexams: rem
            }
        case CBTEXAM_UPDATE_SUCCESS:
            const findInd = state.cbtexams.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.cbtexams];
            newState[findInd] = action.payload;
            localStorage.setItem('cbtexam', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                cbtexams : newState,
                cbtexam:action.payload
            }; 
        case CBTEXAM_LOADING_ERROR:
        case CBTEXAM_ACTIVATE_FAIL:
        case CBTEXAM_REGISTER_FAIL:
        case CBTEXAM_DELETE_FAIL:
        case CBTEXAM_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}