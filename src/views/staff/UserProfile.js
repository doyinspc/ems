import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import { CCard, CCardBody, CImg, CButton, CButtonGroup, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CContainer, CCardFooter } from '@coreui/react';
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
import TheHeaderDropdown from './TheHeaderDropdown';
import CIcon from '@coreui/icons-react'



const User = (props, {match}) => {
  const staffid = props.user.id;
  
  const [showed, setShowed] = useState(0)
  const [edited, setEdited] = useState(0)
  const [gradetype, setGradeTypes] = useState([])
//   useEffect(() => {
//     props.getStaff(staffid);
//   }, [showed, staffid])
  
  const setShowedx = (num) =>{
      setEdited(0)
      setShowed(num)
  }
  const setEditedx = (num) =>{
      console.log(num)
    setEdited(num)
    setShowed(0)
}
 
  const onAdd = () =>{

  }
  
  
  
  const { employment_no, id, surname, firstname, middlename, photo } = props.user || {};
  const fullname = surname+' '+firstname+' '+middlename;

  return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow className="m-0 p-0">
              <CCol xs={1} sm={1} className='m-0 p-0'>
              <div className="c-avatars m-0">
                <CImg
                    src={process.env.REACT_APP_SERVER_URL+ photo} 
                    className="c-avatar-imgf img-responsive m-0"
                    height='50px'
                    width="45px"
                    alt={props.username}
                    onError={(e)=>{e.target.onerror=null; e.target.src='icons/profile_4.png'} }
                />
                </div>
                </CCol>
                <CCol xs={10} sm={7}>
              <h4>{fullname}</h4>
              Staff ID: <strong>{employment_no}</strong>
              </CCol>
              <CCol xs={12} sm={4} className="d-md-block btn-group">
              <CButtonGroup className='pull-right'>
              <CDropdown color="secondary" >
                <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i> <span className='hidden-phone'> Menu</span>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                    >
                    <strong>Personal</strong>
                    </CDropdownItem>
                    <CDropdownItem  onClick={(prev)=>setShowedx(0)}>
                        <CIcon 
                            name="cil-user" 
                            className="mfe-2" 
                           
                        /> 
                        Basic Information
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(1)}>
                        <CIcon 
                            name="cil-book" 
                            className="mfe-2" 
                            
                        /> 
                        Education History
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(2)}>
                        <CIcon 
                            name="cil-badge" 
                            className="mfe-2" 
                            
                        /> 
                        Professional Certifications
                    </CDropdownItem>
                    <CDropdownItem  onClick={(prev)=>setShowedx(3)}>
                        <CIcon 
                            name="cil-mug-tea" 
                            className="mfe-2" 
                           
                        /> 
                        Work History
                    </CDropdownItem>
                    <CDropdownItem>
                        <CIcon 
                            name="cil-flight-takeoff" 
                            className="mfe-2" 
                            
                        /> 
                        Leave Applications
                    </CDropdownItem>
                  <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                    onClick={(prev)=>setShowedx(4)}
                    >
                    <strong>Official</strong>
                    </CDropdownItem>
                   
                    <CDropdownItem onClick={(prev)=>setShowedx(5)}>
                        <CIcon 
                            name="cil-weightlifitng" 
                            className="mfe-2" 
                            
                        /> 
                        Job Roles
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(6)}>
                        <CIcon 
                            name="cil-task" 
                            className="mfe-2" 
                            
                        /> 
                        Subject/Class
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(8)}>
                        <CIcon 
                            name="cil-sign-language" 
                            className="text-success mfe-2" 
                            
                        /> 
                        Commendations
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(9)}>
                        <CIcon 
                            name="cil-mood-very-bad" 
                            className="text-danger mfe-2" 
                            
                        /> 
                        Sanctions
                    </CDropdownItem>
                    <CDropdownItem  onClick={(prev)=>setShowedx(11)}>
                        <CIcon 
                            name="cil-pencil" 
                            className="mfe-2" 
                           
                        /> 
                        Audit Trail
                    </CDropdownItem>
                    <CDropdownItem onClick={(prev)=>setShowedx(12)}  >
                        <CIcon 
                            name="cil-lock-locked" 
                            className="mfe-2" 
                            
                        /> 
                        Access
                    </CDropdownItem>
                
                
              </CDropdownMenu>
            
              </CDropdown>
              <CDropdown color="secondary">
                <CDropdownToggle caret color="secondary">
                  <i className='fa fa-edit'></i> <span className='d-n0ne'> Edit</span>
                </CDropdownToggle>
                <CDropdownMenu>
    {/* <CDropdownItem onClick={()=>setEditedx(1)}><i className='text-secondary fa fa-edit'></i>{"  ."} Employment</CDropdownItem> */}
      <CDropdownItem onClick={()=>setEditedx(2)}><i className='text-secondary fa fa-edit'></i>{"  ."} Biodata</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(3)}><i className='text-secondary fa fa-edit'></i>{"  ."} Next of Kin</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(4)}><i className='text-secondary fa fa-edit'></i>{"  ."} Photo</CDropdownItem>
      <CDropdownItem onClick={()=>setEditedx(5)}><i className='text-secondary fa fa-edit'></i>{"  ."} Password</CDropdownItem>
    {/*<CDropdownItem onClick={()=>setEditedx(6)}><i className='text-secondary fa fa-edit'></i>{"  ."} Exit</CDropdownItem>   */} 
              </CDropdownMenu>
              </CDropdown>
            </CButtonGroup>  
            </CCol>
            </CRow>
          </CCardHeader>
         </CCard>
      </CCol>
    </CRow>
    {edited > 0 ? <StaffAdd editid={edited} data={props.user} personal={true} />:''}
    {showed === 0 && edited === 0 ? <StaffBio  staff={props.user} />:''}
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
  user:state.userReducer.user,
  staff:state.staffReducer.staff,
  staffleave:state.staffleaveReducer.staffleave,
  staffreport:state.staffreportReducer.staffreport,
  staffeducation:state.staffeducationReducer.staffeducation,
  staffexperience:state.staffexperienceReducer.staffexperience,
  staffprofessional:state.staffprofessionalReducer.staffprofessional,
})
export default connect(mapStateToProps, {getStaff})(User)
