import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import Swal from 'sweetalert'
import {
  CRow,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CButton, 
  CSelect,
  CButtonClose,
  CButtonGroup,
  CTooltip,
  CCol,
  CTextarea,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
    getStudentattendances, 
    getStudentattendancedailys,
    getStudentattendance, 
    registerStudentattendance, 
    registerStudentattendancedaily,
    updateStudentattendance, 
    updateStudentattendancedaily, 
    deleteStudentattendance,
    deleteStudentattendancedaily
  } from './../../actions/student/studentattendance';
  
import { leavestd } from '../../actions/common'
let leaves = leavestd;
const Students = (props) => {
   const history = useHistory()
   
   
   const [dates, setDates] = useState(new Date())
   const [reason, setreason] = useState('')
   const [leaveid, setleaveid] = useState(0)
   const [search, setsearch] = useState('')

   useEffect(() => {
    //date changes get
    let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id,
          'grp':2,
          'dates':moment(dates).format('YYYY-MM-DD')

      }),
      cat:'selected',
      table:'attendances',
      narration:'get all students'
     }
    props.getStudentattendances(params)

    let params1 = {
      data:JSON.stringify(
      {
          'clients':props.clasz,
          'schoolid':props.user.activeschool.id,
          'grp':4,
          'dates':moment(dates).format('YYYY-MM-DD')
      }),
      cat:'selected',
      table:'attendances',
      narration:'get all attendance'
  }
    props.getStudentattendancedailys(params1)
    
   
  }, [dates, props.clasz, props.session, props.term])

  let getleave=(id)=>{
      let d = leaves.filter(rw=>parseInt(rw.id) === parseInt(id));
      return d[0]
  }

    const handleAttendance = ()=>{

    }
    const handleSubmit = (id)=>{
        let fd = new FormData();
        fd.append('grp', 2);
        fd.append('dates', moment(dates).format('YYYY-MM-DD'));
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('clients', id);
        fd.append('leaveid', leaveid);
        fd.append('reason', reason);
        fd.append('cat', 'insert');
        fd.append('table', 'attendances');

        props.registerStudentattendance(fd);

    }

    const confirm_student_available =(data, id)=>{
        
        if(Array.isArray(data) && data.length){
        let d = data.filter(rw=>parseInt(rw.clients) === parseInt(id));
        let chk = Array.isArray(d) && d.length > 0 ? d[0].leaveid : 0;
        return parseInt(chk);
        }else{
            return 0;
        }
    }
    let acarray = leaves.map((p, i)=>{
    return <option value={p.id}>{p.name}</option>
    })
    const changeDates = (e) =>{
        setDates(e)
        props.setDates(e)
    }
    const saveAttendance=()=>{
        let fd = new FormData();
        fd.append('grp', 4);
        fd.append('dates', moment(dates).format('YYYY-MM-DD'));
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('clients', props.clasz);
        fd.append('reason', props.data1);
        fd.append('leaveid', 0);
        fd.append('cat', 'insert');
        fd.append('table', 'attendances');

        props.registerStudentattendancedaily(fd);

    }
    let redirectStudent = (id, sessionid) =>{
        window.open(process.env.PUBLIC_URL+"#/studentcl/"+id+"/"+sessionid)
    }
     
      let registered_attendance_date = Array.isArray(props.studentattendance.studentattendancedailys)  && props.studentattendance.studentattendancedailys !== undefined? props.studentattendance.studentattendancedailys : [];
      let check_date = Array.isArray(registered_attendance_date) ? registered_attendance_date.filter(rw=>rw !== undefined && rw !== null && rw.dates === moment(dates).format("YYYY-MM-DD")) :[];
      let confirm_date = Array.isArray(check_date) && check_date.length > 0 ? true : false;

      let registered_attendance_issue = Array.isArray(props.studentattendance.studentattendances)  && props.studentattendance.studentattendances !== undefined? props.studentattendance.studentattendances : [];
      let check_issue = Array.isArray(registered_attendance_issue) ? registered_attendance_issue.filter(rw=>rw !== undefined && rw !== null && rw.dates === moment(dates).format("YYYY-MM-DD")) :[];
     
      //CONFIRM IF CLASS TEACHER
      let classteacher = props.classteacher;

   let tabl = props.data.filter(rw=> rw !== null && rw !== undefined).map((row, ind)=>{
        return <tr key={ind}>
        <td className="text-center">
          <div className="c-avatar">
            <img 
              src={process.env.REACT_APP_SERVER_URL + row.photo}
              style={{width:'40px', height:'40px'}}
              height="50px" 
              width="50px" 
              className="c-avatar-img" 
              alt={row.employment_no} 
              onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL +'/avatars/1.png' }}
            />
            <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
          </div>
        </td>
        
        <td>
   <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
                <div className="small text-muted">
                <span>{`${row.schoolabbrv}/${row.admission_no}`}</span>
            </div>
        </td>
        <td className="text-center">
        { confirm_student_available(check_issue, row.id) > 0 ? <>
        <CBadge className="mr-0" color={getleave(confirm_student_available(check_issue, row.id)).colors}>{getleave(confirm_student_available(check_issue, row.id)).name}</CBadge>
        <CBadge className="mr-1" color="dark">{moment(dates).format("Do MMMM, YYYY")}</CBadge></>
        :<>
        <CBadge className="mr-0" color={confirm_date ? "success" :"secondary"}>{confirm_date ? "Present" :"Present not saved"}</CBadge>
        <CBadge className="mr-1" color="dark">{moment(dates).format("Do MMMM, YYYY")}</CBadge></>
        }
        </td>
        <td className='text-right'>
        <CButtonGroup>
        <CTooltip content="Student profile">
        <CButton 
              size='sm' 
              color="dark" 
              onClick={()=>redirectStudent(row.id, props.session)}
              > <CIcon name='cil-user'  /> <span className="d-xs-none">Profile</span></CButton></CTooltip>
           <CButton 
              size='sm' 
              color="secondary" 
              onClick={()=>handleAttendance(row.id, props.termid, props.sessionid)}
              > <CIcon name='cil-envelope-open'  />  <span className="d-xs-none">Message</span></CButton>
          {classteacher ?<>
          <CDropdown className="m-0">
              <CDropdownToggle 
              color="info" 
              size='sm' 
              disabled={ props.activeterm ? false:true }>
              <CIcon name='cil-user-follow'  />  <span className="d-xs-none">Attendance</span> 
              </CDropdownToggle>
              <CDropdownMenu className='bg-info'>
                <CForm className="px-4 py-3" >
                  <CFormGroup>
                    <CLabel htmlFor="leaveid"></CLabel>
                    <CSelect 
                      className="form-control" 
                      id="leaveid" 
                      type="date"
                      value={leaveid}
                      autoComplete="leaveid"
                      onChange={(e)=>setleaveid(e.target.value)}
                      >
                        {acarray}
                      </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="reason">Reason</CLabel>
                    <CTextarea
                      className="form-control" 
                      style={{color:'blue', fontWeight:'bolder'}}
                      id="reason" 
                      type="text"
                      value={reason}
                      autoComplete="reason"
                      onChange={(e)=>setreason(e.target.value)}
                      
                      ></CTextarea>
                  </CFormGroup>
                  
                  <CFormGroup className="mt-2">
                    <CButton 
                    color="primary" 
                    type="button"
                    block
                    onClick={()=>handleSubmit(row.id)}
                    >Log</CButton>
                  </CFormGroup>
                </CForm>
              </CDropdownMenu>
            </CDropdown>
            <CTooltip content="Remove Student">
            <button  
              disabled={ props.activeterm ? false:true }
              onClick={()=>props.onRemove(row.cid)} 
              className='btn btn-sm btn-round btn-danger '><CIcon  size='md' name="cil-x"/></button>
            </CTooltip></>:''}
            </CButtonGroup>

        </td>
      </tr>
    });

    
 
  return (
    <>
    <CRow className='table-responsive'>
        <CRow className=' mt-2'>
        <CCol xs={12} md={4}>
            <CFormGroup>
                  <CCol xs="12" md="12">
                  <CInput
                    className="my-auto"
                   custom
                   defaultValue={search}
                   type='search'
                   onChange={(e)=>props.setsearch(e.target.value)}
                   placeholder="Search for student...."
                />
                  </CCol>
            </CFormGroup>
            </CCol>
            <CCol xs={12} md={4}>
            <CFormGroup>
                <CCol xs={12}>
                
                <CInput
                   custom
                   defaultValue={dates}
                   type='date'
                   onChange={(e)=>changeDates(e.target.value)}
                />
                
                </CCol>
                </CFormGroup>
            </CCol>
           
            <CCol xs={12} md={4}>
            <CCol xs={12}>{ classteacher ?
                confirm_date ?
                <CButton 
                    color="dark" 
                    disabled
                    block
                    onClick={saveAttendance}
                >Attendance saved ({moment(dates).format('DD MMM, YYYY')})</CButton>:
                <CButton 
                    disabled={ props.activeterm ? false:true }
                    color="info" 
                    block
                    onClick={saveAttendance}
                >Save Attendance</CButton>:<CButton>No Permission to Edit</CButton>}
            </CCol>
            </CCol>
        </CRow>
      <table className="table table-hover table-outline mb-0 d-sm-table">
          <thead className="thead-light">
              <tr>
                <th className="text-center"><CIcon name="cil-people" /></th>
                <th>Student</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
           </thead>
            <tbody>
                  {tabl}
            </tbody>
      </table>
    </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({
    studentattendance : state.studentattendanceReducer,
    user:state.userReducer,
    classstaff:state.classstaffReducer,
  })
  export default connect(mapStateToProps, {
    getStudentattendances,
    getStudentattendancedailys,
    getStudentattendance,
    registerStudentattendance,
    registerStudentattendancedaily,
    updateStudentattendance,
    updateStudentattendancedaily,
    deleteStudentattendance,
    deleteStudentattendancedaily
  })(Students)
  
