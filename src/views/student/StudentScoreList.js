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
    CButton
  } from '@coreui/react'
import ScoreReportTable from './ScoreReportTable1';
import {getReports} from './../../actions/setting/report';
import {getCas} from './../../actions/setting/ca';
import {getStudentscores} from './../../actions/student/studentscore';

const StudentReportList = (props) => {
    let history = useHistory();

    //PASS DATA FROM PARENT PAGE
    let studentids = props.data1;
    let students = props.data;
    let termid = props.term;
    let sessionid = props.session;
    let classteacher = props.classteacher;
    let clasz = props.clasz;
    let claszname = props.claszname;
    let claszparent = props.claszparent;
    let claszparentname = props.claszparentname;
    

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
        let cas = cass.length > 0 ? cass: '';
        
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

        let params = {
            data:JSON.stringify(
            {
                  'cas' : cas,
                  'schoolid' : 1
            }),
              cat:'dropdownca1',
              table:'dropdownca',
              narration:'get cas'
            }
          props.getCas(params);
        
    }, [repid, studentids, claszparent, clasz])

    
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
        allsubjects[ele.subjectid] = ele.subjectabbrv 
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
     let student_classparent_subject_position_stores = []
     
     student_classparent_subject_position_array.forEach(ele=>{
         
         if(Object.keys(student_classparent_subject_position_store).includes(ele.studentid))
         {
             if(Object.keys(student_classparent_subject_position_store[ele.studentid]).includes(ele.subjectid))
             {
 
             }else
             {
                 let frr = {};
                 frr['score'] = parseFloat(ele.avgr);
                 student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
                 let prr = {};
                 prr['score'] = parseFloat(ele.avgr);
                 prr['studentid'] = ele.studentid;
                 prr['subjectid'] = ele.subjectid;
                 student_classparent_subject_position_stores.push(prr)
             }
 
         }else
         {
             let frr = {};
             frr['score'] = ele.avgr;
             //frr['position'] = ele.position;
             student_classparent_subject_position_store[ele.studentid] = {};
             student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
             let prr = {};
             prr['score'] = ele.avgr;
             //prr['position'] = ele.position;
             prr['studentid'] = ele.studentid;
             prr['subjectid'] = ele.subjectid;
             student_classparent_subject_position_stores.push(prr)
         }
         
     })
     
     //ARRANGE SUBJECT CLASS PARENT POSITION
     let student_class_subject_position_array = props.studentscores && Array.isArray(props.studentscores[5]) ? props.studentscores[5] : [];
     let student_class_subject_position_store = {}
     let student_class_subject_position_stores = []
     student_class_subject_position_array.forEach(ele=>{
         
         if(Object.keys(student_class_subject_position_store).includes(ele.studentid))
         {
             if(Object.keys(student_class_subject_position_store[ele.studentid]).includes(ele.subjectid))
             {
 
             }else
             {
                 let frr = {};
                 frr['score'] = parseFloat(ele.avgr);
                 student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
                 let prr = {};
                 prr['score'] = parseFloat(ele.avgr);
                 prr['studentid'] = ele.studentid;
                 prr['subjectid'] = ele.subjectid;
                student_class_subject_position_stores.push(prr)
             }
 
         }else
         {
             let frr = {};
             frr['score'] = parseFloat(ele.avgr);
             student_class_subject_position_store[ele.studentid] = {};
             student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
             let prr = {};
             prr['score'] = parseFloat(ele.avgr);
             prr['studentid'] = ele.studentid;
             prr['subjectid'] = ele.subjectid;
             student_class_subject_position_stores.push(prr)
         }
         
     })
 
     //ARRANGE CLASS PARENT POSITION
     let student_classparent_position_array = props.studentscores && Array.isArray(props.studentscores[6]) ? props.studentscores[6] : [];
     let student_classparent_position_store = []
     student_classparent_position_array.forEach(ele=>{
       
             let frr = {};
             frr['average'] = parseFloat(ele.avg);
             frr['score'] = ele.total;
             frr['subjectid'] = ele.nums;
             frr['studentid'] = ele.studentid;
             student_classparent_position_store.push(frr);        
         
     })
 
     //ARRANGE CLASS POSITION
     let student_class_position_array = props.studentscores && Array.isArray(props.studentscores[7]) ? props.studentscores[7] : [];
     let student_class_position_store = []
     student_class_position_array.forEach(ele=>{
       
             let frr = {};
             frr['average'] = parseFloat(ele.avgr);
             frr['score'] = ele.total;
             frr['subjectid'] = ele.nums;
             frr['studentid'] = ele.studentid;
             student_class_position_store.push(frr);       
         
     })
 
     //ARRANGE CLASS POSITION
     let student_ca_score = props.studentscores && Array.isArray(props.studentscores[8]) ? props.studentscores[8] : [];
     let student_ca_score_store = {}
     let student_ca_score_array = []
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
                    student_ca_score_array[ele.studentid][ele.subjectid].push(ele.score);
                }

            }else
            {
                student_ca_score_store[ele.studentid][ele.subjectid] = {};
                student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;

                student_ca_score_array[ele.studentid][ele.subjectid] = [];
                student_ca_score_array[ele.studentid][ele.subjectid].push(ele.score);
            }

        }else
        {
            student_ca_score_store[ele.studentid] = {};
            student_ca_score_store[ele.studentid][ele.subjectid] = {};
            student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;

            student_ca_score_array[ele.studentid] = {};
            student_ca_score_array[ele.studentid][ele.subjectid] = [];
            student_ca_score_array[ele.studentid][ele.subjectid].push(ele.score);
        }        
         
     })
 
    let reportarray = props.reports && Array.isArray(props.reports) ? props.reports : [];
        let report_array = reportarray.filter(rw=>rw !== null).map((rw, ind) =>{
            return <option key={ind} value={rw.id}>{rw.title}</option>
    })

    var ranksubjectclassunit = {};
    Object.keys(allsubjects).forEach(rw=>{
         let data = student_class_subject_position_stores.filter(r=>parseInt(r.subjectid) === parseInt(rw));
         data.sort(function(a,b){ return b.score - a.score; });

         data.forEach(function(player, i, arr) {
         player.rank = i === 0 || player.score != arr[i-1].score
                    ? i + 1
                    : arr[i-1].rank;
         });
         ranksubjectclassunit[rw] = data
    })

    var ranksubjectclass = {};
    Object.keys(allsubjects).forEach(rw=>{
         let data = student_classparent_subject_position_stores.filter(r=>parseInt(r.subjectid) === parseInt(rw));
         data.sort(function(a,b){ return b.score - a.score; });

         data.forEach(function(player, i, arr) {
         player.rank = i === 0 || player.score != arr[i-1].score
                    ? i + 1
                    : arr[i-1].rank;
         });
         ranksubjectclass[rw] = data
    })
    
    var rankclass = {};
    students.forEach(ro=>{
         let rw = ro.id
         let data = student_classparent_position_store.filter(r=>parseInt(r.studentid) === parseInt(rw));
         data.sort(function(a,b){ return b.score - a.score; });

         data.forEach(function(player, i, arr) {
         player.rank = i === 0 || player.score != arr[i-1].score
                    ? i + 1
                    : arr[i-1].rank;
         });
         rankclass[rw] = data
    })
    
    var rankclassunit = {};
    students.forEach(ro=>{
         let rw = ro.id
         let data = student_class_position_store.filter(r=>parseInt(r.studentid) === parseInt(rw));
         data.sort(function(a,b){ return b.score - a.score; });

         data.forEach(function(player, i, arr) {
         player.rank = i === 0 || player.score != arr[i-1].score
                    ? i + 1
                    : arr[i-1].rank;
         });
         rankclassunit[rw] = data
    })
    
    //SET ASSESSMENT
        let cas = Array.isArray(props.cas) ? props.cas : [];
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


        let SUBStopic = Object.keys(allsubjects).filter(rw=>allsubjects[rw] !== null && allsubjects[rw] !== undefined && allsubjects[rw].length > 0).map((sub, idx)=>{
                return <td key={idx}>{allsubjects[sub]} { active === idx }</td>
        })

        let SUBS = <ScoreReportTable 
                students={studentids}
                reportid={repid}
                sessionid={sessionid}
                classteacher={classteacher}
                claszname={claszname}
                claszparent={claszparent}
                claszparentname={claszparentname}
                subjectname={allsubjects}
                theadm={SUBStopic}
                data={students}
                ca_array={ca_array}
                ca_score={ca_score}
                caunit_array={caunit_array}
                arr={arr}
                classparent_subject_average={classparent_subject_average}
                class_subject_average={class_subject_average}
                student_classparent_subject_position_store={ranksubjectclass}
                student_class_subject_position_store={ranksubjectclassunit}
                student_classparent_position_store={rankclass}
                student_class_position_store={rankclassunit}
                student_ca_score_store={student_ca_score_store}
                student_ca_score_array={student_ca_score_array}
           />
      


  
 return (
   <>
   
   <CRow  xs={12}  className="d-print-none">
        <CCol xs={12} md={4}>
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
            <CButton 
                onClick={()=>history.push({
                pathname:`/results/${repid}/1`,
                state:{
                    report: parseInt(repid) > 0 ? reportarray.filter(rw=>parseInt(rw.id) === parseInt(repid))[0] : {},
                    studentids : props.data1,
                    students : props.data,
                    sessionid : sessionid,
                    termid : props.term,
                    sessionid : props.session,
                    classteacher : props.classteacher,
                    clasz : props.clasz,
                    claszparent : props.claszparent,
                    activeterm : props.activeterm,
                    staffid : props.user.mid,
                    cas:props.cas
                }
            })}
                color="success" 
                block
                >Report Card </CButton>
        </CCol>
  </CRow>
       
            {SUBS}
        
        
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
  
