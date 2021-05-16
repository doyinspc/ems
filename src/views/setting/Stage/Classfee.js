import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getClassfees, getClassfee, deleteClassfee, updateClassfee} from './../../../actions/setting/classfee';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ClassfeeForm from'./../Form/Classfee'
import ClassfeeTable from'./../Table/Classfee'
import Header from './Header';


const Classfee = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  let groupid = 6;
  const toggle = () => {
    setCollapse(!collapse)
  }
  
  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'termid':props.qid
        }),
        cat:'selected',
        table:'classfees',
        narration:'get classfees'
  
    }
    props.getClassfees(params)
    
  }, [props.pid, groupid])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (data) =>{
    let fd = new FormData();
       fd.append('id', data.id)
       fd.append('table', 'classfees')
       fd.append('cat', 'delete')
       props.deleteClassfee(fd,data)
    }
  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'classfees');
    fd.append('narration', `activate and disable class ${nu}`);
    props.updateClassfee(fd);

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

  let data = props.classfees.classfees && Array.isArray(props.classfees.classfees) ? props.classfees.classfees.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <ClassfeeTable  
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
            <ClassfeeForm 
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
  classfees : state.classfeeReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getClassfees,
  deleteClassfee,
  updateClassfee
})(Classfee)
