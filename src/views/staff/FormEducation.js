import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStaffeducation, updateStaffeducation, deleteStaffeducation } from './../../actions/staff/staffeducation';
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

const Staffeducations = (props) => {
    const history = useHistory()
    const sid = props.sid
    const [editid, setEditid] = useState(props.editid)
    const [id, setId] = useState(null)
    
    //EDUCATION
    const [school, setSchool] = useState('')
    const [course, setCourse] = useState('')
    const [grade, setGrade] = useState('')
    const [result, setResult] = useState('Primary School')
    const [started, setStarted] = useState('')
    const [linked, setLinked] = useState('')
    const [ended, setEnded] = useState('')
    const [gradetype, setGradeTypes] = useState([])
  
    useEffect(() => {
      fetch(process.env.PUBLIC_URL+ gradesjson)
      .then(response=>response.json())
      .then(data=>setGradeTypes(data))
      .catch(error=>setGradeTypes({'grades':'', 'types':''}));
    }, [])

    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setSchool(data.school)
        setCourse(data.course)
        setLinked(data.files)
        setResult(data.result)
        setGrade(data.grade)
        setStarted(data.started)
        setEnded(data.ended)
        setElement('result', data.result )
        setElement('grade', data.grade )
      }
    }, [props.data, props.rowid, sid])
    const handleClose = () =>{

    }
    const handleSubmit = () =>{

        let fd = new FormData();
        fd.append('school', school);
        fd.append('course', course);
        fd.append('result', result);
        fd.append('grade', grade);
        fd.append('files', linked);
        fd.append('started', started);
        fd.append('ended', ended);
        fd.append('table', 'staffeducations');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating education record');
            props.updateStaffeducation(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting education record');
            fd.append('staffid', sid);
            props.registerStaffeducation(fd)
            
        }

    }
    
    const changeresult= (e) =>{
        setResult(e.target.value)
    }
    const handleInputChange = (evt) => {
        setLinked(evt.target.files[0]);
    }
  

let starray = gradetype && gradetype.types !== undefined ? gradetype.types.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
    return <option key={ind} value={rw}>{rw}</option>
}): ''

let lgarray = gradetype && gradetype.grades !== undefined  ?gradetype.grades.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
  return <option key={ind} value={rw}>{rw}</option>
}): ''



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
                                <CLabel htmlFor="School">School</CLabel>
                                <CInput 
                                    id="School" 
                                    name='text'
                                    defaultValue={school}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setSchool(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="Course">Course Of Study</CLabel>
                                <CInput 
                                    id="Course" 
                                    name='text'
                                    defaultValue={course}
                                    placeholder="Mathematics Education "
                                    onChange={(e)=>setCourse(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='6'>
                              <CFormGroup>
                                  <CLabel htmlFor="result">Type<i className='text-danger'>*</i></CLabel>
                                  <CSelect 
                                      custom 
                                      id="result" 
                                      onChange={changeresult} 
                                  >
                                      {starray}
                                  </CSelect>
                              </CFormGroup>
                              </CCol>
                              <CCol xs="12" sm='6'>
                              <CFormGroup>
                              <CLabel htmlFor="grade">Grade</CLabel>
                                  <CSelect 
                                      custom 
                                      id="grade" 
                                      placeholder="Select grade"
                                      onChange={(e)=>setGrade(e.target.value)} 
                                     
                                  >
                                      {lgarray}
                                  </CSelect>
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
                                <CLabel htmlFor="ended">Date Completed</CLabel>
                                <CInput 
                                    id="ended" 
                                    type='date'
                                    defaultValue={ended}
                                    placeholder="Federal University of Technology Minna, Niger State, Nigeria "
                                    onChange={(e)=>setEnded(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" >
                            <CFormGroup>
                                <CLabel htmlFor="ended">Upload Result</CLabel>
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
    registerStaffeducation,
    updateStaffeducation,
    
  })(Staffeducations)
  
