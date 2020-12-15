import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStaffprofessional, updateStaffprofessional, deleteStaffprofessional } from './../../actions/staff/staffprofessional';
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
  CCardFooter

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { gradesjson, SERVER_URL, setElement } from '../../actions/common';

const Staffprofessionals = (props) => {
    const history = useHistory()
    const sid = props.sid
    const [editid, setEditid] = useState(props.editid)
    const [id, setId] = useState(null)
    
    //PROFESSIONAL
    const [instituition, setInstituition] = useState('')
    const [level, setLevel] = useState('')
    const [issued, setIssued] = useState('')
    const [linked, setLinked] = useState('')

    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setInstituition(data.instituition)
        setLevel(data.level)
        setLinked(data.files)
        setIssued(data.issued)
      }
    }, [props.data, props.rowid, sid])
    const handleClose = () =>{

    }
    const handleSubmit = () =>{

        let fd = new FormData();
        fd.append('instituition', instituition);
        fd.append('level', level);
        fd.append('files', linked);
        fd.append('issued', issued);
        fd.append('table', 'staffprofessionals');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating professional record');
            props.updateStaffprofessional(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting professional record');
            fd.append('staffid', sid);
            props.registerStaffprofessional(fd)
            
        }

    }
    
    const handleInputChange = (evt) => {
        setLinked(evt.target.files[0]);
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
                                <CLabel htmlFor="Instituition">Instituition</CLabel>
                                <CInput 
                                    id="Instituition" 
                                    name='text'
                                    defaultValue={instituition}
                                    placeholder="Teachers Registration Council of Nigeria"
                                    onChange={(e)=>setInstituition(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Level">Level</CLabel>
                                <CInput 
                                    id="Level" 
                                    name='text'
                                    defaultValue={level}
                                    placeholder="Graduate Member "
                                    onChange={(e)=>setLevel(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="issued">Date Issued</CLabel>
                                <CInput 
                                    id="issued" 
                                    type='date'
                                    defaultValue={issued}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setIssued(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                           <CCol xs="12" >
                            <CFormGroup>
                                <CLabel htmlFor="ended">Upload Document (100kb)</CLabel>
                                <CInput 
                                    type="file" 
                                    name="files" 
                                    id="files"
                                    defaultValue={linked}
                                    onChange={handleInputChange} 
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
    registerStaffprofessional,
    updateStaffprofessional,
    
  })(Staffprofessionals)
  
