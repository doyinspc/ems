import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerClassstaff, updateClassstaff, deleteClassstaff} from '../../../actions/setting/classstaff';
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
  CCardFooter,
  CFormText,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {setElement, valdateNumber} from './../../../actions/common'


const Classstaff = (props) => {
  const [id, setId] = useState(null)
  const [claszid, setClaszid] = useState(null)
  const [staff, setStaff] = useState(null)
  const [validate, setvalidate] = useState({})

  let sessionid = props.pid;
  let termid = props.qid;
  let groupid = 1;

  //GET CLASSSTAFFS PER SCHOOL
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
      setClaszid(dt.itemid);
    }else{
      setId(null);
      setStaff('');
      setClaszid('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    let arr = []
    let val = {...validate}
    if(valdateNumber(staff) === false){arr.push(1); val.staff = true}else{val.staff = false}
    if(valdateNumber(claszid) === false){arr.push(1); val.claszid = true}else{val.claszid = false}
     setvalidate(val)
     if(arr.length === 0)
      {
      let fd = new FormData();
      fd.append('itemid', claszid);
      fd.append('clientid', staff);
      fd.append('checker', groupid+'_'+termid+'_'+staff+'_'+claszid);
      fd.append('table', 'accessstaffclass');
      fd.append('sessionid', sessionid);
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'updates');
        props.updateClassstaff(fd)
        
      }else if(termid && parseInt(termid) > 0)
      {
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerClassstaff(fd)
      }
      props.onReset()
      setvalidate({})
    }
  }

  let claszarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[1] : [];
  let clarray = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })

  let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.surname} {rw.firstname}</option>
  })
 
   return (
    <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small><br/> Class Teacher</small></h4>
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
                  </CSelect>
                  <CFormText className="help-block">Select the class</CFormText>
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
  classstaffs : state.classstaffReducer,
  user:state.userReducer,
  activeschool:state.userReducer.activeschool,
  claszs : state.claszReducer.claszs,
  staffs : state.staffReducer.staffs,
})
export default connect(mapStateToProps, {
  registerClassstaff,
  updateClassstaff,
  deleteClassstaff,
  getStaffs
})(Classstaff)
