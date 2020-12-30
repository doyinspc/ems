import {
    INVENTORY_GET_MULTIPLE,
    INVENTORY_GET_ONE,
    INVENTORY_REGISTER_SUCCESS,
    INVENTORY_REGISTER_FAIL,
    INVENTORY_LOADING,
    INVENTORY_LOADING_ERROR,
    INVENTORY_ACTIVATE_FAIL,
    INVENTORY_ACTIVATE_SUCCESS,
    INVENTORY_UPDATE_SUCCESS,
    INVENTORY_UPDATE_FAIL,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_DELETE_FAIL,
    INVENTORY_EDIT
} from "./../../types/setting/inventory";

let inventoryStore = JSON.parse(localStorage.getItem('inventory'))

const initialState = {
    isLoading: false,
    inventorys: inventoryStore ? inventoryStore : [],
    inventory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newInventory = [...aluu];
    newInventory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newInventory;
}
export default function(state = initialState, action){
    switch (action.type) {
        case INVENTORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case INVENTORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INVENTORY_GET_MULTIPLE:
            localStorage.setItem('inventory', JSON.stringify(action.payload));
            return {
                ...state,
                inventorys : action.payload,
                msg:'DONE!!!'
            };
        case INVENTORY_GET_ONE:
            let all = [...state.inventorys];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                inventory : ses,
                MSG:"DONE!!!"
            };
        case INVENTORY_REGISTER_SUCCESS:
            localStorage.setItem('inventory', JSON.stringify([...state.inventorys, action.payload]));
            return {
                ...state,
                inventorys: [...state.inventorys, action.payload],
                msg:action.msg
            }; 
        case INVENTORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.inventorys, action.payload);
            localStorage.setItem('inventory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                inventorys: ac
            }
        case INVENTORY_DELETE_SUCCESS:
            let rem = state.inventorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('inventory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                inventorys: rem
            }
        case INVENTORY_UPDATE_SUCCESS:
            const findInd = state.inventorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.inventorys];
            newState[findInd] = action.payload;
            localStorage.setItem('inventory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                inventorys : newState,
                inventory:action.payload
            }; 
        case INVENTORY_LOADING_ERROR:
        case INVENTORY_ACTIVATE_FAIL:
        case INVENTORY_REGISTER_FAIL:
        case INVENTORY_DELETE_FAIL:
        case INVENTORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}