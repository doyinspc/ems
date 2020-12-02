import {
    CA_GET_MULTIPLE,
    CA_GET_ONE,
    CA_REGISTER_SUCCESS,
    CA_REGISTER_FAIL,
    CA_LOADING,
    CA_LOADING_ERROR,
    CA_ACTIVATE_FAIL,
    CA_ACTIVATE_SUCCESS,
    CA_UPDATE_SUCCESS,
    CA_UPDATE_FAIL,
    CA_DELETE_SUCCESS,
    CA_DELETE_FAIL,
    CA_EDIT
} from "./../../types/setting/ca";

let caStore = JSON.parse(localStorage.getItem('ca'));

const initialState = {
    isLoading: false,
    cas: caStore ? caStore : [],
    ca:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCa = [...aluu];
    newCa.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCa;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CA_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CA_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CA_GET_MULTIPLE:
            localStorage.setItem('ca', JSON.stringify(action.payload));
            return {
                ...state,
                cas : action.payload,
                msg:'DONE!!!'
            };
        case CA_GET_ONE:
            let all = [...state.cas];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                ca : ses,
                MSG:"DONE!!!"
            };
        case CA_REGISTER_SUCCESS:
            localStorage.setItem('ca', JSON.stringify([...state.cas, action.payload]));
            return {
                ...state,
                cas: [...state.cas, action.payload],
                msg:action.msg
            }; 
        case CA_ACTIVATE_SUCCESS:
            let ac = changeState(state.cas, action.payload);
            localStorage.setItem('ca', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                cas: ac
            }
        case CA_DELETE_SUCCESS:
            let rem = state.cas.filter(cat => cat.id != action.payload);
            localStorage.setItem('ca', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                cas: rem
            }
        case CA_UPDATE_SUCCESS:
            const findInd = state.cas.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.cas];
            newState[findInd] = action.payload;
            localStorage.setItem('ca', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                cas : newState,
                ca:action.payload
            }; 
        case CA_LOADING_ERROR:
        case CA_ACTIVATE_FAIL:
        case CA_REGISTER_FAIL:
        case CA_DELETE_FAIL:
        case CA_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}