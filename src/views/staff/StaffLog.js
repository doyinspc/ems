import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

import {  
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CButton
 } from '@coreui/react';
import { getStafflogs, deleteStafflog } from './../../actions/staff/stafflog';



const StaffLog = (props, {match}) => {
  const staffid = props.sid
  const usercontrol = props.usercontrol
  const userview = props.userview
  const data = props.data
  

  useEffect(() => {
      let params = {
        data:JSON.stringify(
        {
            'staffid':staffid
        }),
        cat:'selectes',
        
        table:'stafflogs',
        narration:`get all staff log with id ${staffid}`
      }
      props.getStafflogs(params);
      
  }, [staffid, props.user])

  
 
  return (
    <>
    <CRow>
    <CCol lg={12}>
        <CCard>
            <CCardHeader>
                
                <CRow>
              <CCol>
              <h5>Audit History <small></small></h5>
              </CCol>
             
              </CRow>
            </CCardHeader>
             <CCardBody>
                <table width='100%'>
                    {
                        data && Array.isArray(data) && data.length > 0 ? data.filter(rw=>rw !==null).map((prop, index)=>{
                            return (
                                <tr
                                > 
                                    <td>
                                        {moment(prop.date_created).format('MMM DD, YYYY H:M:S')} 
                                    </td>
                                    <td>
                                        {prop.locates}
                                    </td>
                                </tr>
                            )
                        }):<h4 className='text-center'>No Data</h4>
                    }
                </table>
            </CCardBody>
        </CCard>
        </CCol>
    </CRow>
</>
  )
}
const mapStateToProps = (state) =>({
    data : state.stafflogReducer.stafflogs,
    user : state.userReducer
})
export default connect(mapStateToProps, { getStafflogs, deleteStafflog})(StaffLog)
