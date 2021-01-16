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
import FormLog from './FormLog';


const StaffLog = (props, {match}) => {
  const staffid = props.sid
  const usercontrol = props.usercontrol
  const userview = props.userview
  const data = props.data
  const [active, setActive] = useState(false)
  const [editerid, setEditerid] = useState(null)
  const [editerdata, setEditerdata] = useState({})

  const [edit, setEdit] = useState('')

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

  const showCont = (num, id)=>{
        if(num === 0)
        {
            setEdit(id)
        }
        else if(num === 1){
            setEdit(null)
        }
  }
 const onEdit = (data) =>{
    setEditerid(data.id)
    setEditerdata(data)
    setActive(true)
 }
 const onAdd = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive((prev)=>!prev)
 }
 const onDelete = (data) =>{
    props.deleteStafflog(data)
 }
 const onClose = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive(false)
}
  return (
    <>
    {active ?
    <FormLog
        data={editerdata}
        rowid={editerid}
        sid={staffid}
        handleClose={onClose}
    />:''}
    <CRow>
    <CCol lg={12}>
        <CCard>
            <CCardHeader>
                
                <CRow>
              <CCol>
              <h5>Log History <small></small></h5>
              </CCol>
              <CCol className="d-md-block btn-group text-right">
              <CButton  
                  color={active ? "danger" :"primary" }
                  onClick={onAdd}
                  className=""
                  >
                <i className={active ? "fa fa-close" :"fa fa-plus" }></i>
              </CButton>
              </CCol>
              </CRow>
            </CCardHeader>
             <CCardBody>
                <table width='100%'>
                    {
                        data && Array.isArray(data) && data.length > 0 ? data.filter(rw=>rw !==null).map((prop, index)=>{
                            return (
                                <tr
                                    onMouseLog={()=>showCont(1, prop.id)}
                                    onMouseEnter={()=>showCont(0, prop.id)}onMouseOver
                                > 
                                    <td>
                                        {prop.school}
                                       
                                    </td>
                                    <td width='20%'>
                                        <span className={edit !== prop.id ? 'collapse' : ''}>
                                        <button onClick={()=>onEdit(prop)} className='btn btn-link'><i className='fa fa-edit'></i></button>
                                        <button onClick={()=>onDelete(prop.id)} className='btn btn-link'><i className='fa fa-trash'></i></button>
                                        </span>
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
