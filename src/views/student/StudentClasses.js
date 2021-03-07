import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentclasss, getStudentclass, registerStudentclass, updateStudentclass, deleteStudentclass } from './../../actions/student/studentclass';
import {registerStaffstudent} from './../../actions/staff/staffstudent';
import {getStudentsubjects, getStudentsubject, registerStudentsubject, updateStudentsubject, deleteStudentsubject } from './../../actions/student/studentsubject';
import { getUserTerms, getUserdropdowns } from './../../actions/user'
import { Link,  useParams } from 'react-router-dom'
import Swal from'sweetalert'
import moment from 'moment'
import {
  CRow,
  CCol,
  CCardHeader,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CButton,
  CForm,
  CFormGroup,
  CInputCheckbox,
  CInputGroup,
  CSelect,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CHeader,
  CButtonGroup,
  CCollapse,
  CTooltip,
} from '@coreui/react'


import CIcon from '@coreui/icons-react'
import ClassList from './ClassBioAnalysis'
import ClassBioAnalysis from './ClassBioAnalysis'
import StudentContactList from './StudentContactList'
import StudentGallery from './StudentGallery'
import StudentList from './StudentList'
import StudentFeeList from './StudentFeeList'
import Header from '../staff/Subjects/Headers';
import StudentDefault from './StudentDefault';
import StudentScoreList from './StudentScoreList';
import StudentReportList from './StudentReportList';
import StudentReportList1 from './StudentReportList1';
import StudentClassTeacher from './StudentClassTeacher';
import { getClassstaffs  } from './../../actions/setting/classstaff';

