import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStaffjob, updateStaffjob, deleteStaffjob } from './../../actions/staff/staffjob';
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
  CTextarea

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Staffjobs = (props) => {
    const history = useHistory()
    const sid = props.sid
    const [editid, setEditid] = useState(props.editid)
    const [id, setId] = useState(null)
    
    //JOB
    const [job, setJob] = useState('')
  
    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setJob(data.job)
      }
    }, [props.data, props.rowid, sid])
    
    const handleSubmit = () =>{

        let fd = new FormData();
        fd.append('job', job);
        fd.append('table', 'staffjobs');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating job record');
            props.updateStaffjob(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting job record');
            fd.append('staffid', sid);
            props.registerStaffjob(fd)
            
        }

    }
    
   
  return (
    <>
    <CRow className='align-center mx-auto d-flex ' sm={12}>
    <CCol sm="6" md="6" className='mx-auto'>
                    <CCard>
                      <CCardHeader>
                        <h4>{parseInt(id) > 0 ? 'Edit Application':'Job Application'}</h4>
                      </CCardHeader>
                        <CCardBody>
                       <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Job">Job Role</CLabel>
                                <CTextarea
                                    id="Job" 
                                    name='text'
                                    row={20}
                                    column={2}
                                    defaultValue={job}
                                    placeholder="Type or paste here...."
                                    onChange={(e)=>setJob(e.target.value)} 
                                    >
                                </CTextarea>
                            </CFormGroup>
                            </CCol>
                           
                            
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="submit" size="sm" color="danger" onClick={()=>props.handleClose()}><CIcon name="cil-ban" /> Close</CButton>
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
    registerStaffjob,
    updateStaffjob,
    
  })(Staffjobs)
  
