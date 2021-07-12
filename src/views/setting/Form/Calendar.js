import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerSession, updateSession, deleteSession} from './../../../actions/setting/session';
import moment from 'moment';
import {
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { valdateString, valdateDate } from '../../../actions/common';


const Session = (props) => {
    const [collapse, setCollapse] = useState(false)
    const [id, setId] = useState('')
    const [namez, setNamez] = useState('')
    const [starts, setStarts] = useState(moment(new Date()).format("YY-MM-DD"))
    const [ends, setEnds] = useState()
    const [validate, setvalidate] = useState({})
  
  
    //CHANGE STATE AS EDIT OR ADD
    useEffect(() => {
      if(props.data.id && parseInt(props.data.id) > 0)
      {
        let dt = props.data
        setId(dt.id);
        setNamez(dt.name);
        setStarts(dt.started);
        setEnds(dt.ended);
      }else{
        setNamez('');
        setStarts('');
        setEnds('');
      }
      
    }, [props.data])
  
    
    const onReset = () =>setId(null);
    const onClose = () =>setCollapse(false);
  
    const handleSubmit = () =>{
      let arr = []
      let val = {...validate}
      if(valdateString(namez) === false){arr.push(1); val.namez = true}
      if(valdateDate(starts) === false){arr.push(1); val.starts = true}
      if(valdateDate(ends) === false){arr.push(1); val.ends = true}
      setvalidate(val)
      if(arr.length == 0)
      {
        let fd = new FormData();
        fd.append('name', namez);
        fd.append('started', starts);
        fd.append('ended', ends);
        fd.append('table', 'sessions');
        
        if(id && parseInt(id) > 0)
        {
          //UPDATE 
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateSession(fd)
          
        }else
        {
          //INSERT
          fd.append('schoolid', props.user.activeschool.id);
          fd.append('cat', 'insert');
          props.registerSession(fd)
        }
        onReset()
        setvalidate({})
      }
    }
 
   return (
    <CCol xl={12} style={{maxWidth:'400px'}}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Session</small></h4>
            </CCol>
            <CCol sm="6" className="d-md-block">
              <CButton  
                  color="danger"
                  onClick={onClose}
                  className="float-right"
              >
                <i className='fa fa-remove'></i>
              </CButton>
            </CCol>
          </CRow>
          
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-name">Session</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="name"
                  value={namez}
                  defaultValue={namez}
                  invalid={validate.namez || false}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="2020_2021" 
                />
              <CFormText className="help-block">Please enter session</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-starts">Session Starts </CLabel>
              <CInput 
                  type="date" 
                  id="nf-starts" 
                  name="starts"
                  defaultValue={starts}
                  invalid={validate.starts || false}
                  onChange={(e)=>setStarts(e.target.value)}
                  placeholder="date" 
                />
              <CFormText className="help-block">Please enter date session starts</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-ends">Session ends </CLabel>
              <CInput 
                  type="date" 
                  id="nf-ends" 
                  name="ends"
                  defaultValue={ends}
                  invalid={validate.ends || false}
                  onChange={(e)=>setEnds(e.target.value)}
                  placeholder="date" 
                />
              <CFormText className="help-block">Please enter date session ends</CFormText>
            </CFormGroup>
          </CForm>
        </CCardBody>
        
        <CCardFooter>
          <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          <CButton type="reset" onClick={onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
  </CCol>
 )
}
const mapStateToProps = (state) =>({
  sessions : state.sessionReducer,
  user : state.userReducer
})
export default connect(mapStateToProps, {
  registerSession,
  updateSession,
  deleteSession
})(Session)
