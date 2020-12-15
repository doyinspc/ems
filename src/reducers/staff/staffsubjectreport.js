import {
    STAFFSUBJECTREPORT_GET_MULTIPLE,
    STAFFSUBJECTREPORT_GET_ONE,
    STAFFSUBJECTREPORT_REGISTER_SUCCESS,
    STAFFSUBJECTREPORT_REGISTER_FAIL,
    STAFFSUBJECTREPORT_LOADING,
    STAFFSUBJECTREPORT_LOADING_ERROR,
    STAFFSUBJECTREPORT_ACTIVATE_FAIL,
    STAFFSUBJECTREPORT_ACTIVATE_SUCCESS,
    STAFFSUBJECTREPORT_UPDATE_SUCCESS,
    STAFFSUBJECTREPORT_UPDATE_FAIL,
    STAFFSUBJECTREPORT_DELETE_SUCCESS,
    STAFFSUBJECTREPORT_DELETE_FAIL,
    STAFFSUBJECTREPORT_EDIT
} from "../../types/staff/staffsubjectreport";

let staffsubjectreportStore = JSON.parse(localStorage.getItem('staffsubjectreport'))

const initialState = {
    isLoading: false,
    staffsubjectreports: staffsubjectreportStore ? staffsubjectreportStore : [],
    staffsubjectreport:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffsubjectreport = [...aluu];
    newStaffsubjectreport.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffsubjectreport;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFSUBJECTREPORT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFSUBJECTREPORT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFSUBJECTREPORT_GET_MULTIPLE:
            localStorage.setItem('staffsubjectreport', JSON.stringify(action.payload));
            return {
                ...state,
                staffsubjectreports : action.payload,
                msg:'DONE!!!'
            };
        case STAFFSUBJECTREPORT_GET_ONE:
            let all = [...state.staffsubjectreports];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffsubjectreport : ses,
                MSG:"DONE!!!"
            };
        case STAFFSUBJECTREPORT_REGISTER_SUCCESS:
            localStorage.setItem('staffsubjectreport', JSON.stringify([...state.staffsubjectreports, action.payload]));
            return {
                ...state,
                staffsubjectreports: [...state.staffsubjectreports, action.payload],
                msg:action.msg
            }; 
        case STAFFSUBJECTREPORT_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffsubjectreports, action.payload);
            localStorage.setItem('staffsubjectreport', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffsubjectreports: ac
            }
        case STAFFSUBJECTREPORT_DELETE_SUCCESS:
            let rem = state.staffsubjectreports.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffsubjectreport', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffsubjectreports: rem
            }
        case STAFFSUBJECTREPORT_UPDATE_SUCCESS:
            const findInd = state.staffsubjectreports.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffsubjectreports];
            newState[findInd] = action.payload;
            localStorage.setItem('staffsubjectreport', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffsubjectreports : newState,
                staffsubjectreport:action.payload
            }; 
        case STAFFSUBJECTREPORT_LOADING_ERROR:
        case STAFFSUBJECTREPORT_ACTIVATE_FAIL:
        case STAFFSUBJECTREPORT_REGISTER_FAIL:
        case STAFFSUBJECTREPORT_DELETE_FAIL:
        case STAFFSUBJECTREPORT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}