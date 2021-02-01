import {
    STUDENTFEE_GET_MULTIPLE,
    STUDENTFEE_GET_SINGLE,
    STUDENTFEE_GET_ONE,
    STUDENTFEE_REGISTER_SUCCESS,
    STUDENTFEE_REGISTER_FAIL,
    STUDENTFEE_LOADING,
    STUDENTFEE_LOADING_ERROR,
    STUDENTFEE_ACTIVATE_FAIL,
    STUDENTFEE_ACTIVATE_SUCCESS,
    STUDENTFEE_UPDATE_SUCCESS,
    STUDENTFEE_UPDATE_FAIL,
    STUDENTFEE_DELETE_SUCCESS,
    STUDENTFEE_DELETE_FAIL,
    STUDENTFEE_EDIT,
    STUDENTFEE_SET_SUCCESS,
    STUDENTFEE_SET_FAIL,
    STUDENTFEE_SET_LOAD
} from "./../../types/student/studentfee";

let studentfeeStore = JSON.parse(localStorage.getItem('studentfee'))

const initialState = {
    isLoading: false,
    studentfees: studentfeeStore ? studentfeeStore : [],
    studentsinglefees:[],
    studentfee:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentfee = [...aluu];
    newStudentfee.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentfee;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTFEE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTFEE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTFEE_GET_MULTIPLE:
            localStorage.setItem('studentfee', JSON.stringify(action.payload));
            return {
                ...state,
                studentfees : action.payload,
                msg:'DONE!!!'
            };
        case STUDENTFEE_GET_SINGLE:
            return {
                ...state,
                studentsinglefees : action.payload
            };
        case STUDENTFEE_GET_ONE:
            let all = [...state.studentfees];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                studentfee : ses,
                MSG:"DONE!!!"
            };
        case STUDENTFEE_REGISTER_SUCCESS:
            localStorage.setItem('studentfee', JSON.stringify([...state.studentfees, action.payload]));
            return {
                ...state,
                studentfees: [...state.studentfees, action.payload],
                msg:action.msg
            }; 
        case STUDENTFEE_SET_SUCCESS:
            let d = [...state.studentfees];
            let d1 = action.payload;
            d1.forEach(ele=>{
                let r = d.findIndex(rw=>parseInt(rw.id) === parseInt(ele.id))
                if(r > -1)
                {
                    d[r] = ele;
                }else{
                    d = [...d, ele];
                }
            })
            localStorage.setItem('studentfee', JSON.stringify(d));
            return {
                ...state,
                studentfees: d,
                msg:action.msg
            }; 
        case STUDENTFEE_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentfees, action.payload);
            localStorage.setItem('studentfee', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                studentfees: ac
            }
        case STUDENTFEE_DELETE_SUCCESS:
            let rem = state.studentfees.filter(cat => cat.id != action.payload);
            localStorage.setItem('studentfee', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                studentfees: rem
            }
        case STUDENTFEE_UPDATE_SUCCESS:
            const findInd = state.studentfees.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentfees];
            newState[findInd] = action.payload;
            localStorage.setItem('studentfee', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                studentfees : newState,
                studentfee:action.payload
            }; 
        case STUDENTFEE_LOADING_ERROR:
        case STUDENTFEE_ACTIVATE_FAIL:
        case STUDENTFEE_REGISTER_FAIL:
        case STUDENTFEE_DELETE_FAIL:
        case STUDENTFEE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}