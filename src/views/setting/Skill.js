import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getCas, getCa, registerCa, updateCa, deleteCa} from './../../actions/setting/ca';
import {getClaszs} from './../../actions/setting/clasz';
import {getStaffs} from './../../actions/staff/staff';
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
  CSelect,
  CDropdownToggle,
  CDropdownMenu,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Ca = (props) => {
  const termid = useParams().term
  const groupid = 3;
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [dts, setDts] = useState('')
  const [namez, setNamez] = useState()
  const [abbrv, setAbbrv] = useState()
  
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET CAS PER SCHOOL
  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'termid': termid,
          'typeid': groupid,
      }),
      cat:'selected',
      table:'cas',
      narration:'get staff term ca'
    }
    props.getCas(params1);
    
  }, [termid, groupid, props.school.id])

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
    props.updateCa(fd);
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(parseInt(termid) > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('table', 'cas');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateCa(fd)
        
      }else if(termid && parseInt(termid) > 0)
      {
        //INSERT
        fd.append('typeid', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'insert');
        props.registerCa(fd)
      }
      onReset()
    }
  }
  
  
  let deparr = props.dropdowns[0].filter(rw =>parseInt(rw.id) === parseInt(termid) && parseInt(rw.id) > 0);
  let termname = deparr.length > 0 ? deparr[0].name : 'None';
  
  let data = props.cas.cas && Array.isArray(props.cas.cas) ? props.cas.cas.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.filter(rw=>rw !== null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td className='text-left'>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>
                <CDropdown className="m-0 btn-group">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={()=>onEdit(row)} >Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.cid, row)}>Delete</CDropdownItem>
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
            <h4 id="traffic" className="card-title mb-0">{termname} : <small>Skills Assessment</small></h4>
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
                    <th className="text-center"> SN.</th>
                    <th><i className='fa fa-list text-center'></i> SKILL NAME</th>
                    <th><i className='fa fa-bullseye text-center'></i> ABBRV</th>
                    <th><i className='fa fa-gear'></i> ACTION</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Skills</small></h4>
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
                  <CLabel htmlFor="nf-namez">Name </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-namez" 
                      name="namez"
                      defaultValue={namez}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="First Continious Assessment" 
                    />
                  <CFormText className="help-block">set skills name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbreviation </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="CA1" 
                    />
                  <CFormText className="help-block">abbreviate name</CFormText>
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
  cas : state.caReducer,
  terms : state.termReducer.terms,
  claszs : state.claszReducer.claszs,
  staffs : state.staffReducer.staffs,
  school : state.schoolReducer.school,
  dropdowns : state.schoolReducer.dropdowns
})
export default connect(mapStateToProps, {
  getStaffs,
  getCas,
  getCa,
  registerCa,
  updateCa,
  deleteCa,
  getClaszs
})(Ca)
