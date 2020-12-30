import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerSchool, updateSchool, deleteSchool} from './../../../actions/setting/school';
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


const School = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [name, setName] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [states, setStates] = useState('')

 
 
  useEffect(() => {
    if(parseInt(id) > 0){
        let dt = dts;
        setName(dt.name);
        setAbbrv(dt.abbrv);
        setPhone1(dt.phone1);
        setPhone2(dt.phone2);
        setEmail(dt.email);
        setAddress(dt.address);
        setCountry(dt.country);
        setStates(dt.states);
    }else
    {
        setName('');
        setAbbrv('');
        setPhone1('');
        setPhone2('');
        setEmail('');
        setAddress('');
        setCountry('');
        setStates('');

    }
      
  }, [id])

  

  const handleSubmit = () =>{
    if(name.length > 0){
      let fd = new FormData();
      fd.append('name', name);
      fd.append('abbrv', abbrv);
      fd.append('phone1', phone1);
      fd.append('phone2', phone2);
      fd.append('email', email);
      fd.append('country', country);
      fd.append('states', states);
      fd.append('address', address);
      fd.append('table', 'schools');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateSchool(fd)
        
      }else
      {
        //INSERT
        fd.append('cat', 'insert');
        props.registerSchool(fd)
      }
      props.onReset()
    }
  }
 
   return (
        <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> School</small></h4>
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
                  <CLabel htmlFor="nf-name">School</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name"
                      defaultValue={name}
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="MESL SENIOR SECONDARY SCHOOL" 
                    />
                  <CFormText className="help-block">ENTER THE FULL NAME OF THE SCHOOL</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbrv./Matriculation Number prefix </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="MESL/KS/" 
                    />
                  <CFormText className="help-block">Abbreviation</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Phone</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-phone1" 
                      name="phone1"
                      defaultValue={phone1}
                      onChange={(e)=>setPhone1(e.target.value)}
                      placeholder="080000000000" 
                    />
                  <CFormText className="help-block">Main phone number</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-phone2">Alternative Phone </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-phone2" 
                      name="phone2"
                      defaultValue={phone2}
                      onChange={(e)=>setPhone2(e.target.value)}
                      placeholder="080000000000" 
                    />
                  
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email </CLabel>
                  <CInput 
                      type="email" 
                      id="nf-email" 
                      name="email"
                      defaultValue={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="in@gmail.com" 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-address">Address </CLabel>
                  <CInput 
                      type="textarea" 
                      id="nf-address" 
                      name="address"
                      defaultValue={address}
                      onChange={(e)=>setAddress(e.target.value)}
                      placeholder="12 Bakonle way...." 
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
  schools : state.schoolReducer
})
export default connect(mapStateToProps, {
  registerSchool,
  updateSchool,
  deleteSchool
})(School)
