import {
    ASSESSMENT_GET_MULTIPLE,
    ASSESSMENT_GET_ONE,
    ASSESSMENT_REGISTER_SUCCESS,
    ASSESSMENT_REGISTER_FAIL,
    ASSESSMENT_LOADING,
    ASSESSMENT_DETAIL_LOADING,
    ASSESSMENT_LOADING_ERROR,
    ASSESSMENT_ACTIVATE_FAIL,
    ASSESSMENT_ACTIVATE_SUCCESS,
    ASSESSMENT_UPDATE_SUCCESS,
    ASSESSMENT_UPDATE_FAIL,
    ASSESSMENT_DELETE_SUCCESS,
    ASSESSMENT_DELETE_FAIL,
    ASSESSMENT_EDIT,
    ASSESSMENT_GET_DETAIL
} from "./../../types/setting/assessment";

let assessmentStore = JSON.parse(localStorage.getItem('assessment'))

const initialState = {
    isLoading: false,
    isLoadingDetails: false,
    assessments: assessmentStore ? assessmentStore : [],
    assessment:{},
    msg: null,
    isEdit:-1,
    ref:null,
    assessmentdetails:[]
}

const changeState = (aluu, actid) =>
{
    let newAssessment = [...aluu];
    newAssessment.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newAssessment;
}
export default function(state = initialState, action){
    switch (action.type) {
        case ASSESSMENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ASSESSMENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ASSESSMENT_DETAIL_LOADING:
            return {
                ...state,
                isLoadingDetails : true
            };
        case ASSESSMENT_GET_MULTIPLE:
            localStorage.setItem('assessment', JSON.stringify(action.payload));
            return {
                ...state,
                assessments : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case ASSESSMENT_GET_DETAIL:
            return {
                ...state,
                assessmentdetails : action.payload,
                isLoadingDetails : false,
                msg:'DONE!!!'
            };
        case ASSESSMENT_GET_ONE:
            let all = [...state.assessments];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                assessment : ses,
                MSG:"DONE!!!"
            };
        case ASSESSMENT_REGISTER_SUCCESS:
            localStorage.setItem('assessment', JSON.stringify([...state.assessments, action.payload]));
            return {
                ...state,
                assessments: [...state.assessments, action.payload],
                msg:action.msg
            }; 
        case ASSESSMENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.assessments, action.payload);
            localStorage.setItem('assessment', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                assessments: ac
            }
        case ASSESSMENT_DELETE_SUCCESS:
            let rem = state.assessments.filter(cat => cat.id != action.payload);
            localStorage.setItem('assessment', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                assessments: rem
            }
        case ASSESSMENT_UPDATE_SUCCESS:
            const findInd = state.assessments.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.assessments];
            newState[findInd] = action.payload;
            localStorage.setItem('assessment', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                assessments : newState,
                assessment:action.payload
            }; 
        case ASSESSMENT_LOADING_ERROR:
        case ASSESSMENT_ACTIVATE_FAIL:
        case ASSESSMENT_REGISTER_FAIL:
        case ASSESSMENT_DELETE_FAIL:
        case ASSESSMENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}