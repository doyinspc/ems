import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getCaunits, getCaunit, deleteCaunit, updateCaunit} from './../../../actions/setting/caunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import CaunitForm from'./../Form/Caunit'
import CaunitTable from'./../Table/Caunit'
import Header from './Header';


const Caunit = (props) => {
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
            'caid':props.kid
        }),
        cat:'select',
        table:'caunits',
        narration:'get caunits'
  
    }
    props.getCaunits(params)
    
  }, [props.kid])

  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'caunits');
    fd.append('narration', `activate ande disable CA unit item ${rw} - ${nu}`);
    props.updateCaunit(fd);

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

  let cz = props.cas.filter(rw=>parseInt(rw.id) === parseInt(props.kid));
  let czs = cz && Array.isArray(cz) && cz.length > 0 ? cz[0].name : 'None'

  let data = props.caunits.caunits && Array.isArray(props.caunits.caunits) ? props.caunits.caunits.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              sid={props.sid}
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              kid={props.kid}
              icon={props.para.icon}
              title={sess +" "+tems+": "+arr[props.did]+" "+czs}
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <CaunitTable  
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
            <CaunitForm 
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
  caunits : state.caunitReducer,
  cas : state.caReducer.cas,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getCaunits,
  deleteCaunit,
  updateCaunit
})(Caunit)
