import {
    COMMENT_GET_MULTIPLE,
    COMMENT_GET_ONE,
    COMMENT_REGISTER_SUCCESS,
    COMMENT_REGISTER_FAIL,
    COMMENT_LOADING,
    COMMENT_LOADING_ERROR,
    COMMENT_ACTIVATE_FAIL,
    COMMENT_ACTIVATE_SUCCESS,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_EDIT
} from "./../../types/setting/comment";

let commentStore = JSON.parse(localStorage.getItem('comment'))

const initialState = {
    isLoading: false,
    comments: [],
    comment:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newComment = [...aluu];
    newComment.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newComment;
}
export default function(state = initialState, action){
    switch (action.type) {
        case COMMENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COMMENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COMMENT_GET_MULTIPLE:
            
            let allz = [...state.comments];
            let sl = action.payload;
            sl.forEach(element => {
                let findIndx = allz.findIndex(cat => parseInt(cat.id) === parseInt(element.id));
                if(findIndx > 0)
                {
                    allz[findIndx] = element;
                }else
                {
                    allz.push(element)
                }
                
            });
           
            return {
                ...state,
                comments : allz,
                msg:'DONE!!!'
            };
        case COMMENT_GET_ONE:
            let all = [...state.comments];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                comment : ses,
                MSG:"DONE!!!"
            };
        case COMMENT_REGISTER_SUCCESS:
            localStorage.setItem('comment', JSON.stringify([...state.comments, action.payload]));
            return {
                ...state,
                comments: [...state.comments, action.payload],
                msg:action.msg
            }; 
        case COMMENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.comments, action.payload);
            localStorage.setItem('comment', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                comments: ac
            }
        case COMMENT_DELETE_SUCCESS:
            let rem = state.comments.filter(cat => cat.id != action.payload);
            localStorage.setItem('comment', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                comments: rem
            }
        case COMMENT_UPDATE_SUCCESS:
            const findInd = state.comments.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.comments];
            newState[findInd] = action.payload;
            localStorage.setItem('comment', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                comments : newState,
                comment:action.payload
            }; 
        case COMMENT_LOADING_ERROR:
        case COMMENT_ACTIVATE_FAIL:
        case COMMENT_REGISTER_FAIL:
        case COMMENT_DELETE_FAIL:
        case COMMENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}