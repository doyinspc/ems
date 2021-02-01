import React, {useEffect, useState} from 'react'
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
import StudentClass from '../student/StudentClasses';
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
    } 
    
  }, [props.user.activeterm])

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
      {/* <StaffDashboardDefault /> */}
      <StudentClass />
    </>
  )
}
const mapStateToProps = (state) =>({
staffsubject:state.staffsubjectReducer,
user:state.userReducer
})
export default connect(mapStateToProps, { getStaffsubjects}) (Dashboard)