import {
    NOTICE_GET_MULTIPLE,
    NOTICE_GET_ONE,
    NOTICE_REGISTER_SUCCESS,
    NOTICE_REGISTER_FAIL,
    NOTICE_LOADING,
    NOTICE_LOADING_ERROR,
    NOTICE_ACTIVATE_FAIL,
    NOTICE_ACTIVATE_SUCCESS,
    NOTICE_UPDATE_SUCCESS,
    NOTICE_UPDATE_FAIL,
    NOTICE_DELETE_SUCCESS,
    NOTICE_DELETE_FAIL,
    NOTICE_EDIT
} from "./../../types/setting/notice";

let noticeStore = JSON.parse(localStorage.getItem('notice'))

const initialState = {
    isLoading: false,
    notices: noticeStore ? noticeStore : [],
    notice:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newNotice = [...aluu];
    newNotice.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newNotice;
}
export default function(state = initialState, action){
    switch (action.type) {
        case NOTICE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case NOTICE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case NOTICE_GET_MULTIPLE:
            localStorage.setItem('notice', JSON.stringify(action.payload));
            return {
                ...state,
                notices : action.payload,
                msg:'DONE!!!'
            };
        case NOTICE_GET_ONE:
            let all = [...state.notices];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                notice : ses,
                MSG:"DONE!!!"
            };
        case NOTICE_REGISTER_SUCCESS:
            localStorage.setItem('notice', JSON.stringify([...state.notices, action.payload]));
            return {
                ...state,
                notices: [...state.notices, action.payload],
                msg:action.msg
            }; 
        case NOTICE_ACTIVATE_SUCCESS:
            let ac = changeState(state.notices, action.payload);
            localStorage.setItem('notice', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                notices: ac
            }
        case NOTICE_DELETE_SUCCESS:
            let rem = state.notices.filter(cat => cat.id != action.payload);
            localStorage.setItem('notice', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                notices: rem
            }
        case NOTICE_UPDATE_SUCCESS:
            const findInd = state.notices.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.notices];
            newState[findInd] = action.payload;
            localStorage.setItem('notice', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                notices : newState,
                notice:action.payload
            }; 
        case NOTICE_LOADING_ERROR:
        case NOTICE_ACTIVATE_FAIL:
        case NOTICE_REGISTER_FAIL:
        case NOTICE_DELETE_FAIL:
        case NOTICE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}