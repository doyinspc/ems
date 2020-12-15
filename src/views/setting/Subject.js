import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getSubjects, getSubject, registerSubject, updateSubject, deleteSubject} from './../../actions/setting/subject';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CCollapse,
  CFormText,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CDropdownToggle,
  CDropdownMenu
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import department from '../../reducers/setting/department';


const Subject = (props) => {
  const departmentid = useParams().subject
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [dts, setDts] = useState('')
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState()
 
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET SUBJECTS PER SCHOOL
  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'departmentid':departmentid
      }),
      cat:'select',
      table:'subjects',
      narration:'get subjects'
  }
    props.getSubjects(params)
    
  }, [departmentid])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(id && parseInt(id) > 0)
    {
      let dt = dts;
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
    }else{
      setNamez('');
      setAbbrv('');
    }
    
  }, [id])

  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true);
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onActivate = (rw, num) =>{
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    props.updateSubject(fd);
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('table', 'subjects');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateSubject(fd)
        
      }else if(departmentid && parseInt(departmentid) > 0)
      {
        //INSERT
        fd.append('departmentid', departmentid);
        fd.append('cat', 'insert');
        props.registerSubject(fd)
      }
      onReset()
    }
  }
  
  let deparr = props.departments.filter(rw =>parseInt(rw.id) === parseInt(departmentid) && parseInt(rw.id) > 0);
  
  let departmentname = deparr.length > 0 ? deparr[0].name : 'None';
  let data = props.subjects.subjects && Array.isArray(props.subjects.subjects) ? props.subjects.subjects.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color={parseInt(row.is_active) === 0 ? 'success' : 'danger'} size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={(item) => history.push(`/department/${departmentid}/${row.id}`)}
                     ><i className='fa fa-list'></i>{' '} Scheme of Work</CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/department/${departmentid}/${row.id}`)}
                     ><i className='fa fa-bar-chart'></i>{' '} Performance Analysis</CDropdownItem>
                     <CDropdownItem 
                          onClick={()=>onActivate(row.id, row.is_active)} >
                          <i className={parseInt(row.is_active) === 0 ? 'fa fa-thumbs-up' : 'fa fa-thumb-down'}></i>
                          {' '}  {parseInt(row.is_active) === 0 ? 'Deactivate' : 'Activate'}</CDropdownItem>
                    <CDropdownItem onClick={()=>onEdit(row)} ><i className='fa fa-edit'></i>{' '}  Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.id, row)}><i className='fa fa-remove'></i>{' '}  Delete</CDropdownItem>
                  
                  </CDropdownMenu>
                </CDropdown>
                </td>
              </tr>
  })
  return (
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">{departmentname} Subjects</h4>
              <div className="small text-muted" style={{textTransform:'capitalize'}}>{props.school.name}</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary" 
                  onClick={toggle}
                  className="float-right">
                <i className='fa fa-plus'></i>
              </CButton>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Subject</th>
                    <th className="text-center"> <i className='fa fa-crosshairs'></i> Abbreviate.</th>
                    <th className="text-center"><i className='fa fa-gear'></i> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>

          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
        <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Subject</small></h4>
                </CCol>
                <CCol sm="6" className="d-md-block">
                  <CButton  
                      color="danger" 
                      onClick={onClose}
                      className="float-right">
                    <i className='fa fa-remove'></i>
                  </CButton>
                </CCol>
              </CRow>
              
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Subject</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="namez"
                      defaultValue={namez}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="Chemistry" 
                    />
                  <CFormText className="help-block">Please enter subject name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Subject Abbrv </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="CHEM" 
                    />
                  <CFormText className="help-block">Please enter subject abbrv (max 6 characters)</CFormText>
                </CFormGroup>
               
              </CForm>
            </CCardBody>
            
            <CCardFooter>
              <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
              <CButton type="reset" onClick={onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
      </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  subjects : state.subjectReducer,
  departments : state.departmentReducer.departments,
  school : state.schoolReducer.school,
})
export default connect(mapStateToProps, {
  getSubjects,
  getSubject,
  registerSubject,
  updateSubject,
  deleteSubject
})(Subject)
