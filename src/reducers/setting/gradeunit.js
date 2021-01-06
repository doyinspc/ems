import {
    GRADEUNIT_GET_MULTIPLE,
    GRADEUNIT_GET_ONE,
    GRADEUNIT_REGISTER_SUCCESS,
    GRADEUNIT_REGISTER_FAIL,
    GRADEUNIT_LOADING,
    GRADEUNIT_LOADING_ERROR,
    GRADEUNIT_ACTIVATE_FAIL,
    GRADEUNIT_ACTIVATE_SUCCESS,
    GRADEUNIT_UPDATE_SUCCESS,
    GRADEUNIT_UPDATE_FAIL,
    GRADEUNIT_DELETE_SUCCESS,
    GRADEUNIT_DELETE_FAIL,
    GRADEUNIT_EDIT
} from "./../../types/setting/gradeunit";

let gradeunitStore = JSON.parse(localStorage.getItem('gradeunit'))

const initialState = {
    isLoading: false,
    gradeunits: gradeunitStore ? gradeunitStore : [],
    gradeunit:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newGradeunit = [...aluu];
    newGradeunit.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newGradeunit;
}
export default function(state = initialState, action){
    switch (action.type) {
        case GRADEUNIT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case GRADEUNIT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case GRADEUNIT_GET_MULTIPLE:
            localStorage.setItem('gradeunit', JSON.stringify(action.payload));
            return {
                ...state,
                gradeunits : action.payload,
                msg:'DONE!!!'
            };
        case GRADEUNIT_GET_ONE:
            let all = [...state.gradeunits];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                gradeunit : ses,
                MSG:"DONE!!!"
            };
        case GRADEUNIT_REGISTER_SUCCESS:
            localStorage.setItem('gradeunit', JSON.stringify([...state.gradeunits, action.payload]));
            return {
                ...state,
                gradeunits: [...state.gradeunits, action.payload],
                msg:action.msg
            }; 
        case GRADEUNIT_ACTIVATE_SUCCESS:
            let ac = changeState(state.gradeunits, action.payload);
            localStorage.setItem('gradeunit', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                gradeunits: ac
            }
        case GRADEUNIT_DELETE_SUCCESS:
            let rem = state.gradeunits.filter(cat => cat.id != action.payload);
            localStorage.setItem('gradeunit', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                gradeunits: rem
            }
        case GRADEUNIT_UPDATE_SUCCESS:
            const findInd = state.gradeunits.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.gradeunits];
            newState[findInd] = action.payload;
            localStorage.setItem('gradeunit', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                gradeunits : newState,
                gradeunit:action.payload
            }; 
        case GRADEUNIT_LOADING_ERROR:
        case GRADEUNIT_ACTIVATE_FAIL:
        case GRADEUNIT_REGISTER_FAIL:
        case GRADEUNIT_DELETE_FAIL:
        case GRADEUNIT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}