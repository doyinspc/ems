import {
    OFFICE_GET_MULTIPLE,
    OFFICE_GET_ONE,
    OFFICE_REGISTER_SUCCESS,
    OFFICE_REGISTER_FAIL,
    OFFICE_LOADING,
    OFFICE_LOADING_ERROR,
    OFFICE_ACTIVATE_FAIL,
    OFFICE_ACTIVATE_SUCCESS,
    OFFICE_UPDATE_SUCCESS,
    OFFICE_UPDATE_FAIL,
    OFFICE_DELETE_SUCCESS,
    OFFICE_DELETE_FAIL,
    OFFICE_EDIT
} from "./../../types/setting/office";

let officeStore = JSON.parse(localStorage.getItem('office'))

const initialState = {
    isLoading: false,
    offices: officeStore ? officeStore : [],
    office:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newOffice = [...aluu];
    newOffice.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newOffice;
}


export default function(state = initialState, action){
    switch (action.type) {
        case OFFICE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case OFFICE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case OFFICE_GET_MULTIPLE:
            localStorage.setItem('office', JSON.stringify(action.payload));
            return {
                ...state,
                offices : action.payload,
                msg:'DONE!!!'
            };
        case OFFICE_GET_ONE:
            let all = [...state.offices];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                office : ses,
                MSG:"DONE!!!"
            };
        case OFFICE_REGISTER_SUCCESS:
            localStorage.setItem('office', JSON.stringify([...state.offices, action.payload]));
            return {
                ...state,
                offices: [...state.offices, action.payload],
                msg:action.msg
            }; 
        case OFFICE_ACTIVATE_SUCCESS:
            let ac = changeState(state.offices, action.payload);
            localStorage.setItem('office', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                offices: ac
            }
        case OFFICE_DELETE_SUCCESS:
            let rem = state.offices.filter(cat => cat.id != action.payload);
            localStorage.setItem('office', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                offices: rem
            }
        case OFFICE_UPDATE_SUCCESS:
            const findInd = state.offices.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.offices];
            newState[findInd] = action.payload;
            localStorage.setItem('office', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                offices : newState,
                office:action.payload
            }; 
        case OFFICE_LOADING_ERROR:
        case OFFICE_ACTIVATE_FAIL:
        case OFFICE_REGISTER_FAIL:
        case OFFICE_DELETE_FAIL:
        case OFFICE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}