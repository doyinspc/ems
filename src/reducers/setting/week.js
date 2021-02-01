import {
    WEEK_GET_MULTIPLE,
    WEEK_GET_ONE,
    WEEK_REGISTER_SUCCESS,
    WEEK_REGISTER_FAIL,
    WEEK_LOADING,
    WEEK_LOADING_ERROR,
    WEEK_ACTIVATE_FAIL,
    WEEK_ACTIVATE_SUCCESS,
    WEEK_UPDATE_SUCCESS,
    WEEK_UPDATE_FAIL,
    WEEK_DELETE_SUCCESS,
    WEEK_DELETE_FAIL,
    WEEK_EDIT
} from "./../../types/setting/week";

let weekStore = JSON.parse(localStorage.getItem('week'))

const initialState = {
    isLoading: false,
    weeks: weekStore ? weekStore : [],
    week:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newWeek = [...aluu];
    newWeek.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newWeek;
}
export default function(state = initialState, action){
    switch (action.type) {
        case WEEK_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case WEEK_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case WEEK_GET_MULTIPLE:
            localStorage.setItem('week', JSON.stringify(action.payload));
            return {
                ...state,
                weeks : action.payload,
                msg:'DONE!!!'
            };
        case WEEK_GET_ONE:
            let all = [...state.weeks];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                week : ses,
                MSG:"DONE!!!"
            };
        case WEEK_REGISTER_SUCCESS:
            localStorage.setItem('week', JSON.stringify([...state.weeks, action.payload]));
            return {
                ...state,
                weeks: [...state.weeks, action.payload],
                msg:action.msg
            }; 
        case WEEK_ACTIVATE_SUCCESS:
            let ac = changeState(state.weeks, action.payload);
            localStorage.setItem('week', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                weeks: ac
            }
        case WEEK_DELETE_SUCCESS:
            let rem = state.weeks.filter(cat => cat.id != action.payload);
            localStorage.setItem('week', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                weeks: rem
            }
        case WEEK_UPDATE_SUCCESS:
            const findInd = state.weeks.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.weeks];
            newState[findInd] = action.payload;
            localStorage.setItem('week', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                weeks : newState,
                week:action.payload
            }; 
        case WEEK_LOADING_ERROR:
        case WEEK_ACTIVATE_FAIL:
        case WEEK_REGISTER_FAIL:
        case WEEK_DELETE_FAIL:
        case WEEK_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}