import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerGrade, updateGrade, deleteGrade} from './../../../actions/setting/grade';
import Select from 'react-select'
import {getClaszs} from './../../../actions/setting/clasz';
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


const Grade = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [claszid, setClaszid] = useState([])
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      let ar = dt.claszid !== undefined && dt.claszid.length > 0 ? JSON.parse(dt.claszid) : []
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setClaszid(ar);
    }else{
      setId(null);
      setClaszid([]);
      setNamez('');
      setAbbrv('');
    }
    
  }, [props.data])
  
  useEffect(() => {
    if(props.activeschool !== undefined && parseInt(props.activeschool.id) > 0){
        let params1 = {
          data:JSON.stringify(
          {
              'typeid': props.activeschool.typeid,
              'is_active':0
          }),
          cat:'select',
          table:'clasz',
          narration:'get clasz'
          }
          props.getClaszs(params1)

    }
  }, [props.activeschool]) 

  const handleSubmit = () =>{
    
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('claszid', JSON.stringify(claszid));
      fd.append('table', 'grades');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateGrade(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerGrade(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
    }
  }

  const handleClass = (event) =>{
    setClaszid(event)
  }

  let claszarray = props.claszs.claszs && Array.isArray(props.claszs.claszs) ? props.claszs.claszs : [];
  let clarray = [];
  claszarray.forEach(rw =>{
    let ar = {}
      ar['label'] = rw.abbrv;
      ar['value'] = rw.id;
      clarray.push(ar)
  })
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Grade</small></h4>
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
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <Select
                      closeMenuOnSelect={false}
                      value={claszid}
                      isMulti
                      options={clarray}
                      onChange={handleClass}
                    />
                  
                  <CFormText className="help-block">Select the class or classes</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-name">Grade</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="West Africa Examination Council" 
                />
              <CFormText className="help-block">Please enter grade name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Grade Abbrv </CLabel>
              <CInput 
                  type="text" 
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  onChange={(e)=>setAbbrv(e.target.value)}
                  placeholder="WAEC" 
                />
              <CFormText className="help-block">Please enter grade abbrv (max 6 characters)</CFormText>
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
  grades : state.gradeReducer,
  user:state.userReducer,
  claszs : state.claszReducer
})
export default connect(mapStateToProps, {
  registerGrade,
  updateGrade,
  deleteGrade,
  getClaszs
})(Grade)
