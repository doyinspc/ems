import { combineReducers } from 'redux';
import ca from "./setting/ca";
import catype from "./setting/catype";
import caunit from "./setting/caunit";
import clasz from "./setting/clasz";
import claszunit from "./setting/claszunit";
import comment from "./setting/comment";
import grade from "./setting/grade";
import gradeunit from "./setting/gradeunit";
import expense from "./setting/expense";
import expenseunit from "./setting/expenseunit";
import expensetransaction from "./setting/expensetransaction";
import inventory from "./setting/inventory";
import inventoryunit from "./setting/inventoryunit";
import inventorytransaction from "./setting/inventorytransaction";
import maintenance from "./setting/maintenance";
import maintenanceunit from "./setting/maintenanceunit";
import maintenancetransaction from "./setting/maintenancetransaction";
import department from "./setting/department";
import cbt from "./setting/cbt";
import cbtexam from "./setting/cbtexam";
import unit from "./setting/unit";
import notice from "./setting/notice";
import account from "./setting/account";
import assessment from "./setting/assessment";
import fee from "./setting/fee";
import level from "./setting/level";
import timetable from "./setting/timetable";
import session from "./setting/session";
import staff from "./staff/staff";
import classfee from "./setting/classfee";
import classstaff from "./setting/classstaff";
import staffclass from "./staff/staffclass";
import staffsubject from "./staff/staffsubject";
import staffstudent from "./staff/staffstudent";
import staffsubjectreport from "./staff/staffsubjectreport";
import staffclassreport from "./staff/staffclassreport";
import staffleave from "./staff/staffleave";
import staffreport from "./staff/staffreport";
import staffjob from "./staff/staffjob";
import stafflog from "./staff/stafflog";
import staffaccess from "./staff/staffaccess";
import staffeducation from "./staff/staffeducation";
import staffexperience from "./staff/staffexperience";
import staffprofessional from "./staff/staffprofessional";
import stafflessonplan from "./staff/stafflessonplan";
import student from "./student/student";
import studentclass from "./student/studentclass";
import studentcomment from "./student/studentcomment";
import studentfee from "./student/studentfee";
import studentscore from "./student/studentscore";
import studentsubject from "./student/studentsubject";
import studentattendance from "./student/studentattendance";
import staffattendance from "./staff/staffattendance";
import coursematerial from "./setting/coursematerial";
import subject from "./setting/subject";
import theme from "./setting/theme";
import term from "./setting/term";
import school from "./setting/school";
import admission from "./setting/admission";
import admissionform from "./setting/admission";
import guardian from "./setting/guardian";
import office from "./setting/office";
import report from "./setting/report";
import designation from "./setting/designation";
import job from "./setting/job";
import lessonplan from "./setting/lessonplan";
import week from "./setting/week";
import penmanager from "./setting/penmanager";
import page from "./setting/page";
import user from "./user";

export default combineReducers({
    caReducer: ca,
    catypeReducer: catype,
    caunitReducer: caunit,
    claszReducer: clasz,
    claszunitReducer: claszunit,
    cbtReducer: cbt,
    cbtexamReducer: cbtexam,
    gradeReducer: grade,
    gradeunitReducer: gradeunit,
    expenseReducer: expense,
    expenseunitReducer: expenseunit,
    expensetransactionReducer: expensetransaction,
    inventoryReducer: inventory,
    inventoryunitReducer: inventoryunit,
    inventorytransactionReducer: inventorytransaction,
    maintenanceReducer: maintenance,
    maintenanceunitReducer: maintenanceunit,
    maintenancetransactionReducer: maintenancetransaction,
    departmentReducer: department,
    unitReducer: unit,
    noticeReducer: notice,
    accountReducer: account,
    assessmentReducer: assessment,
    feeReducer: fee,
    timetableReducer: timetable,
    levelReducer: level,
    sessionReducer: session,
    termReducer: term,
    classfeeReducer: classfee,
    classstaffReducer: classstaff,
    staffReducer: staff,
    staffclassReducer: staffclass,
    staffstudentReducer: staffstudent,
    staffclassreportReducer: staffclassreport,
    staffsubjectreportReducer: staffsubjectreport,
    staffleaveReducer: staffleave,
    staffreportReducer: staffreport,
    stafflogReducer: stafflog,
    staffjobReducer: staffjob,
    staffaccessReducer: staffaccess,
    stafflessonplanReducer: stafflessonplan,
    staffsubjectReducer: staffsubject,
    staffeducationReducer: staffeducation,
    staffexperienceReducer: staffexperience,
    staffprofessionalReducer: staffprofessional,
    studentReducer: student,
    studentclassReducer:studentclass,
    studentcommentReducer:studentcomment,
    studentfeeReducer:studentfee,
    studentscoreReducer:studentscore,
    studentsubjectReducer:studentsubject,
    studentattendanceReducer:studentattendance,
    staffattendanceReducer:staffattendance,
    subjectReducer: subject,
    themeReducer: theme,
    schoolReducer: school,
    admissionReducer: admission,
    admissionformReducer: admissionform,
    guardianReducer: guardian,
    officeReducer: office,
    reportReducer: report,
    penmanagerReducer: penmanager,
    designationReducer: designation,
    jobReducer: job,
    lessonplanReducer: lessonplan,
    commentReducer: comment,
    coursematerialReducer: coursematerial,
    weekReducer: week,
    page: page,
    userReducer: user,
   
});