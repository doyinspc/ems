import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentfees, updateStudentfee, deleteStudentfee} from './../../actions/student/studentfee';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CCardHeader,
  CButton
} from '@coreui/react'
import StudentfeeForm from'./FeeForm'
import StudentfeeTable from'./FeeTable'
import Header from './../setting/Stage/Header';
import StaffDashboardDefault from '../staff/StaffDashboardDefault';


const Studentfee = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [started, setStarted] = useState()
  const [ended, setEnded] = useState()

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET STUDENTFEES PER SCHOOL
  useEffect(() => {
    if(props.user.activeterm !== undefined && props.user.activeterm.hasOwnProperty('id') && parseInt(props.user.activeterm.id) > 0)
    { 
     let params = {
      data:JSON.stringify(
      {
          'sessionid':props.user.activeterm.sessionid
      }),
      cat:'studentfees',
      table:'studentfees',
      narration:'get studentfees'
      }
      props.getStudentfees(params)
    }
    
  }, [props.user.activeterm])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setCollapse(true);
  }

  const onDelete = (rw, dt) =>{
    
  }
  
 

  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = () =>{
    setCollapse(false)
  }
 
  let data = props.studentfees.studentfees && Array.isArray(props.studentfees.studentfees) ? props.studentfees.studentfees.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
     <>
     <CCollapse show={collapse}>
            <StudentfeeForm 
                id={id}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    <CRow>
      <CCol >
        <CCard>
          <StaffDashboardDefault />
              <CCardHeader>
          <CRow>
          <CCol xs={2} sm="1">
                <img
                    src={process.env.PUBLIC_URL + props.icon}
                    height='40px'
                />
          </CCol>
            <CCol xs={6} sm="7">
            <h4 id="traffic" className="card-title mb-0">{props.title}</h4>
            <div className="small text-muted">{props.school != undefined && props.school.hasOwnProperty('name') && props.school.name ? props.school.name: <i>No school active</i>}</div>
            </CCol>
            <CCol xs={4} sm="4" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary" 
                  onClick={()=>toggle()}
                  className="float-right">
                <i className='fa fa-plus'></i>
              </CButton>
            </CCol>
          </CRow>
</CCardHeader>
         <CCardBody className='table-responsive'>
            <StudentfeeTable  
                data={data}
                title={'Fees Payment'}
                editer={true}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        
    </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({
  studentfees : state.studentfeeReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getStudentfees,
  updateStudentfee,
  deleteStudentfee
})(Studentfee)
