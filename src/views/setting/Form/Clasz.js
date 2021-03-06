import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerClasz, updateClasz, deleteClasz} from './../../../actions/setting/clasz';
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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setElement } from '../../../actions/common';


const Clasz = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [typeid, setTypeid] = useState('')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setTypeid(dt.typeid);
      setElement('typeid', dt.typeid)
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      //fd.append('typeid', typeid);
      fd.append('table', 'claszs');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateClasz(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('typeid', props.user.activeschool.typeid);
        fd.append('cat', 'insert');
        props.registerClasz(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Clasz</small></h4>
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
              <CLabel htmlFor="nf-name">Clasz</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Science" 
                />
              <CFormText className="help-block">Please enter clasz name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Dept. Abbrv </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="SCI" 
                />
              <CFormText className="help-block">Please enter clasz abbrv (max 6 characters)</CFormText>
            </CFormGroup>
            <CFormGroup>
                  <CLabel htmlFor="typeid">Category</CLabel>
                  <CSelect
                      id="typeid" 
                      name="typeid"
                      onChange={(e)=>setTypeid(e.target.value)}
                      placeholder="" 
                    >
                      <option></option>
                      <option value="1">Secondary</option>
                      <option value="2">Primary</option>
                  </CSelect>
                  <CFormText className="help-block">Select Signatory</CFormText>
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
  claszs : state.claszReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerClasz,
  updateClasz,
  deleteClasz
})(Clasz)
