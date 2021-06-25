import {
    LESSONPLAN_GET_MULTIPLE,
    LESSONPLAN_GET_ONE,
    LESSONPLAN_REGISTER_SUCCESS,
    LESSONPLAN_REGISTER_FAIL,
    LESSONPLAN_LOADING,
    LESSONPLAN_DETAIL_LOADING,
    LESSONPLAN_LOADING_ERROR,
    LESSONPLAN_ACTIVATE_FAIL,
    LESSONPLAN_ACTIVATE_SUCCESS,
    LESSONPLAN_UPDATE_SUCCESS,
    LESSONPLAN_UPDATE_FAIL,
    LESSONPLAN_DELETE_SUCCESS,
    LESSONPLAN_DELETE_FAIL,
    LESSONPLAN_EDIT,
    LESSONPLAN_GET_DETAIL
} from "./../../types/setting/lessonplan";

let lessonplanStore = JSON.parse(localStorage.getItem('lessonplan'))

const initialState = {
    isLoading: false,
    isLoadingDetails: false,
    lessonplans: lessonplanStore ? lessonplanStore : [],
    lessonplan:{},
    msg: null,
    isEdit:-1,
    ref:null,
    lessonplandetails:[]
}

const changeState = (aluu, actid) =>
{
    let newLessonplan = [...aluu];
    newLessonplan.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newLessonplan;
}
export default function(state = initialState, action){
    switch (action.type) {
        case LESSONPLAN_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case LESSONPLAN_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case LESSONPLAN_DETAIL_LOADING:
            return {
                ...state,
                isLoadingDetails : true
            };
        case LESSONPLAN_GET_MULTIPLE:
            localStorage.setItem('lessonplan', JSON.stringify(action.payload));
            return {
                ...state,
                lessonplans : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case LESSONPLAN_GET_DETAIL:
            return {
                ...state,
                lessonplandetails : action.payload,
                isLoadingDetails : false,
                msg:'DONE!!!'
            };
        case LESSONPLAN_GET_ONE:
            let all = [...state.lessonplans];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                lessonplan : ses,
                MSG:"DONE!!!"
            };
        case LESSONPLAN_REGISTER_SUCCESS:
            localStorage.setItem('lessonplan', JSON.stringify([...state.lessonplans, action.payload]));
            return {
                ...state,
                lessonplans: [...state.lessonplans, action.payload],
                msg:action.msg
            }; 
        case LESSONPLAN_ACTIVATE_SUCCESS:
            let ac = changeState(state.lessonplans, action.payload);
            localStorage.setItem('lessonplan', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                lessonplans: ac
            }
        case LESSONPLAN_DELETE_SUCCESS:
            let rem = state.lessonplans.filter(cat => cat.id != action.payload);
            localStorage.setItem('lessonplan', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                lessonplans: rem
            }
        case LESSONPLAN_UPDATE_SUCCESS:
            const findInd = state.lessonplans.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.lessonplans];
            newState[findInd] = action.payload;
            localStorage.setItem('lessonplan', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                lessonplans : newState,
                lessonplan:action.payload
            }; 
        case LESSONPLAN_LOADING_ERROR:
        case LESSONPLAN_ACTIVATE_FAIL:
        case LESSONPLAN_REGISTER_FAIL:
        case LESSONPLAN_DELETE_FAIL:
        case LESSONPLAN_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}