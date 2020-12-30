
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { 
    CCard, 
    CCardBody, 
    CButton, 
    CButtonGroup, 
    CCardHeader, 
    CCol, 
    CRow, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem, 
    CDropdownDivider, 
    CContainer, 
    CCardFooter 
} from '@coreui/react';



const Dashboard = (props) => {
       
let Session = '2018 2019'
let term = ' First'

return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
              <h4>{Session}</h4>
              <strong>{term}</strong>
              </CCol>
              <CCol className="d-md-block btn-group">
              <CButtonGroup className='pull-right'>
              <CButton  
                  color="primary" 
                  className=""
                  >
                <i className='fa fa-plus'></i>
              </CButton>
              </CButtonGroup>  
            </CCol>
            </CRow>
          </CCardHeader>
         </CCard>
      </CCol>
    </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({

})
export default Dashboard