import { callReg, callSuccess } from "../../actions/common";
import {
    THEME_GET_MULTIPLE,
    THEME_GET_DROPDOWNS,
    THEME_GET_SUMMARY,
    THEME_GET_ONE,
    THEME_REGISTER_SUCCESS,
    THEME_REGISTER_FAIL,
    THEME_LOADING,
    THEME_LOADING_ERROR,
    THEME_ACTIVATE_FAIL,
    THEME_ACTIVATE_SUCCESS,
    THEME_UPDATE_SUCCESS,
    THEME_UPDATE_FAIL,
    THEME_DELETE_SUCCESS,
    THEME_DELETE_FAIL,
    THEME_EDIT
} from "./../../types/setting/theme";

let themeStore = JSON.parse(localStorage.getItem('theme'))
let dropdownsStore = JSON.parse(localStorage.getItem('dropdowns'))
const initialState = {
    isLoading: false,
    themes: themeStore ? themeStore : [],
    theme:{'id':1, 'name':'MESL Staff Secondary Theme'},
    dropdowns: dropdownsStore ? dropdownsStore : [],
    msg: null,
    isEdit:-1,
    ref:null,
    themesummary: []
}

const changeState = (aluu, actid) =>
{
    let newTheme = [...aluu];
    newTheme.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTheme;
}


export default function(state = initialState, action){
    switch (action.type) {
        case THEME_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case THEME_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case THEME_GET_MULTIPLE:
            localStorage.setItem('theme', JSON.stringify(action.payload));
            return {
                ...state,
                themes : action.payload,
                msg:'DONE!!!'
            };
        case THEME_GET_SUMMARY:
            return {
                ...state,
                themesummary : action.payload
            };
         case THEME_GET_DROPDOWNS:
            localStorage.setItem('dropdowns', JSON.stringify(action.payload));
            return {
                ...state,
                dropdowns : action.payload
            };
        case THEME_GET_ONE:
            let all = [...state.themes];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                theme : ses,
                MSG:"DONE!!!"
            };
        case THEME_REGISTER_SUCCESS:
            localStorage.setItem('theme', JSON.stringify([...state.themes, action.payload]));
            callReg()
            return {
                ...state,
                themes: [...state.themes, action.payload],
                msg:action.msg
            }; 
        case THEME_ACTIVATE_SUCCESS:
            let ac = changeState(state.themes, action.payload);
            localStorage.setItem('theme', JSON.stringify(ac));
            callSuccess()
            return{
                ...state,
                msg:'DONE!!!',
                themes: ac
            }
        case THEME_DELETE_SUCCESS:
            let rem = state.themes.filter(cat => cat.id != action.payload);
            localStorage.setItem('theme', JSON.stringify(rem));
            callSuccess()
            return{
                ...state,
                msg:'DONE!!!',
                themes: rem
            }
        case THEME_UPDATE_SUCCESS:
            const findInd = state.themes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.themes];
            newState[findInd] = action.payload;
            localStorage.setItem('theme', JSON.stringify(newState));
            callSuccess()
            return {
                ...state,
                ...action.payload,
                themes : newState,
                theme:action.payload
            }; 
        case THEME_LOADING_ERROR:
        case THEME_ACTIVATE_FAIL:
        case THEME_REGISTER_FAIL:
        case THEME_DELETE_FAIL:
        case THEME_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}