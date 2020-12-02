import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffs, getStaff, registerStaff, updateStaff, deleteStaff} from './../../actions/staff/staff';
import { useHistory, useLocation } from 'react-router-dom'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'
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
  CWidgetIcon,
  CCardFooter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Staffs = (props) => {
    const history = useHistory()
    const [active, setActive] = useState(0)

    useEffect(() => {
      props.getStaff(1)
      }, [])

  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
  <h4 id="traffic" className="card-title mb-0">Add/Edit</h4>
              <div className="small text-muted">Academic Calendar</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
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
                    { active === 0 && ' Bio Data'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 1 && ' Primary Care Giver'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 2 && ' Photos'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-pin"/>
                    { active === 3 && ' Finance'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 4 && ' Next of Kin'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 5 && ' Next of Kin'}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabPane>
              </CTabPane>

              <CTabContent>
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
    staffs : state.staffReducer
  })
  export default connect(mapStateToProps, {
    getStaffs,
    getStaff,
    registerStaff,
    updateStaff,
    deleteStaff
  })(Staffs)
  
