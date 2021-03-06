import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffsubjects, getStaffsubjectsummary, deleteStaffsubject, updateStaffsubject} from './../../../actions/staff/staffsubject';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import StaffsubjectForm from'./../Form/Staffsubject'
import StaffsubjectTable from'./../Table/Staffsubject'
import Header from './Header';


const Staffsubject = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }
  
  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'termid':props.termid,
            'sessionid':props.sessionid,
            'grp':2
        }),
        cat:'staffclass',
        table:'accessstaffsubject',
        narration:'get staffsubjects'
  
    }
    props.getStaffsubjectsummary(params)
    
  }, [props.pid])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'updates');
    fd.append('sessionid', props.pid);
    fd.append('table', 'accessstaffclass');
    fd.append('narration', `activate ande disable class ${nu}`);
    props.updateStaffsubject(fd);

  }
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  
  //GET TERM NAME
  let ses = Array.isArray(props.sessions) ? props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid)):[];
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

  let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
  let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'

  let data = props.staffsubjects.staffsubjectsummary && Array.isArray(props.staffsubjects.staffsubjectsummary) ? props.staffsubjects.staffsubjectsummary.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              icon={props.para.icon}
              editer={false}
              title={props.title.name+": Subjects Allocation"} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <StaffsubjectTable  
                pid={props.pid}
                qid={props.qid}
                did={props.did}
                data={data}
                editer={false}
                submenu={props.para.submenu}
                onActivate={(id, rw)=>onActivate(id, rw)}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <StaffsubjectForm 
                pid={props.pid}
                qid={props.qid}
                did={props.did}
                id={id}
                school={props.school}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions
})
export default connect(mapStateToProps, {
  getStaffsubjects,
  getStaffsubjectsummary,
  deleteStaffsubject,
  updateStaffsubject
})(Staffsubject)
