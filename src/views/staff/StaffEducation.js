import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { checkImage } from './../../actions/common'
import {  
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CButton
 } from '@coreui/react';
import { getStaffeducations, deleteStaffeducation } from './../../actions/staff/staffeducation';
import FormEducation from './FormEducation';


const StaffEducation = (props, {match}) => {
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
        
        table:'staffeducations',
        narration:`get all staff education with id ${staffid}`
      }
      props.getStaffeducations(params);
      
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
    fd.append('table', 'staffeducations')
    fd.append('cat', 'delete')
    props.deleteStaffeducation(fd,data)
 }
 const onClose = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive(false)
}
  return (
    <>
    {active ?
    <FormEducation
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
              <h5>Education History <small></small></h5>
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
                        data && Array.isArray(data) && data.length > 0 ? data.filter(rw=>rw !==null && rw !== undefined).map((prop, index)=>{
                            let imgx = process.env.REACT_APP_SERVER_URL + prop.links;
                            
                            return (
                                <tr
                                key={index}
                                    onMouseLeave={()=>showCont(1, prop.id)}
                                    onMouseEnter={()=>showCont(0, prop.id)}onMouseOver
                                > 
                                    <td>
                                        <strong style={{textTransform:'uppercase'}}>{prop.school}</strong><br/>
                                        {prop.result}{" "}<i style={{textTransform:'capitalize'}}>{prop.course}</i><br/>
                                        {prop.grade}<br/>
                                        {moment(prop.started).format('MMM DD, YYYY')}{" - "}{moment(prop.ended).format('MMM DD, YYYY')}
                                     {checkImage(imgx) ? <a target='_blank' className='btn btn-link' href={imgx}>DOWNLOAD</a>:<strong>No File Uploaded</strong>}
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
    data : state.staffeducationReducer.staffeducations,
    user : state.userReducer
})
export default connect(mapStateToProps, { getStaffeducations, deleteStaffeducation})(StaffEducation)
