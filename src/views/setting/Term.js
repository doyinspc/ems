import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import  moment from 'moment';
import {getTerms, getTerm, registerTerm, updateTerm, deleteTerm} from './../../actions/setting/term';
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


const Term = (props) => {
  const term = useParams()
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [name, setNamez] = useState('')
  const [starts, setStarts] = useState()
  const [ends, setEnds] = useState()
  const [cat, setcat] = useState()

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'sessionid':term.term
      }),
      cat:'select',
      table:'terms',
      narration:'get terms'

  }
    props.getTerms(params)
  }, [])

  const onEdit = (rw, dt) =>{
      setId(rw);
      setNamez(dt.name);
      setStarts(dt.started);
      setEnds(dt.ended);
      setCollapse(true);
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onReset = (rw, dt) =>{
      setId(null);
      setNamez('');
      setStarts('');
      setEnds('');
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  const handleSubmit = () =>{
    if(name.length > 0){
      let fd = new FormData();
      fd.append('name', name);
      fd.append('started', starts);
      fd.append('ended', ends);
      fd.append('table', 'terms');

      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateTerm(fd)
        
      }else
      {
        //INSERT
        fd.append('sessionid', term.term);
        fd.append('cat', 'insert');
        props.registerTerm(fd)
      }
      onReset()
      onClose()
    }
  }
 
  let data = props.terms.terms && Array.isArray(props.terms.terms) ? props.terms.terms.filter(rw =>rw != 'null' || rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw =>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{moment(row.started).format('MMM D, YYYY')}</td>
                <td className='text-center'>{moment(row.ended).format('MMM D, YYYY')}</td>
                <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                  <CDropdownItem><b>Assessment</b></CDropdownItem>
                    <CDropdownItem
                      onClick={(item) => history.push(`/termac/${row.id}`)}
                     >Academic</CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/termbe/${row.id}`)}
                     >Behavioral</CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/termsk/${row.id}`)}
                     >Skills</CDropdownItem>
                     <CDropdownDivider />
                     <CDropdownItem><b>Allocation</b></CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/termclass/${row.id}`)}
                     >Class</CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/termsubject/${row.id}`)}
                     >Subject</CDropdownItem>
                     <CDropdownDivider />
                    <CDropdownItem><b>Actions</b></CDropdownItem>
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
              <h4 id="traffic" className="card-title mb-0">Terms</h4>
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
                    <th><i className='fa fa-list'></i> Term</th>
                    <th className="text-center"> <i className='fa fa-calendar'></i> Start</th>
                    <th className="text-center"><i className='fa fa-calendar'></i> End</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Term</small></h4>
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
                  <CLabel htmlFor="nf-name">Term</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="name"
                      defaultValue={name}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="First, Second or Third" 
                    />
                  <CFormText className="help-block">Please enter term</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-starts">Term Starts </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-starts" 
                      name="starts"
                      defaultValue={starts}
                      onChange={(e)=>setStarts(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date term starts</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-ends">Term ends </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-ends" 
                      name="ends"
                      defaultValue={ends}
                      onChange={(e)=>setEnds(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date term ends</CFormText>
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
  terms : state.termReducer,
  sessions : state.sessionReducer
})
export default connect(mapStateToProps, {
  getTerms,
  getTerm,
  registerTerm,
  updateTerm,
  deleteTerm
})(Term)
