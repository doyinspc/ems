import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import { CCard, CCardBody, CButton, CButtonGroup, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CContainer, CCardFooter } from '@coreui/react';
import { getStaff } from './../../actions/staff/staff';
import StaffBio from './StaffBio';
import StaffLeave from './StaffLeave';
import StaffLog from './StaffLog';
import StaffJob from './StaffJob';
import StaffAccess from './StaffAccess';
import StaffReport from './StaffReport';
import StaffAdd from './StaffAdd';
import StaffClassReport from './StaffClassReport';
import StaffSubjectReport from './StaffSubjectReport';
import StaffLessonPlan from './StaffLessonPlan';
import StaffExperience from './StaffExperience';
import StaffProfessional from './StaffProfessional';
import StaffEducation from './StaffEducation';
import { useParams } from 'react-router-dom';




const User = (props, {match}) => {
  const staffid = useParams().staff;
  const [showed, setShowed] = useState(0)
  const [edited, setEdited] = useState(0)
  const [gradetype, setGradeTypes] = useState([])
  useEffect(() => {
    props.getStaff(staffid);
  }, [showed, staffid])
  
  const setShowedx = (num) =>{
      setEdited(0)
      setShowed(num)
  }
  const setEditedx = (num) =>{
    setEdited(num)
    setShowed(0)
}
  const onedit = () =>{

  }
  const onReset = () =>{

  }
  const onBlock = () =>{

  }
  const onAdd = () =>{

  }
  
  
  
  const { employment_no, id, surname, firstname, middlename } = props.staff || {};
  const fullname = surname+' '+firstname+' '+middlename;

  return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
              <h4>{fullname}</h4>
              Staff ID: <strong>{employment_no}</strong>
              </CCol>
              <CCol className="d-md-block btn-group">
              <CButtonGroup className='pull-right'>
              <CButton  
                  color="primary" 
                  onClick={onAdd}
                  className=""
                  >
                <i className='fa fa-plus'></i>
              </CButton>
              <CDropdown color="secondary">
                <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i>  Menu
                </CDropdownToggle>
                <CDropdownMenu>
              <CDropdownItem
                  onClick={(prev)=>setShowedx(0)}
                >
                  <i className='text-secondary fa fa-user-circle'></i>{"  ."} Basic Information</CDropdownItem>
                  <CDropdownItem
                  onClick={()=>setShowedx(1)}
                  >
                  <i className='text-danger fa fa-book'></i>{"  ."}Education History</CDropdownItem>
                  <CDropdownItem
                  onClick={()=>setShowedx(2)}
                  >
                  <i className='text-danger fa fa-book'></i>{"  ."}Professional Certifications</CDropdownItem>
                  <CDropdownItem
                  onClick={()=>setShowedx(3)}
                  >
                  <i className='text-danger fa fa-book'></i>{"  ."}Work Experience</CDropdownItem>
                 
                  <CDropdownItem
                  onClick={()=>setShowedx(4)}
                  >
                  <i className='text-secondary fa fa-plane'></i>{"  "}Leave</CDropdownItem>
                <CDropdownItem
                  onClick={()=>setShowedx(5)}
                >
                  <i className='text-secondary fa fa-brick'></i>{"  ."} Job</CDropdownItem>
                <CDropdownItem
                  onClick={()=>setShowedx(6)}
                >
                  <i className='text-secondary fa fa-chart'></i>{"  ."} Subject Class performance</CDropdownItem>
                <CDropdownItem
                  onClick={()=>setShowedx(7)}
                 >
                  <i className='text-success fa fa-certificate'></i>{"  ."} Commendations</CDropdownItem>
                <CDropdownItem
                  onClick={()=>setShowedx(9)}
                  >
                  <i className='text-danger fa fa-certificate'></i>{"  ."}Sanctions</CDropdownItem>
                  <CDropdownItem
                  onClick={()=>setShowedx(11)}
                  >
                  <i className='text-danger fa fa-pencil'></i>{"  ."}Audit</CDropdownItem>
                  <CDropdownItem
                  onClick={()=>setShowedx(12)}
                  >
                  <i className='text-danger fa fa-lock'></i>{"  ."}Access</CDropdownItem>
                <CDropdownDivider />
                
              </CDropdownMenu>
            
              </CDropdown>
              <CDropdown color="secondary">
                <CDropdownToggle caret color="secondary">
                  <i className='fa fa-edit'></i> Edit
                </CDropdownToggle>
                <CDropdownMenu>
      <CDropdownItem onClick={()=>setEditedx(1)}><i className='text-secondary fa fa-edit'></i>{"  ."} Biodata</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(2)}><i className='text-secondary fa fa-edit'></i>{"  ."} Next of Kin</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(3)}><i className='text-secondary fa fa-edit'></i>{"  ."} Working Experience</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(4)}><i className='text-secondary fa fa-edit'></i>{"  ."} Education</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(5)}><i className='text-secondary fa fa-edit'></i>{"  ."} Professional Certification</CDropdownItem>          
              </CDropdownMenu>
              </CDropdown>
            </CButtonGroup>  
            </CCol>
            </CRow>
          </CCardHeader>
         </CCard>
      </CCol>
    </CRow>
    {edited > 0 ? <StaffAdd editid={edited} data={props.staff} />:''}
    {showed === 0 && edited === 0 ? <StaffBio  staff={props.staff} />:''}
    {showed === 1 && edited === 0 ? <StaffEducation  sid={staffid}  />:''}
    {showed === 2 && edited === 0 ? <StaffProfessional  sid={staffid}  />:''}
    {showed === 3 && edited === 0 ? <StaffExperience sid={staffid}   />:''}
    {showed === 4 && edited === 0 ? <StaffLeave  sid={staffid}  />:''}
    {showed === 5 && edited === 0 ? <StaffJob  sid={staffid}  />:''}
    {showed === 6 && edited === 0 ? <StaffReport  sid={staffid}  />:''}
    {showed === 7 && edited === 0 ? <StaffReport  sid={staffid}  />:''}
    {showed === 8 && edited === 0 ? <StaffClassReport sid={staffid}  />:''}
    {showed === 9 && edited === 0 ? <StaffSubjectReport sid={staffid}  />:''}
    {showed === 10 && edited === 0 ? <StaffLessonPlan sid={staffid}   />:''}
    {showed === 11 && edited === 0 ? <StaffLog sid={staffid}   />:''}
    {showed === 12 && edited === 0 ? <StaffAccess sid={staffid}   />:''}
    </>
  )
}
const mapStateToProps = (state) =>({
  staff:state.staffReducer.staff,
  staffleave:state.staffleaveReducer.staffleave,
  staffreport:state.staffreportReducer.staffreport,
  staffeducation:state.staffeducationReducer.staffeducation,
  staffexperience:state.staffexperienceReducer.staffexperience,
  staffprofessional:state.staffprofessionalReducer.staffprofessional,
})
export default connect(mapStateToProps, {getStaff})(User)
