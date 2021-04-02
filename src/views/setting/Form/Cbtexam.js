import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerCbtexam, updateCbtexam, deleteCbtexam} from './../../../actions/setting/cbtexam';
import { useHistory, useLocation } from 'react-router-dom'
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
  CTextarea,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {setElement} from './../../../actions/common'


const Cbtexam = (props) => {
  const [id, setId] = useState(null)
  const [claszid, setClaszid] = useState(null)
  const [subjectid, setSubjectid] = useState(null)
  const [noq, setNoq] = useState(null)
  const [teststart, setteststart] = useState(null)
  const [testend, settestend] = useState(null)
  const [testtime, settesttime] = useState(null)
  
  //GET CBTEXAMS PER SCHOOL
 

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data !== undefined && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      
      setId(dt.id);
      setClaszid(dt.itemid);
      setSubjectid(dt.itemid1);
      setNoq(dt.noq);
      settesttime(dt.testtime);
      setteststart(dt.teststart);
      settestend(dt.testend);
      setElement('nf-subjectid', dt.itemid1 )
      setElement('nf-claszid', dt.itemid )
    }else{
      setId(null);
      setNoq('');
      setSubjectid('');
      setClaszid('');
      settesttime('');
      setteststart('');
      settestend('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    
      let fd = new FormData();
      fd.append('claszid', claszid);
      fd.append('subjectid', subjectid);
      fd.append('testtime', testtime);
      fd.append('teststart', teststart);
      fd.append('testend', testend);
      fd.append('noq', noq);
      fd.append('table', 'cbtexams');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateCbtexam(fd)
        
      }else if(props.pid && parseInt(props.pid) > 0)
      {
        //INSERT
        fd.append('cbtid', props.pid);
        fd.append('cat', 'insert');
        props.registerCbtexam(fd)
      }
      //props.onReset()
    
  }

  let claszarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[1] : [];
  let clarray = Array.isArray(claszarray) ? claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  }):<option></option>

  let subjectarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[2] : [];
  let subarray = Array.isArray(subjectarray) ? subjectarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  }):<option></option>

  
   return (
    <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Subjects Allocation</small></h4>
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
                  <CLabel htmlFor="nf-subjectid">Subject </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-subjectid" 
                      name="subjectid"
                      defaultValue={subjectid}
                      onChange={(e)=>setSubjectid(e.target.value)}
                      placeholder="" 
                    >
                      {subarray}
                  </CSelect>
                  <CFormText className="help-block">Select the subject</CFormText>
                </CFormGroup>
             <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-claszid" 
                      name="claszid"
                      onChange={(e)=>setClaszid(e.target.value)}
                      placeholder="" 
                    >
                      {clarray}
                  </CSelect>
                  <CFormText className="help-block">Select the class</CFormText>
                </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-noq">No of Questions</CLabel>
              <CInput 
                  type="number" 
                  id="nf-noq" 
                  name="noq"
                  value={noq}
                  onChange={(e)=>setNoq(e.target.value)}
                  placeholder="0" 
                />
              <CFormText className="help-block">Please enter number of question</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-testtime">Test Duration in minutes</CLabel>
              <CInput 
                  type="number" 
                  id="nf-testtime" 
                  name="testtime"
                  value={testtime}
                  onChange={(e)=>settesttime(e.target.value)}
                  placeholder="0" 
                />
              <CFormText className="help-block">Please enter duration of exam in minutes</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-teststart">Test Start</CLabel>
              <CInput 
                  type="datetime-local" 
                  id="nf-teststart" 
                  name="teststart"
                  value={teststart}
                  onChange={(e)=>setteststart(e.target.value)}
                  placeholder="0" 
                />
              <CFormText className="help-block">When should the test start?</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-testend">Test End</CLabel>
              <CInput 
                  type="datetime-local" 
                  id="nf-testend" 
                  name="testend"
                  value={testend}
                  onChange={(e)=>settestend(e.target.value)}
                  placeholder="0" 
                />
              <CFormText className="help-block">When should the test end?</CFormText>
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
  cbtexams : state.cbtexamReducer,
  user:state.userReducer,
  activeschool:state.userReducer.activeschool,
  claszs : state.claszReducer.claszs,
  subjects : state.subjectReducer.subjects,
})
export default connect(mapStateToProps, {
  registerCbtexam,
  updateCbtexam,
  deleteCbtexam
})(Cbtexam)
