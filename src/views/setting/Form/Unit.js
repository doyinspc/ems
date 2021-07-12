import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerUnit, updateUnit, deleteUnit} from './../../../actions/setting/unit';
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
import { valdateString } from '../../../actions/common';


const Unit = (props) => {

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
    if(valdateString(namez) === false){arr.push(1); val.namez = true}else{val.namez = false}
    if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}else{val.abbrv = false}
    
    setvalidate(val)
   if(arr.length === 0)
    {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('table', 'units');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateUnit(fd)
        
      }else
      {
        //INSERT
        fd.append('departmentid', props.pid);
        fd.append('cat', 'insert');
        props.registerUnit(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
      setvalidate({})
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Units</small></h4>
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
              <CLabel htmlFor="nf-name">Unit</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  defaultValue={namez}
                  invalid={validate.namez || false}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Life Science" 
                />
              <CFormText className="help-block">Please enter unit name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Abbrv. </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  defaultValue={abbrv}
                  invalid={validate.abbrv || false}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="LIFE" 
                />
              <CFormText className="help-block">Please enter unit abbrv (max 6 characters)</CFormText>
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
  units : state.unitReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerUnit,
  updateUnit,
  deleteUnit
})(Unit)
