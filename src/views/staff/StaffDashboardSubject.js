import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'
import {  
    CCol, 
    CRow, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem,
    CWidgetDropdown,
    CCollapse
} from '@coreui/react';
import StaffDashboardDefault from './StaffDashboardDefault'
import { getStaffsubjects } from './../../actions/staff/staffsubject'
import { getCas } from './../../actions/setting/ca'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import Students from './Subjects/Students'
import PlanForm from './Subjects/PlanForm'
import Plan from './Subjects/Plan'
import Theme from './../setting/Stage/Theme'
const Dashboard = (props) => {
    
  const [subject, setSubject]  = useState([])
  const [page, setPage]  = useState(0)
  const [collapser, setCollapser]  = useState(true)
  
  useEffect(() => {

    if(props.user.activeterm !== undefined)
    {
       let params = {
        data:JSON.stringify(
        {
            'termid':props.user.activeterm.termid,
            'sessionid':props.user.activeterm.sessionid,
            'clientid':props.user.user.id,
            'grp':2
        }),
        cat:'staffclass',
        table:'accessstaffsubjectnum',
        narration:'get staffsubjects'
  
      }
      props.getStaffsubjects(params)
      let params1 = {
        data:JSON.stringify(
        {
          'termid':props.user.activeterm.termid,
          'schoolid':props.user.activeterm.sessionid
        }),
        cat:'dropdownca',
        table:'dropdownca',
        narration:'get ca'
  
      }
      props.getCas(params1)
    } 
    
  }, [])

  const goBack = () =>{
    setPage(0);
    setCollapser(true)
  }

  const loadStudents = (sub) =>{
      setSubject(sub)
      setPage(1);
      setCollapser(false)
  }
  const loadRecords = (sub) =>{
      setSubject(sub)
      setPage(2);
      setCollapser(false)
  }
  const loadScheme = (sub) =>{
    setSubject(sub)
      setPage(3);
      setCollapser(false)
  }
  const loadPlan = (sub) =>{
      setSubject(sub)
      setPage(4);
      setCollapser(false)
  }
  const loadAnalysis = (sub) =>{
      setSubject(sub)
      setPage(5);
      setCollapser(false)
  }
 
return (
    <>
    <CRow>
      <StaffDashboardDefault />
      </CRow>
      <CCollapse show={collapser}>
      <CRow>
        { 
          Array.isArray(props.staffsubject.staffsubjects) ? props.staffsubject.staffsubjects.filter(rw=>rw !== null & rw !== undefined).map((prp, ind)=>{
            let numz =prp.num !== null && prp.num !== undefined ? prp.num.split(","):[];  
            let numz1 = numz.filter(rw=>rw !== null || rw=='').filter(rw=>parseInt(rw.split(":")[1]) == parseInt(prp.itemid1) && parseInt(rw.split(":")[3]) == parseInt(prp.itemid)).length
            let cl = parseInt(prp.is_active) === 0 ? "gradient-info" : "gradient-danger";
            let cl1 = parseInt(prp.is_active) === 0 ? "cil-settings" : "fa fa-lock";
            let cl2 = parseInt(prp.is_active) === 0 ? "" : "disabled";
            return <CCol sm="6" lg="4"  key={ind}>
              <CWidgetDropdown
                color={cl}
                header={numz1 + ' Students'}
                text={`${prp.itemname1} ${prp.itemname} `}
                footerSlot={
                  <ChartLineSimple
                    className="mt-3"
                    style={{height: '70px'}}
                    backgroundColor="rgba(255,255,255,.2)"
                    dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                    options={{ elements: { line: { borderWidth: 2.5 }}}}
                    pointHoverBackgroundColor="warning"
                    label="Members"
                    labels="months"
                  />}
              >
                <CDropdown>
                  <CDropdownToggle color="transparent">
                    <CIcon name={cl1}/>
                  </CDropdownToggle>
                  <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem disabled={cl2} onClick={()=>loadStudents(prp)}>Students</CDropdownItem>
                    <CDropdownItem onClick={()=>loadRecords(prp)}>Records</CDropdownItem>
                    <CDropdownItem onClick={()=>loadScheme(prp)}>Scheme of Work</CDropdownItem>
                    <CDropdownItem onClick={()=>loadPlan(prp)}>Lesson Plan</CDropdownItem>
                    <CDropdownItem onClick={()=>loadAnalysis(prp)}>Result Analysis</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CWidgetDropdown>
            </CCol>
          }):''
        }
     
      </CRow>
      
      </CCollapse>
      {page == 1 ? 
      <Students
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        clientid={subject.clientid}
        subjectid={subject.itemid1}
        claszid={subject.itemid}
        subject={subject}
        goBack={goBack}
      />:''
      }

      {page == 3 ? 
      <Theme
        pid={subject.itemid1}
        para={{'icon':process.env.PUBLIC_URL + '/icons/subject.png'}}
        title={props.user.activeterm}
        school={props.user.activeschool} 
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        clientid={props.user.user.id}
        subject={subject}
        goBack={goBack}
      />:''
      }

      {page == 4 ? 
      <>
      <PlanForm
        subjectid={subject.itemid1}
        subject={subject}
        claszid={subject.itemid}
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        staffid={props.user.user.id}
        goBack={goBack}
        
      />
      <Plan
        subjectid={subject.itemid1}
        subject={subject}
        claszid={subject.itemid}
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        staffid={props.user.user.id}
        goBack={goBack}
        
      />
      </>
      
      :''
      }
    </>
  )
}
const mapStateToProps = (state) =>({
  staffsubject:state.staffsubjectReducer,
  user:state.userReducer,
})
export default connect(mapStateToProps, { getStaffsubjects, getCas}) (Dashboard)