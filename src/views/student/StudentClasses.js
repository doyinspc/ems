import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentclasss, getStudentclass, registerStudentclass, updateStudentclass, deleteStudentclass} from './../../actions/student/studentclass';
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

const Studentclasss = (props) => {
    const par = useParams()
    let groupid = 4;
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
            title = dtn0+" "+dtn1
        }
        
        setTitle(title);
        
      }, [term, clasz])

      let dt = props.dropdowns && Array.isArray(props.dropdowns) && props.dropdowns.length > 4 ? props.dropdowns : [[], [], [], []];
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
   let len = 5
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
   const loadStudents = () =>{
    let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
    let dt0 ='';
    let dt1 ='';
    let title ='None | No Data';
    let sessionid = 0
    if(dt.length > 0)
    {
        dt0 = dt[0].filter(rw=>parseInt(rw.id) === parseInt(term));
        dt1 = dt[1].filter(rw=>parseInt(rw.id) === parseInt(clasz));
        let dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].name : 'Select Term';
        let dtn1 = Array.isArray(dt1) && dt1.length > 0 ? dt1[0].name : 'Select Class';
        title = dtn0+" "+dtn1
        sessionid = dt0[0].sessionid
    }
    
    let params = {
      data:JSON.stringify(
      {
        'termid':term,
        'itemid':clasz,
        'sessionid':sessionid,
        'grp':groupid
      }),
      cat:'studentclass',
      table:'accessstudentclass',
      narration:'get all student classs'
  }
    props.getStudentclasss(params)

    setTitle(title); 
    
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
            dt0 = dt[0].filter(rw=>parseInt(rw.id) === parseInt(e));
            dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].sessionid : 0;
        }
        setSession(dtn0)
   }

   const onRemove =(id)=>{
        Swal("Are you sure you want to delete you will not be able to restore the data.")
       .then((value) => {
         if(value == true && parseInt(id) > 0){
             let fd = new FormData();
             fd.append('id', id);
             fd.append('sessionid', session)
             fd.append('table', 'accessstudentsubject')
             fd.append('cat', 'deletes')
             props.deleteStaffclass(fd, id);
         }else{
           Swal(`Not deleted`);
         }
         
       });
     
   }

let dataq = props.studentclasss.studentclasss && Array.isArray(props.studentclasss.studentclasss) ? props.studentclasss.studentclasss.filter(rw =>rw !== null || rw !== undefined) : []
let data = dataq;
if(search.length > 0){
  let datas = dataq.filter(rw=>rw.surname.toLowerCase().includes(search.toLowerCase()) 
  || rw.firstname.toLowerCase().includes(search.toLowerCase()) 
  || rw.middlename.toLowerCase().includes(search.toLowerCase())
  || rw.employment_no.toLowerCase().includes(search.toLowerCase())
  )
  data = datas;
}

let d1 = data.map((p, i)=>p.id);
let data1 = d1.join(',')

let redirectAttendance = () =>{
    window.open(process.env.PUBLIC_URL+"#/attendance_student/")
}
  return (
    <>
    <CRow xs={12}>
      <CCol  xs="12" md="12" >
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
      </CCol>
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
                    onClick={redirectAttendance}
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
                    <CIcon name="cil-chart-pie"/>
                    { active === 0 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 1 && ' Statistics'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 2 && ' Contact'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-image'></i>
                    { active === 3 && ' Gallery'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-money'></i>
                    { active === 4 && ' Fees'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 5 && ' Next of Kin'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-check'></i>
                    { active === 6 && ' Attendance'}
                  </CNavLink>
                </CNavItem>
               
              </CNav>
              <CTabContent>
              
                <CTabPane>
                  <StudentDefault 
                   setsearch={(e)=>setsearch(e)} 
                   dateactive={dates} 
                   data1={data1}
                  data={data}
                  clasz={clasz}
                  setDates={(e)=>setdates(e)}
                   />
                <StudentList  data={data}/>
                </CTabPane>
                <CTabPane>
                <ClassBioAnalysis  data={data}/>
                </CTabPane>
                <CTabPane>
                   <StudentContactList  data={data}/>
                </CTabPane>
                <CTabPane>
                    <StudentGallery data={data} />
                </CTabPane>
                <CTabPane>
                    <StudentFeeList termid={term} claszparentid={claszparent} sessionid={session} data={data} />
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
    user:state.userReducer

  })
  export default connect(mapStateToProps, {
    getStudentclasss,
    getStudentclass,
    registerStudentclass,
    updateStudentclass,
    deleteStudentclass
  })(Studentclasss)
  
