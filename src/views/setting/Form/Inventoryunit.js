import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerInventoryunit, updateInventoryunit, deleteInventoryunit} from './../../../actions/setting/inventoryunit';
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


const Inventoryunit = (props) => {
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
      fd.append('table', 'inventoryunits');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateInventoryunit(fd)
        
      }else
      {
        //INSERT
        fd.append('inventoryid', props.pid)
        fd.append('cat', 'insert');
        props.registerInventoryunit(fd)
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
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Inventoryunits</small></h4>
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
              <CLabel htmlFor="nf-name">Inventoryunit Description</CLabel>
              <CTextarea 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="Monitor students performane" 
                >
                  </CTextarea>
              <CFormText className="help-block">Please enter inventoryunit description</CFormText>
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
  inventoryunits : state.inventoryunitReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerInventoryunit,
  updateInventoryunit,
  deleteInventoryunit
})(Inventoryunit)
