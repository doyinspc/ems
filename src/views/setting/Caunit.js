import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import  moment from 'moment';
import {getCaunits, getCaunit, registerCaunit, updateCaunit, deleteCaunit} from './../../actions/setting/caunit';
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


const Caunit = (props) => {
  const caunit = useParams().caunit
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [name, setNamez] = useState('')
  const [clasz, setClasz] = useState('')
  const [maxscore, setMaxscore] = useState('')
  const [starts, setStarts] = useState()
  const [ends, setEnds] = useState()
  

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'caid':caunit
      }),
      cat:'select',
      table:'caunits',
      narration:'get caunits'

  }
    props.getCaunits(params)
  }, [])

  useEffect(() => {
    if(parseInt(id) > 0){
        let dt = dts;
        setNamez(dt.name);
        setMaxscore(dt.maxscore);
        setClasz(dt.claszid);
        setStarts(dt.started);
        setEnds(dt.ended);
       
    }else
    {
        setNamez('');
        setMaxscore(0);
        setClasz('');
        setStarts('');
        setEnds('');
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
      fd.append('maxscore', maxscore);
      fd.append('claszid', clasz);
      fd.append('started', starts);
      fd.append('ended', ends);
      fd.append('table', 'caunits');

      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateCaunit(fd)
        
      }else
      {
        //INSERT
        fd.append('caid', caunit.caunit);
        fd.append('cat', 'insert');
        props.registerCaunit(fd)
      }
      onReset()
      onClose()
    }
  }
 
  let data = props.caunits.caunits && Array.isArray(props.caunits.caunits) ? props.caunits.caunits.filter(rw =>rw != 'null' || rw !== null || rw !== undefined) : []
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
                    <CDropdownItem
                      onClick={(item) => history.push(`/caunits/${row.id}`)}
                     >Show caunits</CDropdownItem>
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
              <h4 id="traffic" className="card-title mb-0">Caunits</h4>
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
                    <th><i className='fa fa-list'></i> Caunit</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Caunit</small></h4>
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
                  <CLabel htmlFor="nf-name">Caunit</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="name"
                      defaultValue={name}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="First, Second or Third" 
                    />
                  <CFormText className="help-block">Please enter caunit</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-starts">Caunit Starts </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-starts" 
                      name="starts"
                      defaultValue={starts}
                      onChange={(e)=>setStarts(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date caunit starts</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-ends">Caunit ends </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-ends" 
                      name="ends"
                      defaultValue={ends}
                      onChange={(e)=>setEnds(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date caunit ends</CFormText>
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
  caunits : state.caunitReducer,
  cas : state.caReducer
})
export default connect(mapStateToProps, {
  getCaunits,
  getCaunit,
  registerCaunit,
  updateCaunit,
  deleteCaunit
})(Caunit)
