import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getTerms, getTerm, deleteTerm, setActiveTerm} from './../../../actions/setting/term';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import TermForm from'./../Form/Term'
import TermTable from'./../Table/Term'
import Header from './Header';


const Term = (props) => {
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
            'sessionid':props.pid
        }),
        cat:'selected',
        table:'terms',
        narration:'get terms'
    }
    props.getTerms(params)
    
  }, [props.pid])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onActivate = (rw, num, sch) =>{
  
        let nu = parseInt(num) === 0 ? 1 : 0;
        let fd = new FormData();
        fd.append('id', rw);
        fd.append('schoolid', sch);
        fd.append('sessionid', props.pid);
        fd.append('is_active', nu);
        fd.append('cat', 'updateterm');
        fd.append('table', 'terms');
        fd.append('narration', `activate or deactivate term ${nu}`);

        props.setActiveTerm(fd);

  }

  
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  //GET SESSION NAME
  let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

  let data = props.terms.terms && Array.isArray(props.terms.terms) ? props.terms.terms.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              icon={props.para.icon}
              title={sess} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <TermTable  
                pid={props.pid}
                data={data}
                editer={true}
                submenu={props.para.submenu}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
                onActivate={onActivate}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <TermForm 
                pid={props.pid}
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
  terms : state.termReducer,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getTerms,
  deleteTerm,
  setActiveTerm
})(Term)
