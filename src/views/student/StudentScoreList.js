import React, { useState, useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import {
    CRow,
    CCol,
    CCardHeader,
    CNav,
    CNavLink,
    CNavItem,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CButton,
    CWidgetIcon,
    CCardFooter,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const StudentReportList = (props) => {

    //PASS DATA FROM PARENT PAGE
    let studentids = props.data1;
    let students = props.data;
    let termid = props.term;
    let sessionid = props.sessionid;
    let classteacher = props.classteacher;
    let clasz = props.clasz;
    let claszparent = props.claszparent;
    let activeterm = props.activeterm;


    //STORE DATA IN STATES
    const [rep, setrep] = useState(0)
    
    //GET DATA NEED FOR THIS PAGE
    //ALL REPORTS FOR THE SESSION
    useEffect(() => {
        let params2 = {
            data:JSON.stringify(
            {
                  'termid':termid,
                  'sessionid':sessionid,
                  'itemid':clasz,
                  'grp':1
              }),
              cat:'staffclass',
              table:'accessstaffclass',
              narration:'get classstaffs'
            }
         

        
    }, [sessionid, termid])


  return (
   <>
   <CRow >
        
    </CRow>
   </>
  )
}

export default StudentReportList
  
