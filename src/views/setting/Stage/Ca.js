import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getCas, getCa, deleteCa, updateCa} from './../../../actions/setting/ca';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import CaForm from'./../Form/Ca'
import CaTable from'./../Table/Ca'
import Header from './Header';
import { Redirect } from 'react-router-dom';


const Ca = (props) => {
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
            'typeid':props.did
        }),
        cat:'selected',
        table:'cas',
        narration:'get cas'

    }
    props.getCas(params)
    
  }, [props.pid, props.did])

  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'claszs');
    fd.append('narration', `activate ande disable clasz ${nu}`);
    props.updateCa(fd);

  }

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
  let arr = {
      1:'Academic Assessments',
      2:'Behavioral Assessment ',
      3:'Skills Assessment'
  }

  //GET TERM NAME
  let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

  let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
  let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'

  let data = props.cas.cas && Array.isArray(props.cas.cas) ? props.cas.cas.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      {sess === 'None' ? <Redirect to={`/setting/${props.pid}/0/0/0/0/0/0`} /> :''}
      <CCol >
        <CCard>
          <Header 
              sid={props.sid}
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              kid={props.kid}
              icon={props.para.icon}
              title={sess +" "+tems+" Term : "+arr[props.did]}
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <CaTable  
                sid={props.sid}
                pid={props.pid}
                qid={props.qid}
                did={props.did}
                kid={props.kid}
                data={data}
                editer={true}
                submenu={props.para.submenu}
                onActivate={onActivate}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <CaForm 
                sid={props.sid}
                pid={props.pid}
                qid={props.qid}
                did={props.did}
                kid={props.kid}
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
  cas : state.caReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getCas,
  deleteCa,
  updateCa
})(Ca)
