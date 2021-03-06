import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerExpense, updateExpense, deleteExpense} from './../../../actions/setting/expense';
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
import { valdateDate, valdateNumber, valdateString } from '../../../actions/common';


const Expense = (props) => {
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [code, setcode] = useState('')
  const [validate, setvalidate] = useState({})

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setcode(dt.code);
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
      setcode('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    let arr = []
      let val = {...validate}
      if(valdateString(namez) === false){arr.push(1); val.namez = true}else{val.namez = false}
      if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}else{val.abbrv = false}
      if(valdateString(code) === false){arr.push(1); val.code = true}else{val.code = false}
      setvalidate(val)
      if(arr.length == 0)
      {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('code', code);
      fd.append('parent_id', props.parent);
      fd.append('table', 'expenses');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateExpense(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerExpense(fd)
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
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Expense</small></h4>
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
              <CLabel htmlFor="nf-name">Expense</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Operational Expenses" 
                />
              <CFormText className="help-block">Please enter expense name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Expense Abbrv </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="OPEXP" 
                />
              <CFormText className="help-block">Please enter expense abbrv (max 6 characters)</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-code">Expense Code </CLabel>
              <CInput 
                  type="text" 
                  id="nf-code" 
                  name="code"
                  value={code}
                  onChange={(e)=>setcode(e.target.value)}
                  placeholder="0000" 
                />
              <CFormText className="help-block">Please enter expense code</CFormText>
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
  expenses : state.expenseReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerExpense,
  updateExpense,
  deleteExpense
})(Expense)
