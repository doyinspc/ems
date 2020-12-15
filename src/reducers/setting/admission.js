import {
    ADMISSION_GET_MULTIPLE,
    ADMISSION_GET_ONE,
    ADMISSION_REGISTER_SUCCESS,
    ADMISSION_REGISTER_FAIL,
    ADMISSION_LOADING,
    ADMISSION_LOADING_ERROR,
    ADMISSION_ACTIVATE_FAIL,
    ADMISSION_ACTIVATE_SUCCESS,
    ADMISSION_UPDATE_SUCCESS,
    ADMISSION_UPDATE_FAIL,
    ADMISSION_DELETE_SUCCESS,
    ADMISSION_DELETE_FAIL,
    ADMISSION_EDIT
} from "./../../types/setting/admission";

let admissionStore = JSON.parse(localStorage.getItem('admission'))

const initialState = {
    isLoading: false,
    admissions: admissionStore ? admissionStore : [],
    admission:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newAdmission = [...aluu];
    newAdmission.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newAdmission;
}
export default function(state = initialState, action){
    switch (action.type) {
        case ADMISSION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ADMISSION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ADMISSION_GET_MULTIPLE:
            localStorage.setItem('admission', JSON.stringify(action.payload));
            return {
                ...state,
                admissions : action.payload,
                msg:'DONE!!!'
            };
        case ADMISSION_GET_ONE:
            let all = [...state.admissions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                admission : ses,
                MSG:"DONE!!!"
            };
        case ADMISSION_REGISTER_SUCCESS:
            localStorage.setItem('admission', JSON.stringify([...state.admissions, action.payload]));
            return {
                ...state,
                admissions: [...state.admissions, action.payload],
                msg:action.msg
            }; 
        case ADMISSION_ACTIVATE_SUCCESS:
            let ac = changeState(state.admissions, action.payload);
            localStorage.setItem('admission', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                admissions: ac
            }
        case ADMISSION_DELETE_SUCCESS:
            let rem = state.admissions.filter(cat => cat.id != action.payload);
            localStorage.setItem('admission', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                admissions: rem
            }
        case ADMISSION_UPDATE_SUCCESS:
            const findInd = state.admissions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.admissions];
            newState[findInd] = action.payload;
            localStorage.setItem('admission', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                admissions : newState,
                admission:action.payload
            }; 
        case ADMISSION_LOADING_ERROR:
        case ADMISSION_ACTIVATE_FAIL:
        case ADMISSION_REGISTER_FAIL:
        case ADMISSION_DELETE_FAIL:
        case ADMISSION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}