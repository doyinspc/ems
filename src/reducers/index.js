import { combineReducers } from 'redux';
import ca from "./setting/ca";
import catype from "./setting/catype";
import caunit from "./setting/caunit";
import clasz from "./setting/clasz";
import claszunit from "./setting/claszunit";
import department from "./setting/department";
import session from "./setting/session";
import staff from "./staff/staff";
import staffclass from "./staff/staffclass";
import staffsubject from "./staff/staffsubject";
import student from "./student/student";
import studentclass from "./student/studentclass";
import subject from "./setting/subject";
import theme from "./setting/theme";
import term from "./setting/term";
import school from "./setting/school";
import page from "./setting/page";

export default combineReducers({
    caReducer: ca,
    catypeReducer: catype,
    caunitReducer: caunit,
    claszReducer: clasz,
    claszunitReducer: claszunit,
    departmentReducer: department,
    sessionReducer: session,
    termReducer: term,
    staffReducer: staff,
    staffclassReducer: staffclass,
    staffsubjectReducer: staffsubject,
    studentReducer: student,
    studentclassReducer:studentclass,
    subjectReducer: subject,
    themeReducer: theme,
    schoolReducer: school,
    page: page,
   
});