import {
    MAINTENANCE_GET_MULTIPLE,
    MAINTENANCE_GET_ONE,
    MAINTENANCE_REGISTER_SUCCESS,
    MAINTENANCE_REGISTER_FAIL,
    MAINTENANCE_LOADING,
    MAINTENANCE_LOADING_ERROR,
    MAINTENANCE_ACTIVATE_FAIL,
    MAINTENANCE_ACTIVATE_SUCCESS,
    MAINTENANCE_UPDATE_SUCCESS,
    MAINTENANCE_UPDATE_FAIL,
    MAINTENANCE_DELETE_SUCCESS,
    MAINTENANCE_DELETE_FAIL,
    MAINTENANCE_EDIT
} from "./../../types/setting/maintenance";

let maintenanceStore = JSON.parse(localStorage.getItem('maintenance'))

const initialState = {
    isLoading: false,
    maintenances: maintenanceStore ? maintenanceStore : [],
    maintenance:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaintenance = [...aluu];
    newMaintenance.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaintenance;
}
export default function(state = initialState, action){
    switch (action.type) {
        case MAINTENANCE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MAINTENANCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MAINTENANCE_GET_MULTIPLE:
            localStorage.setItem('maintenance', JSON.stringify(action.payload));
            return {
                ...state,
                maintenances : action.payload,
                msg:'DONE!!!'
            };
        case MAINTENANCE_GET_ONE:
            let all = [...state.maintenances];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                maintenance : ses,
                MSG:"DONE!!!"
            };
        case MAINTENANCE_REGISTER_SUCCESS:
            localStorage.setItem('maintenance', JSON.stringify([...state.maintenances, action.payload]));
            return {
                ...state,
                maintenances: [...state.maintenances, action.payload],
                msg:action.msg
            }; 
        case MAINTENANCE_ACTIVATE_SUCCESS:
            let ac = changeState(state.maintenances, action.payload);
            localStorage.setItem('maintenance', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                maintenances: ac
            }
        case MAINTENANCE_DELETE_SUCCESS:
            let rem = state.maintenances.filter(cat => cat.id != action.payload);
            localStorage.setItem('maintenance', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                maintenances: rem
            }
        case MAINTENANCE_UPDATE_SUCCESS:
            const findInd = state.maintenances.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.maintenances];
            newState[findInd] = action.payload;
            localStorage.setItem('maintenance', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                maintenances : newState,
                maintenance:action.payload
            }; 
        case MAINTENANCE_LOADING_ERROR:
        case MAINTENANCE_ACTIVATE_FAIL:
        case MAINTENANCE_REGISTER_FAIL:
        case MAINTENANCE_DELETE_FAIL:
        case MAINTENANCE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}