import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerTheme, updateTheme, deleteTheme} from './../../../actions/setting/theme';
import {getClaszs} from './../../../actions/setting/clasz';
import CKEditor from 'ckeditor4-react';
import { useHistory, useLocation } from 'react-router-dom'
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
  CFormText,
  CSelect,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setElement } from './../../../actions/common'

const termarray =[
  {id:1, name:'First'},
  {id:2, name:'Second'},
  {id:3, name:'Third'},
  {id:4, name:'Alternative/Obsolete'}
];
const Theme = (props) => {
  const subjectid = props.pid
  const [id, setId] = useState(null)
  const [moduleid, setModuleid ]= useState('')
  const [namez, setNamez] = useState('')
  const [topic, setTopic] = useState('')
  const [claszid, setClaszid] = useState()
  const [termid, setTermid] = useState()
  const [termname, setTermname] = useState('')
  const [objective, setObjective] = useState([])
  const [content, setContent] = useState([])
  const [material, setMaterial] = useState([])
  const [contentind, setContentind] = useState('')
  const [objectiveind, setObjectiveind] = useState('')
  const [materialind, setMaterialind] = useState('')

  //GET THEMES PER SCHOOL
  useEffect(() => {
    
    let params1 = {
      data:JSON.stringify(
      {
          'typeid': props.school.typeid
      }),
      cat:'select',
      table:'claszs',
      narration:'get claszs'
    }
    props.getClaszs(params1);
    
  }, [subjectid, props.school.typeid])
  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data !== undefined && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setModuleid(dt.moduleid);
      setNamez(dt.name);
      setTopic(dt.topic);
      setClaszid(dt.claszid);
      setTermid(dt.termid);
      setObjective(dt.objective);
      setMaterial(dt.material);
      setContent(dt.content);
      setElement('nf-claszid', dt.claszid )
      let termnamex = '';
      let termnames = termarray.filter(rw=>rw.id === dt.termid);
       termnamex = Array.isArray(termnames) && termnames.length > 0 ? termnames[0].name : '';
       setTermname(termnamex);
    }else{
      setId(null);
      setModuleid(null);
      setNamez('');
      setClaszid('');
      setObjective('');
      setMaterial('');
      setContent('');
    }
    
  }, [props.data])

 
 
 
  const handleSubmit = () =>{
    if(namez.length > 0)
    {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('topic', topic);
      fd.append('claszid', claszid);
      fd.append('termid', termid);
      fd.append('moduleid', moduleid);
      fd.append('objective', objective);
      fd.append('material', material);
      fd.append('content', content);
      fd.append('staffid', props.user.user.id);
      fd.append('checker', 'A'+moduleid+'_B'+subjectid+'_C'+claszid);
      fd.append('checker1', 'A'+moduleid+'_B'+subjectid);
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
     // props.onReset()
    }
  }
  const loadContent = (num, inde, dt) =>{
    let con = [...content];
     if(contentind.length > 0)
     {
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
      
  }
  const loadObjective = (num, inde, dt) =>{
    let con = [...objective];
    if(objectiveind.length > 0)
     {
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
  }

  const loadMaterial = (num, inde, dt) =>{
    let con = [...material];
    if(materialind.length > 0)
     {
      if(num === 0)
      {
       if(materialind.length > 0){
         con.push(materialind);
         setMaterial(con)
         setMaterialind('');
       }
      }
      if(num === 1)
      {
        
        let cons = [...material];
        let c = cons[inde];
        setMaterialind(c);
      }
      if(num === 2)
      {
        let cons = [...material];
        let c = cons.filter(rw=>rw !== dt);
        setMaterial(c)
        setMaterialind('');
      } 
    }  
  }
  
  
  let claszarray = props.claszs && Array.isArray(props.claszs) ? props.claszs : [];
  let clarray = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })
  let termz= termarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})
 
   return (
    <CCol xl={12}  style={{width:'500px'}} id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <br/><small> Scheme of Work</small></h4>
            </CCol>
            <CCol sm="6" className="d-md-block">
              <CButton  
                  color="danger" 
                  onClick={props.onClose}
                  className="float-right">
                <i className='fa fa-remove'></i>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CAlert 
            color='danger'
            value={Number(400) * 10}
            size="sm"
            className="mb-3"
            >
            <h4 className="alert-heading">Warning</h4>
              <p>If you duplicate the MODULEID for a particular subject your entry would not be saved. Do ensure that your MODULE ID is serial</p></CAlert>
          <CFormGroup>
              <CLabel htmlFor="nf-module">ModuleID</CLabel>
              <CInput 
                  type="number" 
                  id="nf-module" 
                  module="modulez"
                  value={moduleid}
                  onChange={(e)=>setModuleid(e.target.value)}
                  placeholder="00" 
                />
              <CFormText className="help-block text-danger">This number has to be unique and serial if you duplicate this number for a particular subject it will not save</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-name">Theme</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="namez"
                  value={namez}
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
                  defaultValue={claszid}
                  onChange={(e)=>setClaszid(e.target.value)}
                  placeholder="" 
                >
                  {id && parseInt(id) > 0 ? <option value={claszid}>{props.data !== null && props.data !== undefined? props.data.claszname : ''}</option>:<option></option>}
                  {clarray}
              </CSelect>
              <CFormText className="help-block">Select the class</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-termid">Term</CLabel>
              <CSelect
                  type="text" 
                  id="nf-termid" 
                  name="termid"
                  defaultValue={termid}
                  onChange={(e)=>setTermid(e.target.value)}
                  placeholder="" 
                >
                  {id && parseInt(id) > 0 ? <option value={termid}>{termname}</option>:<option></option>}
                  
                  {termz}
              </CSelect>
              <CFormText className="help-block">Select the term</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-content">Lesson Content</CLabel>
              <CKEditor
                data ={content}
                type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                onChange={e=>setContent(e.editor.getData())}
                />
             
              
              <CFormText className="help-block">Add or remove subtopics outline in order of presentation</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-objective">Lesson Objectives</CLabel><CKEditor
                data ={objective}
                type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                onChange={e=>setObjective(e.editor.getData())}
                />
              <CFormText className="help-block">Add or remove lesson objectives</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-material">Lesson Materials</CLabel><CKEditor
                data ={material}
                type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                onChange={e=>setMaterial(e.editor.getData())}
                />
              <CFormText className="help-block">Add or remove Instruction Materials</CFormText>
            </CFormGroup>
         
          </CForm>
        </CCardBody>
        
        <CCardFooter>
          <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          <CButton type="reset" onClick={props.onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
  </CCol>
 
     )
}
const mapStateToProps = (state) =>({
  themes : state.themeReducer,
  user:state.userReducer,
  claszs : state.claszReducer.claszs
})
export default connect(mapStateToProps, {
  registerTheme,
  updateTheme,
  deleteTheme,
  getClaszs
})(Theme)
