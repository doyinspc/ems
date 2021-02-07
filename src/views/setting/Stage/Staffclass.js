import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getClassstaffs, getClassstaff, deleteClassstaff, updateClassstaff} from '../../../actions/setting/classstaff';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import Swal from 'sweetalert'
import StaffClassForm from'./../Form/Staffclass'
import StaffClassTable from'./../Table/Staffclass'
import Header from './Header';


const Classstaff = (props) => {
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
        narration:'get classstaffs'
  
    }
    props.getClassstaffs(params)
    
  }, [props.pid])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = id =>{
    
    Swal("Are you sure you want to delete this information, You will not be able to restore the data."+{id})
    .then((value) => {
      if(value === true && parseInt(id) > 0)
      {
          let fd = new FormData();
          fd.append('id', id);
          fd.append('sessionid', props.pid);
          fd.append('table', 'staffclasss')
          fd.append('cat', 'deletes')
          props.deleteClassstaff(fd, id);
      }else{
        Swal(`Not deleted`);
      }
      
    });
    
  }
  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'updates');
    fd.append('sessionid', props.pid);
    fd.append('table', 'accessstaffclass');
    fd.append('narration', `activate and disable class ${nu}`);
    props.updateClassstaff(fd);

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

  let data = props.classstaffs.classstaffs && Array.isArray(props.classstaffs.classstaffs) ? props.classstaffs.classstaffs.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <StaffClassTable  
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
            <StaffClassForm 
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
  classstaffs : state.classstaffReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getClassstaffs,
  deleteClassstaff,
  updateClassstaff
})(Classstaff)
