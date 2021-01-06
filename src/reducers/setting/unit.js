import {
    UNIT_GET_MULTIPLE,
    UNIT_GET_ONE,
    UNIT_REGISTER_SUCCESS,
    UNIT_REGISTER_FAIL,
    UNIT_LOADING,
    UNIT_LOADING_ERROR,
    UNIT_ACTIVATE_FAIL,
    UNIT_ACTIVATE_SUCCESS,
    UNIT_UPDATE_SUCCESS,
    UNIT_UPDATE_FAIL,
    UNIT_DELETE_SUCCESS,
    UNIT_DELETE_FAIL,
    UNIT_EDIT
} from "./../../types/setting/unit";

let unitStore = JSON.parse(localStorage.getItem('unit'))

const initialState = {
    isLoading: false,
    units: unitStore ? unitStore : [],
    unit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUnit = [...aluu];
    newUnit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUnit;
}


export default function(state = initialState, action){
    switch (action.type) {
        case UNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case UNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case UNIT_GET_MULTIPLE:
            localStorage.setItem('unit', JSON.stringify(action.payload));
            return {
                ...state,
                units : action.payload,
                msg:'DONE!!!'
            };
        case UNIT_GET_ONE:
            let all = [...state.units];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                unit : ses,
                MSG:"DONE!!!"
            };
        case UNIT_REGISTER_SUCCESS:
            localStorage.setItem('unit', JSON.stringify([...state.units, action.payload]));
            return {
                ...state,
                units: [...state.units, action.payload],
                msg:action.msg
            }; 
        case UNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.units, action.payload);
            localStorage.setItem('unit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                units: ac
            }
        case UNIT_DELETE_SUCCESS:
            let rem = state.units.filter(cat => cat.id != action.payload);
            localStorage.setItem('unit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                units: rem
            }
        case UNIT_UPDATE_SUCCESS:
            const findInd = state.units.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.units];
            newState[findInd] = action.payload;
            localStorage.setItem('unit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                units : newState,
                unit:action.payload
            }; 
        case UNIT_LOADING_ERROR:
        case UNIT_ACTIVATE_FAIL:
        case UNIT_REGISTER_FAIL:
        case UNIT_DELETE_FAIL:
        case UNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}