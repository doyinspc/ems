import {
    MAINTENANCEUNIT_GET_MULTIPLE,
    MAINTENANCEUNIT_GET_ONE,
    MAINTENANCEUNIT_REGISTER_SUCCESS,
    MAINTENANCEUNIT_REGISTER_FAIL,
    MAINTENANCEUNIT_LOADING,
    MAINTENANCEUNIT_LOADING_ERROR,
    MAINTENANCEUNIT_ACTIVATE_FAIL,
    MAINTENANCEUNIT_ACTIVATE_SUCCESS,
    MAINTENANCEUNIT_UPDATE_SUCCESS,
    MAINTENANCEUNIT_UPDATE_FAIL,
    MAINTENANCEUNIT_DELETE_SUCCESS,
    MAINTENANCEUNIT_DELETE_FAIL,
    MAINTENANCEUNIT_EDIT
} from "./../../types/setting/maintenanceunit";

let maintenanceunitStore = JSON.parse(localStorage.getItem('maintenanceunit'))

const initialState = {
    isLoading: false,
    maintenanceunits: maintenanceunitStore ? maintenanceunitStore : [],
    maintenanceunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaintenanceunit = [...aluu];
    newMaintenanceunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaintenanceunit;
}
export default function(state = initialState, action){
    switch (action.type) {
        case MAINTENANCEUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MAINTENANCEUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MAINTENANCEUNIT_GET_MULTIPLE:
            localStorage.setItem('maintenanceunit', JSON.stringify(action.payload));
            return {
                ...state,
                maintenanceunits : action.payload,
                msg:'DONE!!!'
            };
        case MAINTENANCEUNIT_GET_ONE:
            let all = [...state.maintenanceunits];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                maintenanceunit : ses,
                MSG:"DONE!!!"
            };
        case MAINTENANCEUNIT_REGISTER_SUCCESS:
            localStorage.setItem('maintenanceunit', JSON.stringify([...state.maintenanceunits, action.payload]));
            return {
                ...state,
                maintenanceunits: [...state.maintenanceunits, action.payload],
                msg:action.msg
            }; 
        case MAINTENANCEUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.maintenanceunits, action.payload);
            localStorage.setItem('maintenanceunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                maintenanceunits: ac
            }
        case MAINTENANCEUNIT_DELETE_SUCCESS:
            let rem = state.maintenanceunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('maintenanceunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                maintenanceunits: rem
            }
        case MAINTENANCEUNIT_UPDATE_SUCCESS:
            const findInd = state.maintenanceunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.maintenanceunits];
            newState[findInd] = action.payload;
            localStorage.setItem('maintenanceunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                maintenanceunits : newState,
                maintenanceunit:action.payload
            }; 
        case MAINTENANCEUNIT_LOADING_ERROR:
        case MAINTENANCEUNIT_ACTIVATE_FAIL:
        case MAINTENANCEUNIT_REGISTER_FAIL:
        case MAINTENANCEUNIT_DELETE_FAIL:
        case MAINTENANCEUNIT_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}