import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStaffleave, updateStaffleave, deleteStaffleave } from './../../actions/staff/staffleave';
import { useHistory, useLocation } from 'react-router-dom'

import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CButton,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CCardFooter,
  CTextarea,
  CAlert

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { gradesjson, SERVER_URL, setElement } from '../../actions/common';

const Staffleaves = (props) => {
    const history = useHistory()
    const sid = props.sid
    const [editid, setEditid] = useState(props.editid)
    const [id, setId] = useState(null)
    
    //LEAVE
    const [refid, setRefid] = useState('')
    const [reason, setReason] = useState('')
    const [started, setStarted] = useState('')
    const [ended, setEnded] = useState('')
  
    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setReason(data.reason)
        setRefid(data.notes)
        setStarted(data.started)
        setEnded(data.ended)
      }
    }, [props.data, props.rowid, sid])
    
    const handleSubmit = () =>{

        let fd = new FormData();
        fd.append('reason', reason);
        fd.append('notes', refid);
        fd.append('started', started);
        fd.append('ended', ended);
        fd.append('table', 'staffleaves');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating leave record');
            props.updateStaffleave(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting leave record');
            fd.append('staffid', sid);
            fd.append('approval', JSON.stringify([]));
            props.registerStaffleave(fd)  
        }
    }
    
   
  return (
    <>
    <CRow className='align-center mx-auto d-flex ' sm={12}>
    <CCol sm="6" md="6" className='mx-auto'>
                    <CCard>
                      <CCardHeader>
                        <h4>{parseInt(id) > 0 ? 'Edit Application':'Leave Application'}</h4>
                      </CCardHeader>
                        <CCardBody>
                       <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Reason">Reason for Absence (Explain clearly)</CLabel>
                                <CTextarea
                                    id="Reason" 
                                    name='text'
                                    row={20}
                                    column={2}
                                    defaultValue={reason}
                                    placeholder="Type or paste here...."
                                    onChange={(e)=>setReason(e.target.value)} 
                                    >
                                </CTextarea>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='6'>
                            <CFormGroup>
                                <CLabel htmlFor="started">Start From</CLabel>
                                <CInput 
                                    id="started" 
                                    type='date'
                                    defaultValue={started}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setStarted(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='6'>
                            <CFormGroup>
                                <CLabel htmlFor="ended">Resume On</CLabel>
                                <CInput 
                                    id="ended" 
                                    type='date'
                                    defaultValue={ended}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setEnded(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="refid">Forward this request to</CLabel>
                                <CInput
                                    id="refid" 
                                    name='refid'
                                    defaultValue={refid}
                                    placeholder="Type or paste here...."
                                    onChange={(e)=>setRefid(e.target.value)} 
                                    />
                         
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                          <CAlert>
                            Note : You can not make any changes or delete 
                            this application once it has been approved or denied
                          </CAlert>
                        </CRow>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="button" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="button" size="sm" color="danger" onClick={()=>props.handleClose()}><CIcon name="cil-ban" /> Close</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    user : state.userReducer
  })
  export default connect(mapStateToProps, {
    registerStaffleave,
    updateStaffleave,
    
  })(Staffleaves)
  
