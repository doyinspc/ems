import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerMaintenanceunit, updateMaintenanceunit, deleteMaintenanceunit} from './../../../actions/setting/maintenanceunit';
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Maintenanceunit = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
    }else{
      setId(null);
      setNamez('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('table', 'maintenanceunits');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateMaintenanceunit(fd)
        
      }else
      {
        //INSERT
        fd.append('maintenanceid', props.pid)
        fd.append('cat', 'insert');
        props.registerMaintenanceunit(fd)
      }
      setId(null);
      setNamez('');
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Maintenanceunits</small></h4>
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
              <CLabel htmlFor="nf-name">Maintenanceunit Description</CLabel>
              <CTextarea 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Monitor students performane" 
                >
                  </CTextarea>
              <CFormText className="help-block">Please enter maintenanceunit description</CFormText>
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
  maintenanceunits : state.maintenanceunitReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerMaintenanceunit,
  updateMaintenanceunit,
  deleteMaintenanceunit
})(Maintenanceunit)
