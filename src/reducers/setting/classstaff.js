import {
    CLASSSTAFF_GET_MULTIPLE,
    CLASSSTAFF_GET_ONE,
    CLASSSTAFF_REGISTER_SUCCESS,
    CLASSSTAFF_REGISTER_FAIL,
    CLASSSTAFF_LOADING,
    CLASSSTAFF_LOADING_ERROR,
    CLASSSTAFF_ACTIVATE_FAIL,
    CLASSSTAFF_ACTIVATE_SUCCESS,
    CLASSSTAFF_UPDATE_SUCCESS,
    CLASSSTAFF_UPDATE_FAIL,
    CLASSSTAFF_DELETE_SUCCESS,
    CLASSSTAFF_DELETE_FAIL,
    CLASSSTAFF_EDIT
} from "./../../types/setting/classstaff";

let classstaffStore = JSON.parse(localStorage.getItem('classstaff'))

const initialState = {
    isLoading: false,
    classstaffs: classstaffStore ? classstaffStore : [],
    classstaff:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newClassstaff = [...aluu];
    newClassstaff.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newClassstaff;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLASSSTAFF_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CLASSSTAFF_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLASSSTAFF_GET_MULTIPLE:
            localStorage.setItem('classstaff', JSON.stringify(action.payload));
            return {
                ...state,
                classstaffs : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case CLASSSTAFF_GET_ONE:
            let all = [...state.classstaffs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                classstaff : ses,
                MSG:"DONE!!!"
            };
        case CLASSSTAFF_REGISTER_SUCCESS:
            localStorage.setItem('classstaff', JSON.stringify([...state.classstaffs, action.payload]));
            return {
                ...state,
                classstaffs: [...state.classstaffs, action.payload],
                msg:action.msg
            }; 
        case CLASSSTAFF_ACTIVATE_SUCCESS:
            let ac = changeState(state.classstaffs, action.payload);
            localStorage.setItem('classstaff', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                classstaffs: ac
            }
        case CLASSSTAFF_DELETE_SUCCESS:
            let rem = state.classstaffs.filter(cat => cat.id != action.payload);
            localStorage.setItem('classstaff', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                classstaffs: rem
            }
        case CLASSSTAFF_UPDATE_SUCCESS:
            const findInd = state.classstaffs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.classstaffs];
            newState[findInd] = action.payload;
            localStorage.setItem('classstaff', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                classstaffs : newState,
                classstaff:action.payload
            }; 
        case CLASSSTAFF_LOADING_ERROR:
        case CLASSSTAFF_ACTIVATE_FAIL:
        case CLASSSTAFF_REGISTER_FAIL:
        case CLASSSTAFF_DELETE_FAIL:
        case CLASSSTAFF_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}