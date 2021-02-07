import React from 'react';
import { connect } from 'react-redux';
import {} from './../../../actions/student/studentfee';
import {} from './../../../actions/student/studentclass';

import {
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Dashboards= (props) => {
    let termid = props.termid;
    let sessionid = props.termid;
    
   
  return (
    <>
    <CRow>
    
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
  })
export default connect(mapStateToProps,{})(Dashboards)
  
  
