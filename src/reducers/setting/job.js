import {
    JOB_GET_MULTIPLE,
    JOB_GET_ONE,
    JOB_REGISTER_SUCCESS,
    JOB_REGISTER_FAIL,
    JOB_LOADING,
    JOB_LOADING_ERROR,
    JOB_ACTIVATE_FAIL,
    JOB_ACTIVATE_SUCCESS,
    JOB_UPDATE_SUCCESS,
    JOB_UPDATE_FAIL,
    JOB_DELETE_SUCCESS,
    JOB_DELETE_FAIL,
    JOB_EDIT
} from "./../../types/setting/job";

let jobStore = JSON.parse(localStorage.getItem('job'))

const initialState = {
    isLoading: false,
    jobs: jobStore ? jobStore : [],
    job:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newJob = [...aluu];
    newJob.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newJob;
}


export default function(state = initialState, action){
    switch (action.type) {
        case JOB_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case JOB_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case JOB_GET_MULTIPLE:
            localStorage.setItem('job', JSON.stringify(action.payload));
            return {
                ...state,
                jobs : action.payload,
                msg:'DONE!!!'
            };
        case JOB_GET_ONE:
            let all = [...state.jobs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                job : ses,
                MSG:"DONE!!!"
            };
        case JOB_REGISTER_SUCCESS:
            localStorage.setItem('job', JSON.stringify([...state.jobs, action.payload]));
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
                msg:action.msg
            }; 
        case JOB_ACTIVATE_SUCCESS:
            let ac = changeState(state.jobs, action.payload);
            localStorage.setItem('job', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                jobs: ac
            }
        case JOB_DELETE_SUCCESS:
            let rem = state.jobs.filter(cat => cat.id != action.payload);
            localStorage.setItem('job', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                jobs: rem
            }
        case JOB_UPDATE_SUCCESS:
            const findInd = state.jobs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.jobs];
            newState[findInd] = action.payload;
            localStorage.setItem('job', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                jobs : newState,
                job:action.payload
            }; 
        case JOB_LOADING_ERROR:
        case JOB_ACTIVATE_FAIL:
        case JOB_REGISTER_FAIL:
        case JOB_DELETE_FAIL:
        case JOB_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}