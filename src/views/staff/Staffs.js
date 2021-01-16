import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffs, getStaff, registerStaff, updateStaff, deleteStaff} from './../../actions/staff/staff';

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
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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

const Staffs = (props) => {
    const [active, setActive] = useState(0)
    const [datastore, setDatastore] = useState([])
    const [data1store, setData1store] = useState([])
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

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
          setData(d);
          setData1(d1);
          setDatastore(d);
          setData1store(d1);
          //get ids
        } 

      }, [props.staffs.staffs])
      
      let acs = props.user.user.access !== undefined && props.user.user.access.length > 0 ? JSON.parse(props.user.user.access) : {};
      let secarry = {}
      if(Object.keys(acs) > 0 && props.isAdmin === false)
      {
          let ids = props.user.activeschool !== undefined ? props.user.activeschool.id : null;
          if(acs !== undefined  && acs.hasOwnProperty(ids))
          {
            secarry = acs[ids][0]
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

  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="9">
              <h4 id="traffic" className="card-title mb-0">Staffs List</h4>
              <div className="small text-muted">{props.user.activeschool.name}</div>
            </CCol>
            <CCol sm="3" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary"
                  className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 0 && ' Dashboard'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user" />
                    { active === 1 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-contact" />
                    { active === 2 && ' Contact'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 3 && ' Next of Kins'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-image'/>
                    { active === 4 && ' Photo Gallery'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-paint'/>
                    { active === 5 && ' Employment'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <CIcon name='cil-book'/>
                    { active === 6 && ' Education'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-badge"/>
                    { active === 7 && ' Professional'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-mug-tea"/>
                    { active === 8 && ' Work'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-flight-takeoff"/>
                    { active === 9 && ' Leave'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-weightlifitng"/>
                    { active === 10 && ' Job'}
                  </CNavLink>
                </CNavItem>
               
              </CNav>
              <CTabContent>
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
    user:state.userReducer
  })
  export default connect(mapStateToProps, {
    getStaffs,
    getStaff,
    registerStaff,
    updateStaff,
    deleteStaff
  })(Staffs)
  
