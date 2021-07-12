import {
    STUDENTSCORE_GET_MULTIPLE,
    STUDENTSCORE_GET_MULTIPLE_CA,
    STUDENTSCORE_DELETE_CA,
    STUDENTSCORE_GET_SUMMARY,
    STUDENTSCORE_GET_SINGLE,
    STUDENTSCORE_GET_ONE,
    STUDENTSCORE_REGISTER_SUCCESS,
    STUDENTSCORE_REGISTER_FAIL,
    STUDENTSCORE_REGISTER_CA,
    STUDENTSCORE_REGISTER_CA_FAIL,
    STUDENTSCORE_LOADING,
    STUDENTSCORE_LOADING_ERROR,
    STUDENTSCORE_ACTIVATE_FAIL,
    STUDENTSCORE_ACTIVATE_SUCCESS,
    STUDENTSCORE_UPDATE_SUCCESS,
    STUDENTSCORE_UPDATE_FAIL,
    STUDENTSCORE_DELETE_SUCCESS,
    STUDENTSCORE_DELETE_FAIL,
    STUDENTSCORE_EDIT,
    STUDENTSCORE_SET_SUCCESS,
    STUDENTSCORE_SET_FAIL,
    STUDENTSCORE_SET_LOAD
} from "./../../types/student/studentscore";

let studentscoreStore = JSON.parse(localStorage.getItem('studentscore'))

const initialState = {
    isLoading: false,
    studentscores: [],
    studentsinglescores:[],
    studentscore:{},
    studentscoresummary:{},
    studentscoresummarys:[],
    studentscoreca : [],
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudentscore = [...aluu];
    newStudentscore.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudentscore;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENTSCORE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENTSCORE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENTSCORE_GET_MULTIPLE:
            return {
                ...state,
                studentscores : action.payload,
                isLoading : false,
                msg:'DONE!!!'
            };
        case STUDENTSCORE_GET_MULTIPLE_CA:
            return {
                ...state,
                studentscoreca : action.payload
            };
         case STUDENTSCORE_GET_SUMMARY:
            return {
                ...state,
                studentscoresummary : action.payload,
                studentscoresummarys : action.payload
            };
        case STUDENTSCORE_GET_SINGLE:
            return {
                ...state,
                studentsinglescores : action.payload
            };
        case STUDENTSCORE_GET_ONE:
            let all = [...state.studentscores];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                studentscore : ses,
                MSG:"DONE!!!"
            };
        case STUDENTSCORE_DELETE_CA:
            let allz = [...state.studentscoreca];
            let stz = action.payload.data.length > 0 ? action.payload.data.split() : [];
            let sesz = allz.filter(row=>parseInt(row.termid) === parseInt(action.payload.reportid) && parseInt(row.itemid) === parseInt(action.payload.subjectid) && stz.includes(row.itemid));
            return {
                ...state,
                studentscoreca : sesz
            };
        case STUDENTSCORE_REGISTER_SUCCESS:
            localStorage.setItem('studentscore', JSON.stringify([...state.studentscores, action.payload]));
            return {
                ...state,
                studentscores: [...state.studentscores, action.payload],
                msg:action.msg
            };
        case STUDENTSCORE_REGISTER_CA:
            let d = [...state.studentscoreca];
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
           return {
                ...state,
                studentscoreca:d
            };  
        case STUDENTSCORE_SET_SUCCESS:
            let dx = [...state.studentscores];
            let d1x = action.payload;
            d1x.forEach(ele=>{
                let r = dx.findIndex(rw=>parseInt(rw.id) === parseInt(ele.id))
                if(r > -1)
                {
                    dx[r] = ele;
                }else{
                    dx = [...d, ele];
                }
            })
            
            return {
                ...state,
                studentscores: dx,
                msg:action.msg
            }; 
        case STUDENTSCORE_ACTIVATE_SUCCESS:
            let ac = changeState(state.studentscores, action.payload);
            return{
                ...state,
                msg:'DONE!!!',
                studentscores: ac
            }
        case STUDENTSCORE_DELETE_SUCCESS:
            let rem = state.studentscores.filter(cat =>parseInt(cat.id) !== parseInt(action.payload));
            //localStorage.setItem('studentscore', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                studentscores: rem
            }
        case STUDENTSCORE_UPDATE_SUCCESS:
            const findInd = state.studentscores.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.studentscores];
            newState[findInd] = action.payload;
            //localStorage.setItem('studentscore', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                studentscores : newState,
                studentscore:action.payload
            }; 
        case STUDENTSCORE_LOADING_ERROR:
        case STUDENTSCORE_ACTIVATE_FAIL:
        case STUDENTSCORE_REGISTER_FAIL:
        case STUDENTSCORE_REGISTER_CA_FAIL:
        case STUDENTSCORE_DELETE_FAIL:
        case STUDENTSCORE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}