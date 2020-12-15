import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import {getCaunits, getCaunit, registerCaunit, updateCaunit, deleteCaunit} from './../../actions/setting/caunit';
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


const Caunit = (props) => {
  const termid = useParams().term
  const caid = useParams().ca
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [dts, setDts] = useState('')
  const [namez, setNamez] = useState()
  const [abbrv, setAbbrv] = useState()
  const [claszid, setClaszid] = useState()
  const [starts, setStarts] = useState()
  const [ends, setEnds] = useState()
  const [maxscore, setMaxscore] = useState()
 
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET CAUNITS PER SCHOOL
  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'caid': caid
      }),
      caunitt:'selected',
      table:'caunits',
      narration:'get staff term caunit unit'
    }
    props.getCaunits(params1);
  }, [caid, props.school.id])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(id && parseInt(id) > 0)
    {
      let dt = dts;
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setMaxscore(dt.maxscore);
      setStarts(dt.started);
      setEnds(dt.ended);
    }else{
      setNamez('');
      setAbbrv('');
      setMaxscore('');
      setStarts('');
      setEnds('');
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
    props.updateCaunit(fd);
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(parseInt(termid) > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('started', starts);
      fd.append('ended', ends);
      fd.append('maxscore', maxscore);
      fd.append('table', 'caunits');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateCaunit(fd)
        
      }else if(termid && parseInt(termid) > 0)
      {
        //INSERT;
        fd.append('caid', termid);
        fd.append('cat', 'insert');
        props.registerCaunit(fd)
      }
      onReset()
    }
  }
  
  let claszarray = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns[1] : [];
  let clarray = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })
  
  let deparr = props.dropdowns[0].filter(rw =>parseInt(rw.id) === parseInt(termid) && parseInt(rw.id) > 0);
  let termname = deparr.length > 0 ? deparr[0].name : 'None';
  
  let data = props.caunits.caunits && Array.isArray(props.caunits.caunits) ? props.caunits.caunits.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.filter(rw=>rw !== null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td className='text-left'>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>{row.maxscore}</td>
                <td className='text-center'>{moment(row.started).format('MMM D, YYYY')}</td>
                <td className='text-center'>{moment(row.ended).format('MMM D, YYYY')}</td>
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
            <h4 id="traffic" className="caunitrd-title mb-0">{termname} : <small> Assessment</small></h4>
              <div className="small text-muted" style={{textTransform:'caunitpitalize'}}>{props.school.name}</div>
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
                    <th><i className='fa fa-list text-center'></i> ASSESSMENT NAME</th>
                    <th><i className='fa fa-bullseye text-center'></i> ABBRV</th>
                    <th><i className='fa fa-list'></i> MAX SCORE</th>
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
            <CCardHeader id='traffic' className="caunitrd-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> CAUNIT</small></h4>
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
                  <CFormText className="help-block">set assessment name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbreviation </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="CAUNIT1" 
                    />
                  <CFormText className="help-block">abbreviate name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-claszid" 
                      name="claszid"
                      onChange={(e)=>setClaszid(e.target.value)}
                      placeholder="" 
                    >
                      {clarray}
                  </CSelect>
                  <CFormText className="help-block">Select the class</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-maxscore">Maximum Score </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-maxscore" 
                      name="maxscore"
                      defaultValue={maxscore}
                      onChange={(e)=>setMaxscore(e.target.value)}
                      placeholder="20" 
                    />
                  <CFormText className="help-block">set the maximum score students caunitn attain on this assessment</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-starts">Starts </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-starts" 
                      name="starts"
                      defaultValue={starts}
                      onChange={(e)=>setStarts(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">When will record entry start</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-ends">Ends </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-ends" 
                      name="ends"
                      defaultValue={ends}
                      onChange={(e)=>setEnds(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">When will record entry end</CFormText>
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
  terms : state.termReducer.terms,
  claszs : state.claszReducer.claszs,
  staffs : state.staffReducer.staffs,
  school : state.schoolReducer.school,
  dropdowns : state.schoolReducer.dropdowns
})
export default connect(mapStateToProps, {
  getStaffs,
  getCaunits,
  getCaunit,
  registerCaunit,
  updateCaunit,
  deleteCaunit,
  getClaszs
})(Caunit)
