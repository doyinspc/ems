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
    CWidgetBrand,
    CWidgetIcon,
     
} from '@coreui/react';

import CIcon from '@coreui/icons-react'


const Dashboard = (props) => {

  const colors={
    1:'primary',
    2:'info',
    3:'warning',
    4:'danger',
    5:'secondary',
    6:'primary',
    7:'info',
    8:'warning',
    9:'danger',
  }

return (
    <>
    <CRow>
      { props.schools !== undefined && Array.isArray(props.schools) && props.schools.length > 1 ? props.schools.map((prop, index)=>{
         return  <CCol 
         fade
            key={index} 
            xs="12" 
            sm="6" 
            lg="6"
            onClick={()=>props.changeSchool(prop)}
            style={{cursor:'pointer'}}
            >
          <CWidgetIcon text={prop.abbrv} header={prop.name} color={colors[index + 1]} iconPadding={false}>
            <i className='fa fa-university fa-2x'></i>
          </CWidgetIcon>
        </CCol>
      }):''}
    </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({

})
export default Dashboard