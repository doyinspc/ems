import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffclasss, getStaffclass, deleteStaffclass, updateStaffclass} from './../../../actions/staff/staffclass';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import StaffclassForm from'./../Form/Staffclass'
import StaffclassTable from'./../Table/Staffclass'
import Header from './Header';


const Staffclass = (props) => {
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
            'termid':props.qid,
            'sessionid':props.pid,
            'grp':1
        }),
        cat:'staffclass',
        table:'accessstaffclass',
        narration:'get staffclasss'
  
    }
    props.getStaffclasss(params)
    
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
    props.updateStaffclass(fd);

  }
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  
  //GET TERM NAME
  let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

  let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
  let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'

  let data = props.staffclasss.staffclasss && Array.isArray(props.staffclasss.staffclasss) ? props.staffclasss.staffclasss.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              icon={props.para.icon}
              title={sess +" "+tems+" Term : Class Allocation"} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <StaffclassTable  
                pid={props.pid}
                qid={props.qid}
              did={props.did}
                data={data}
                editer={true}
                submenu={props.para.submenu}
                onActivate={(id, rw)=>onActivate(id, rw)}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <StaffclassForm 
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
  staffclasss : state.staffclassReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getStaffclasss,
  deleteStaffclass,
  updateStaffclass
})(Staffclass)
