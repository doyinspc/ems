import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStaffexperience, updateStaffexperience, deleteStaffexperience } from './../../actions/staff/staffexperience';
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

const Staffexperiences = (props) => {
    const history = useHistory()
    const sid = props.sid
    const [id, setId] = useState(null)
    
    //EXPERIENCE
    const [organisation, setOrganisation] = useState('')
    const [position, setPosition] = useState('')
    const [job, setJob] = useState('')
    const [started, setStarted] = useState('')
    const [ended, setEnded] = useState('')
  

    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setOrganisation(data.organisation)
        setPosition(data.position)
        setJob(data.job)
        setStarted(data.started)
        setEnded(data.ended)
      }
    }, [props.data, props.rowid, sid])
    const handleClose = () =>{

    }
    const handleSubmit = () =>{

        let fd = new FormData();
        fd.append('organisation', organisation);
        fd.append('position', position);
        fd.append('job', job);
        fd.append('started', started);
        fd.append('ended', ended);
        fd.append('table', 'staffexperiences');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating experience record');
            props.updateStaffexperience(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting experience record');
            fd.append('staffid', sid);
            props.registerStaffexperience(fd)
            
        }

    }
    
    const changejob= (e) =>{
        setJob(e.target.value)
    }
  
  

  return (
    <>
    <CRow className='align-center mx-auto d-flex ' sm={12}>
    <CCol sm="6" md="6" className='mx-auto'>
                    <CCard>
                      <CCardHeader>
                        <h4>{parseInt(id) > 0 ? 'Edit':'Add'}</h4>
                      </CCardHeader>
                        <CCardBody>
                       <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Organisation">Organisation</CLabel>
                                <CInput 
                                    id="Organisation" 
                                    name='text'
                                    defaultValue={organisation}
                                    placeholder="Ministry Of Education "
                                    onChange={(e)=>setOrganisation(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Position">Position/Office</CLabel>
                                <CInput 
                                    id="Position" 
                                    name='text'
                                    defaultValue={position}
                                    placeholder="Education Officer "
                                    onChange={(e)=>setPosition(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                              <CFormGroup>
                                  <CLabel htmlFor="job">Job Description</CLabel>
                                  <CTextarea 
                                      custom 
                                      id="job" 
                                      onChange={changejob}
                                      value={job} 
                                      placeholder='Coordinate teachers, ....'
                                  >
                                     
                                  </CTextarea>
                              </CFormGroup>
                              </CCol>
                              
                            <CCol xs="12" sm='6'>
                            <CFormGroup>
                                <CLabel htmlFor="started">Date Started</CLabel>
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
                                <CLabel htmlFor="ended">Date Left</CLabel>
                                <CInput 
                                    id="ended" 
                                    type='date'
                                    defaultValue={ended}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setEnded(e.target.value)} 
                                    />
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
    registerStaffexperience,
    updateStaffexperience,
    
  })(Staffexperiences)
  