const Studentclasss = (props) => {
    const par = useParams()
    let groupid = 4;
    const [activeterm, setActiveterm] = useState(false)
    const [active, setActive] = useState(0)
    const [title, setTitle] = useState('Title')
    const [term, setTerm] = useState(props.termz.termid)
    const [session, setSession] = useState(props.termz.sessionid)
    const [clasz, setClasz] = useState(0)
    const [claszparent, setClaszparent] = useState(0)
    const [studentdata, setStudentdata] = useState('')
    const [sides, setSides] = useState(false)
    const [search, setsearch] = useState('')
    const [dates, setdates] = useState(moment(new Date()).format('YYYY-MM-DD'))

    
    //CONFIRM IF ACTIVE TERM
    useEffect(() => {
       if(parseInt(term) === parseInt(props.termz.termid))
       {
        setActiveterm(true)
       }else{
        setActiveterm(false)
       }
      return () => {
        setActiveterm(false)
      }
    }, [term, props.termz.termid])
    
    useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
            'termid':term,
            'itemid':clasz,
            'sessionid':session,
            'grp':groupid
          }),
          cat:'studentclass',
          table:'accessstudentclassfull',
          narration:'get all student classs'
      }
        props.getStudentclasss(params)

        let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
        let dt0 ='';
        let dt1 ='';
        let title ='None | No Data'
        if(dt.length > 0)
        {
            dt0 = dt[0].filter(rw=>parseInt(rw.id) === parseInt(term));
            dt1 = dt[1].filter(rw=>parseInt(rw.id) === parseInt(clasz));
            let dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].name : 'Select term';
            let dtn1 = Array.isArray(dt1) && dt1.length > 0 ? dt1[0].name : 'Select class';
            title = dtn0+" | "+dtn1
        }
        
        setTitle(title);
        
      }, [term, clasz])
    
    useEffect(() => {
    let params2 = {
      data:JSON.stringify(
      {
            'termid':term,
            'sessionid':session,
            'itemid':clasz,
            'grp':1
        }),
        cat:'staffclass',
        table:'accessstaffclass',
        narration:'get classstaffs'
      }
    props.getClassstaffs(params2);
  }, [dates, clasz, session, term])

    useEffect(() => {
    //load dropdowns
    let did = props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0 ? props.user.activeschool.id :'null'
    let tid = props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('typeid') && parseInt(props.user.activeschool.typeid) > 0 ? props.user.activeschool.typeid :'null'
    
    let params = {
      data:JSON.stringify(
      {
          'schoolid':did,
          'typeid':tid
      }),
        cat:'dropdowns',
        table:'access',
        narration:'get all dropdowns'
      }
      props.getUserdropdowns(params)
    let params1 = {
        data:JSON.stringify(
        {
            'schoolid':did
        }),
        cat:'accessterms',
        table:'access',
        narration:'get current term'
        }
        props.getUserTerms(params1)
      
  }, [props.user.mid, props.user.activeschool.id, props.user.activeschool.typeid ])
  

      let dt = props.dropdowns && Array.isArray(props.dropdowns) && props.dropdowns.length > 0 ? props.dropdowns : [[], [], [], []];
      let dt0 ='';
      let dt1 ='';
      let dt2 ='';
      let dt3 ='';
      if(dt.length > 0)
      {
         dt0 = dt[0].map((prop, ind)=>{
        return <option key={ind}  value={prop.termid}>{prop.name}</option>;
        });
        dt1 = dt[1].map((prop, ind)=>{
        return <option key={ind}  value={prop.id}>{prop.name}</option>;
        });
        dt2 = dt[2].map((prop, ind)=>{
        return <option key={ind}  value={prop.id}>{prop.name}</option>;
        });
        dt3 = dt[0].map((prop, ind)=>{
        return <option key={ind} value={JSON.stringify(prop)}>{prop.name}</option>;
        });
      }

    const placeStudent = (students) =>{
      setStudentdata(students);
    }

   let len = 5;
   let subject = [];
   const loadStudent = () =>{
  
         let fd = new FormData();
         fd.append('itemid', clasz);
         fd.append('itemid1', 0);
         fd.append('contact', 0);
         fd.append('clientid', studentdata.id);
         fd.append('checker', groupid+'_'+term+'_'+studentdata.id+'_'+clasz);
         fd.append('table', 'accessstudentclass');
         fd.append('sessionid', session);
        
           //INSERT
        fd.append('grp', groupid);
        fd.append('termid', term);
        fd.append('cat', 'inserts');
        props.registerStudentclass(fd)
          
   }
   const placeStudentSubject = (subject) =>{
   /**
    * classunitid
    * termid
    * subjectid
    */
    let fd = new FormData();
    fd.append('claszid', clasz);
    fd.append('termid', term);
    fd.append('subjectid', subject);
    fd.append('sessionid', session);
    fd.append('staffid', props.user.mid);
    fd.append('grp', groupid);
    
    fd.append('table', 'accessstudentclass');
    fd.append('cat', 'insertsubject');
    props.registerStaffstudent(fd)
     
   }
   const changeClasz=(e)=>{
     setClasz(e)
      let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
          let dt0 ='';
          let dtn0  = 0;
          if(dt.length > 0)
          {
              dt0 = dt[1].filter(rw=>parseInt(rw.id) === parseInt(e));
              dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].sid : 0;
          }
          setClaszparent(dtn0)
    
   }
   const changeTerm =(e)=>{
      setTerm(e)
      let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
        let dt0 ='';
        let dtn0  = 0;
        if(dt.length > 0)
        {
            dt0 = dt[0].filter(rw=>parseInt(rw.termid) === parseInt(e));
            dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].sessionid : 0;
        }
        setSession(dtn0)
   }
   const onRemove =(id)=>{
        Swal("Are you sure you want to delete this information, You will not be able to restore the data.")
       .then((value) => {
         if(value == true && parseInt(id) > 0)
         {
             let fd = new FormData();
             fd.append('id', id);
             fd.append('sessionid', session)
             fd.append('table', 'accessstudentsubject')
             fd.append('cat', 'deletes')
             props.deleteStudentclass(fd, id);
         }else{
           Swal(`Not deleted`);
         }
         
       });
     
   }

