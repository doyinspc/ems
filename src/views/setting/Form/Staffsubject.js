import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerStaffsubject, updateStaffsubject, deleteStaffsubject} from './../../../actions/staff/staffsubject';
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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { valdateNumber, valdateString } from '../../../actions/common';


const Staffsubject = (props) => {

  const [id, setId] = useState(null)
  const [claszid, setClaszid] = useState(null)
  const [subjectid, setSubjectid] = useState(null)
  const [staff, setStaff] = useState(null)
  const [contact, setContact] = useState(null)
  const [validate, setvalidate] = useState({})

  let sessionid = props.pid;
  let termid = props.qid;
  let groupid = 2;

  //GET STAFFSUBJECTS PER SCHOOL
  useEffect(() => {
    if(props.activeschool !== undefined && parseInt(props.activeschool.id) > 0){
        let params = {
        data:JSON.stringify(
        {
            'schoolid': props.activeschool.id,
            'is_active':0
        }),
        cat:'select',
        table:'staffs',
        narration:'get staffs'
        }
        props.getStaffs(params)

    }
  }, [props.activeschool])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data !== undefined && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      
      setId(dt.id);
      setStaff(dt.clientid);
      setClaszid(dt.staffid+"_"+dt.itemid);
      setSubjectid(dt.itemid1);
      setContact(dt.contact);
    }else{
      setId(null);
      setStaff('');
      setContact('');
      setSubjectid('');
      setClaszid('');
    }
    
  }, [props.data])
  
  const handleSubmit = () =>{
    let arr = []
    let val = {...validate}
    if(valdateNumber(staff) === false){arr.push(1); val.staff = true}else{val.staff = false}
    if(valdateString(claszid) === false){arr.push(1); val.claszid = true}else{val.claszid = false}
    if(valdateNumber(subjectid) === false){arr.push(1); val.subjectid = true}else{val.subjectid = false}
    setvalidate(val)
    if(arr.length === 0)
    {
      let cl = claszid.length > 0 ? claszid.split("_") : '';
      let fd = new FormData();
      fd.append('itemid', cl[1]);
      fd.append('staffid', cl[0]);
      fd.append('itemid1', subjectid);
      fd.append('clientid', staff);
      fd.append('contact', contact);
      fd.append('checker', groupid+'_'+termid+'_'+staff+'_'+claszid+'_'+subjectid);
      fd.append('table', 'accessstaffsubject');
      fd.append('sessionid', sessionid);
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'inserts');
        props.updateStaffsubject(fd)
        
      }else if(termid && parseInt(termid) > 0)
      {
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerStaffsubject(fd)
      }
      onReset()
      setvalidate({})
      
    }
  }

  const onReset = ()=>{
    setId('');
    setStaff('');
    setClaszid('');
    setSubjectid('');
    setContact(0);
  }
  
  
  let claszarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[1] : [];
  let clarray = Array.isArray(claszarray) ? claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={`0_${rw.id}`}>{rw.name}</option>
  }):<option></option>

  let clasarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[7] : [];
  let clarr = Array.isArray(clasarray) ? clasarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={`1_${rw.id}`}>{rw.name}</option>
  }):<option></option>

  let subjectarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[2] : [];
  let subarray = Array.isArray(subjectarray) ? subjectarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  }):<option></option>

  let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.surname} {rw.firstname}</option>
  })
 
   return (
    <CCol xl={12}  style={{width:'300px', position:'sticky'}} id="#formz" >
        <CCard style={{position:'static', zIndex:'101'}}>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Subjects Allocation</small></h4>
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
                  <CLabel htmlFor="nf-staff">Staff </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-staff" 
                      name="staff"
                      value={staff}
                      defaultValue={staff}
                      invalid={validate.staff || false}
                      onChange={(e)=>setStaff(e.target.value)}
                    >
                      <option></option>
                     {starray}
                  </CSelect>
                  <CFormText className="help-block">Select the staff</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-subjectid">Subject </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-subjectid" 
                      name="subjectid"
                      value={subjectid}
                      defaultValue={subjectid}
                      invalid={validate.subjectid || false}
                      onChange={(e)=>setSubjectid(e.target.value)}
                    >
                      <option></option>
                      {subarray}
                  </CSelect>
                  <CFormText className="help-block">Select the subject</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-claszid" 
                      name="claszid"
                      value={claszid}
                      defaultValue={claszid}
                      invalid={validate.claszid || false}
                      onChange={(e)=>setClaszid(e.target.value)}
                    >
                      <option></option>
                      {clarray}
                      {clarr}
                  </CSelect>
                  <CFormText className="help-block">Select the class</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-contact">Weekly Contact/Period</CLabel>
                  <CInput 
                      type="number" 
                      id="nf-contact" 
                      name="contact"
                      value={contact}
                      defaultValue={contact}
                      onChange={(e)=>setContact(e.target.value)}
                      placeholder="0" 
                    />
                  <CFormText className="help-block">number of periods/contact per week</CFormText>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
              <CButton type="reset" onClick={onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
      )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer,
  user:state.userReducer,
  activeschool:state.userReducer.activeschool,
  claszs : state.claszReducer.claszs,
  subjects : state.subjectReducer.subjects,
  staffs : state.staffReducer.staffs,
})
export default connect(mapStateToProps, {
  registerStaffsubject,
  updateStaffsubject,
  deleteStaffsubject,
  getStaffs,
})(Staffsubject)
