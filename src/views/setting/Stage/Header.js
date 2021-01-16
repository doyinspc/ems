import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getSchools, getSchool, deleteSchool} from './../../../actions/setting/school';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import SchoolForm from'./../Form/School'
import SchoolTable from'./../Table/School'


const Header = (props) => {
  
   return (
    <CCardHeader>
          <CRow>
          <CCol xs={2} sm="1">
                <img
                    src={process.env.PUBLIC_URL + props.icon}
                    height='40px'
                />
          </CCol>
            <CCol xs={6} sm="7">
            <h4 id="traffic" className="card-title mb-0">{props.title}</h4>
            <div className="small text-muted">{props.school != undefined && props.school.hasOwnProperty('name') && props.school.name ? props.school.name: <i>No school active</i>}</div>
            </CCol>
            <CCol xs={4} sm="4" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary" 
                  onClick={()=>props.toggle()}
                  className="float-right">
                <i className='fa fa-plus'></i>
              </CButton>
            </CCol>
          </CRow>
</CCardHeader>)
}

export default Header
