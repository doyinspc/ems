import {
    CLASSFEE_GET_MULTIPLE,
    CLASSFEE_GET_ONE,
    CLASSFEE_REGISTER_SUCCESS,
    CLASSFEE_REGISTER_FAIL,
    CLASSFEE_LOADING,
    CLASSFEE_LOADING_ERROR,
    CLASSFEE_ACTIVATE_FAIL,
    CLASSFEE_ACTIVATE_SUCCESS,
    CLASSFEE_UPDATE_SUCCESS,
    CLASSFEE_UPDATE_FAIL,
    CLASSFEE_DELETE_SUCCESS,
    CLASSFEE_DELETE_FAIL,
    CLASSFEE_EDIT
} from "./../../types/setting/classfee";

let classfeeStore = JSON.parse(localStorage.getItem('classfee'))

const initialState = {
    isLoading: false,
    classfees: classfeeStore ? classfeeStore : [],
    classfee:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newClassfee = [...aluu];
    newClassfee.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newClassfee;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLASSFEE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CLASSFEE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLASSFEE_GET_MULTIPLE:
            localStorage.setItem('classfee', JSON.stringify(action.payload));
            return {
                ...state,
                classfees : action.payload,
                msg:'DONE!!!'
            };
        case CLASSFEE_GET_ONE:
            let all = [...state.classfees];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                classfee : ses,
                MSG:"DONE!!!"
            };
        case CLASSFEE_REGISTER_SUCCESS:
            localStorage.setItem('classfee', JSON.stringify([...state.classfees, action.payload]));
            return {
                ...state,
                classfees: [...state.classfees, action.payload],
                msg:action.msg
            }; 
        case CLASSFEE_ACTIVATE_SUCCESS:
            let ac = changeState(state.classfees, action.payload);
            localStorage.setItem('classfee', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                classfees: ac
            }
        case CLASSFEE_DELETE_SUCCESS:
            let rem = state.classfees.filter(cat => cat.id != action.payload);
            localStorage.setItem('classfee', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                classfees: rem
            }
        case CLASSFEE_UPDATE_SUCCESS:
            const findInd = state.classfees.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.classfees];
            newState[findInd] = action.payload;
            localStorage.setItem('classfee', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                classfees : newState,
                classfee:action.payload
            }; 
        case CLASSFEE_LOADING_ERROR:
        case CLASSFEE_ACTIVATE_FAIL:
        case CLASSFEE_REGISTER_FAIL:
        case CLASSFEE_DELETE_FAIL:
        case CLASSFEE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}