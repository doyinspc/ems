import React, { useState, useEffect } from 'react'
import {connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { getSchooldropdowns} from './../actions/setting/school'
import {
  CFormGroup,
  CForm,
  CButton,
  CSelect,
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
  const sidebarShow = useSelector(state => state.sidebarShow)
  const [term, setTerm] = useState(0)
  const [clasz, setClasz] = useState(0)

  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'schoolid':1
      }),
      cat:'dropdowns',
      table:'access',
      narration:'get all student from class'
  }
    props.getSchooldropdowns(params)
  }, [])

  
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  
  let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
  let dt0 ='';
  let dt1 ='';
  if(dt.length > 0){
     dt0 = dt[0].map((prop, ind)=>{
    return <option value={prop.id}>{prop.name}</option>;
  });
    dt1 = dt[1].map((prop, ind)=>{
    return <option value={prop.id}>{prop.name}</option>;
  });
}

  return (
    <CHeader withSubheader>
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
        <h2>SIL EDUCATION</h2>
      </CHeaderBrand>
      <CHeaderNav className="d-md-down-none mr-auto">
      <CForm action="" method="post" inline>
                <CFormGroup className="pr-1">
                  <CSelect 
                    custom 
                    size="md" 
                    name="term" 
                    id="term"
                    onChange={(e)=>setTerm(e.target.value)}
                    >
                      <option value="0">Select Term</option>
                      {dt0}
                    </CSelect>
                </CFormGroup>
                <CFormGroup className="pr-1">
                <CSelect 
                    custom 
                    size="md" 
                    name="clasz" 
                    id="clasz"
                    onChange={(e)=>setClasz(e.target.value)}
                    >
                      <option value="0">Select Class</option>
                      {dt1}
                    </CSelect>
                </CFormGroup>
                <CFormGroup className="pr-1">
                <Link 
                    type="submit" 
                    size="sm" 
                    color="primary"
                    to={`/studentclasses/${term}/${clasz}`}
                    >
                      <CIcon name="cil-scrubber" /> Load</Link>
                </CFormGroup>
              </CForm>
      
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
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
  dropdowns : state.schoolReducer.dropdowns
})
export default connect(mapStateToProps, {
  getSchooldropdowns
})(TheHeader)

