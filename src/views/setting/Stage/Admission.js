import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getAdmissions, updateAdmission, deleteAdmission} from './../../../actions/setting/admission';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import AdmissionForm from'./../Form/Admission'
import AdmissionTable from'./../Table/Admission'
import Header from './Header';


const Admission = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET ADMISSIONS PER SCHOOL
  useEffect(() => {
    if(props.activeschool !== undefined && props.activeschool.hasOwnProperty('id') && parseInt(props.activeschool))
    {
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.activeschool.id
      }),
      cat:'select',
      table:'admissions',
      narration:'get admissions'
        }
      props.getAdmissions(params)
    }
    
  }, [props.activeschool])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setCollapse(true);
  }
  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'admissions');
    fd.append('narration', `activate ande disable admission ${nu}`);
    props.updateAdmission(fd);

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
 
  let data = props.admissions.admissions && Array.isArray(props.admissions.admissions) ? props.admissions.admissions.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <AdmissionTable  
                data={data}
                title={props.para.name} 
                submenu={props.para.submenu}
                editer={true}
                onActivate={(rw, num)=>onActivate(rw, num)}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <AdmissionForm 
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
  admissions : state.admissionReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getAdmissions,
  updateAdmission,
  deleteAdmission
})(Admission)
