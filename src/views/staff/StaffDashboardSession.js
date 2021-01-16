import React from 'react'
import { 
    CCard,  
    CButton, 
    CButtonGroup, 
    CCardHeader, 
    CCol, 
    CRow, 
   
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
              <h4 id="traffic" className="card-title mb-0">{props.activeterm != undefined &&  props.activeterm.hasOwnProperty('name') && props.activeterm.name ? props.activeterm.name : <span> Welcome<small><i> (No active term)</i></small></span> }</h4>
              <div className="small text-muted"><strong>{props.activeschool != undefined && props.activeschool.hasOwnProperty('name') && props.activeschool.name ? props.activeschool.name: <i>Please select a school or consult the admin</i>}</strong></div>
              
              </CCol>
              <CCol className="d-md-block btn-group">
              <CButtonGroup className='pull-right'>
              <CButton  
                  color="primary" 
                  className=""
                  onClick={()=>props.toggleMenu()}
                  >
                <i className='fa fa-search'></i>
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

export default Dashboard