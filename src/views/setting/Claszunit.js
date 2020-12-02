import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import  moment from 'moment';
import {getClaszunits, getClaszunit, registerClaszunit, updateClaszunit, deleteClaszunit} from './../../actions/setting/claszunit';
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


const Claszunit = (props) => {
  const claszunit = useParams()
  const history = useHistory()
  const loc = useLocation()
  console.log(loc)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [name, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState()
  const [cat, setcat] = useState()

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'claszid':claszunit.claszunit
      }),
      cat:'select',
      table:'claszunits',
      narration:'get claszunits'

  }
    props.getClaszunits(params)
  }, [])

  const onEdit = (rw, dt) =>{
      setId(rw);
      setNamez(dt.name);
      setAbbrv(dt.started);
      setCollapse(true);
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onActivate = (rw, dt) =>{
    
}
  const onReset = (rw, dt) =>{
      setId(null);
      setNamez('');
      setAbbrv('');
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  const handleSubmit = () =>{
    if(name.length > 0){
      let fd = new FormData();
      fd.append('name', name);
      fd.append('abbrv', abbrv);
      fd.append('table', 'claszunits');

      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateClaszunit(fd)
        
      }else
      {
        //INSERT
        fd.append('claszid', claszunit.claszunit);
        fd.append('cat', 'insert');
        props.registerClaszunit(fd)
      }
      onReset()
      onClose()
    }
  }
 
  let data = props.claszunits.claszunits && Array.isArray(props.claszunits.claszunits) ? props.claszunits.claszunits.filter(rw =>rw != 'null' || rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw =>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={()=>onActivate(row.id, row)} >Activate</CDropdownItem>
                    <CDropdownItem onClick={()=>onEdit(row.id, row)} >Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.id, row)}>Delete</CDropdownItem>
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
              <h4 id="traffic" className="card-title mb-0">Class Units</h4>
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
                    <th><i className='fa fa-list'></i> Class Units</th>
                    <th className="text-center"> <i className='fa fa-calendar'></i> Abbrv</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Class Units</small></h4>
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
                  <CLabel htmlFor="nf-name">Class unit</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="name"
                      defaultValue={name}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="JSS1A" 
                    />
                  <CFormText className="help-block">Please enter unit</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbrv. </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="1A" 
                    />
                  <CFormText className="help-block">Abbreviate</CFormText>
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
  claszunits : state.claszunitReducer,
  claszs : state.claszReducer
})
export default connect(mapStateToProps, {
  getClaszunits,
  getClaszunit,
  registerClaszunit,
  updateClaszunit,
  deleteClaszunit
})(Claszunit)
