import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { controls } from '../../actions/common'

const WidgetsDropdown = () => {
  // render
  let cats = controls[2].data;
  return (
    <CRow>
      {
          cats.map((prop, index)=>{
            return <CCol sm="6" md="3"><Link key={index} to={`setting/${prop.id}/0/0/0/0/0/0`} style={{color:'teal'}}>
              <CCard className='text-center' style={{height:"280px"}}>
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
                        src={process.env.PUBLIC_URL + prop.icon}
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
  
  )
}

export default WidgetsDropdown
