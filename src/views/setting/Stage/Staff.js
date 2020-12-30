import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CContainer,
} from '@coreui/react'
import { Link, Redirect } from 'react-router-dom';
import StaffDashboardDefault from './../../staff/StaffDashboardDefault'
import Header from './Header';


const Staff = (props) => {

 

  let data = props.para.submenu && Array.isArray(props.para.submenu) ? props.para.submenu : []
   
   return (
       <>
       <CCard>
       <Header 
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              />
       </CCard>
       <CRow>
           {
               data.map((prop, index)=>{
                return <CCol sm="6" md="4"><Link key={index} to={`${prop.links}`} style={{color:'teal'}}>
                <CCard className='text-center' style={{backgroundColor:'teal', color:'white'}} >
                  <CCardBody className='text-center flex align-self-center justify-contents-center'>
                    <CContainer>
                    <CRow className='text-center' lg={12} style={{marginTop:'10px', marginBottom:'10px'}}>
                    <CCol>
                       <h5 style={{fontFamily:'Boogaloo'}}>{prop.name}</h5>
                    </CCol>
                    </CRow>
                    <CRow className='text-center flex align-self-center justify-contents-center' lg={12} style={{marginTop:'10px', marginBottom:'20px', textAlign:'center'}}>
                      <CCol>
                        <img
                          src={prop.icon}
                          height="100px"
                          style={{borderRadius:'50%'}}
                          />
                      </CCol>
                    </CRow>
                    <CCol>
                       <small style={{fontFamily:'Quicksand'}}>{prop.description}</small>
                    </CCol>
                   
                    </CContainer>
                  </CCardBody>
                </CCard>
                </Link> </CCol>

               })
           }
        </CRow>
        </>
  )
}
const mapStateToProps = (state) =>({
  staffs : state.staffReducer
})
export default connect(mapStateToProps, {
  
})(Staff)
