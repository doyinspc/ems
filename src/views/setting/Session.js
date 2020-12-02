import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getSessions, getSession, registerSession, updateSession, deleteSession} from './../../actions/setting/session';
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


const Session = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState('')
  const [namez, setNamez] = useState('')
  const [starts, setStarts] = useState()
  const [ends, setEnds] = useState()

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET SESSIONS PER SCHOOL
  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'schoolid':props.school.id
      }),
      cat:'select',
      table:'sessions',
      narration:'get sessions'
  }
    props.getSessions(params)
    
  }, [props.school.id])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(id && parseInt(id) > 0)
    {
      let dt = dts;
      setNamez(dt.name);
      setStarts(dt.started);
      setEnds(dt.ended);
    }else{
      setNamez('');
      setStarts('');
      setEnds('');
    }
    
  }, [id])

  const onEdit = (rw, dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true);
  }
  const onDelete = (rw, dt) =>{
    
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('started', starts);
      fd.append('ended', ends);
      fd.append('table', 'sessions');
      

      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateSession(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid',1);
        fd.append('cat', 'insert');
        props.registerSession(fd)
      }
      onReset()
    }
  }
 
  let data = props.sessions.sessions && Array.isArray(props.sessions.sessions) ? props.sessions.sessions.filter(rw =>rw !== null || rw !== undefined) : []
  
  let tabl = data.map((row, ind)=>{
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
                      onClick={(item) => history.push(`/sessions/${row.id}`)}
                     ><i className='fa fa-list'></i>{' '} Terms</CDropdownItem>
                    <CDropdownItem onClick={()=>onEdit(row.id, row)} ><i className='fa fa-edit'></i>{' '}  Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.id, row)}><i className='fa fa-remove'></i>{' '}  Delete</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem><i className='fa fa-database'></i>{" "} Backup</CDropdownItem>
                    <CDropdownItem><i className='fa fa-upload'></i>{" "}Restore</CDropdownItem>
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
              <h4 id="traffic" className="card-title mb-0">Sessions</h4>
               <div className="small text-muted">{props.school.name}</div>
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
                    <th><i className='fa fa-list'></i> Session</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Session</small></h4>
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
                  <CLabel htmlFor="nf-name">Session</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="name"
                      defaultValue={namez}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="2020_2021" 
                    />
                  <CFormText className="help-block">Please enter session</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-starts">Session Starts </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-starts" 
                      name="starts"
                      defaultValue={starts}
                      onChange={(e)=>setStarts(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date session starts</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-ends">Session ends </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-ends" 
                      name="ends"
                      defaultValue={ends}
                      onChange={(e)=>setEnds(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please enter date session ends</CFormText>
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
  sessions : state.sessionReducer,
  school : state.schoolReducer.school
})
export default connect(mapStateToProps, {
  getSessions,
  getSession,
  registerSession,
  updateSession,
  deleteSession
})(Session)
