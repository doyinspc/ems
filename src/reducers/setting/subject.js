import {
    SUBJECT_GET_MULTIPLE,
    SUBJECT_GET_ONE,
    SUBJECT_REGISTER_SUCCESS,
    SUBJECT_REGISTER_FAIL,
    SUBJECT_LOADING,
    SUBJECT_LOADING_ERROR,
    SUBJECT_ACTIVATE_FAIL,
    SUBJECT_ACTIVATE_SUCCESS,
    SUBJECT_UPDATE_SUCCESS,
    SUBJECT_UPDATE_FAIL,
    SUBJECT_DELETE_SUCCESS,
    SUBJECT_DELETE_FAIL,
    SUBJECT_EDIT
} from "./../../types/setting/subject";

let subjectStore = JSON.parse(localStorage.getItem('subject'))

const initialState = {
    isLoading: false,
    subjects: subjectStore ? subjectStore : [],
    subject:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newSubject = [...aluu];
    newSubject.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSubject;
}


export default function(state = initialState, action){
    switch (action.type) {
        case SUBJECT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case SUBJECT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SUBJECT_GET_MULTIPLE:
            localStorage.setItem('subject', JSON.stringify(action.payload));
            return {
                ...state,
                subjects : action.payload,
                msg:'DONE!!!'
            };
        case SUBJECT_GET_ONE:
            let all = [...state.subjects];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                subject : ses,
                MSG:"DONE!!!"
            };
        case SUBJECT_REGISTER_SUCCESS:
            localStorage.setItem('subject', JSON.stringify([...state.subjects, action.payload]));
            return {
                ...state,
                subjects: [...state.subjects, action.payload],
                msg:action.msg
            }; 
        case SUBJECT_ACTIVATE_SUCCESS:
            let ac = changeState(state.subjects, action.payload);
            localStorage.setItem('subject', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                subjects: ac
            }
        case SUBJECT_DELETE_SUCCESS:
            let rem = state.subjects.filter(cat => cat.id != action.payload);
            localStorage.setItem('subject', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                subjects: rem
            }
        case SUBJECT_UPDATE_SUCCESS:
            
            const findInd = state.subjects.filter(rw=>rw !== null).findIndex(cat =>parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.subjects];
            newState[findInd] = action.payload;
            localStorage.setItem('subject', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                subjects : newState,
                subject:action.payload
            }; 
        case SUBJECT_LOADING_ERROR:
        case SUBJECT_ACTIVATE_FAIL:
        case SUBJECT_REGISTER_FAIL:
        case SUBJECT_DELETE_FAIL:
        case SUBJECT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}