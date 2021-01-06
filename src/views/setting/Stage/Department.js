import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getDepartments, updateDepartment, deleteDepartment} from './../../../actions/setting/department';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import DepartmentForm from'./../Form/Department'
import DepartmentTable from'./../Table/Department'
import Header from './Header';


const Department = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }
 
  //GET DEPARTMENTS PER SCHOOL
  useEffect(() => {
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id
      }),
      cat:'select',
      table:'departments',
      narration:'get departments'
      }
      props.getDepartments(params)
    }
    
  }, [props.user.activeschool])

  
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
    fd.append('table', 'departments');
    fd.append('narration', `activate ande disable department ${nu}`);
    props.updateDepartment(fd);

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
 
  let data = props.departments.departments && Array.isArray(props.departments.departments) ? props.departments.departments.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={props.para.icon}
              sid={props.sid}
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              kid={props.kid}
              title={props.para.name} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <DepartmentTable  
                data={data}
                sid={props.sid}
                pid={props.pid}
                qid={props.qid}
                did={props.did}
                kid={props.kid}
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
            <DepartmentForm 
              sid={props.sid}
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              kid={props.kid}
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
  departments : state.departmentReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getDepartments,
  updateDepartment,
  deleteDepartment
})(Department)
