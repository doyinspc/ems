import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getSchools, getSchool, deleteSchool} from './../../../actions/setting/school';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import SchoolForm from'./../Form/School'
import SchoolTable from'./../Table/School'
import Header from './Header';


const School = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    let params = {
      data:JSON.stringify({}),
      cat:'all',
      table:'schools',
      narration:'get schools'
  }
    props.getSchools(params)
    
  }, [])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }
 
  let data = props.schools.schools && Array.isArray(props.schools.schools) ? props.schools.schools.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
         <CCollapse show={collapse}>
            <SchoolForm 
                id={id}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
            <SchoolTable  
                data={data}
                editer={props.edits}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        

    </CRow>
  )
}
const mapStateToProps = (state) =>({
  schools : state.schoolReducer
})
export default connect(mapStateToProps, {
  getSchools,
  deleteSchool
})(School)
