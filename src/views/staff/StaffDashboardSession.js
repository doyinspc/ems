import React from 'react'
import { 
    CCard,  
    CButton, 
    CButtonGroup, 
    CCardHeader, 
    CCol, 
    CRow,
    CTooltip, 
   
} from '@coreui/react';



const Dashboard = (props) => {
 
return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xs={10}>
              <h5 id="traffic" className="card-title mb-0">
              {props.activeschool != undefined && props.activeschool.hasOwnProperty('name') && props.activeschool.name ? props.activeschool.name: <i>Please select a school or consult the admin</i>}
                </h5>
              <div className="small text-muted"><strong style={{fontSize:'15px', color:'teal'}}>
              {props.activeterm != undefined &&  props.activeterm.hasOwnProperty('name') && props.activeterm.name ? props.activeterm.name : <span> Welcome<small><i> (No active term)</i></small></span> }
                </strong></div>
              
              </CCol>
              <CCol className="d-md-block btn-group">
              <CButtonGroup className='pull-right d-print-none'>
                <CTooltip content='Click here to switch between schools'>
              <CButton  
                  color="primary" 
                  className=""
                  onClick={()=>props.toggleMenu()}
                  >
                <i className='fa fa-university'></i>
              </CButton>
              </CTooltip>
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

export default Dashboard