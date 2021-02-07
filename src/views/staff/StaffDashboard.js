import { CCol, CCollapse, CRow } from '@coreui/react';
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { getUserDatas, getUserSchools, getUserTerms, getUserdropdowns, settSchool, settTerm} from './../../actions/user'
import StaffDashboardMenu from './StaffDashboardMenu';
import StaffDashboardSchool from './StaffDashboardSchool';
import StaffDashboardSession from './StaffDashboardSession';
import Birthdays from "./Birthdays"
import Notice from "./Notice"
import SchoolData from "./../setting/SchoolData"
import Search from './Search';
import ClassPopulation from './Dasboard/ClassPopulation';
import Staffsubject from './../setting/Stage/Staffsubject1'
import Themes from './Subjects/Theme'
import ClassFee from './Dasboard/ClassFee';

const Dashboard = (props) => {
  const [schools, setSchools] = useState({})
  const [showmenu, setShowmenu] = useState(false)

useEffect(() => {
  //load dropdowns
  let did = props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0 ? props.user.activeschool.id :'null'
  let tid = props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('typeid') && parseInt(props.user.activeschool.typeid) > 0 ? props.user.activeschool.typeid :'null'
  
  let params = {
    data:JSON.stringify(
    {
        'schoolid':did,
        'typeid':tid
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
//IF NO SCHOOL IS SET SET ACTIVE SCHOOL AUTOMATICALY
if(!props.user.activeschool.hasOwnProperty('id') ||  props.user.activeschool === undefined )
{
  let myCurrentSchool = props.user.user !== undefined && props.user.user !== null && props.user.user.hasOwnProperty('schoolid') && parseInt(props.user.user.schoolid) > 0 ? props.user.user.schoolid :'null'
  if(parseInt(myCurrentSchool) > 0)
  {
      let sd = props.user.mySchoolData !== null && props.user.user !== undefined && Array.isArray(props.user.mySchoolData) ? props.user.mySchoolData.filter(rw =>rw !== null).filter(rw=>parseInt(rw.id) === parseInt(myCurrentSchool)):[]
      if(sd.length > 0)
      {
        changeSchool(sd[0])
      }
  }else
  {
    //changeSchool(props.user.mySchoolData[0])
  }
}

let schdata = props.user.mySchoolData !== undefined && Array.isArray(props.user.mySchoolData) ? props.user.mySchoolData :[]

return (
    <>
    <CRow>
    <CCol sm={9}>
    <StaffDashboardSession 
        activeterm={props.user.activeterm}
        activeschool={props.user.activeschool}
        schools={schdata}
        changeSchool={(data)=>changeSchool(data)}
        toggleMenu={changeMenu}
      />
      <Themes />
      <Staffsubject
        pid={1}
        para={{'icon':process.env.PUBLIC_URL + '/icons/subject.png'}}
        title={props.user.activeterm}
        school={props.user.activeschool} 
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        clientid={props.user.user.id}
        subject={[]}
        
      />
      <ClassPopulation sessionid={props.user.activeterm.sessionid} termid={props.user.activeterm.termid}/>
      <ClassFee sessionid={props.user.activeterm.sessionid} termid={props.user.activeterm.termid}/>
       <CCollapse
      show={showmenu}
      >
      <StaffDashboardSchool 
          schools={schdata}
          changeSchool={(data)=>changeSchool(data)}
      />
      <StaffDashboardMenu 
        dropdowns={dt}
        schools={schdata}
        changeSchool={(data)=>changeSchool(data)}
        changeTerm={(data)=>changeTerm(data)}
      />
      
      </CCollapse>
      <SchoolData school={props.user.activeschool} />
      </CCol>
      <CCol>
        <Search />
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