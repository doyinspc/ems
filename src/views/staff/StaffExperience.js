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
import { getStaffexperiences, deleteStaffexperience } from './../../actions/staff/staffexperience';
import FormExperience from './FormExperience';


const StaffExperience = (props, {match}) => {
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
        table:'staffexperiences',
        narration:`get all staff experience with id ${staffid}`
      }
      props.getStaffexperiences(params);
      
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
 let fd = new FormData();
    fd.append('id', data)
    fd.append('table', 'staffexperiences')
    fd.append('cat', 'delete')
    props.deleteStaffexperience(fd,data)
 }
 
 const onClose = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive(false)
}
  return (
    <>
    {active ?
    <FormExperience
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
              <h5>Work History <br/><small>Chronological Order</small></h5>
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
                                    key={{index}}
                                    onMouseLeave={()=>showCont(1, prop.id)}
                                    onMouseEnter={()=>showCont(0, prop.id)}
                                > 
                                    <td>
                                        <strong style={{textTransform:'uppercase'}}>{prop.organisation}</strong><br/>
                                        <i style={{textTransform:'capitalize'}}>{prop.position}</i><br/>
                                        {prop.job}<br/>
                                        {moment(prop.started).format('MMM DD, YYYY')}{" - "}{moment(prop.ended).format('MMM DD, YYYY')}
                                       
                                    </td>
                                    <td width='20%'>
                                        <span className={edit !== prop.id ? 'collapse' : ''}>
                                        <button onClick={()=>onEdit(prop)} className='btn btn-link'><i className='fa fa-edit fa-2x'></i></button>
                                        <button onClick={()=>onDelete(prop.id)} className='btn btn-link'><i className='fa fa-trash fa-2x'></i></button>
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
    data : state.staffexperienceReducer.staffexperiences,
    user : state.userReducer
})
export default connect(mapStateToProps, { getStaffexperiences, deleteStaffexperience})(StaffExperience)
