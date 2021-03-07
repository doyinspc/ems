import React from 'react'
import {
  CButton,
  CButtonGroup,
  CCardHeader,
  CCol,
  CRow,
  CTooltip
} from '@coreui/react'
import { useHistory } from 'react-router-dom'

const Header = (props) => {
  const history = useHistory() 
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
              <CButtonGroup className="float-right">
                <CTooltip content="Click to go back">
              <CButton
                color="secondary" 
                onClick={()=>history.goBack()}
                
              ><i className='fa fa-backward'></i></CButton></CTooltip>
              <CTooltip content="Add new record">
              <CButton 
                  disabled={props.editer === false ? true : false}
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary" 
                  onClick={()=>props.toggle()}
                  className="float-right">
                <i className='fa fa-plus'></i>
              </CButton></CTooltip>
              </CButtonGroup>
            </CCol>
          </CRow>
</CCardHeader>)
}

export default Header
