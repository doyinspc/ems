import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerAccount, updateAccount, deleteAccount} from './../../../actions/setting/account';

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
import { valdateString } from '../../../actions/common';


const Account = (props) => {
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [validate, setvalidate] = useState({})

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
    }
    
  }, [props.data]) 

  const handleSubmit = () =>{

    let arr = []
    let val = {...validate}
    if(valdateString(namez) === false){arr.push(1); val.namez = true}
    if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}
    setvalidate(val)
    if(arr.length == 0)
    {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('table', 'accounts');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateAccount(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerAccount(fd)
      }
      
      setId(null);
      setNamez('');
      setAbbrv('');
      setvalidate({})
    }
  }
 
   return (
    <CCol xl={12}  style={{maxWidth:'400px'}} id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Account</small></h4>
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
          <CForm action="" method="post" id='form'>
            <CFormGroup>
              <CLabel htmlFor="nf-name">Account</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  defaultValue={namez}
                  invalid={validate.namez || false}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="First Bank" 
                />
              <CFormText className="help-block">Please enter account name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Account No. </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  defaultValue={abbrv}
                  invalid={validate.abbrv || false}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="000000000" 
                />
              <CFormText className="help-block">Please enter account number</CFormText>
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
  accounts : state.accountReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerAccount,
  updateAccount,
  deleteAccount
})(Account)
