
import React from 'react'
import { connect } from 'react-redux'
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CCardHeader,
    CContainer,
    CHeaderNav,
    CHeader,
    CHeaderBrand,
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
  } from '@coreui/react'
import StatisticsDashboard from './StatisticsDashboard'
import AcademicsDashboard from './AcademicsDashboard'
import FinanceDashboard from './FinanceDashboard'
import Sessionbar from './Sessionbar'
import Schoolbar from './Schoolbar'
import CIcon from '@coreui/icons-react'

export const Index = (props) => {
    return (
        <>
        <CHeader withSubheader className="d-print-none">
                <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <h2>{process.env.REACT_APP_SUB_NAME}</h2>
                </CHeaderBrand>
                <CHeaderNav className="d-md-down-none mr-auto">
                <h3>5</h3>
                </CHeaderNav>
             <CHeaderNav className="px-3">
                <Schoolbar />
                <Sessionbar />
                <Sessionbar />
            </CHeaderNav>
        </CHeader>
        <CContainer fluid>
            <CRow >
            <CCol xs="12" md="12" className="m-0">
                <CCard>
                <CCardHeader>
                    Id indentifiers
                   
                </CCardHeader>
                <CCardBody>
                <CTabs>
                <CNav variant="tabs">
                    <CNavItem>
                        <CNavLink>
                            Statistics
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink>
                            Academics
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink>
                            Finance
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane>
                        <StatisticsDashboard
                        />
                    </CTabPane>
                    <CTabPane>
                        <AcademicsDashboard
                        />
                    </CTabPane>
                    <CTabPane>
                        <FinanceDashboard
                        />
                    </CTabPane>
                </CTabContent>
                </CTabs>
                </CCardBody>
                </CCard>
            </CCol>  
            </CRow>
        </CContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
