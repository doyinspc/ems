import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import {  
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CButton,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CInputCheckbox,
    CDropdownDivider,
    CTextarea,
    CSelect
 } from '@coreui/react';
import {updateStaffleave, getStaffleaves, deleteStaffleave } from './../../actions/staff/staffleave';
import FormLeave from './FormLeave';


const StaffLeave = (props, {match}) => {
  const staffid = props.sid
  const usercontrol = props.usercontrol
  const userview = props.userview
  const data = props.data
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState(0)
  const [closed, setClosed] = useState(0)
  const [forward, setForward] = useState('')
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
        
        table:'staffleaves',
        narration:`get all staff leave with id ${staffid}`
      }
      props.getStaffleaves(params);
      
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
    props.deleteStaffleave(data)
 }
 const onClose = () =>{
    setEditerid(null)
    setEditerdata({})
    setActive(false)
}
const loadClosed = (e) =>{
    if(e.target.checked)
    {
        setClosed(1)
    }else{
        setClosed(0)
    }
}
const handleSubmit= (data)=>{
    let arrr = {}
    arrr['approved'] = status;
    arrr['reason'] = reason;
    arrr['dateapproved'] = new Date();
    arrr['username'] = props.user.username;
    arrr['userid'] = props.user.userid;
    let app = []
    if(data.approval && data.approval.length > 0 && Array.isArray(JSON.parse(data.approval)))
    {
        app = JSON.parse(data.approval)
    }
    let findIndex = app.findIndex((rw)=>rw.userid === 1);
    if(findIndex > -1)
    {
        app[findIndex] = arrr;
    }else{
        app.push(arrr)
    }
    
    let fd = new FormData()
    fd.append('id', data.id)
    fd.append('approval', JSON.stringify(app))
    fd.append('notes', closed)
    fd.append('cat', 'update')
    fd.append('table', 'staffleaves')

    props.updateStaffleave(fd)

    
}
  return (
    <>
    {active ?
    <FormLeave
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
              <h5>Leave History <small></small></h5>
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
                        data && Array.isArray(data) && data.length > 0 ? data.map((prop, index)=>{
                            return (
                                <tr
                                    onMouseLeave={()=>showCont(1, prop.id)}
                                    onMouseEnter={()=>showCont(0, prop.id)}onMouseOver
                                > 
                                    <td>
                                        <strong style={{textTransform:'uppercase'}}>{moment(prop.started).format('MMM DD, YYYY')}{" - "}{moment(prop.ended).format('MMM DD, YYYY')}</strong><br/>
                                        {prop.reason}   
                                        <CRow>
                                            {prop.approval && prop.approval.length > 0 && Array.isArray(JSON.parse(prop.approval)) ? JSON.parse(prop.approval).map((pr, ind)=>{
                                            return <CCol md={4} sm={6} xs={12}>
                                                <CRow xs={12}>
                                                    <CCol xs={3}>
                                                        <i className={parseInt(pr.approved) === 0 ? 'fa fa-certificate fa-4x text-success' : 'fa fa-thumbs-down fa-4x text-danger'}></i>
                                                    </CCol>
                                                    <CCol xs={9}>
                                                        <CRow xs={12}>
                                                            <strong>{pr.username}</strong>
                                                        </CRow>
                                                        <CRow xs={12}>
                                                            <strong><h6 className={parseInt(pr.approved) === 0 ? 'text-success': 'text-danger'}>{parseInt(pr.approved) === 0 ? 'APPROVED': 'DENIED'}</h6></strong>
                                                        </CRow>
                                                        <CRow xs={12}>
                                                            {moment(new Date(pr.dateapproved)).format('DD MM YYYY hh:mm:sm a')}
                                                        </CRow>
                                                        <CRow xs={12}>
                                                            <i><small>{pr.reason}</small></i>
                                                        </CRow>
                                                    </CCol>
                                                </CRow>
                                            </CCol>
                                            }):''}
                                        {parseInt(prop.notes) > 0 ?<>
                                        <CCol md={4} sm={6} xs={12}>
                                        {prop.approval && prop.approval.length > 0 && Array.isArray(JSON.parse(prop.approval)) && JSON.parse(prop.approval).length > 0 ? '':<>
                                        <button onClick={()=>onEdit(prop)} className='btn btn-link'><i className='fa fa-edit '></i></button>
                                        <button onClick={()=>onDelete(prop.id)} className='btn btn-link'><i className='fa fa-trash '></i></button></>}
                                        {parseInt(prop.notes) === parseInt(prop.user.id) ? 
                                        <CDropdown className="m-1">
                                            <CDropdownToggle color="info" size='sm' block={true}>
                                                Approval
                                            </CDropdownToggle>
                                            <CDropdownMenu  placement="right">
                                                <CForm className="px-4 py-3" >
                                                <CFormGroup>
                                                    <CLabel htmlFor="status">Status</CLabel>
                                                    <CSelect 
                                                        className="form-control" 
                                                        id="status" 
                                                        onChange={(e)=>setStatus(e.target.value)}
                                                        >
                                                            <option value='0'>Approved</option>
                                                            <option value='1'>Denied</option>
                                                    </CSelect>
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="reason">Comment / Reason</CLabel>
                                                    <CTextarea 
                                                        className="form-control" 
                                                        id="reason" 
                                                        defaultValue={reason}
                                                        placeholder="any reason for your decision" 
                                                        onChange={(e)=>setReason(e.target.value)}
                                                        >
                                                    </CTextarea>
                                                </CFormGroup>
                                                
                                                <CFormGroup variant="custom-checkbox" className="form-group">
                                                    <CInputCheckbox 
                                                        custom 
                                                        id="closed" 
                                                        defaultChecked={closed === 0 ? false : true}
                                                        value={1}
                                                        onChange={loadClosed}
                                                        />
                                                    <CLabel 
                                                        variant="custom-checkbox" 
                                                        htmlFor="closed"
                                                        >Close</CLabel>
                                                </CFormGroup>
                                                {closed === 0 ?
                                                <CFormGroup>
                                                    <CLabel htmlFor="nex">Forward To.</CLabel>
                                                    <CSelect 
                                                        className="form-control" 
                                                        id="nex" 
                                                        >
                                                            <option value='0'>Approved</option>
                                                            <option value='1'>Denied</option>
                                                    </CSelect>
                                                </CFormGroup>
                                                :''}
                                                <CFormGroup className="mt-2">
                                                    <CButton color="primary" type="submit" onClick={()=>handleSubmit(prop)}>Submit</CButton>
                                                </CFormGroup>
                                                </CForm>
                                                
                                            </CDropdownMenu>
                                            </CDropdown>
                                        :""}</CCol></>:''}
                                   
                                        </CRow>
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
    data : state.staffleaveReducer.staffleaves,
    user : state.userReducer
})
export default connect(mapStateToProps, {updateStaffleave, getStaffleaves, deleteStaffleave})(StaffLeave)
