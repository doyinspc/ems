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
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { callError, callSuccess, inventorytypez } from '../../../actions/common';


const Inventoryunit = (props) => {

  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('');
  const [units, setunits] = useState('')
  const [typez, settypez] = useState('');
  const [subs, setsubs] = useState(0)
  const [subtitle, setsubtitle] = useState('No title')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setunits(dt.units);
      settypez(dt.types);
      setsubs(dt.ranges);
      let y = inventorytypez.filter(rw=>rw.id == dt.types );
      if(Array.isArray(y) && y.length == 1){
        let y1 = y[0];
        setsubtitle(y1.extra);
      }
    }else{
      setId(null);
      setNamez('');
      settypez('');
      setunits('');
      setsubs(0);
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    let err = [];
    if(namez.length > 0){}else{err.push('Please give a name')}
    if(units.length > 0){}else{err.push('Please state a unit of measurement')}
    if(subs > 0){}else{err.push('Please input a year of percentage')}
    if(typez > 0){}else{err.push('Please determine the nature of the stated item')}
    if(err.length == 0){

      let fd = new FormData();

      fd.append('name', namez);
      fd.append('types', typez);
      fd.append('ranges', subs);
      fd.append('units', units);
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
      //setNamez('');
    }
    else{
      callError(err[0]);
    }
  }

  const settypelog = (sid) =>{
      settypez(sid);
      let s = inventorytypez.filter(rw=>rw.id == sid );
      if(Array.isArray(s) && s.length == 1){
        let s1 = s[0];
        setsubtitle(s1.extra);
      }
  }

  let inventorystate_arr = inventorytypez ;
    let inventorystatearr = inventorystate_arr !== null ? inventorystate_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Inventory Items</small></h4>
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
              <CLabel htmlFor="nf-name">Item name</CLabel>
              <CInput
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder=" SS1 Chemistry textbooks" 
                />
              <CFormText className="help-block">Please enter inventoryunit description</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-units">Unit of Measurment</CLabel>
              <CInput
                  type="text" 
                  id="nf-units" 
                  name="units"
                  value={units}
                  onChange={(e)=>setunits(e.target.value)}
                  placeholder="Pieces, Packs, Boxes, Bags, Catorns etc.." 
                />
            </CFormGroup>
            <CFormGroup className="my-0 mb-1">
                  <CLabel htmlFor="vat">Nature of item </CLabel>
                      <CSelect  custom  name="selectSm1" id="SelectLm1" onChange={(e)=>settypelog(e.target.value)}>
                      {parseInt(id) > 0 ? <option value={typez}>{typez}</option>:''}
                      <option >Please select</option>
                      {inventorystatearr}
                      </CSelect>
              </CFormGroup>
              <CFormGroup>
              <CLabel htmlFor="nf-name">{subtitle}</CLabel>
              <CInput
                  type="number" 
                  id="nf-name" 
                  name="subs"
                  value={subs}
                  onChange={(e)=>setsubs(e.target.value)}
                  placeholder="0" 
                />
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
