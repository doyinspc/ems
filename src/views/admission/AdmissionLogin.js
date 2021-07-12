import React, { useState} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { userLogin } from './../../actions/user'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () =>{
     
      let fd = new FormData()
      fd.append('username', username)
      fd.append('password', password)
      fd.append('cat', 'login')
      fd.append('table', 'staffs')
      props.userLogin(fd)
  }
 
  if(props.isAuthenticated === true)
  {
    return <Redirect to='/main' />
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1><img src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO1} height='50px'/>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      type="text" 
                      value={username} 
                      onChange={(e)=>setUsername(e.target.value)} placeholder="Staff ID" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      type="password" 
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={()=>handleSubmit()} className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO2} 
                      height='170px'
                    />
                    <h4>Education</h4>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
const mapStateToProps = (state) =>({
  isAuthenticated:state.userReducer.isAuthenticated
})
export default connect( mapStateToProps,{userLogin})(Login)
