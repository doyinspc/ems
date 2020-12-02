import {
    CATYPE_GET_MULTIPLE,
    CATYPE_GET_ONE,
    CATYPE_REGISTER_SUCCESS,
    CATYPE_REGISTER_FAIL,
    CATYPE_LOADING,
    CATYPE_LOADING_ERROR,
    CATYPE_ACTIVATE_FAIL,
    CATYPE_ACTIVATE_SUCCESS,
    CATYPE_UPDATE_SUCCESS,
    CATYPE_UPDATE_FAIL,
    CATYPE_DELETE_SUCCESS,
    CATYPE_DELETE_FAIL,
    CATYPE_EDIT
} from "./../../types/setting/catype";

let catypeStore = JSON.parse(localStorage.getItem('catype'))

const initialState = {
    isLoading: false,
    catypes: catypeStore ? catypeStore : [],
    catype:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCatype = [...aluu];
    newCatype.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCatype;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CATYPE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CATYPE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CATYPE_GET_MULTIPLE:
            localStorage.setItem('catype', JSON.stringify(action.payload));
            return {
                ...state,
                catypes : action.payload,
                msg:'DONE!!!'
            };
        case CATYPE_GET_ONE:
            let all = [...state.catypes];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                catype : ses,
                MSG:"DONE!!!"
            };
        case CATYPE_REGISTER_SUCCESS:
            localStorage.setItem('catype', JSON.stringify([...state.catypes, action.payload]));
            return {
                ...state,
                catypes: [...state.catypes, action.payload],
                msg:action.msg
            }; 
        case CATYPE_ACTIVATE_SUCCESS:
            let ac = changeState(state.catypes, action.payload);
            localStorage.setItem('catype', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                catypes: ac
            }
        case CATYPE_DELETE_SUCCESS:
            let rem = state.catypes.filter(cat => cat.id != action.payload);
            localStorage.setItem('catype', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                catypes: rem
            }
        case CATYPE_UPDATE_SUCCESS:
            const findInd = state.catypes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.catypes];
            newState[findInd] = action.payload;
            localStorage.setItem('catype', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                catypes : newState,
                catype:action.payload
            }; 
        case CATYPE_LOADING_ERROR:
        case CATYPE_ACTIVATE_FAIL:
        case CATYPE_REGISTER_FAIL:
        case CATYPE_DELETE_FAIL:
        case CATYPE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}