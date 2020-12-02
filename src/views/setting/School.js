import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getSchools, getSchool, registerSchool, updateSchool, deleteSchool} from './../../actions/setting/school';
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
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


const School = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [name, setName] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [states, setStates] = useState('')

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  useEffect(() => {
    let params = {
      data:JSON.stringify({}),
      cat:'all',
      table:'schools',
      narration:'get schools'
  }
    props.getSchools(params)
    
  }, [])

  useEffect(() => {
    if(parseInt(id) > 0){
        let dt = dts;
        setName(dt.name);
        setAbbrv(dt.abbrv);
        setPhone1(dt.phone1);
        setPhone2(dt.phone2);
        setEmail(dt.email);
        setAddress(dt.address);
        setCountry(dt.country);
        setStates(dt.states);
    }else
    {
        setName('');
        setAbbrv('');
        setPhone1('');
        setPhone2('');
        setEmail('');
        setAddress('');
        setCountry('');
        setStates('');

    }
      
  }, [id])

  const onEdit = (rw, dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  const handleSubmit = () =>{
    if(name.length > 0){
      let fd = new FormData();
      fd.append('name', name);
      fd.append('abbrv', abbrv);
      fd.append('phone1', phone1);
      fd.append('phone2', phone2);
      fd.append('email', email);
      fd.append('country', country);
      fd.append('states', states);
      fd.append('address', address);
      fd.append('table', 'schools');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateSchool(fd)
        
      }else
      {
        //INSERT
        fd.append('cat', 'insert');
        props.registerSchool(fd)
      }
      onReset()
    }
  }
 
  let data = props.schools.schools && Array.isArray(props.schools.schools) ? props.schools.schools.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>
                    {row.name}
                    <div className="small text-muted">{row.abbrv}</div>
                </td>
                <td>
                <div className="small text-muted">
                    <span>Phone</span>: <strong><a href={`tel:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
                </div>
                <div className="small text-muted">
                    <span>Email</span>: <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
                </div>
                </td>
                <td className='text-center'>
                <div className="small text-muted">{row.address}</div>
                <div className="small text-muted"><strong>{row.states} | {row.country}</strong></div>
                 </td>
                <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={(item) => history.push(`/school/${row.id}`)}
                     >Analysis</CDropdownItem>
                    <CDropdownItem onClick={()=>onEdit(row.id, row)} >Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.id, row)}>Delete</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem>Another Action</CDropdownItem>
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
              <h4 id="traffic" className="card-title mb-0">Schools</h4>
              <div className="small text-muted">Academic Calendar</div>
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
                    <th><i className='fa fa-list'></i> School</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Contact</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> School</small></h4>
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
                  <CLabel htmlFor="nf-name">School</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name"
                      defaultValue={name}
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="MESL SENIOR SECONDARY SCHOOL" 
                    />
                  <CFormText className="help-block">eNTER THE FULL NAME OF THE SCHOOL</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbrv./Matriculation Number prefix </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="MESL/KS/" 
                    />
                  <CFormText className="help-block">Abbreviation</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Phone</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-phone1" 
                      name="phone1"
                      defaultValue={phone1}
                      onChange={(e)=>setPhone1(e.target.value)}
                      placeholder="080000000000" 
                    />
                  <CFormText className="help-block">Main phone number</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-phone2">Alternative Phone </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-phone2" 
                      name="phone2"
                      defaultValue={phone2}
                      onChange={(e)=>setPhone2(e.target.value)}
                      placeholder="080000000000" 
                    />
                  
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email </CLabel>
                  <CInput 
                      type="email" 
                      id="nf-email" 
                      name="email"
                      defaultValue={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="in@gmail.com" 
                    />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-address">Address </CLabel>
                  <CInput 
                      type="textarea" 
                      id="nf-address" 
                      name="address"
                      defaultValue={address}
                      onChange={(e)=>setAddress(e.target.value)}
                      placeholder="12 Bakonle way...." 
                    />
                  
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
  schools : state.schoolReducer
})
export default connect(mapStateToProps, {
  getSchools,
  getSchool,
  registerSchool,
  updateSchool,
  deleteSchool
})(School)