let staff_available = props.classstaff.classstaffs && Array.isArray(props.classstaff.classstaffs)  && props.classstaff.classstaffs.length > 0? props.classstaff.classstaffs.filter(rw=>rw !== null || rw !== "null" || rw !== undefined).filter(element =>element !== null && parseInt(element.clientid) === parseInt(props.user.mid)):[];
let classteacher = Array.isArray(staff_available) && staff_available.length > 0 ? true : false;
   
let dataq = props.studentclasss.studentclasss && Array.isArray(props.studentclasss.studentclasss) ? props.studentclasss.studentclasss.filter(rw =>rw !== null || rw !== undefined) : []
let data = dataq;

if(search.length > 0 && search !== undefined)
{
  let datas = dataq.filter(rw=>rw.surname.toLowerCase().includes(search.toLowerCase()) 
  || rw.firstname.toLowerCase().includes(search.toLowerCase()) 
  || rw.middlename.toLowerCase().includes(search.toLowerCase())
  || rw.admission_no.toLowerCase().includes(search.toLowerCase())
  )
  data = datas;
}

let d1 = data.filter(rw=> rw !== null && rw !== undefined).map((p, i)=>p.id);
let data1 = d1.join(',')


let redirectAttendance = (clasz) =>{
    window.open(process.env.PUBLIC_URL+`#/attendance_student/${clasz}`)
}
  return (
    <>
    <CRow xs={12}>
      <CCol  xs="12" md="12" >
        {active === 0 ?
      <CCard xs="12" md="12">
        <CCardHeader>
          <CRow  className='mt-2 m-2' >
                <CCol  md={12} >
                  <CForm action="" method="post" >
                  <CRow xs={12} >
                  <CCol  >
                    <CRow>
                    <CCol xs='12' sm='4' md='5' lg='5'  className="ml-0">
                      <CFormGroup row>
                      <CInputGroup>
                          <CInputGroupPrepend>
                          <CInputGroupText>Select Term</CInputGroupText>
                          </CInputGroupPrepend>
                          <CSelect 
                            custom 
                            size="md" 
                            name="term" 
                            id="term"
                            onChange={(e)=>changeTerm(e.target.value)}
                            >
                            <option value="0">Select Term</option>
                            {dt0}
                          </CSelect>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol  xs='12' sm='4' md='4' lg='4' className="ml-0" >
                      <CFormGroup row>
                      <CInputGroup>
                          <CInputGroupPrepend>
                          <CInputGroupText>Select Class</CInputGroupText>
                          </CInputGroupPrepend>
                      <CSelect 
                          custom 
                          size="md" 
                          name="clasz" 
                          id="clasz"
                          value={clasz}
                          onChange={(e)=>changeClasz(e.target.value)}
                          >
                            <option value="0">Select Class</option>
                            {dt1}
                          </CSelect>
                      </CInputGroup>
                      </CFormGroup>
                      </CCol>
                    <CCol xs='12' sm='3' md='3' lg='3' className="ml-0" >
                      <CFormGroup className="">
                      <Link 
                          type="submit" 
                          className="btn btn-success  btn-sm"
                          color="primary"
                          onClick={loadStudent}
                          >
                            <CIcon name="cil-cloud-download"/></Link>
                      </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol  xs="2" md="2" >
                    
                  {parseInt(term) > 0 && parseInt(clasz) > 0 ?
                  <CTooltip
                    content={`Add a student to this class`}
                  >
                <CButton 
                    data-target='#formz' 
                    data-toggle="collapse" 
                    color="primary"
                    size='sm'
                    onClick={()=>setSides(prev=>!prev)}
                    className="float-right">
                  <CIcon name="cil-user-plus"/>
                </CButton></CTooltip>:''}
                
                
                </CCol>
          
                  </CRow>
                  </CForm>
                </CCol>
                 </CRow>
          <CCollapse show={sides}>
          
          <Header 
            len={len}
            subject={subject}
            studentdata={studentdata}
            goBack={props.goBack}
            placeStudent={placeStudent}
            loadStudent={loadStudent}
            setStudentdata={(pr)=>setStudentdata(pr)}
          />
          
          </CCollapse>
        </CCardHeader>
      </CCard>     
      :""}</CCol>
    </CRow>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="10">
              <h4 id="traffic" className="card-title mb-0">{title}</h4>
              <div className="small text-muted">{props.user.activeschool.name}</div>
            </CCol>
            <CCol sm="2">
            <CTooltip content={`Set Attendance date`}>
              <CButton
                    data-target='#formz' 
                    data-toggle="collapse" 
                    color="primary"
                    className="float-right"
                    onClick={()=>redirectAttendance(clasz)}
                    >
                  <CIcon name="cil-calendar"/>
              </CButton>
            </CTooltip>

            </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-settings"/>
                    { active === 0 && ' Setting'}
                  </CNavLink>
                </CNavItem>
               <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 1 && ' Chart'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 2 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 3 && ' Next of Kin'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-image'></i>
                    { active === 4 && ' Gallery'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-money'></i>
                    { active === 5 && ' Fees'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 6 && ' Scores'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 7 && ' Subject Teachers'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 8 && ' report'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-badge"/>
                    { active === 9 && ' report'}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
              
                <CTabPane>
                  <StudentDefault 
                    term={term}
                    clasz={clasz}
                    session={session}
                    onRemove={(e)=>onRemove(e)}
                    setsearch={(e)=>setsearch(e)} 
                    dateactive={dates} 
                    data1={data1}
                    data={data}
                    activeterm={activeterm}
                    setDates={(e)=>setdates(e)}
                    classteacher={classteacher}
                    placeStudentSubject={(e)=>placeStudentSubject(e)}
                   />
                  </CTabPane>
                <CTabPane>
                <ClassBioAnalysis  data={data}/>
                </CTabPane>
                <CTabPane>
                <StudentList  data={data}/>
                </CTabPane>
                <CTabPane>
                   <StudentContactList  data={data}/>
                </CTabPane>
                <CTabPane>
                    <StudentGallery data={data} />
                </CTabPane>
                <CTabPane>
                    <StudentFeeList 
                      termid={term} 
                      claszparentid={claszparent} 
                      sessionid={session} 
                      data={data} 
                      data1={data1} 
                      classteacher={classteacher}
                    />
                </CTabPane>
                <CTabPane>
                    <StudentClassTeacher 
                      term={term}
                      clasz={clasz}
                      session={session}
                      dateactive={dates} 
                      data1={data1}
                      data={data}
                      activeterm={activeterm}
                      classteacher={classteacher}
                      claszparentid={claszparent} 
                    />
                </CTabPane>
                <CTabPane>
                    <StudentScoreList 
                      term={term}
                      clasz={clasz}
                      session={session}
                      dateactive={dates} 
                      data1={data1}
                      data={data}
                      activeterm={activeterm}
                      classteacher={classteacher}
                      claszparentid={claszparent} 
                    />
                </CTabPane>
                <CTabPane>
                    <StudentReportList 
                      term={term}
                      clasz={clasz}
                      session={session}
                      dateactive={dates} 
                      data1={data1}
                      data={data}
                      activeterm={activeterm}
                      classteacher={classteacher}
                      claszparent={claszparent} 
                    />
                </CTabPane>
                <CTabPane>
                    <StudentReportList1 
                      term={term}
                      clasz={clasz}
                      session={session}
                      dateactive={dates} 
                      data1={data1}
                      data={data}
                      activeterm={activeterm}
                      classteacher={classteacher}
                      claszparent={claszparent} 
                    />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    studentclasss : state.studentclassReducer,
    dropdowns : state.userReducer.dropdowns,
    termz:state.userReducer.activeterm,
    user:state.userReducer,
    classstaff:state.classstaffReducer
  })
  export default connect(mapStateToProps, {
    getStudentclasss,
    getStudentclass,
    registerStudentclass,
    updateStudentclass,
    deleteStudentclass,
    getClassstaffs,
    getStudentsubjects,
    getStudentsubject,
    registerStudentsubject,
    updateStudentsubject,
    deleteStudentsubject,
    registerStaffstudent,
    getUserdropdowns,
    getUserTerms
  })(Studentclasss)
  
