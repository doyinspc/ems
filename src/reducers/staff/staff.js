import {
    STAFF_GET_MULTIPLE,
    STAFF_GET_SEARCH,
    STAFF_GET_BIRTHDAY,
    STAFF_GET_ONE,
    STAFF_REGISTER_SUCCESS,
    STAFF_REGISTER_FAIL,
    STAFF_LOADING,
    STAFF_LOADING_ERROR,
    STAFF_ACTIVATE_FAIL,
    STAFF_ACTIVATE_SUCCESS,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL,
    STAFF_EDIT
} from "./../../types/staff/staff";
import Swal from 'sweetalert'
const callSucces = ($err) =>{
    Swal("Saved!", "UPdate saved!", "success");
 }

let staffStore = JSON.parse(localStorage.getItem('staff'))

const initialState = {
    isLoading: false,
    staffs: staffStore ? staffStore : [],
    staff:{},
    msg: null,
    isEdit:-1,
    ref:null,
    result:[],
    birthday:[]
}

const changeState = (aluu, actid) =>
{
    let newStaff = [...aluu];
    newStaff.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaff;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFF_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFF_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFF_GET_MULTIPLE:
            localStorage.setItem('staff', JSON.stringify(action.payload));
            return {
                ...state,
                staffs : action.payload,
                msg:'DONE!!!'
            };
        case STAFF_GET_SEARCH:
            return {
                ...state,
                result: action.payload
            };
        case STAFF_GET_BIRTHDAY:
            return {
                ...state,
                birthday: action.payload
            };
        case STAFF_GET_ONE:
            let all = [...state.staffs];
            
            let ses = all.filter(rw=>rw !== null).filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                staff : ses,
                ref:null,
                MSG:"DONE!!!"
            };
        case STAFF_REGISTER_SUCCESS:
            let alls = [...state.staffs];
            alls.push(action.payload)
            localStorage.setItem('staff', JSON.stringify(alls));
            return {
                ...state,
                staffs: alls,
                staff:action.payload,
                ref:action.payload.id,
                msg:action.msg
            }; 
        case STAFF_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffs, action.payload);
            localStorage.setItem('staff', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffs: ac
            }
        case STAFF_DELETE_SUCCESS:
            let rem = state.staffs.filter(cat => cat.id != action.payload);
            localStorage.setItem('staff', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffs: rem
            }
        case STAFF_UPDATE_SUCCESS:
            const findInd = state.staffs.findIndex(cat =>parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.staffs];
            newState[findInd] = action.payload;
            localStorage.setItem('staff', JSON.stringify(newState));
             callSucces();
            return {
                ...state,
                ...action.payload,
                staffs : newState,
                staff:action.payload
            }; 
        case STAFF_LOADING_ERROR:
        case STAFF_ACTIVATE_FAIL:
        case STAFF_REGISTER_FAIL:
        case STAFF_DELETE_FAIL:
        case STAFF_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}