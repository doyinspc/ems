import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { 
  getStaffattendances, 
  getStaffattendancedailys,
  getStaffattendance, 
  registerStaffattendance, 
  registerStaffattendancedaily,
  updateStaffattendance, 
  updateStaffattendancedaily, 
  deleteStaffattendance,
  deleteStaffattendancedaily
} from './../../actions/staff/staffattendance';
import { 
  getStaffs, 
  getStaff, 
  registerStaff,
  updateStaff,  
  deleteStaff
} from './../../actions/staff/staff';
import moment from'moment'
import {
  CRow,
  CCol,
  CCardHeader,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLabel,
  CInput,
  CForm,
  CFormGroup,
  CSelect,
  CButtonGroup,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import StaffDefault from './Staffs/StaffDefault'
import StaffsChart from './Staffs/StaffsChart'
import StaffsContact from './Staffs/StaffsContact'
import StaffsKin from './Staffs/StaffsKin'
import StaffsPhoto from './Staffs/StaffsPhoto'
import StaffsData from './Staffs/StaffsData'
import StaffsEducation from './Staffs/StaffsEducation'
import StaffsEmployment from './Staffs/StaffsEmployment'
import StaffsJob from './Staffs/StaffsJob'
import StaffsLeave from './Staffs/StaffsLeave'
import StaffsProfessional from './Staffs/StaffsProfessional'
import StaffsWork from './Staffs/StaffsWork'
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

const Staffs = (props) => {
    const [active, setActive] = useState(0)
    const [leaveid, setleaveid] = useState(0)
    const [dates, setDates] = useState(new Date())
    const [departmentid, setdepartmentid] = useState([])
    const [levelid, setlevelid] = useState(0)
    const [datastore, setDatastore] = useState([])
    const [data1store, setData1store] = useState([])
    const [dataq, setDataq] = useState([])
    const [data1, setData1] = useState([])
    const [search, setsearch] = useState('')

    
      useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
              'schoolid':props.user.activeschool.id
          }),
          cat:'selected',
          table:'staffs',
          narration:'get all staffs'
      }
        props.getStaffs(params)
      }, [props.user])

      useEffect(() => {
        if(props.staffs.staffs && Array.isArray(props.staffs.staffs))
        {
          let d = props.staffs.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined);
          let d1 = d.map((p, i)=>p.id);
          let d2 = d1.join(',')
          
          setDataq(d);
          setData1(d2);
          setDatastore(d);
          setData1store(d2);
          //get ids
        } 

      }, [props.staffs.staffs])
      
      let acs = props.user.user.access !== undefined && props.user.user.access.length > 0 ? JSON.parse(props.user.user.access) : {};
      let deparray = []
      let levarr = []
      
      dataq.forEach(element => {
         let a = {};
         let b = {};
         a['label'] = element.departmentname;
         a['value'] = element.departmentid;
         b['label'] = element.levelname;
         b['value'] = element.levelid;
         let d = deparray.filter(rw=>rw.value == element.departmentid)
         if(Array.isArray(d) && d.length > 1){}else{deparray.push(a) ;}
         let e = levarr.filter(rw=>rw.value ==element.levelid)
         if(Array.isArray(e) && e.length > 1){}else{ levarr.push(a) ;}
      });
      
      let secarry = {}
      let sec = []
      
      if(Object.keys(acs).length > 0 && props.isAdmin !== false)
      {
         
          let ids = props.user.activeschool !== undefined ? props.user.activeschool.id : null;
          
          if(acs !== undefined  && acs.hasOwnProperty(ids))
          {
            let acss = Object.keys(acs[ids]);
            
            if(acss !== undefined && acss.includes("0") )
            {
              secarry = acs[ids][0]
              
            }else{
              return <Redirect to="/" />

            }
           
          }else
          {
           return <Redirect to="/" />
          }
      }else if(props.user.isAdmin === true)
      {
        // return <Redirect to="/" />
      }
      else
      {
          return <Redirect to="/" />
      }
  
      const handleSubmit = () =>{

      }

      const handleLev = (event) =>{
        setlevelid(event);
      }

      const handleDep = (event) =>{
        setdepartmentid(event);
      }

     
  let data = dataq;
  if(search.length > 0)
  {
    let datas = dataq.filter(rw=>rw.surname.toLowerCase().includes(search.toLowerCase()) 
    || rw.firstname.toLowerCase().includes(search.toLowerCase()) 
    || rw.middlename.toLowerCase().includes(search.toLowerCase())
    || rw.employment_no.toLowerCase().includes(search.toLowerCase())
    )
    data = datas;
  }

  let redirectAttendance = () =>{
      window.open(process.env.PUBLIC_URL+"#/attendance_staff/")
}
  
  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="9">
              <h4 id="traffic" className="card-title mb-0">Staffs List <small>{ dates ? <i> Attendance {moment(dates).format("DD MMM, YYYY")}</i>:''}</small></h4>
              <div className="small text-muted">{props.user.activeschool.name}</div>
            </CCol>
            <CCol sm="3" className="d-md-block">
              <CButtonGroup>
              <CTooltip content={`Set Attendance date`}>
              <CButton
                    data-target='#formz' 
                    data-toggle="collapse" 
                    color="primary"
                    className="float-right"
                    onClick={redirectAttendance}
                    >
                  <CIcon name="cil-calendar"/>
              </CButton>
            </CTooltip>
              <CTooltip content={`Search by department`}>
              <CDropdown className="m-0">
              <CDropdownToggle color="dark" >
              <CIcon name='cil-user-follow'  />
              </CDropdownToggle>
              <CDropdownMenu className='bg-dark'>
                <CForm className="px-4 py-3" >
                <Select
                      closeMenuOnSelect={false}
                      styles={{color:'#000000', backgroundColor:'black'}}
                      value={departmentid}
                      isMulti
                      options={deparray}
                      onChange={handleDep}
                    />   
                </CForm>
              </CDropdownMenu>
            </CDropdown>
            </CTooltip>
              <CTooltip content={`Search by level`}>
                <CDropdown className="m-0">
              <CDropdownToggle color="info" >
              <CIcon name='cil-user-follow'  />
              </CDropdownToggle>
              <CDropdownMenu className='bg-info'>
                <CForm className="px-4 py-3" >
                <Select
                      closeMenuOnSelect={true}
                      defaultValue={levelid}
                      isMulti
                      options={levarr}
                      onChange={handleLev}
                    />   
                </CForm>
              </CDropdownMenu>
            </CDropdown>
            </CTooltip>
                <CButton 
                    data-target='#formz' 
                    data-toggle="collapse" 
                    color="primary"
                    className="float-right">
                  <CIcon name="cil-cloud-download"/>
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 0 && ' Action'}
                  </CNavLink>
                </CNavItem>
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 1 && ' Dashboard'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user" />
                    { active === 2 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-contact" />
                    { active === 3 && ' Contact'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 4 && ' Next of Kins'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-image'/>
                    { active === 5 && ' Photo Gallery'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-paint'/>
                    { active === 6 && ' Employment'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-book'/>
                    { active === 7 && ' Education'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-badge"/>
                    { active === 8 && ' Professional'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-mug-tea"/>
                    { active === 9 && ' Work'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-flight-takeoff"/>
                    { active === 10 && ' Leave'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-weightlifitng"/>
                    { active === 11 && ' Job'}
                  </CNavLink>
                </CNavItem>
               
              </CNav>
              <CTabContent>
                <CTabPane>
                  <StaffDefault 
                    staffs={data} 
                    setsearch={(e)=>setsearch(e)} 
                    dateactive={dates} 
                    data1={data1} 
                    setDates={(e)=>setDates(e)}/>
                </CTabPane>
                <CTabPane><StaffsChart staffs={data} /></CTabPane>
                <CTabPane><StaffsData staffs={data} /></CTabPane>
                <CTabPane><StaffsContact staffs={data} /></CTabPane>
                <CTabPane><StaffsKin staffs={data} /></CTabPane>
                <CTabPane><StaffsPhoto staffs={data} /></CTabPane>
                <CTabPane><StaffsEmployment staffs={data} /></CTabPane>
                <CTabPane><StaffsEducation staffs={data} datas={data1} /></CTabPane>
                <CTabPane><StaffsProfessional staffs={data} datas={data1} /></CTabPane>
                <CTabPane><StaffsWork staffs={data} datas={data1}  /></CTabPane>
                <CTabPane><StaffsLeave staffs={data} datas={data1} /></CTabPane>
                <CTabPane><StaffsJob staffs={data} datas={data1} /></CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    staffs : state.staffReducer,
    staffattendance : state.staffattendanceReducer,
    user:state.userReducer
  })
  export default connect(mapStateToProps, {
    getStaffattendances,
    getStaffattendancedailys,
    getStaffattendance,
    registerStaffattendance,
    registerStaffattendancedaily,
    updateStaffattendance,
    updateStaffattendancedaily,
    deleteStaffattendance,
    deleteStaffattendancedaily,
    getStaff,
    getStaffs,
    registerStaff,
    updateStaff,
    deleteStaff
  })(Staffs)
  
