import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerSchool, updateSchool, deleteSchool} from './../../../actions/setting/school';
import {getStaffs} from './../../../actions/staff/staff';
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
  CInputFile,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import  CKEditor  from 'ckeditor4-react';
import { valdateNumber, valdateString } from '../../../actions/common';


const School = (props) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [email, setEmail] = useState('')
  const [typeid, setTypeid] = useState(null)
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [states, setStates] = useState('')
  const [links, setLinks] = useState('')
  const [color, setColor] = useState('')
  const [sign, setSign] = useState(0)
  const [office, setOffice] = useState(0)
  const [about, setAbout] = useState('')
  const [details, setDetails] = useState('')
  const [validate, setvalidate] = useState({})

  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
        'schoolid': props.user.activeschool.id
      }),
      cat:'select',
      table:'staffs',
      narration:'get staffs'
    }
    props.getStaffs(params)
    
    
  }, [props.user.activeschool])
  
  useEffect(() => {
    if(parseInt(props.data.id) > 0){
        let dt = props.data;
        setId(dt.id);
        setName(dt.name);
        setAbbrv(dt.abbrv);
        setTypeid(dt.typeid);
        setPhone1(dt.phone1);
        setPhone2(dt.phone2);
        setEmail(dt.email);
        setLinks(dt.links);
        setSign(dt.signed);
        setOffice(dt.office);
        setColor(dt.color);
        setAddress(dt.address);
        setCountry(dt.country);
        setStates(dt.states);
        setOffice(dt.office);
        setAbout(dt.about);
        setDetails(dt.details);
    }else
    {
      setId(null);
        setName('');
        setAbbrv('');
        setPhone1('');
        setPhone2('');
        setEmail('');
        setAddress('');
        setCountry('');
        setStates('');
        setAbout('');
        setDetails('');
    }
      
  }, [props.data])

  const onReset = () =>{
        setId(null);
        setName('');
        setAbbrv('');
        setPhone1('');
        setPhone2('');
        setEmail('');
        setAddress('');
        setCountry('');
        setStates('');
        setAbout('');
        setDetails('');
  }

  const handleSubmit = () =>{
     let arr = []
     let val = {...validate}
  
     if(valdateNumber(sign) === false){arr.push(1); val.sign = true}else{val.sign = false}
     if(valdateNumber(office) === false){arr.push(1); val.office = true}else{val.office = false}
     if(valdateString(name) === false){arr.push(1); val.name = true}else{val.name = false}
     if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}else{val.abbrv = false}
     if(valdateString(phone1) === false){arr.push(1); val.phone1 = true}else{val.name = false}
     if(valdateString(phone2) === false){arr.push(1); val.phone2 = true}else{val.phone2 = false}
     if(valdateString(email) === false){arr.push(1); val.email = true}else{val.email = false}
     if(valdateString(states) === false){arr.push(1); val.states = true}else{val.states = false}
     if(valdateString(country) === false){arr.push(1); val.country = true}else{val.country = false}
     if(valdateString(address) === false){arr.push(1); val.address = true}else{val.address = false}
     if(valdateString(color) === false){arr.push(1); val.color = true}else{val.color = false}
     setvalidate(val)
     if(arr.length === 0)
      {
      let fd = new FormData();
      fd.append('name', name);
      fd.append('abbrv', abbrv);
      fd.append('phone1', phone1);
      fd.append('phone2', phone2);
      fd.append('email', email);
      fd.append('typeid', typeid);
      fd.append('country', country.toLowerCase());
      fd.append('states', states.toLowerCase());
      fd.append('address', address);
      fd.append('about', about);
      fd.append('details', details);
      fd.append('files', links);
      fd.append('signed', sign);
      fd.append('office', office);
      fd.append('color', color);
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
      onReset()
      setvalidate({})
    }
  }

  const changeImg = (e) =>{
    setLinks(e.target.files[0]);
  }
