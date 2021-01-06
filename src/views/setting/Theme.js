import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getThemes, getTheme, registerTheme, updateTheme, deleteTheme} from './../../actions/setting/theme';
import {getClaszs} from './../../actions/setting/clasz';
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
import { setElement } from '../../actions/common';
import department from '../../reducers/setting/department';



const Theme = (props) => {
  const subjectid = useParams().theme
  const departmentid = useParams().subject
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState(null)
  const [dts, setDts] = useState('')
  const [moduleid, setModuleid ]= useState('')
  const [namez, setNamez] = useState('')
  const [topic, setTopic] = useState('')
  const [claszid, setClaszid] = useState()
  const [objective, setObjective] = useState([])
  const [content, setContent] = useState([])
  const [contentind, setContentind] = useState('')
  const [objectiveind, setObjectiveind] = useState('')
 
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }
//GET THEMES PER SCHOOL
  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'subjectid':subjectid
      }),
      cat:'select',
      table:'themes',
      narration:'get themes'
    }
    props.getThemes(params)
    let params1 = {
      data:JSON.stringify(
      {
          'schoolid': props.school.id
      }),
      cat:'select',
      table:'claszs',
      narration:'get claszs'
    }
    props.getClaszs(params1);
    
  }, [subjectid, props.school.id])
  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(id && parseInt(id) > 0)
    {
      let dt = dts;
      setNamez(dt.name);
      setNamez(dt.topic);
      setClaszid(dt.claszid);
      setObjective(JSON.parse(dt.objective));
      setContent(JSON.parse(dt.content));
      setElement('nf-claszid', dt.claszid )
    }else{
      setNamez('');
      setClaszid('');
      setObjective([]);
      setContent([]);
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
    props.updateTheme(fd);
  }
  const onReset = () =>setId(null);
  const onClose = () =>setCollapse(false);

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('topic', topic);
      fd.append('claszid', claszid);
      fd.append('moduleid', moduleid);
      fd.append('objective', JSON.stringify(objective));
      fd.append('content', JSON.stringify(content));
      fd.append('checker', 'A'+subjectid+'_B'+claszid);
      fd.append('table', 'themes');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateTheme(fd)
        
      }else if(subjectid && parseInt(subjectid) > 0)
      {
        //INSERT
        fd.append('subjectid', subjectid);
        fd.append('cat', 'insert');
        props.registerTheme(fd)
      }
      onReset()
    }
  }
  const loadContent = (num, inde, dt) =>{
    let con = [...content];

      if(num === 0)
      {
        let d =  con.push(contentind);
        setContent(con)
        setContentind('');
      }
      if(num === 1)
      {
        
        let cons = [...content];
        let c = cons[inde];
        setContentind(c);
      }
      if(num === 2)
      {
        let cons = [...content];
        let c = cons.filter(rw=>rw !== dt);
        setContent(c)
        setContentind('');
      }

      
  }
  const loadObjective = (num, inde, dt) =>{
    let con = [...objective];
      if(num === 0)
      {
        let d =  con.push(objectiveind);
        setObjective(con)
        setObjectiveind('');
      }
      if(num === 1)
      {
        
        let cons = [...objective];
        let c = cons[inde];
        setObjectiveind(c);
      }
      if(num === 2)
      {
        let cons = [...objective];
        let c = cons.filter(rw=>rw !== dt);
        setObjective(c)
        setObjectiveind('');
      }   
  }
  
  let deparr = props.subjects.filter(rw =>parseInt(rw.id) === parseInt(subjectid) && parseInt(rw.id) > 0);
  let subjectname = deparr.length > 0 ? deparr[0].name : 'None';

  let claszarray = props.claszs && Array.isArray(props.claszs) ? props.claszs : [];
  let clarray = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })
  
  let data = props.themes.themes && Array.isArray(props.themes.themes) ? props.themes.themes.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw !== null).map((row, ind)=>{
      return <tr key={ind}>
                <td><strong>MODULE {row.moduleid}</strong>{" : "}<span style={{textTransform:'uppercase'}}> {row.name}</span>
                  <CRow>
                    <CCol sm={6}>
                        <strong >The lesson would be presented as follows</strong>
                        <ul className='ul'>
                            {
                              row.content && row.content.length > 3 && Array.isArray(JSON.parse(row.content)) ? JSON.parse(row.content).map((pp, im)=>{
                                  return <li key={ind}>{pp}</li>
                              }):''
                            }
                        </ul>
                    </CCol>
                    <CCol sm={6}>
                    <strong >At the end of the lesson students should be able to</strong>
                      <ul className='ul'>
                            {
                              row.objective && row.objective.length > 3 && Array.isArray(JSON.parse(row.objective)) ? JSON.parse(row.objective).map((pp, im)=>{
                                  return <li key={ind}>{pp}</li>
                              }):''
                            }
                        </ul>
                    </CCol>
                    <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color={parseInt(row.is_active) === 0 ? 'success' : 'danger'} size="sm">
                  <i className='fa fa-gear'></i>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={(item) => history.push(`/department/${departmentid}/${subjectid}/${row.id}`)}
                     ><i className='fa fa-list'></i>{' '} Question Bank</CDropdownItem>
                     <CDropdownItem
                      onClick={(item) => history.push(`/department/${departmentid}/${subjectid}/${row.id}`)}
                     ><i className='fa fa-list'></i>{' '} Add reference material</CDropdownItem>
                     <CDropdownItem 
                          onClick={()=>onActivate(row.id, row.is_active)} >
                          <i className={parseInt(row.is_active) === 0 ? 'fa fa-thumbs-up' : 'fa fa-thumb-down'}></i>
                          {' '}  {parseInt(row.is_active) === 0 ? 'Deactivate' : 'Activate'}</CDropdownItem>
                    <CDropdownItem onClick={()=>onEdit(row)} ><i className='fa fa-edit'></i>{' '}  Edit</CDropdownItem>
                    <CDropdownItem onClick={()=>onDelete(row.id, row)}><i className='fa fa-remove'></i>{' '}  Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                  </CRow>
                </td>
               
              </tr>
  })
  return (
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="8">
               <h4 id="traffic" className="card-title mb-0">Scheme of Work : {subjectname}</h4>
              <div className="small text-muted" style={{textTransform:'capitalize'}}>{props.school.name}</div>
            </CCol>
            <CCol sm="4" className="d-md-block">
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
                    <th><i className='fa fa-list'></i>THEME/TOPIC</th>
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
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Theme</small></h4>
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
                  <CLabel htmlFor="nf-module">ModuleID</CLabel>
                  <CInput 
                      type="number" 
                      id="nf-module" 
                      module="modulez"
                      defaultValue={moduleid}
                      onChange={(e)=>setModuleid(e.target.value)}
                      placeholder="00" 
                    />
                  <CFormText className="help-block">This number has to be unique and serial</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Theme</CLabel>
                  <CInput 
                      type="text" 
                      id="nf-name" 
                      name="namez"
                      defaultValue={namez}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="Matter" 
                    />
                  <CFormText className="help-block">Please enter theme name</CFormText>
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
                      {id && parseInt(id) > 0 ? <option value={claszid}>{claszid}</option>:''}
                      {clarray}
                  </CSelect>
                  <CFormText className="help-block">Select the class</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-content">Lesson Content</CLabel>
                  <ul className='list-items'>
                  {
                    content.map((prp, ind)=>{
                    return  <CRow style={{maxWidth:'280px'}}> 
                              <CCol xs={10}  className='' style={{wordWrap:'break-word'}}>{prp}</CCol>
                              <CCol xs={2}>
                              <span className='pull-left' >
                              <a onClick={()=>loadContent(2, ind, prp)} className='btn btn-link btn-sm'><i className='fa fa-trash'></i></a>
                              </span>
                              </CCol>
                            </CRow>
                    })
                  }
                  </ul>
                  <CInputGroup>
                      <CInput 
                        type="text" 
                        id="nf-contentid"
                        value={contentind}
                        onChange={(e)=>setContentind(e.target.value)}
                        placeholder="Type-in content ..." 
                      />
                      <CInputGroupAppend>
                        <CButton 
                          onClick={(e)=>loadContent(0, e, 0 )} 
                          type="button" 
                          color="secondary"
                          >
                            <i className='fa fa-plus'></i></CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  <CFormText className="help-block">Add or remove subtopics outline in order of presentation</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-objective">Lesson Objectives</CLabel><i>
                  <ul className='list-items'>
                  {
                    objective.map((prp, ind)=>{
                    return  <CRow style={{maxWidth:'280px'}}> 
                              <CCol xs={10}  className='' style={{wordWrap:'break-word'}}>{prp}</CCol>
                              <CCol xs={2}>
                              <span className='pull-left' >
                              <a onClick={()=>loadObjective(2, ind, prp)} className='btn btn-link btn-sm'><i className='fa fa-trash'></i></a>
                              </span>
                              </CCol>
                            </CRow>
                    })
                  }
                 </ul></i>
                  <CInputGroup>
                      <CInput 
                        type="text" 
                        id="nf-objectiveid"
                        value={objectiveind}
                        onChange={(e)=>setObjectiveind(e.target.value)}
                        placeholder="Type-in objective ..." 
                      />
                      <CInputGroupAppend>
                        <CButton 
                          onClick={(e)=>loadObjective(0, e, 0 )} 
                          type="button" 
                          color="secondary"
                          >
                            <i className='fa fa-plus'></i></CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  <CFormText className="help-block">Add or remove lesson objectives</CFormText>
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
  themes : state.themeReducer,
  subjects : state.subjectReducer.subjects,
  claszs : state.claszReducer.claszs,
  school : state.schoolReducer.school,
})
export default connect(mapStateToProps, {
  getThemes,
  getTheme,
  registerTheme,
  updateTheme,
  deleteTheme,
  getClaszs
})(Theme)
