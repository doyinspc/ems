import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CContainer, CCardFooter } from '@coreui/react';
import { getStudent } from './../../actions/student/student';
import CIcon from '@coreui/icons-react'



const User = (props, {match}) => {
  const {
    id,
    title,
    employment_no,
    firstname,
    surname,
    middlename,
    dob,
    doa,
    dol,
    lga,
    soo,
    photo,
    house,
    place,
    nationality,
    schoolname,
    gender,
    reason,
    is_active,
    g1_name,
    g2_name,
    g1_phone1,
    g1_phone2,
    g2_phone1,
    g2_phone2,
    g1_email,
    g2_email,
    g1_address,
    g2_address,
    g1_rel,
    g2_rel
    } = props.student || {};

  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardBody>
              <CRow>
                <CCol className='text-center' xs={12} sm={6} md={3}>
                  <img
                    height='250px'
                    width='200px'
                    style={{width:'220px', height:'250px'}}
                    src={process.env.REACT_APP_SERVER_URL+ photo} 
                    alt={surname}
                    onError={(e)=>{e.target.onerror=null; e.target.src='icons/profile_1.png'} }
                  />
                </CCol >
                <CCol className='text-center' xs={12} sm={6} md={9}>
                  <CRow xs={12}>
                  <CCol xs={12}>
                    <CContainer className="table  table-hover text-left">
                      <CRow><CCol>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-user-circle'></i> Fullname</CCol><CCol><strong style={{textTransform:'capitalize'}}>{`${surname} ${firstname} ${middlename}`}</strong></CCol></CRow>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-calendar-o'></i> Date of Birth</CCol><CCol><strong>{`${moment(dob).format('MMM DD, YYYY') !== 'Invalid date'? moment(dob).format('MMM DD, YYYY'):'--.--.--' }`}</strong></CCol></CRow>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-street-view'></i> Gender</CCol><CCol><strong style={{textTransform:'capitalize'}}>{`${gender}`}</strong></CCol></CRow>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-map'></i> Origin</CCol><CCol><strong style={{textTransform:'capitalize'}}>{`${lga} ${soo} ${nationality}`}</strong></CCol></CRow>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-phone'></i> Date Admitted</CCol><CCol><strong>{`${moment(doa).format('MMM DD, YYYY') !== 'Invalid date'? moment(doa).format('MMM DD, YYYY'):'--.--.--' }`}</strong></CCol></CRow>
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-pied-piper-alt'></i> Status</CCol><CCol>{parseInt(is_active) === 0 ? <strong className='text-success'>IN ACTIVE SERVICE</strong> : <strong className='text-danger'>{`${reason} ${moment(dol).format('MMM DD, YYYY')}`}</strong>}</CCol></CRow> 
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-university'></i> School</CCol><CCol>{schoolname}</CCol></CRow> 
                        <CRow className='p-2' style={{backgroundColor:house, color:'black'}}><CCol xs={4}><i className='fa fa-university'></i> House</CCol><CCol >{house}</CCol></CRow> 
                        <CRow className='p-2'><CCol xs={4}><i className='fa fa-university'></i> Main Sponsor</CCol><CCol>{place}</CCol></CRow> 
                        </CCol></CRow>
                    </CContainer>
                </CCol>
                </CRow>
               </CCol>
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol md={6} sm={6}>
        <CCard  className='bg-dark'>
          <CCardHeader>
            <strong><i className='fa fa-users'></i> Primary Care Giver</strong>
          </CCardHeader>
          <CCardBody>
              <CContainer>
                <CRow>
                  <CCol>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-user'></i> </CCol><CCol>{g1_name}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-cubes'></i> </CCol><CCol>{g1_rel}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-phone'></i> </CCol><CCol>{g1_phone1} {g1_phone2}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-envelope'></i> </CCol><CCol>{g1_email}</CCol></CRow>    
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-map-marker'></i> </CCol><CCol>{g1_address}</CCol></CRow>  
                  </CCol>
                  </CRow>
               </CContainer> 
          </CCardBody>
          
        </CCard>
      </CCol>
      <CCol md={6} sm={6} >
        <CCard className='bg-dark'>
          <CCardHeader>
            <strong><i className='fa fa-users'></i>  Secondary Care Giver</strong>
          </CCardHeader>
          <CCardBody>
              <CContainer>
                  <CCol md={6} sm={12}>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-user'></i> </CCol><CCol>{g2_name}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-cubes'></i> </CCol><CCol>{g2_rel}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-phone'></i> </CCol><CCol>{g2_phone1} {g2_phone2}</CCol></CRow>
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-envelope'></i> </CCol><CCol>{g2_email}</CCol></CRow>    
                    <CRow xs={12}><CCol xs={2}><i className='fa fa-map-marker'></i> </CCol><CCol>{g2_address}</CCol></CRow>  
                  </CCol>
              </CContainer>
          </CCardBody>
          
        </CCard>
      </CCol>
    </CRow>
  </>
  )
}

export default User
