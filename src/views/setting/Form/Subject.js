import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerSubject, updateSubject, deleteSubject} from './../../../actions/setting/subject';
import {getDepartments} from './../../../actions/setting/department';
import {getUnits} from './../../../actions/setting/unit';
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
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setElement } from '../../../actions/common';


const Subject = (props) => {
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [departmentid, setDepartmentid] = useState(null)
  const [unitid, setUnitid] = useState(null)
  const [departmentname, setDepartmentname] = useState(null)
  const [unitname, setUnitname] = useState(null)
  //GET DEPARTMENTS PER SCHOOL
  useEffect(() => {

     let params = {
      data:JSON.stringify(
      {
          'is_active':0
      }),
      cat:'selected',
      table:'departments',
      narration:'get departments'
        }
      props.getDepartments(params)

      let params1 = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'units',
        narration:'get units'
          }
        props.getUnits(params1)
    
    
  }, [])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setDepartmentid(dt.departmentid);
      setUnitid(dt.unitid);
      setDepartmentname(dt.departmentname);
      setUnitname(dt.unitname);
      setElement('nf-department', dt.departmentid)
      setElement('nf-unit', dt.unitid)
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
      setDepartmentid(null);
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('departmentid', departmentid);
      fd.append('unitid', unitid);
      fd.append('table', 'subjects');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateSubject(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerSubject(fd)
      }
      setId(null);
      
    }
  }

  let subs = props.departments.departments;
  let sub = subs !== undefined && Array.isArray(subs) ? subs.filter(rw=>parseInt(rw.is_active) == 0).map((row, ind)=>{
  return <option key={ind} value={row.id}>{row.name}</option>
  }):'';

  let unis = props.units.units;
  let uni = unis !== undefined && Array.isArray(unis) ? unis.filter(rw=>parseInt(rw.is_active) == 0 && parseInt(rw.departmentid) === parseInt(departmentid)).map((row, ind)=>{
  return <option key={ind} value={row.id}>{row.name}</option>
  }):'';
  
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Subject</small></h4>
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
              <CLabel htmlFor="nf-name">Subject</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Mathematics" 
                />
              <CFormText className="help-block">Please enter subject name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Abbrv </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="MATHS" 
                />
              <CFormText className="help-block">Please enter subject abbrv (max 6 characters)</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-department">Department </CLabel>
              <CSelect  
                  id="nf-department" 
                  name="department"
                  value={departmentid}
                  onChange={(e)=>setDepartmentid(e.target.value)}
                >
                  {id && parseInt(id) > 0 ?<option value={departmentid}>{departmentname})</option>: <option></option>}
                 {sub}
              </CSelect>
              <CFormText className="help-block">Please select department</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-unit">Unit </CLabel>
              <CSelect  
                  id="nf-unit" 
                  name="unit"
                  value={unitid}
                  onChange={(e)=>setUnitid(e.target.value)}
                >
                {id && parseInt(id) > 0 ?<option value={unitid}>{unitname}</option>: <option></option>}
                 {uni}
              </CSelect>
              <CFormText className="help-block">Please select unit</CFormText>
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
  subjects : state.subjectReducer,
  departments : state.departmentReducer,
  units : state.unitReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerSubject,
  updateSubject,
  deleteSubject,
  getDepartments,
  getUnits
})(Subject)
