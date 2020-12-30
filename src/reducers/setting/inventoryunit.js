import {
    INVENTORYUNIT_GET_MULTIPLE,
    INVENTORYUNIT_GET_ONE,
    INVENTORYUNIT_REGISTER_SUCCESS,
    INVENTORYUNIT_REGISTER_FAIL,
    INVENTORYUNIT_LOADING,
    INVENTORYUNIT_LOADING_ERROR,
    INVENTORYUNIT_ACTIVATE_FAIL,
    INVENTORYUNIT_ACTIVATE_SUCCESS,
    INVENTORYUNIT_UPDATE_SUCCESS,
    INVENTORYUNIT_UPDATE_FAIL,
    INVENTORYUNIT_DELETE_SUCCESS,
    INVENTORYUNIT_DELETE_FAIL,
    INVENTORYUNIT_EDIT
} from "./../../types/setting/inventoryunit";

let inventoryunitStore = JSON.parse(localStorage.getItem('inventoryunit'))

const initialState = {
    isLoading: false,
    inventoryunits: inventoryunitStore ? inventoryunitStore : [],
    inventoryunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newInventoryunit = [...aluu];
    newInventoryunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newInventoryunit;
}
export default function(state = initialState, action){
    switch (action.type) {
        case INVENTORYUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case INVENTORYUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INVENTORYUNIT_GET_MULTIPLE:
            localStorage.setItem('inventoryunit', JSON.stringify(action.payload));
            return {
                ...state,
                inventoryunits : action.payload,
                msg:'DONE!!!'
            };
        case INVENTORYUNIT_GET_ONE:
            let all = [...state.inventoryunits];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                inventoryunit : ses,
                MSG:"DONE!!!"
            };
        case INVENTORYUNIT_REGISTER_SUCCESS:
            localStorage.setItem('inventoryunit', JSON.stringify([...state.inventoryunits, action.payload]));
            return {
                ...state,
                inventoryunits: [...state.inventoryunits, action.payload],
                msg:action.msg
            }; 
        case INVENTORYUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.inventoryunits, action.payload);
            localStorage.setItem('inventoryunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                inventoryunits: ac
            }
        case INVENTORYUNIT_DELETE_SUCCESS:
            let rem = state.inventoryunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('inventoryunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                inventoryunits: rem
            }
        case INVENTORYUNIT_UPDATE_SUCCESS:
            const findInd = state.inventoryunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.inventoryunits];
            newState[findInd] = action.payload;
            localStorage.setItem('inventoryunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                inventoryunits : newState,
                inventoryunit:action.payload
            }; 
        case INVENTORYUNIT_LOADING_ERROR:
        case INVENTORYUNIT_ACTIVATE_FAIL:
        case INVENTORYUNIT_REGISTER_FAIL:
        case INVENTORYUNIT_DELETE_FAIL:
        case INVENTORYUNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}