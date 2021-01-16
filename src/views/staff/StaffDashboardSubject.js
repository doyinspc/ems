import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {  
    CCol, 
    CRow, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem,
    CWidgetDropdown
} from '@coreui/react';
import StaffDashboardDefault from './StaffDashboardDefault'
import { getStaffsubjects } from './../../actions/staff/staffsubject'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import Students from './Subjects/Students'

const Dashboard = (props) => {
    
  const [subject, setSubject]  = useState([])
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

  const loadStudents = (sub) =>{
      setSubject(sub)
  }
return (
    <>
    <CRow>
      <StaffDashboardDefault />
      </CRow>
      <CRow>
        {
          Array.isArray(props.staffsubject.staffsubjects) ? props.staffsubject.staffsubjects.filter(rw=>rw !== null & rw !== undefined).map((prp, ind)=>{
            let numz = prp.num.split(":");
            let numz1 = numz.filter(rw=>parseInt(rw.split(":")[0][1]) == parseInt(prp.itemid1)).lenght
            return <CCol sm="6" lg="3"  key={ind}>
              <CWidgetDropdown
                color="gradient-info"
                header={numz}
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
                    <CIcon name="cil-settings"/>
                  </CDropdownToggle>
                  <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem onClick={()=>loadStudents(prp)}>Students</CDropdownItem>
                    <CDropdownItem>Lesson Plan</CDropdownItem>
                    <CDropdownItem>Analysis</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CWidgetDropdown>
            </CCol>
            

          }):''
        }
     

      
      
     
      </CRow>
 
      <Students
        termid={props.user.activeterm.termid}
        sessionid={props.user.activeterm.sessionid}
        clientid={props.user.user.id}
        subject={subject}
      />
    </>
  )
}
const mapStateToProps = (state) =>({
staffsubject:state.staffsubjectReducer,
user:state.userReducer
})
export default connect(mapStateToProps, { getStaffsubjects}) (Dashboard)