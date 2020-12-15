import {
    STAFFCLASSREPORT_GET_MULTIPLE,
    STAFFCLASSREPORT_GET_ONE,
    STAFFCLASSREPORT_REGISTER_SUCCESS,
    STAFFCLASSREPORT_REGISTER_FAIL,
    STAFFCLASSREPORT_LOADING,
    STAFFCLASSREPORT_LOADING_ERROR,
    STAFFCLASSREPORT_ACTIVATE_FAIL,
    STAFFCLASSREPORT_ACTIVATE_SUCCESS,
    STAFFCLASSREPORT_UPDATE_SUCCESS,
    STAFFCLASSREPORT_UPDATE_FAIL,
    STAFFCLASSREPORT_DELETE_SUCCESS,
    STAFFCLASSREPORT_DELETE_FAIL,
    STAFFCLASSREPORT_EDIT
} from "./../../types/staff/staffclassreport";

let staffclassreportStore = JSON.parse(localStorage.getItem('staffclassreport'))

const initialState = {
    isLoading: false,
    staffclassreports: staffclassreportStore ? staffclassreportStore : [],
    staffclassreport:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffclassreport = [...aluu];
    newStaffclassreport.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffclassreport;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFCLASSREPORT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFCLASSREPORT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFCLASSREPORT_GET_MULTIPLE:
            localStorage.setItem('staffclassreport', JSON.stringify(action.payload));
            return {
                ...state,
                staffclassreports : action.payload,
                msg:'DONE!!!'
            };
        case STAFFCLASSREPORT_GET_ONE:
            let all = [...state.staffclassreports];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffclassreport : ses,
                MSG:"DONE!!!"
            };
        case STAFFCLASSREPORT_REGISTER_SUCCESS:
            localStorage.setItem('staffclassreport', JSON.stringify([...state.staffclassreports, action.payload]));
            return {
                ...state,
                staffclassreports: [...state.staffclassreports, action.payload],
                msg:action.msg
            }; 
        case STAFFCLASSREPORT_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffclassreports, action.payload);
            localStorage.setItem('staffclassreport', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffclassreports: ac
            }
        case STAFFCLASSREPORT_DELETE_SUCCESS:
            let rem = state.staffclassreports.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffclassreport', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffclassreports: rem
            }
        case STAFFCLASSREPORT_UPDATE_SUCCESS:
            const findInd = state.staffclassreports.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffclassreports];
            newState[findInd] = action.payload;
            localStorage.setItem('staffclassreport', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffclassreports : newState,
                staffclassreport:action.payload
            }; 
        case STAFFCLASSREPORT_LOADING_ERROR:
        case STAFFCLASSREPORT_ACTIVATE_FAIL:
        case STAFFCLASSREPORT_REGISTER_FAIL:
        case STAFFCLASSREPORT_DELETE_FAIL:
        case STAFFCLASSREPORT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}