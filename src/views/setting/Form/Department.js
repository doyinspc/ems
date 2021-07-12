import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerDepartment, updateDepartment, deleteDepartment} from './../../../actions/setting/department';
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
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { departmentstate, valdateNumber, valdateString } from '../../../actions/common';


const Department = (props) => {
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [grp, setGrp] = useState(0)
  const [validate, setvalidate] = useState({})

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setGrp(dt.grp);
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
      setGrp(0);
    }
  }, [props.data])

  const handleSubmit = () =>{
    let arr = []
    let val = {...validate}
    if(valdateString(namez) === false){arr.push(1); val.namez = true}else{val.namez = false}
    if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}else{val.abbrv = false}
    if(valdateNumber(grp) === false){arr.push(1); val.grp = true}else{val.grp = false}
    setvalidate(val)
   if(arr.length === 0)
    {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('grp', grp);
      fd.append('abbrv', abbrv);
      fd.append('table', 'departments');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateDepartment(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerDepartment(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
      setGrp(0);
      setvalidate({})
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Department</small></h4>
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
              <CLabel htmlFor="nf-name">Department</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  defaultValue={namez}
                  invalid={validate.namez || false}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Science" 
                />
              <CFormText className="help-block">Please enter department name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Dept. Abbrv </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  defaultValue={abbrv}
                  invalid={validate.abbrv || false}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="SCI" 
                />
              <CFormText className="help-block">Please enter department abbrv (max 6 characters)</CFormText>
            </CFormGroup>
            <CFormGroup>
                <CLabel htmlFor="nf-grp">Category </CLabel>
                <CSelect
                    type="text" 
                    id="nf-grp" 
                    name="grp"
                    value={grp}
                    defaultValue={grp}
                    invalid={validate.grp || false}
                    onChange={(e)=>setGrp(e.target.value)}
                  >
                    <option></option>
                    {
                      Object.keys(departmentstate).map((prp, ind)=>(
                        <option value={prp} key={ind}>{departmentstate[prp]}</option>
                      ))
                    }
                </CSelect>
                <CFormText className="help-block">Select Category</CFormText>
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
  departments : state.departmentReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerDepartment,
  updateDepartment,
  deleteDepartment
})(Department)
