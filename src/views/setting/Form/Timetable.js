import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerTimetable, updateTimetable, deleteTimetable} from './../../../actions/setting/timetable';
import { useHistory, useLocation } from 'react-router-dom'
import {getClaszs} from './../../../actions/setting/clasz';
import {getTerms} from './../../../actions/setting/term';
import {getSessions} from './../../../actions/setting/session';
import Select from 'react-select'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CFormText,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Timetable = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [sessionid, setsessionid] = useState('')
  const [termid, settermid] = useState('')
  const [clasz, setclasz] = useState([])
  const [periods, setperiods] = useState([])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {    
        let params = {
          data:JSON.stringify({
            'schoolid':props.user.activeschool.id
          }),
          cat:'select',
          table:'sessions',
          narration:'get sessions'
      }
        props.getSessions(params)
    }
    
  }, [props.user.activeschool])

  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'sessionid':sessionid
      }),
      cat:'select',
      table:'terms',
      narration:'get terms'

  }
  props.getTerms(params1)
    
  }, [sessionid, props.user.activeschool.id])
 
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setsessionid(dt.sessionid);
      settermid(dt.termid);
      setclasz(dt.clasz);
      setperiods(dt.periods);
    }else{
      setId(null); 
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    
      let fd = new FormData();
      fd.append('sessionid', sessionid);
      fd.append('termid', termid);
      fd.append('clasz', clasz);
      fd.append('periods', periods);
      fd.append('table', 'timetables');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateTimetable(fd)
        
      }else
      {
        //INSERT
        fd.append('cat', 'insert');
        props.registerTimetable(fd)
      }
      
  }
 
 ///options create
let sessionarray = props.sessions.sessions && Array.isArray(props.sessions.sessions) ? props.sessions.sessions : [];
let session_array = sessionarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
});

let termarray = props.terms.terms && Array.isArray(props.terms.terms) ? props.terms.terms : [];
let term_array = termarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

  let claszarray = props.claszs.claszs && Array.isArray(props.claszs.claszs) ? props.claszs.claszs : [];
  let clarray = [];
  claszarray.forEach(rw =>{
    let ar = {}
      ar['label'] = rw.abbrv;
      ar['value'] = rw.id;
      clarray.push(ar)
  })

  const handleClass = (event) =>{
    setclasz(event)

  }
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Timetable</small></h4>
            </CCol>
            <CCol sm="6" className="d-md-block">
              <CButton  
                  color="danger" 
                  onClick={props.onClose}
                  className="float-right">
                <i className='fa fa-remove'></i>
              </CButton>
            </CCol>
          </CRow>
          
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
          <CFormGroup>
                  <CLabel htmlFor="nf-sessionid">Session </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-sessionid" 
                      name="sessionid"
                      defaultValue={sessionid}
                      onChange={(e)=>setsessionid(e.target.value)}
                       
                    >
                      {id && parseInt(id) > 0 ? <option value={props.data.sessionid}>{props.data.sessionname}</option>:<option></option>}
                      {session_array}
                  </CSelect>
                  <CFormText className="help-block">Select the session</CFormText>
                </CFormGroup>
          <CFormGroup>
                  <CLabel htmlFor="nf-termid">Term </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-termid" 
                      name="termid"
                      defaultValue={termid}
                      onChange={(e)=>settermid(e.target.value)}
                       
                    >
                      {id && parseInt(id) > 0 ? <option value={props.data.termid}>{props.data.termname}</option>:<option></option>}
                      {term_array}
                  </CSelect>
                  <CFormText className="help-block">Select the Term</CFormText>
            </CFormGroup>
          <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <Select
                      closeMenuOnSelect={false}
                      value={clasz}
                      isMulti
                      options={clarray}
                      onChange={handleClass}
                    />
                  
                  <CFormText className="help-block">Select the class or classes</CFormText>
            </CFormGroup>
            </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          <CButton type="reset" onClick={props.onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
  </CCol>
    )
}
const mapStateToProps = (state) =>({
  timetables : state.timetableReducer,
  user:state.userReducer,
  claszs : state.claszReducer,
  sessions : state.sessionReducer,
  terms : state.termReducer,
})
export default connect(mapStateToProps, {
  registerTimetable,
  updateTimetable,
  deleteTimetable,
  getSessions,
  getTerms,
  getClaszs
})(Timetable)
