import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffsubjects, getStaffsubject, registerStaffsubject, updateStaffsubject, deleteStaffsubject} from './../../actions/staff/staffsubject';
import {getClaszs} from './../../actions/setting/clasz';
import {getSubjects} from './../../actions/setting/subject';
import {getStaffs} from './../../actions/staff/staff';
import { useHistory, useLocation, useParams } from 'react-router-dom'
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
  CCollapse,
  CFormText,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CSelect,
  CDropdownToggle,
  CDropdownMenu,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setElement } from '../../actions/common';

const Staffsubject = (props) => {
  const termid = useParams().term
  const groupid = 2;
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  
  const [id, setId] = useState(null)
  const [dts, setDts] = useState('')
  const [claszid, setClaszid] = useState()
  const [subjectid, setSubjectid] = useState()
  const [contact, setContact] = useState()
  const [staff, setStaff] = useState()
 
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET STAFFSUBJECTS PER SCHOOL
  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
        'schoolid': props.school.id
      }),
      cat:'select',
      table:'staffs',
      narration:'get staffs'
    }
    props.getStaffs(params)
    let params1 = {
      data:JSON.stringify(
      {
          'termid': termid,
          'grp': groupid,
      }),
      cat:'staffsubject',
      table:'accessstaffsubject',
      narration:'get staff classes'
    }
    props.getStaffsubjects(params1);
    
  }, [termid, groupid, props.school.id])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(id && parseInt(id) > 0)
    {
      let dt = dts;
      setStaff(dt.clientid);
      setClaszid(dt.itemid);
      setSubjectid(dt.itemid1);
      setContact(dt.contact);
      setElement('nf-subjectid', dt.itemid1 )
      setElement('nf-claszid', dt.itemid )
      setElement('nf-staff', dt.clientid )
    }else{
      setStaff('');
      setClaszid('');
    }
    
  }, [id])

  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true);
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onActivate = (rw, num) =>{
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    props.updateStaffsubject(fd);
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(parseInt(staff) > 0){
      let fd = new FormData();
      fd.append('itemid1', subjectid);
      fd.append('itemid', claszid);
      fd.append('clientid', staff);
      fd.append('contact', contact);
      fd.append('checker', groupid+'_'+termid+'_'+staff+'_'+claszid+'_'+subjectid);
      fd.append('table', 'accessstaffsubject');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'updates');
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
    }
  }
  
  
  let deparr = props.dropdowns[0].filter(rw =>parseInt(rw.id) === parseInt(termid) && parseInt(rw.id) > 0);
  let termname = deparr.length > 0 ? deparr[0].name : 'None';

  let claszarray = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns[1] : [];
  let clarray = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })
  let subarray = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns[2] : [];
  let suarray = subarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })

  let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.surname} {rw.firstname}</option>
  })
  
  let data = props.staffsubjects.staffsubjects && Array.isArray(props.staffsubjects.staffsubjects) ? props.staffsubjects.staffsubjects.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.filter(rw=>rw !== null).map((row, ind)=>{
      return <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{row.clientname}</td>
                <td className='text-center'>{row.itemname}</td>
                <td className='text-center'>{row.itemname1}</td>
                <td className='text-center'>{row.contact}</td>
                <td>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu> 
                    <CDropdownItem onClick={()=>onEdit(row)} >Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.cid, row)}>Delete</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem>Another Action</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                </td>
              </tr>
  })
  return (
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">Subject Teacher Allocation : {termname}</h4>
              <div className="small text-muted" style={{textTransform:'capitalize'}}>{props.school.name}</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary" 
                  onClick={toggle}
                  className="float-right">
                <i className='fa fa-plus'></i>
              </CButton>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody className='table-responsive'>
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"> SN.</th>
                    <th><i className='fa fa-users'></i> STAFF NAME</th>
                    <th><i className='fa fa-blacboard'></i> CLASS</th>
                    <th><i className='fa fa-book'></i> SUBJECT</th>
                    <th><i className='fa fa-clock-o'></i> PERIODS/CONTACTS<br/> (PER WEEK)</th>
                    <th><i className='fa fa-gear'></i> ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
        <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Subject Allocation</small></h4>
                </CCol>
                <CCol sm="6" className="d-md-block">
                  <CButton  
                      color="danger" 
                      onClick={onClose}
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
                      onChange={(e)=>setStaff(e.target.value)}
                      placeholder="" 
                    >
                        <option>Select staff</option>
                      {starray}
                  </CSelect>
                  <CFormText className="help-block">Select the staff</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-staff">Subject </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-subjectid" 
                      name="subject"
                      onChange={(e)=>setSubjectid(e.target.value)}
                      placeholder="" 
                    >
                        <option>Select subject</option>
                      {suarray}
                  </CSelect>
                  <CFormText className="help-block">Select the subject</CFormText>
                </CFormGroup>
             <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-claszid" 
                      name="claszid"
                      onChange={(e)=>setClaszid(e.target.value)}
                      placeholder="" 
                    >
                        <option>Select class</option>
                      {clarray}
                  </CSelect>
                  <CFormText className="help-block">Select the Class</CFormText>
                </CFormGroup>
            <CFormGroup>
                  <CLabel htmlFor="nf-contact">Periods/Contact</CLabel>
                  <CInput 
                      type="number" 
                      id="nf-contact" 
                      contact="contact"
                      defaultValue={contact}
                      onChange={(e)=>setContact(e.target.value)}
                      placeholder="0" 
                    />
                  <CFormText className="help-block">Number of contacts or periods per week</CFormText>
                </CFormGroup>
                </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
              <CButton type="reset" onClick={onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
      </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer,
  terms : state.termReducer.terms,
  claszs : state.claszReducer.claszs,
  staffs : state.staffReducer.staffs,
  school : state.schoolReducer.school,
  dropdowns : state.schoolReducer.dropdowns
})
export default connect(mapStateToProps, {
  getStaffs,
  getStaffsubjects,
  getStaffsubject,
  registerStaffsubject,
  updateStaffsubject,
  deleteStaffsubject,
  getClaszs
})(Staffsubject)
