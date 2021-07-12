import { callReg, callSuccess } from "../../actions/common";
import {
    STUDENTCOMMENT_GET_MULTIPLE,
    STUDENTCOMMENT_GET_SUMMARY,
    STUDENTCOMMENT_GET_ONE,
    STUDENTCOMMENT_REGISTER_SUCCESS,
    STUDENTCOMMENT_REGISTER_FAIL,
    STUDENTCOMMENT_LOADING,
    STUDENTCOMMENT_LOADING_ERROR,
    STUDENTCOMMENT_ACTIVATE_FAIL,
    STUDENTCOMMENT_ACTIVATE_SUCCESS,
    STUDENTCOMMENT_UPDATE_SUCCESS,
    STUDENTCOMMENT_UPDATE_FAIL,
    STUDENTCOMMENT_DELETE_SUCCESS,
    STUDENTCOMMENT_DELETE_FAIL,
    STUDENTCOMMENT_EDIT
} from "./../../types/student/studentcomment";

let studentcommentStore = JSON.parse(localStorage.getItem('studentcomment'))

const initialState = {
    isLoading: false,
    studentcomments: studentcommentStore ? studentcommentStore : [],
    studentcomment:{},
    studentcommentsummary:[],
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentcomment = [...aluu];
    newStudentcomment.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentcomment;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTCOMMENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTCOMMENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTCOMMENT_GET_MULTIPLE:
            localStorage.setItem('studentcomment', JSON.stringify(action.payload));
            return {
                ...state,
                studentcomments : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTCOMMENT_GET_SUMMARY:
            return {
                ...state,
                studentcommentsummary : action.payload
            };
        case STUDENTCOMMENT_GET_ONE:
            let all = [...state.studentcomments];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                studentcomment : ses,
                MSG:"DONE!!!"
            };
        case STUDENTCOMMENT_REGISTER_SUCCESS:
            let old_ar = [...state.studentcomments]
            if(Array.isArray(action.payload)){
                action.payload.forEach(element => {
                    let indexx = old_ar.findIndex(rw => rw.id == element.id)
                    if(indexx > -1){
                        old_ar[indexx] = element;
                    }else{
                        old_ar = [...old_ar, element];
                    }
                });

            }else{
                old_ar = [...old_ar, action.payload];
            }
            alert(JSON.stringify(old_ar))
            localStorage.setItem('studentcomment', JSON.stringify(old_ar));

            //callReg()
            return {
                ...state,
                studentcomments: old_ar,
                msg:action.msg
            }; 
        case STUDENTCOMMENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentcomments, action.payload);
            localStorage.setItem('studentcomment', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                studentcomments: ac
            }
        case STUDENTCOMMENT_DELETE_SUCCESS:
            let rem = state.studentcomments.filter(cat => parseInt(cat.cid) !== parseInt(action.payload));
            localStorage.setItem('studentcomment', JSON.stringify(rem));
            callReg()
            return{
                ...state,
                msg:'DONE!!!',
                studentcomments: rem
            }
        case STUDENTCOMMENT_UPDATE_SUCCESS:
            const findInd = state.studentcomments.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentcomments];
            newState[findInd] = action.payload;
            localStorage.setItem('studentcomment', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                studentcomments : newState,
                studentcomment:action.payload
            }; 
        case STUDENTCOMMENT_LOADING_ERROR:
        case STUDENTCOMMENT_ACTIVATE_FAIL:
        case STUDENTCOMMENT_REGISTER_FAIL:
        case STUDENTCOMMENT_DELETE_FAIL:
        case STUDENTCOMMENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}