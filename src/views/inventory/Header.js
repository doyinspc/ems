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
        <CCard className="bg-warning">
          <CCardHeader>
            <CRow>
            <CCol xs={1} className='text-center mt-auto mb-auto' >
                <i className="fa fa-list fa-3x m-0  p-0"></i>
              </CCol>
              <CCol xs={10}>
              <h4 id="traffic" className="card-title mb-0">{props.activeschool != undefined &&  props.activeschool.hasOwnProperty('name') && props.activeschool.name ? props.activeschool.name : <span> Welcome<small><i> (--)</i></small></span> }</h4>
              <div className="small text-muted"><strong>{props.activeterm != undefined && props.activeterm.hasOwnProperty('name') && props.activeterm.name ? props.activeterm.name: <i>--</i>}</strong></div>
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