let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.surname} {rw.firstname}</option>
  })
 
   return (
        <CCol xl={12}  id="#formz" style={{minWidth:'300px'}}>
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
                      value={name}
                      defaultValue={name}
                      invalid={validate.name || false}
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="SENIOR SECONDARY SCHOOL" 
                    />
                  <CFormText className="help-block">ENTER THE FULL NAME OF THE SCHOOL</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbrv./Matriculation Number prefix </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      value={abbrv}
                      defaultValue={abbrv}
                      invalid={validate.abbrv || false}
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
                      value={phone1}
                      defaultValue={phone1}
                      invalid={validate.phone1 || false}
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
                      value={phone2}
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
                      value={email}
                      defaultValue={email}
                      invalid={validate.email || false}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="in@gmail.com" 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-color">Theme Color </CLabel>
                  <CInput 
                      type="color" 
                      id="nf-color" 
                      name="color"
                      value={color}
                      defaultValue={color}
                      invalid={validate.color || false}
                      onChange={(e)=>setColor(e.target.value)}
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-address">Address </CLabel>
                  <CInput 
                      type="textarea" 
                      id="nf-address" 
                      name="address"
                      value={address}
                      defaultValue={address}
                      invalid={validate.address || false}
                      onChange={(e)=>setAddress(e.target.value)}
                      placeholder="12 Bakonle way...." 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-states">State </CLabel>
                  <CInput 
                      type="states" 
                      id="nf-states" 
                      name="states"
                      value={states}
                      defaultValue={states}
                      invalid={validate.states || false}
                      onChange={(e)=>setStates(e.target.value)}
                      placeholder="Lagos State" 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-country">Country </CLabel>
                  <CInput 
                      type="country" 
                      id="nf-country" 
                      name="country"
                      value={country}
                      defaultValue={country}
                      invalid={validate.country || false}
                      onChange={(e)=>setCountry(e.target.value)}
                      placeholder="Nigeria" 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="typeid">Category</CLabel>
                  <CSelect
                      id="typeid" 
                      name="typeid"
                      onChange={(e)=>setTypeid(e.target.value)}
                      value={typeid}
                      defaultValue={typeid}
                      invalid={validate.typeid || false}
                    >
                      <option></option>
                      <option value="1">Secondary</option>
                      <option value="2">Primary</option>
                      <option value="3"></option>
                      <option value="4">Managment</option>
                  </CSelect>
                  <CFormText className="help-block">Select Signatory</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="sign">Signatory</CLabel>
                  <CSelect
                      id="sign" 
                      name="sign"
                      onChange={(e)=>setSign(e.target.value)}
                      value={sign}
                      defaultValue={sign}
                      invalid={validate.sign || false}
                    >
                      <option></option>
                      {starray}
                  </CSelect>
                  <CFormText className="help-block">Select Signatory</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="office">Office</CLabel>
                  <CSelect
                      id="office" 
                      name="office"
                      onChange={(e)=>setOffice(e.target.value)}
                      value={office}
                      defaultValue={office}
                      invalid={validate.office || false}
                    >
                      <option></option>
                      {starray}
                  </CSelect>
                  <CFormText className="help-block">Select Signatory</CFormText>
                </CFormGroup> 
                <CFormGroup>
                  <CLabel htmlFor="nf-about">Head of School's Comment </CLabel>
                  <CInput 
                      type="textarea" 
                      id="nf-about" 
                      name="about"
                      value={about}
                      defaultValue={about}
                      invalid={validate.about || false}
                      onChange={(e)=>setAbout(e.target.value)}
                      placeholder="...." 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-details">About School (Format Appropriately) </CLabel>
                  <CKEditor
                      data ={details}
                      onChange={e=>setDetails(e.editor.getData())}
                      type='classic'
                      config={{
                          toolbar:[[
                              'Cut', 'Copy', 'Paste', 
                              'PasteText', 'PasteFromWord', 
                              'Undo', 'Redo', 'NumberedList', 'BulletedList',
                              'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                          ]]
                      }}
                      
                      />
                 
                </CFormGroup>
                <CFormGroup className='text-center'>
                    <CCol xs={12} className="text-center">
                    <CLabel htmlFor="nf-address">School Logo </CLabel>
                    </CCol>
                    <CCol xs={12} className="text-center">
                        <img 
                            src={process.env.REACT_APP_SERVER_URL+ links} 
                            className="m-0 p-0" 
                            width='100px'
                            height='100px'
                            alt={links} 
                            onError={(e)=>{e.target.onerror=null; e.target.src='icons/slack.png'} }
                          />
                    </CCol>
                    <CCol xs={12}>
                        <CInputFile 
                        custom
                        id="custom-file-input"
                        name='picture1'
                        onChange={changeImg}
                        />
                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                        Choose file...
                        </CLabel>
                    </CCol>
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
  schools : state.schoolReducer,
  staffs : state.staffReducer.staffs,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerSchool,
  updateSchool,
  deleteSchool,
  getStaffs,
})(School)
