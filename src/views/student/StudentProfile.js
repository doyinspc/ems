import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import { CCard, CCardBody, CImg, CButton, CButtonGroup, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CContainer, CCardFooter } from '@coreui/react';
import { getStudent } from './../../actions/student/student';
import StudentBio from './StudentBio';
import StudentAdd from './StudentAdd';
import { Redirect, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react'



const User = (props) => {
  const studentid = useParams().student;
  const [showed, setShowed] = useState(0)
  const [edited, setEdited] = useState(0)

  useEffect(() => {
    props.getStudent(studentid);
  }, [showed, studentid])
  
  
  const setEditedx = (num) =>{
    setEdited(num)
    setShowed(0)
}

  const { admission_no, id, surname, firstname, middlename, photo } = props.student || {};
  const fullname = surname+' '+firstname+' '+middlename;
 
  let acs = props.user.access !== undefined && props.user.access.length > 0 ? JSON.parse(props.user.access) : {};
  let secarry = {}
  if(Object.keys(acs) > 0 && props.isAdmin === false)
  {
      let ids = props.activeschool !== undefined ? props.activeschool.id : null;
      if(acs !== undefined  && acs.hasOwnProperty(ids))
      {
         secarry = acs[ids][0]
      }else
      {
       // return <Redirect to="/" />
      }
  }else if(props.isAdmin === true)
  {
     // return <Redirect to="/" />
  }
  else{
     // return <Redirect to="/" />
  }

  return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          {id  ? <CCardHeader className='bg-dark'>
            <CRow className="m-0 p-0">
              <CCol xs={1} sm={1} className='m-0 p-0'>
              <div className="c-avatars m-0">
                <CImg
                    src={process.env.REACT_APP_SERVER_URL+ photo} 
                    className="c-avatar-imgf img-responsive m-0"
                    height='50px'
                    width="45px"
                    alt={props.username}
                    onError={(e)=>{e.target.onerror=null; e.target.src='icons/profile_1.png'} }
                />
                </div>
                </CCol>
            <CCol xs={10} sm={7}>
              <h4>{fullname}</h4>
              Student ID: <strong>{admission_no}</strong>
              </CCol>
              <CCol xs={12} sm={4} className="d-md-block btn-group">
              <CButtonGroup className='pull-right'>
             
              
                <CButton
                color='secondary'
                 onClick={()=>setEditedx(0)}><i className='fa fa-home'></i>Home</CButton>
                <CButton
                color='secondary'
                 onClick={()=>setEditedx(1)}><i className='fa fa-edit'></i>Edit</CButton>
            
            </CButtonGroup>  
            </CCol>
            </CRow>
          </CCardHeader>:''}
         </CCard>
      </CCol>
    </CRow>
    {edited > 0 ? <StudentAdd editid={edited} data={props.student} personal={false} />:''}
    {showed === 0 && edited === 0 ? <StudentBio  student={props.student} />:''}
    
    </>
  )
}
const mapStateToProps = (state) =>({
  user:state.userReducer.user,
  isAdmin:state.userReducer.isAdmin,
  activeschool:state.userReducer.activeschool,
  student:state.studentReducer.student,
})
export default connect(mapStateToProps, {getStudent})(User)
