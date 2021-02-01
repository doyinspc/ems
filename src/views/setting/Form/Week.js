import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerWeek, updateWeek, deleteWeek} from './../../../actions/setting/week';
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Week = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [closedate, setClosedate] = useState('')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setStartdate(dt.started);
      setEnddate(dt.ended);
      setClosedate(dt.closed);
    }else{
      setId(null);
      setNamez('');
      setStartdate('');
      setEnddate('');
      setClosedate('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(namez.length > 0 && parseInt(props.sid) > 0)
    {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('started', startdate);
      fd.append('ended', enddate);
      fd.append('closed', closedate);
      fd.append('table', 'weeks');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateWeek(fd)
        
      }else
      {
        //INSERT
        fd.append('termid', props.sid);
        fd.append('cat', 'insert');
        props.registerWeek(fd)
      }
      setId(null);
      setNamez('');
      setStartdate('');
      setEnddate('');
      setClosedate('');
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Week</small></h4>
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
              <CLabel htmlFor="nf-name">Week</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Week One" 
                />
              <CFormText className="help-block">Please enter week name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-startdate">Week Starts </CLabel>
              <CInput 
                  type="date" 
                  id="nf-startdate" 
                  name="startdate"
                  value={startdate}
                  onChange={(e)=>setStartdate(e.target.value)}
                  placeholder="" 
                />
              <CFormText className="help-block">Week starts</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-enddate">Week  Ends </CLabel>
              <CInput 
                  type="date" 
                  id="nf-enddate" 
                  name="enddate"
                  value={enddate}
                  onChange={(e)=>setEnddate(e.target.value)}
                  placeholder="" 
                />
              <CFormText className="help-block">Week ending</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-closedate">Close Submission</CLabel>
              <CInput 
                  type="datetime-local" 
                  id="nf-closedate" 
                  name="closedate"
                  value={closedate}
                  onChange={(e)=>setClosedate(e.target.value)}
                  placeholder="" 
                />
              <CFormText className="help-block">Date to stop submission of lesson plans</CFormText>
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
  weeks : state.weekReducer,
  user:state.userReducer,
  
})
export default connect(mapStateToProps, {
  registerWeek,
  updateWeek,
  deleteWeek
})(Week)
