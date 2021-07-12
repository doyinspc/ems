import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {getLessonplan, getLessonplans } from './../../../actions/setting/lessonplan'
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CContainer, CHeader, CInput, CLink, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs, CTooltip } from '@coreui/react'
import { getSubjects } from './../../../actions/setting/subject'
import { getStudentcomments } from './../../../actions/student/studentcomment'
import CIcon from '@coreui/icons-react'
import List from './List'
import Report from './Report'
import Rank from './Rank'
import Fee from './Fee'


import {getReports} from './../../../actions/setting/report';
import {getCas} from './../../../actions/setting/ca';
import {getClaszunits} from './../../../actions/setting/claszunit';
import {getGradeunits} from './../../../actions/setting/gradeunit';
import {getStudentscores} from './../../../actions/student/studentscore';

const Lessonplan = (props) => {

    const [data, setdata] = useState({})
    const [fdata, setfdata] = useState({})
    const [categoryid, setcategoryid] = useState('')
    const [search, setsearch] = useState('')
    const [titles, settitles] = useState('')
    const [classarray, setclassarray] = useState([])
    const [reportarray, setreportarray] = useState({})
    const [subjectarray, setsubjectarray] = useState(0)
    const [fontz, setfontz] = useState(14)
    const [removesubject, setremovesubject] = useState(null)

    const sessionid = props.user.activeterm.sessionid
    const termid = props.user.activeterm.termid    

    useEffect(() => {
        //GET ALL REPORT FOR THIS SESSION
        //SO AS TO GENERATE DROPDOWNLIST
        let params = {
            data:JSON.stringify(
            {
                  'sessionid':sessionid
              }),
              cat:'selected',
              table:'reports',
              narration:'get reports'
            }
          props.getReports(params);
    }, [sessionid])

    let dtx = props.dropdowns && Array.isArray(props.dropdowns) && props.dropdowns.length > 0  && props.dropdowns.hasOwnProperty('1') ? props.dropdowns[1] : null;
    let classdata = [];
    if(dtx.length > 0)
      {
        
         dtx.forEach(element => {
            let arr = {}
            arr['value'] = element.id+"::::"+element.name
            arr['label'] = element.name !== undefined ? element.name.toUpperCase() :'Error;'
            classdata.push(arr)
        })
        
    }    

    let reportdata = [];
    if(Array.isArray(props.reports)){ props.reports.forEach(element => {
        let arr = {}
        arr['value'] = element.id
        arr['label'] = element.title !== undefined ? element.title.toUpperCase() :'Error;'
        reportdata.push(arr)
    });}
    const summ = (sumz)=>{
        if(sumz !== undefined)
        {
            let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return parseFloat(sums)
        }
    }
    const handleClassArray = (event) =>{
        setclassarray(event)
    }
    const handleReportArray = (event) =>{
        setreportarray(event)
    }
    const handleSubjectArray = (event) =>{
        setsubjectarray(event)
    }
    // const removeSubject = (subjectid, studentids) =>{
    //     settitles(title)
    //     let repid = reportarray.hasOwnProperty('value') ? reportarray.value :''
    //     if(parseInt(repid) > 0 && parseInt(subjectid) > 0){
    //     //GET ALL REPORT FOR THE STUDENTS
    //     let reportarrays = props.reports && Array.isArray(props.reports) ? props.reports : [];
    //     let casss = reportarrays.filter(rw=>rw !== null && parseInt(rw.id) === parseInt(repid));
    //     let cass = Array.isArray(casss) && casss.length > 0 ? casss[0].ca : '';
    //     let cas = cass.length > 0 ? cass : '';
    //     let terms = Array.isArray(casss) && casss.length > 0 ? casss[0].termid : '';
    //     let sessions = Array.isArray(casss) && casss.length > 0 ? casss[0].sessionid : '';
    //     let grd = Array.isArray(casss) && casss.length > 0 ? casss[0].grade : '';
    //     let claszstring = classids.join(",")
        
        
    //         let params = {
    //         data:JSON.stringify(
    //         {
    //               'sessionid':sessions,
    //               'reportid':repid,
    //               'subjectid':subjectid,
    //               'subjectid':studentids,
    //               'termid':terms,
    //               'ids':'',
    //               'clasz':claszstring,
    //               'claszparent':'',
    //               'cas' : cas,
    //               'gradeid' : grd

    //           }),
    //           cat:'removereportmain',
    //           table:'studentscore',
    //           narration:'get reports'
    //         }
    //         props.getStudentscores(params);
    //     }
    // }

    const loadData = () =>{
        let classids = [];
        let title = [];
        classarray.forEach(element => {
            let item = element.value.split("::::");
            let title_str = item[1];
            title.push(title_str);
            classids.push(item[0]);
        });
    
        
        settitles(title)
        let repid = reportarray.hasOwnProperty('value') ? reportarray.value :''
        if(parseInt(repid) > 0){
        //GET ALL REPORT FOR THE STUDENTS
        let reportarrays = props.reports && Array.isArray(props.reports) ? props.reports : [];
        let casss = reportarrays.filter(rw=>rw !== null && parseInt(rw.id) === parseInt(repid));
        let cass = Array.isArray(casss) && casss.length > 0 ? casss[0].ca : '';
        let cas = cass.length > 0 ? cass : '';
        let terms = Array.isArray(casss) && casss.length > 0 ? casss[0].termid : '';
        let sessions = Array.isArray(casss) && casss.length > 0 ? casss[0].sessionid : '';
        let grd = Array.isArray(casss) && casss.length > 0 ? casss[0].grade : '';
        let claszstring = classids.join(",")
        
        
            let params = {
            data:JSON.stringify(
            {
                  'sessionid':sessions,
                  'reportid':repid,
                  'termid':terms,
                  'ids':'',
                  'clasz':claszstring,
                  'claszparent':'',
                  'cas' : cas,
                  'gradeid' : grd

              }),
              cat:'selectreportmain',
              table:'studentscore',
              narration:'get reports'
            }
            props.getStudentscores(params);


            let params1 = {
                data:JSON.stringify(
                {
                    'cas' : cas,
                    'schoolid' : props.user.activeschool.id
                }),
                cat:'dropdownca2',
                table:'dropdownca',
                narration:'get cas'
            }
            props.getCas(params1);
            let params2 = {
                data:JSON.stringify(
                {
                    'gradeid' : grd,
                    'is_active':0
                }),
                cat:'selected',
                table:'gradeunitsin',
                narration:'get cas'
            }
            props.getGradeunits(params2);

            let params3 = {
                data:JSON.stringify(
                {
                    'sessionid':sessions,
                    'reportid':repid,
                    'termid':terms,
                    'clasz':claszstring
                }),
                cat:'selectreportmaincomment',
                table:'studentscomments',
                narration:'studentcomments'
            }
            props.getStudentcomments(params3);
        }
    }
    const avgs = (sumz)=>{
        if(sumz !== undefined && Array.isArray(sumz) && sumz.length > 0)
        {
            let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return Number(sums/sumz.length).toFixed(1)
        }
    }
    
    var dt = props.studentscores.studentscores !== undefined && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores[0] : {};
    var ct = props.studentscores.studentscores !== undefined && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores[1] : {};
    var gt = props.studentscores.studentscores !== undefined && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores[2] : {};
    var ft = props.studentscores.studentscores !== undefined && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores[4] : [];
    var pt = props.studentscores.studentscores !== undefined && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores[3] : [];
 
    let dt_arr = {};
    let ct_arr = {};
    let gt_arr = {};
    let dt_arr_sum = {};
    let dt_subject = {};
    let dt_ca = {};
    let ct_ca = {};
    let dt_student = {};
    let subject_totals = {}
    let student_totals = {}
    let subject_stud_totals = {}
    var rankstudentsubject = {}
    //SORT ACADEMIC RESULTS
    if(Array.isArray(dt))
    {
        dt.forEach(ele => {
            if(Object.keys(dt_arr).includes(ele.studentid))
            {
                if(Object.keys(dt_arr[ele.studentid]).includes(ele.subjectid)){
                    if(Object.keys(dt_arr[ele.studentid][ele.subjectid]).includes(ele.caid)){
                        //dt_arr[ele.itemid][ele.classid].push(ele.score);
                    }else{
                        dt_arr[ele.studentid][ele.subjectid][ele.caid] = ele.score ;       
                        dt_arr_sum[ele.studentid][ele.subjectid].push(parseFloat(ele.score));
                    }
                }else{
                    dt_arr[ele.studentid][ele.subjectid] = {};
                    dt_arr[ele.studentid][ele.subjectid][ele.caid] = ele.score;
                    dt_arr_sum[ele.studentid][ele.subjectid] = []
                    dt_arr_sum[ele.studentid][ele.subjectid].push(parseFloat(ele.score)) ;
                }
            }else{
                dt_arr[ele.studentid] = {};
                dt_arr[ele.studentid][ele.subjectid] = {};
                dt_arr[ele.studentid][ele.subjectid][ele.caid] = ele.score ;

                dt_arr_sum[ele.studentid] = {};
                dt_arr_sum[ele.studentid][ele.subjectid] = []
                dt_arr_sum[ele.studentid][ele.subjectid].push(parseFloat(ele.score)) ;
   
            }
            if(parseInt(ele.caid) > 0){dt_ca[ele.caid] = ele.caname;}
            if(parseInt(ele.studentid) > 0 && ele.studentname !== undefined)
            {
                let cl  = ele.claszname.split(":::");
                let sl = ele.studentname.split(":::");
                dt_student[ele.studentid] = [...sl, ...cl]
            }
            
            dt_subject[ele.subjectid] = ele.subjectname;
            
        });

        Object.keys(dt_arr_sum).forEach(ele => {
            if(Object.keys(student_totals).includes(ele))
            {
                Object.keys(dt_arr_sum[ele]).forEach(ele1=>{
                    //student_totals[ele].push(summ(dt_arr_sum[ele][ele1]))
                    if(subject_totals.hasOwnProperty(ele1))
                    {
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        if(subject_stud_totals[ele1].hasOwnProperty(ele)){
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        else{
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }      
                    }
                    else
                    {
                        subject_totals[ele1] = []
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        subject_stud_totals[ele1] = {}
                        subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                    }
                })
            }else{
                student_totals[ele] = []
                Object.keys(dt_arr_sum[ele]).forEach(ele1=>{
                    
                    if(subject_totals.hasOwnProperty(ele1))
                    {
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        if(subject_stud_totals[ele1].hasOwnProperty(ele)){
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        else{
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        
                    }
                    else
                    {
                        student_totals[ele].push(summ(dt_arr_sum[ele][ele1]))
                        subject_totals[ele1] = []
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        subject_stud_totals[ele1] = {}
                        subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                    }
                })
            } 
        });

    }
    //SORT BEHAVIOR AND SKILL RESULTS
    if(Array.isArray(ct))
    {
        ct.forEach(ele => {
            if(Object.keys(ct_arr).includes(ele.studentid))
            {
                if(Object.keys(ct_arr[ele.studentid]).includes(ele.caid)){
    
                }else{
                    ct_arr[ele.studentid][ele.caid] = ele.score;
                }
            }else{
                ct_arr[ele.studentid] = {};
                ct_arr[ele.studentid][ele.caid] = ele.score;
            }

            if(parseInt(ele.caid) > 0){ct_ca[ele.caid] = [ele.caunitname, ele.caunitscore, ele.typeid ];}
            
        });

       
        Object.keys(dt_arr_sum).forEach(ele => {
            if(Object.keys(student_totals).includes(ele))
            {
                Object.keys(dt_arr_sum[ele]).forEach(ele1=>{
                    student_totals[ele].push(summ(dt_arr_sum[ele][ele1]))
                    if(subject_totals.hasOwnProperty(ele1))
                    {
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        if(subject_stud_totals[ele1].hasOwnProperty(ele)){
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        else{
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }      
                    }
                    else
                    {
                        subject_totals[ele1] = []
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        subject_stud_totals[ele1] = {}
                        subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                    }
                })
            }else{
                student_totals[ele] = []
                Object.keys(dt_arr_sum[ele]).forEach(ele1=>{
                    student_totals[ele].push(summ(dt_arr_sum[ele][ele1]))
                    if(subject_totals.hasOwnProperty(ele1))
                    {
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        if(subject_stud_totals[ele1].hasOwnProperty(ele)){
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        else{
                            subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                        }
                        
                    }
                    else
                    {
                        subject_totals[ele1] = []
                        subject_totals[ele1].push(summ(dt_arr_sum[ele][ele1]))
                        subject_stud_totals[ele1] = {}
                        subject_stud_totals[ele1][ele] = summ(dt_arr_sum[ele][ele1])
                    }
                })
            } 
        });

    }
    //SORT GRADING
    if(Array.isArray(gt))
    {
        gt.forEach(ele => {
            let classarray = ele.claszid !== undefined && ele.claszid.length > 0 ? JSON.parse(ele.claszid) : []
            //let classarray = classids !== undefined && classids.length > 0 ? classids.split() : [];
            classarray.forEach(claszid=>{
                if(gt_arr.hasOwnProperty(claszid.value)){
                    gt_arr[claszid.value].push(ele);
                }else{
                    gt_arr[claszid.value] = []
                    gt_arr[claszid.value].push(ele);
                }
            })       
        });
    }
    //CREATE A FUNCTION TO REARRAGE OBJECTS IN ARRAY
    //STUDENT ID AS KEY
    let converted_object_arr = []
    Object.keys(subject_stud_totals).forEach(rw=>{
        Object.keys(subject_stud_totals[rw]).forEach(rw1=>{
            let arr = {}
            arr.studentid = rw1
            arr.subjectid = rw
            arr.score = subject_stud_totals[rw][rw1]
            converted_object_arr.push(arr)
        })
    })
    //RANK STUDENT BY SUBJECTS
    Object.keys(dt_subject).forEach(rw=>{
        let data = converted_object_arr.filter(r=>parseInt(r.subjectid) === parseInt(rw));
        data.sort(function(a,b){ return b.score - a.score; });

        data.forEach(function(player, i, arr) {
        player.rank = i === 0 || player.score != arr[i-1].score
                   ? i + 1
                   : arr[i-1].rank;
        });
        rankstudentsubject[rw] = data
    })
    let subjectdata = [];
    if(Array.isArray(Object.keys(dt_subject))){ Object.keys(dt_subject).forEach(element => {
        let arr = {}
        arr['value'] = element
        arr['label'] = dt_subject[element] !== undefined && dt_subject[element] !== null ? dt_subject[element].toUpperCase().split(":::")[0] :'Error;'
        subjectdata.push(arr)
    });}
    //EACH STUDENT GRAND TOTAL AS AN OBJECT
    let students_grand_total = {}
    Object.keys(student_totals).forEach(rw=>{
            let sum = summ(student_totals[rw])
            students_grand_total[rw] = sum
    })

    let students_fee = {}
    if(Array.isArray(ft)){
    ft.forEach(rw=>{
        if(parseInt(rw.studentid) > 0 && parseFloat(rw.amount) > 0){
            students_fee[rw.studentid] = rw.amount
        }
    })
    }   

    let students_paid = {}
    if(Array.isArray(pt)){
    pt.forEach(rw=>{
        if(parseInt(rw.studentid) > 0 && parseFloat(rw.amount) > 0){
            students_paid[rw.studentid] = rw.amount
        }
    })
    }
    
    //CREATE A FUNCTION TO REARRAGE OBJECTS IN ARRAY
    //STUDENT ID AS KEY
    let converted_object_student = []
    Object.keys(student_totals).forEach(rw=>{
            let arr = {}
            arr.studentid = rw
            arr.sum = summ(student_totals[rw])
            arr.score = avgs(student_totals[rw])
            arr.count = student_totals[rw].length
            converted_object_student.push(arr)
    })

    //RANK STUDENT BY TOTAL SCORE
    converted_object_student.sort(function(a,b){ return b.score - a.score; });
    converted_object_student.forEach(function(datas, i, arr) {
    datas.rank = i === 0 || datas.score != arr[i-1].score
                ? i + 1
                : arr[i-1].rank;
    });
   
   
    let sub_totals = {}
    let vals = Object.values(students_grand_total)
    sub_totals['sum'] = summ(vals)
    sub_totals['max'] = Math.max(...vals)
    sub_totals['min'] = Math.min(...vals)
    sub_totals['avg'] = avgs(vals)
    sub_totals['pop'] = vals.length

    const lunchModal = (subjectid, clientid) =>{

        let casz = [];
        let title = [];
        let cazscore = {};
        let cascore = {};
        categoryid.forEach(element => {
            let item = element.value.split("::::");
            let title_str = item[4]+"-"+item[5]+"("+item[3]+")";
            title.push(title_str);
            casz.push(item[0]);
            cazscore[item[0]] = parseFloat(item[3]);
            cascore[item[1]] = parseFloat(item[2]);
        });
        settitles(title.join(", "))
        if(casz.length > 0){
            let params = {
                data:JSON.stringify(
                {
                    'sessionid':props.user.activeterm.sessionid,
                    'termid':props.user.activeterm.termid,
                    'itemid1':casz.join(','),
                    'itemid':subjectid,
                    'clientid':clientid
                }),
                cat:'lessonplandetails',
                table:'lessonplandetails',
                narration:'lessonplan'
            }
            props.getLessonplanDetails(params);

            
        }
    }

    const addFont = ()=>{
        setfontz(prev=>prev + 0.5)

    }
    const reduceFont = ()=>{
        if(fontz > 10){
            setfontz(prev=>prev-0.5)
        }
    }

    return (
        < >
        <CCard className="d-none">
            <CCardHeader>
                <CRow><CCol>
                <h5>
                    {props.user.activeschool != undefined &&  props.user.activeschool.hasOwnProperty('name') && props.user.activeschool.name ? props.user.activeschool.name : <span> Welcome<small><i> (No active term)</i></small></span> }  
                </h5>
                </CCol></CRow>
            </CCardHeader>
        </CCard>
        <CCard>
            <CCardHeader>
                <CContainer fluid>
                    <CRow className="d-print-none mb-10">
                        <CCol>
                        <h4 id="traffic" className="card-title m-9">
                        {/* {props.user.activeterm != undefined &&  props.user.activeterm.hasOwnProperty('name') && props.user.activeterm.name ? props.user.activeterm.name : <span> Welcome<small><i> (No active term)</i></small></span> } */}
                        {reportarray.hasOwnProperty('label') ? reportarray.label :''} Reports
                        </h4>
                        <div className="small text-muted"><strong style={{fontSize:'15px', color:'teal'}}>
                        {titles}
                        </strong></div>
                        </CCol>
                    </CRow>
                    <CRow className="d-print-none mb-10">
                        <CCol xs={6} sm={6}>
                            <Select
                                closeMenuOnSelect={false}
                                value={reportarray}
                                options={reportdata}
                                onChange={handleReportArray}
                            />
                        </CCol>
                        <CCol xs={6} sm={5}>
                            <Select
                                closeMenuOnSelect={false}
                                value={classarray}
                                isMulti
                                options={classdata}
                                onChange={handleClassArray}
                            />
                        </CCol>
                        <CCol xs={2} sm={1}>
                            <CButton
                                color="success"
                                onClick={loadData}
                            >
                                <CIcon name="cil-thumb-up"/>
                            </CButton>
                        </CCol>
                    </CRow>
                    <CRow className="d-print-none mt-10">
                    <CCol xs={12} sm={6}>
                            <Select
                                closeMenuOnSelect={false}
                                value={subjectarray}
                                options={subjectdata}
                                onChange={handleSubjectArray}
                            />
                        </CCol>
                       
                        <CCol xs={12} sm={6}>
                            <CInput 
                                type='search' 
                                value={search}
                                onChange={(e)=>setsearch(e.target.value)}
                                placeholder="Search for student name or matric number (4 digits)"
                            />
                        </CCol>
                       
                    </CRow>
                    <CRow className="d-print-none mb-10">
                        <CCol>
                        <CButtonGroup>
                            <CButton color="dark" size="sm" onClick={addFont} title="Add Font"><i className='fa fa-edit'></i> Increase Font</CButton>
                            <CButton color="dark" size="sm" onClick={reduceFont} title="Reduce Font"><i className='fa fa-edit'></i> Reduce Font</CButton>
                            <CButton color="dark" size="sm" onClick={reduceFont} title="Reduce Font"><i className='fa fa-edit'></i> Add Comment</CButton>
                            <CButton color="dark" size="sm" onClick={reduceFont} title="Reduce Font"><i className='fa fa-edit'></i> General Notice</CButton>
                        </CButtonGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </CCardHeader>
           <CTabs>
              <CNav className="d-print-none" variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Records
                  </CNavLink>
                </CNavItem> 
                <CNavItem>
                  <CNavLink>
                    Report
                  </CNavLink>
                </CNavItem> 
                <CNavItem>
                  <CNavLink>
                    Rank
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Fee
                  </CNavLink>
                </CNavItem>    
              </CNav>
              {!props.studentscores.isLoading ?
              <CTabContent fade={false}>
                  <CTabPane>
                      <List
                         dt={dt_arr}
                         subjectid={subjectarray.hasOwnProperty('value') ? subjectarray.value : 0}
                         subject_totals={subject_totals}
                         student_totals={student_totals}                      
                         rankstudentsubject={rankstudentsubject}
                         dt_student={dt_student}
                         dt_subject={dt_subject}
                         dt_ca={dt_ca}
                         lunchModal={(e, f)=>lunchModal(e, f)}
                      />
                  </CTabPane>
                <CTabPane>
                    <Report
                         fontz={fontz}
                         dt={dt_arr}
                         ct={ct_arr}
                         gt={gt_arr}
                         subjectid={subjectarray.hasOwnProperty('value') ? subjectarray.value : 0}
                         subject_totals={subject_totals}
                         subject_stud_totals={subject_stud_totals}
                         rankstudentsubject={rankstudentsubject}
                         rankstudents={converted_object_student}
                         class_analysis={sub_totals}
                         student_totals={student_totals}
                         students_fee={students_fee}
                         students_paid={students_paid}
                         dt_student={dt_student}
                         dt_subject={dt_subject}
                         dt_ca={dt_ca}
                         ct_ca={ct_ca}
                         search={search}
                         reportname={reportarray.hasOwnProperty('label') ? reportarray.label :''}
                         reportid={reportarray.hasOwnProperty('value') ? reportarray.value :''}
                         lunchModal={(e, f)=>lunchModal(e, f)}
                      />
                </CTabPane>
                <CTabPane>
                      <Rank
                         dt_student={dt_student}
                         rankstudents={converted_object_student}
                      />
                  </CTabPane>
                  <CTabPane>
                      <Fee
                         dt_student={dt_student}
                         fee={students_fee}
                         paid={students_paid}
                      />
                  </CTabPane>
                </CTabContent>:
                    <>
                        <CCard>
                            <CCardBody>
                                <h4>Loading....</h4>
                            </CCardBody>
                        </CCard>
                    </>}
                </CTabs>
             </CCard>
            </>
    )
}

const mapStateToProps = (state) => ({
    reports : state.reportReducer.reports,
    studentscores : state.studentscoreReducer,
    studentcomments : state.studentcommentReducer,
    cas:state.caReducer.cas,
    gradeunits:state.gradeunitReducer,
    clasz:state.claszunitReducer.claszunits,
    user:state.userReducer,
    dropdowns : state.userReducer.dropdowns,
})

const mapDispatchToProps = {
    getReports,
    getStudentscores,
    getCas,
    getClaszunits,
    getGradeunits,
    getLessonplans,
    getLessonplan,
    getSubjects,
    getStudentcomments
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessonplan)
