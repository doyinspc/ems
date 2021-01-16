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
import { getStaffprofessionals, deleteStaffprofessional } from './../../actions/staff/staffprofessional';
import FormProfessional from './FormProfessional';


const StaffProfessional = (props, {match}) => {
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
        
        table:'staffprofessionals',
        narration:`get all staff professional with id ${staffid}`
      }
      props.getStaffprofessionals(params);
      
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
    props.deleteStaffprofessional(fd, data)
 }
 const onClose = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive(false)
}
  return (
    <>
    {active ?
    <FormProfessional
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
              <h5>Professional Certification <small></small></h5>
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
                            let imgx = process.env.REACT_APP_SERVER_URL + prop.links;
                            return (
                                <tr
                                    onMouseLeave={()=>showCont(1, prop.id)}
                                    onMouseEnter={()=>showCont(0, prop.id)}onMouseOver
                                > 
                                    <td>
                                        {prop.level}{" "} <strong style={{textTransform:'uppercase'}}>{prop.instituition}</strong><br/>
                                        {moment(prop.issued).format('MMM DD, YYYY')} 
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
    data : state.staffprofessionalReducer.staffprofessionals,
    user : state.userReducer
})
export default connect(mapStateToProps, { getStaffprofessionals, deleteStaffprofessional})(StaffProfessional)
