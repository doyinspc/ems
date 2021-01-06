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

const WidgetsDropdown = (props) => {
  // render
  let {
    name,
    abbrv,
    id,
    address,
    state,
    country,
    color,
    links,
    email,
    phone1,
    phone2,
    signatoryname

  } = props.school || "";
 
  return (
    <CCard>
        <CCardBody>
        <CContainer>
            <CRow>
                <CCol xs={12} className='text-center' style ={{marginBlock:'auto'}}>
                  <img 
                  height='150px' 
                  src={process.env.REACT_APP_SERVER_URL+ links} 
                  onError={(e)=>{e.target.onerror=null; e.target.src='icons/slack.png'} }
                  /></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-university fa-2x"></i></CCol>
                <CCol xs={10} ><strong style={{fontFamily:'Quicksand'}}>{name}</strong></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-thumb-tack fa-2x"></i></CCol>
                <CCol xs={10} ><strong style={{fontFamily:'Quicksand'}}>{abbrv}</strong></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-map-marker fa-2x"></i></CCol>
                <CCol xs={10}><strong style={{fontFamily:'Quicksand'}}>{address}{" "}{state}{" "}{country}{" "}</strong></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-envelope fa-2x"></i></CCol>
                <CCol xs={10}><strong style={{fontFamily:'Quicksand'}}>{email}</strong></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-phone fa-2x"></i></CCol>
                <CCol xs={10}><strong style={{fontFamily:'Quicksand'}}>{phone1}{" "}{phone2}</strong></CCol>
            </CRow>
            <hr/>
            <CRow>
                <CCol xs={2}><i style={{color:color}} className="fa fa-user fa-2x"></i></CCol>
                <CCol xs={10}><strong style={{fontFamily:'Quicksand'}}>{signatoryname}</strong></CCol>
            </CRow>
            <hr/>
        </CContainer>
        </CCardBody>
    </CCard>
  
  )
}

export default WidgetsDropdown
