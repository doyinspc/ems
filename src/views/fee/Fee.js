import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentfees, updateStudentfee, deleteStudentfee} from './../../actions/student/studentfee';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import StudentfeeForm from'./FeeForm'
import StudentfeeTable from'./FeeTable'
import Header from './../setting/Stage/Header';


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
    console.log(props.user.activeterm)
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
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={'fa fa-money'}
              title={'Fees Payment' + props.user.activeterm.id} 
              school={props.user.activeschool} 
              toggle={toggle}
              />
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
        <CCollapse show={collapse}>
            <StudentfeeForm 
                id={id}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
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
