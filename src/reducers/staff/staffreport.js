import {
    STAFFREPORT_GET_MULTIPLE,
    STAFFREPORT_GET_ONE,
    STAFFREPORT_REGISTER_SUCCESS,
    STAFFREPORT_REGISTER_FAIL,
    STAFFREPORT_LOADING,
    STAFFREPORT_LOADING_ERROR,
    STAFFREPORT_ACTIVATE_FAIL,
    STAFFREPORT_ACTIVATE_SUCCESS,
    STAFFREPORT_UPDATE_SUCCESS,
    STAFFREPORT_UPDATE_FAIL,
    STAFFREPORT_DELETE_SUCCESS,
    STAFFREPORT_DELETE_FAIL,
    STAFFREPORT_EDIT
} from "./../../types/staff/staffreport";

let staffreportStore = JSON.parse(localStorage.getItem('staffreport'))

const initialState = {
    isLoading: false,
    staffreports: staffreportStore ? staffreportStore : [],
    staffreport:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaffreport = [...aluu];
    newStaffreport.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaffreport;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFFREPORT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFFREPORT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFFREPORT_GET_MULTIPLE:
            localStorage.setItem('staffreport', JSON.stringify(action.payload));
            return {
                ...state,
                staffreports : action.payload,
                msg:'DONE!!!'
            };
        case STAFFREPORT_GET_ONE:
            let all = [...state.staffreports];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staffreport : ses,
                MSG:"DONE!!!"
            };
        case STAFFREPORT_REGISTER_SUCCESS:
            localStorage.setItem('staffreport', JSON.stringify([...state.staffreports, action.payload]));
            return {
                ...state,
                staffreports: [...state.staffreports, action.payload],
                msg:action.msg
            }; 
        case STAFFREPORT_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffreports, action.payload);
            localStorage.setItem('staffreport', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffreports: ac
            }
        case STAFFREPORT_DELETE_SUCCESS:
            let rem = state.staffreports.filter(cat => cat.id != action.payload);
            localStorage.setItem('staffreport', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffreports: rem
            }
        case STAFFREPORT_UPDATE_SUCCESS:
            const findInd = state.staffreports.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffreports];
            newState[findInd] = action.payload;
            localStorage.setItem('staffreport', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffreports : newState,
                staffreport:action.payload
            }; 
        case STAFFREPORT_LOADING_ERROR:
        case STAFFREPORT_ACTIVATE_FAIL:
        case STAFFREPORT_REGISTER_FAIL:
        case STAFFREPORT_DELETE_FAIL:
        case STAFFREPORT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}