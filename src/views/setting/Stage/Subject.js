import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getSubjects, updateSubject, deleteSubject} from './../../../actions/setting/subject';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import SubjectForm from'./../Form/Subject'
import SubjectTable from'./../Table/Subject'
import Header from './Header';


const Subject = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET SUBJECTS PER SCHOOL
  useEffect(() => {
     let params = {
      data:JSON.stringify(
      {
          'is_delete':0
      }),
      cat:'selected',
      table:'subjects',
      narration:'get subjects'
        }
      props.getSubjects(params)
   
    
  }, [])

  
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
    fd.append('table', 'subjects');
    fd.append('narration', `activate ande disable subject ${nu}`);
    props.updateSubject(fd);

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
 
  let data = props.subjects.subjects && Array.isArray(props.subjects.subjects) ? props.subjects.subjects.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
           sid={props.sid}
           pid={props.pid}
           qid={props.qid}
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <SubjectTable  
                data={data}
                sid={props.sid}
                pid={props.pid}
                qid={props.qid}
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
            <SubjectForm 
                id={id}
                sid={props.sid}
                pid={props.pid}
                qid={props.qid}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  subjects : state.subjectReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getSubjects,
  updateSubject,
  deleteSubject
})(Subject)
