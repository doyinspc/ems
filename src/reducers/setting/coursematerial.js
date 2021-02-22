import {
    COURSEMATERIAL_GET_MULTIPLE,
    COURSEMATERIAL_GET_ONE,
    COURSEMATERIAL_REGISTER_SUCCESS,
    COURSEMATERIAL_REGISTER_FAIL,
    COURSEMATERIAL_LOADING,
    COURSEMATERIAL_LOADING_ERROR,
    COURSEMATERIAL_ACTIVATE_FAIL,
    COURSEMATERIAL_ACTIVATE_SUCCESS,
    COURSEMATERIAL_UPDATE_SUCCESS,
    COURSEMATERIAL_UPDATE_FAIL,
    COURSEMATERIAL_DELETE_SUCCESS,
    COURSEMATERIAL_DELETE_FAIL,
    COURSEMATERIAL_EDIT
} from "./../../types/setting/coursematerial";

let coursematerialStore = JSON.parse(localStorage.getItem('coursematerial'))

const initialState = {
    isLoading: false,
    coursematerials: coursematerialStore ? coursematerialStore : [],
    coursematerial:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursematerial = [...aluu];
    newCoursematerial.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursematerial;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSEMATERIAL_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSEMATERIAL_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSEMATERIAL_GET_MULTIPLE:
            localStorage.setItem('coursematerial', JSON.stringify(action.payload));
            return {
                ...state,
                coursematerials : action.payload,
                msg:'DONE!!!'
            };
        case COURSEMATERIAL_GET_ONE:
            let all = [...state.coursematerials];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                coursematerial : ses,
                MSG:"DONE!!!"
            };
        case COURSEMATERIAL_REGISTER_SUCCESS:
            localStorage.setItem('coursematerial', JSON.stringify([...state.coursematerials, action.payload]));
            return {
                ...state,
                coursematerials: [...state.coursematerials, action.payload],
                msg:action.msg
            }; 
        case COURSEMATERIAL_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursematerials, action.payload);
            localStorage.setItem('coursematerial', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursematerials: ac
            }
        case COURSEMATERIAL_DELETE_SUCCESS:
            let rem = state.coursematerials.filter(cat => cat.id != action.payload);
            localStorage.setItem('coursematerial', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursematerials: rem
            }
        case COURSEMATERIAL_UPDATE_SUCCESS:
            const findInd = state.coursematerials.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.coursematerials];
            newState[findInd] = action.payload;
            localStorage.setItem('coursematerial', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursematerials : newState,
                coursematerial:action.payload
            }; 
        case COURSEMATERIAL_LOADING_ERROR:
        case COURSEMATERIAL_ACTIVATE_FAIL:
        case COURSEMATERIAL_REGISTER_FAIL:
        case COURSEMATERIAL_DELETE_FAIL:
        case COURSEMATERIAL_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}