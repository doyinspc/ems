import { CCol, CCollapse, CRow } from '@coreui/react';
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { getUserDatas, getUserSchools, getUserTerms, getUserdropdowns, settSchool, settTerm} from './../../actions/user'
import StaffDashboardClass from './StaffDashboardClass';
import StaffDashboardMenu from './StaffDashboardMenu';
import StaffDashboardSchool from './StaffDashboardSchool';
import StaffDashboardSession from './StaffDashboardSession';
import StaffDashboardSubject from './StaffDashboardSubject';
import Birthdays from "./Birthdays"
import Notice from "./Notice"
import SchoolData from "./../setting/SchoolData"

const Dashboard = (props) => {
  const [schools, setSchools] = useState({})
  const [showmenu, setShowmenu] = useState(false)

useEffect(() => {
  //load dropdowns
  let did = props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0 ? props.user.activeschool.id :'null'
  let params = {
    data:JSON.stringify(
    {
        'schoolid':did
    }),
    cat:'dropdowns',
    table:'access',
    narration:'get all dropdowns'
    }
    props.getUserdropdowns(params)
  let params1 = {
      data:JSON.stringify(
      {
          'schoolid':did
      }),
      cat:'accessterms',
      table:'access',
      narration:'get current term'
      }
      props.getUserTerms(params1)
    
}, [props.user.mid, props.user.activeschool])

useEffect(() => {
  //load staff schools
  let params = {
    data:JSON.stringify(
    {
        'schools':props.user.myschools.join(',')
    }),
    cat:'schoolaccess',
    table:'schools',
    narration:'get all schools'
    }
    props.getUserSchools(params)
}, [props.user.mid, props.user.myschools])

useEffect(() => {
  //load staff subjects and class
  let params = {
    data:JSON.stringify(
    {
        'sessionid':props.user.activeterm.sessionid,
        'termid':props.user.activeterm.termid,
        'staffid':props.user.mid,
    }),
    cat:'dataaccess',
    table:'access',
    narration:'get all schools'
    }
    getUserDatas(params)
  
    
}, [props.user.mid, props.user.activeterm]);

let dt = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns : [[], []];
const changeSchool = (data) =>{
  
      props.settSchool(data)
}
const changeTerm = (data) =>{
      props.settTerm(data)
}
const changeMenu = () =>{
      setShowmenu(prev=>!prev);
}

return (
    <>
    <CRow>
    <CCol sm={9}>
    <StaffDashboardSession 
        activeterm={props.user.activeterm}
        activeschool={props.user.activeschool}
        schools={props.user.mySchoolData}
        changeSchool={(data)=>changeSchool(data)}
        toggleMenu={changeMenu}
      />
       <CCollapse
      show={showmenu}
      >
      <StaffDashboardSchool 
          schools={props.user.mySchoolData}
          changeSchool={(data)=>changeSchool(data)}
      />
      <StaffDashboardMenu 
        dropdowns={dt}
        schools={props.user.mySchoolData}
        changeSchool={(data)=>changeSchool(data)}
        changeTerm={(data)=>changeTerm(data)}
      />
      
      </CCollapse>
      <SchoolData school={props.user.activeschool} />
      </CCol>
      <CCol>
        <Birthdays />
        <Notice />
      </CCol>
      </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({
  activeTerm : state.termReducer.activeTerm,
  user : state.userReducer,

})
export default connect(mapStateToProps, {
  getUserDatas,
  getUserSchools,
  getUserTerms,
  getUserdropdowns,
  settSchool,
  settTerm

})(Dashboard)