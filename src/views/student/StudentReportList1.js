import React, { useEffect, useState }  from 'react'
import { connect } from 'react-redux'
import { useHistory} from 'react-router-dom'
import {
    CRow,
    CCol,
    CCardHeader,
    CFormGroup,
    CSelect,
    CNav,
    CNavLink,
    CNavItem,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CButton,
    CWidgetIcon,
    CCardFooter,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import ScoreReportTable from './ScoreReportTable';
import StudentReportTable from './StudentReportTable';
import {getReports} from './../../actions/setting/report';
import {getCas} from './../../actions/setting/ca';
import {getStudentscores} from './../../actions/student/studentscore';

const StudentReportList = (props) => {

    //PASS DATA FROM PARENT PAGE
    let studentids = props.data1;
    let students = props.data;
    let termid = props.term;
    let sessionid = props.session;
    let classteacher = props.classteacher;
    let clasz = props.clasz;
    let claszparent = props.claszparent;
    let activeterm = props.activeterm;
    let staffid = props.user.mid;
    

    //STORE DATA IN STATES
    const [repid, setrepid] = useState(0)
    const [active, setActive] = useState(0)

    
    //GET DATA NEED FOR THIS PAGE
    //ALL REPORTS FOR THE SESSION
    //DEPENDS ON SESSION
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

          
           let params1 = {
                data:JSON.stringify(
                {
                'termid':termid,
                'schoolid':sessionid
                }),
                cat:'dropdownca',
                table:'dropdownca',
                narration:'get ca'
        
            }
            props.getCas(params1)
            


    }, [sessionid])

    useEffect(() => {
        //GET ALL REPORT FOR THE STUDENTS
        let reportarrays = props.reports && Array.isArray(props.reports) ? props.reports : [];
        let casss = reportarrays.filter(rw=>rw !== null && parseInt(rw.id) === parseInt(repid));
        let cass = Array.isArray(casss) && casss.length > 0 ? casss[0].ca : '';
        let cas = cass.length > 0 ? JSON.parse(cass).join(",") : '';
        if(parseInt(repid) > 0){
        let params = {
            data:JSON.stringify(
            {
                  'sessionid':sessionid,
                  'termid':termid,
                  'ids':studentids,
                  'clasz':clasz,
                  'claszparent':claszparent,
                  'cas' : cas,

              }),
              cat:'selectreport',
              table:'studentscore',
              narration:'get reports'
            }
          props.getStudentscores(params);
        }
    }, [repid, studentids, claszparent, clasz])

    //ARRANGE STUDENTS SCORES
    let studentscorearray = props.studentscores && Array.isArray(props.studentscores[0]) ? props.studentscores[0] : [];
    let arr = {};
    let srr = {};
    let allsubjects = {};
    studentscorearray.forEach(ele => {
        //by subjects
        if(Object.keys(arr).includes(ele.subjectid))
        {
            if(Object.keys(arr[ele.subjectid]).includes(ele.studentid))
            {
                if(Object.keys(arr[ele.subjectid][ele.studentid]).includes(ele.caid))
                {

                }else{
                    arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
                }

            }
            else{
                arr[ele.subjectid][ele.studentid] = {}
                arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
            }
        }else
        {
            arr[ele.subjectid] = {};
            arr[ele.subjectid][ele.studentid] = {}
            arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
        }
        //by students
        if(Object.keys(srr).includes(ele.studentid))
        {
            if(Object.keys(srr[ele.studentid]).includes(ele.subjectid))
            {
                if(Object.keys(srr[ele.studentid][ele.subjectid]).includes(ele.caid))
                {

                }else{
                    srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
                }

            }
            else{
                srr[ele.studentid][ele.subjectid] = {}
                srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
            }
        }else
        {
            srr[ele.studentid] = {};
            srr[ele.studentid][ele.subjectid] = {}
            srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
        }
        allsubjects[ele.subjectid] = ele.subjectname 
    });

    //ARRANGE
    let studentparentaveragearray = props.studentscores && Array.isArray(props.studentscores[1]) ? props.studentscores[1] : [];
    let classparent_subject_average = {}
    studentparentaveragearray.forEach(ele=>{
        let frr = {};
        frr['pop'] = ele.students;
        frr['average'] = ele.avgr;
        frr['maxscore'] = ele.maxscore;
        frr['score'] = ele.score;
        classparent_subject_average[ele.subjectid] = frr;
    })
    //ARRANGE
    let studentclassaveragearray = props.studentscores && Array.isArray(props.studentscores[2]) ? props.studentscores[2] : [];
    let class_subject_average = {}
    studentclassaveragearray.forEach(ele=>{
        let frr = {};
        frr['pop'] = ele.students;
        frr['average'] = ele.avgr;
        frr['maxscore'] = ele.maxscore;
        frr['score'] = ele.score;
        class_subject_average[ele.subjectid] = frr;
    })

    //ARRANGE SUBJECT CLASS PARENT POSITION
    let student_classparent_subject_position_array = props.studentscores && Array.isArray(props.studentscores[4]) ? props.studentscores[4] : [];
    let student_classparent_subject_position_store = {}
    student_classparent_subject_position_array.forEach(ele=>{
        
        if(Object.keys(student_classparent_subject_position_store).includes(ele.studentid))
        {
            if(Object.keys(student_classparent_subject_position_store[ele.studentid]).includes(ele.subjectid))
            {

            }else
            {
                let frr = {};
                frr['average'] = ele.average;
                frr['position'] = ele.position;
                student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
            }

        }else
        {
            let frr = {};
            frr['average'] = ele.average;
            frr['position'] = ele.position;
            student_classparent_subject_position_store[ele.studentid] = {};
            student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
        }
        
    })

    //ARRANGE SUBJECT CLASS PARENT POSITION
    let student_class_subject_position_array = props.studentscores && Array.isArray(props.studentscores[5]) ? props.studentscores[5] : [];
    let student_class_subject_position_store = {}
    student_class_subject_position_array.forEach(ele=>{
        
        if(Object.keys(student_class_subject_position_store).includes(ele.studentid))
        {
            if(Object.keys(student_class_subject_position_store[ele.studentid]).includes(ele.subjectid))
            {

            }else
            {
                let frr = {};
                frr['average'] = ele.average;
                frr['position'] = ele.position;
                student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
            }

        }else
        {
            let frr = {};
            frr['average'] = ele.average;
            frr['position'] = ele.position;
            student_class_subject_position_store[ele.studentid] = {};
            student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
        }
        
    })

    //ARRANGE CLASS PARENT POSITION
    let student_classparent_position_array = props.studentscores && Array.isArray(props.studentscores[6]) ? props.studentscores[6] : [];
    let student_classparent_position_store = {}
    student_classparent_position_array.forEach(ele=>{
      
            let frr = {};
            frr['average'] = ele.avg;
            frr['position'] = ele.position;
            frr['total'] = ele.total;
            frr['subjects'] = ele.nums;
            student_classparent_position_store[ele.studentid] = frr;        
        
    })

    //ARRANGE CLASS POSITION
    let student_class_position_array = props.studentscores && Array.isArray(props.studentscores[7]) ? props.studentscores[7] : [];
    let student_class_position_store = {}
    student_class_position_array.forEach(ele=>{
      
            let frr = {};
            frr['average'] = ele.avg;
            frr['position'] = ele.position;
            frr['total'] = ele.total;
            frr['subjects'] = ele.nums;
            student_class_position_store[ele.studentid] = frr;        
        
    })
  
    let reportarray = props.reports && Array.isArray(props.reports) ? props.reports : [];
        let report_array = reportarray.filter(rw=>rw !== null).map((rw, ind) =>{
            return <option key={ind} value={rw.id}>{rw.title}</option>
    })

    //ARRANGE CLASS POSITION
    let student_ca_score = props.studentscores && Array.isArray(props.studentscores[8]) ? props.studentscores[8] : [];
    let student_ca_score_store = {}
    student_ca_score.forEach(ele=>{
      
       if(Object.keys(student_ca_score_store).includes(ele.studentid))
       {
           if(Object.keys(student_ca_score_store[ele.studentid]).includes(ele.subjectid))
           {
               if(Object.keys(student_ca_score_store[ele.studentid][ele.subjectid]).includes(ele.caid))
               {

               }else
               {
                   student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
               }

           }else
           {
               student_ca_score_store[ele.studentid][ele.subjectid] = {};
               student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
           }

       }else
       {
           student_ca_score_store[ele.studentid] = {};
           student_ca_score_store[ele.studentid][ele.subjectid] = {};
           student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
       }        
        
    })


        //SET ASSESSMENT
        let cas = Array.isArray(props.cas) ?props.cas : [];
        let ca_array = {};
        let ca_score = {};
        let ca1_array = {};
        let ca2_array = {};
        let caunit_array = {};
        cas.forEach(ele => {
          if(parseInt(ele.typeid) === 1){
            if(Object.keys(ca_array).includes(ele.sid))
            {
               //ca_array[ele.sid] = ele.cname;
            }else{
               ca_array[ele.sid] = ele.caabbrv;
               ca_score[ele.sid] = ele.score;
            }
          }else if(parseInt(ele.typeid) === 2){
           if(Object.keys(ca_array).includes(ele.sid))
           {
              //ca_array[ele.sid] = ele.cname;
           }else{
              ca1_array[ele.sid] = ele.caabbrv;
           }
          }
          else if(parseInt(ele.typeid) === 3){
           if(Object.keys(ca_array).includes(ele.sid))
           {
              //ca_array[ele.sid] = ele.cname;
           }else{
              ca2_array[ele.sid] = ele.caabbrv;
           }
          }
       
          if(Object.keys(caunit_array).includes(ele.sid))
            {
                let arr = {}
                arr['id'] = ele.id;
                arr['typeid'] = ele.typeid;
                arr['name'] = ele.abbrv;
                arr['score'] = ele.maxscore;
                caunit_array[ele.sid].push(arr);
            }else
            {
               caunit_array[ele.sid] = [];
               let arr = {}
               arr['id'] = ele.id;
               arr['typeid'] = ele.typeid;
               arr['name'] = ele.abbrv;
               arr['score'] = ele.maxscore;
               caunit_array[ele.sid].push(arr);
            }
        });


        let theadm = Object.keys(ca_array).map((prop, ind)=>{
                    return <th key={ind} colSpan={caunit_array[prop].length + 1}>{ca_array[prop]}</th>
        })
        let theadm1 = Object.keys(ca_array).map((prop, ind)=>{
            return <>{Object.keys(caunit_array[prop]).map((pro, inds)=>{
                return <th key={inds}>{caunit_array[prop][pro].name}<br/>{caunit_array[prop][pro].score}</th>
                })}
                <th >{ca_score[prop]}</th></>
            })
        

        let StudStopic = students.filter(rw=>rw!==null && rw!=="null").map((row, idx)=>{
                return <CNavItem key={idx}>
                <CNavLink>
                {`${row.surname} ${row.firstname} ${row.middlename}`}
                  { active === idx }
                </CNavLink>
              </CNavItem>
          })   
        
      
       let STUDENTZ = students.filter(rw=>rw!==null && rw!=="null").map((sub, idx)=>{
        return <StudentReportTable 
             key={idx}
             studentid={sub.id}
             studentname={sub}
             theadm={theadm}
             theadm1={theadm1}
             data={allsubjects}
             ca_array={ca_array}
             ca_score={ca_score}
             caunit_array={caunit_array}
             arr={srr[sub.id]}
             classparent_subject_average={classparent_subject_average}
             class_subject_average={class_subject_average}
             student_classparent_subject_position_store={student_classparent_subject_position_store[sub.id]}
             student_class_subject_position_store={student_class_subject_position_store[sub.id]}
             student_classparent_position_store={student_classparent_position_store[sub.id]}
             student_class_position_store={student_class_position_store[sub.id]}
             student_ca_score_store={student_ca_score_store[sub.id]}
        />
    })
  
 return (
   <>
   <CRow xs={12} className="d-print-none" >
        <CCol xs={12} md={4}  className="d-print-none">
            <CFormGroup>
                  <CCol xs="12" md="12">
                  <CSelect
                    className="my-auto"
                    custom
                    value={repid}
                    type='search'
                    onChange={(e)=>setrepid(e.target.value)}
                    placeholder="Select a Report"
                >
                  <option>Select an action</option>
                  {report_array}
                  </CSelect>
                  </CCol>
            </CFormGroup>
            </CCol>
        <CCol xs={12} md={4}>
            <CCol xs={12}>
                <CButton 
                    color="info" 
                    block
                >Submit </CButton>
            </CCol>
            </CCol>
        <CCol xs={12} md={4}>
        </CCol>
  </CRow>
        <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
        <CNav variant="tabs" className="d-print-none">
            {StudStopic}
        </CNav>
        <CTabContent>
           {STUDENTZ} 
        </CTabContent>
        </CTabs>

        
   </>
  )
}
const mapStateToProps = (state) =>({
    user:state.userReducer,
    reports : state.reportReducer.reports,
    studentscores : state.studentscoreReducer.studentscores,
    cas:state.caReducer.cas,
  })
  export default connect(mapStateToProps, {
    getReports,
    getStudentscores,
    getCas
  })(StudentReportList)
  
