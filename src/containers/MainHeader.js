import React, { useState, useEffect } from 'react'
import {connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'
import { Link, Redirect } from 'react-router-dom';

const TheHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.page.sidebarShow)
  
  let user = JSON.parse(sessionStorage.getItem('userx12345'))
  let username = ''
  if(user !== null){
    username = user.surname+" "+user.firstname+" "+user.middlename
  }
  if(props.user.isAuthenticated !== true)
  {
    return <Redirect to='/login' />
  }
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  
  
  return (
    <CHeader withSubheader className="d-print-none">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      <h2>{process.env.REACT_APP_SUB_NAME}</h2>
      </CHeaderBrand>
      <CHeaderNav className="d-md-down-none mr-auto">
      <h3>{username}</h3>
      </CHeaderNav>
       
      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown
          username={username}
          user={user !== undefined ? user : null}
        />
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between d-print-none">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader>
    </CHeader>
  )
}

const mapStateToProps = (state) =>({
  user : state.userReducer
})
export default connect(mapStateToProps, {
  
})(TheHeader)

