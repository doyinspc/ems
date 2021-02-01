import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStafflessonplan, updateStafflessonplan, deleteStafflessonplan, getStafflessonplans } from './../../../actions/staff/stafflessonplan';
import { getThemes } from './../../../actions/setting/theme';
import { getWeeks } from './../../../actions/setting/week';
import { useHistory, useLocation } from 'react-router-dom'
import CKEditor from 'ckeditor4-react';
import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CButton,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CCardFooter

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setElement } from './../../../actions/common';
const termarray ={
    1:'First term',
    2:'Second term',
    3:'Third term',
    4:'Alternative/Obsolete'
  }
const Stafflessonplans = (props) => {
    const history = useHistory()
    const subjectid = props.subjectid
    const claszid = props.claszid
    const termid = props.termid
    const staffid = props.staffid
    const sessionid = props.sessionid
    const subject = props.subject

    const [id, setid] = useState(null)
    const [schemeid, setschemeid] = useState('')
    const [schemedata, setschemedata] = useState('')
    const [schemedatas, setschemedatas] = useState({})
    const [weekid, setweekid] = useState('')
    const [contact, setcontact] = useState('')
    const [period, setperiod] = useState('')
    const [topic, settopic] = useState('')
    const [subtopic, setsubtopic] = useState('')
    const [method, setmethod] = useState('')
    const [population, setpopulation] = useState('')
    const [content, setcontent] = useState('')
    const [material, setmaterial] = useState('')
    const [objective, setobjective] = useState('')
    const [assessment, setassessment] = useState('')
    const [note, setnote] = useState('')
    const [reference, setreference] = useState('')

    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'subjectid':subjectid
            }),
            cat:'selected',
            table:'themes',
            narration:'get themes'
      
        }
        props.getThemes(params)
      }, [subjectid])

    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'termid':termid
            }),
            cat:'selected',
            table:'weeks',
            narration:'get Weeks'
        }
        props.getWeeks(params)
        
      }, [termid])   
   
    useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
              'staffid':staffid,
              'subjectid':subjectid,
              'termid':termid,
              'weekid':weekid
          }),
          cat:'selected',
          table:'stafflessonplan',
          narration:`get all staff lessonplan ${staffid}`
        }
       props.getStafflessonplans(params);
        
    }, [staffid, subjectid, claszid, termid])
    
    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setid(data.id)
        setschemeid(data.schemeid)
        setweekid(data.weekid)
        setcontact(data.contact)
        setperiod(data.period)
        settopic(data.topic)
        setsubtopic(data.subtopic)
        setmethod(data.method)
        setpopulation(data.population)
        setcontent(data.content)
        setobjective(data.objective)
        setassessment(data.assessment)
        setnote(data.note)
        setreference(data.reference)
      }
    }, [props.rowid, props.data])
   
    const handleSubmit = () =>{
        let fd = new FormData();
        fd.append('schemeid', schemeid);
        fd.append('weekid', weekid);
        fd.append('contact', contact);
        fd.append('period', period);
        fd.append('topic', topic);
        fd.append('subtopic', subtopic);
        fd.append('subtopic', subtopic);
        fd.append('method', method);
        fd.append('population', population);
        fd.append('content', content);
        fd.append('objective', objective);
        fd.append('assessment', assessment);
        fd.append('note', note);
        fd.append('reference', reference);

        fd.append('table', 'stafflessonplans');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('narration', 'Updating staff lesson plan');
            props.updateStafflessonplan(fd)
        }else
        {
            fd.append('cat', 'insert');
            fd.append('narration', 'inserting new lesson plan');
            fd.append('staffid', staffid);
            fd.append('termid', termid);
            fd.append('claszid', claszid);
            fd.append('subjectid', subjectid);
            props.registerStafflessonplan(fd)
        }

    }
    const changeschemeid= (e) =>{
        setschemeid(e.target.value)
        let dt = Array.isArray(props.theme.themes) ? props.theme.themes.filter(rw=>rw.id == e.target.value):{'name':'-.-'}
        let nm = Array.isArray(dt) && dt.length > 0 ? termarray[dt[0].termid] +" "+dt[0].claszabbrv+" "+dt[0].name: '-';
        setschemedata(nm)
        setschemedatas(dt[0])
    }
    const changecontact= (e) =>{
        setcontact(e.target.value)
    }
    const changeperiod= (e) =>{
        setperiod(e.target.value)
    }
    const changeweekid= (e) =>{
        setweekid(e.target.value)
    }
    
    let schemearray1 = Array.isArray(props.theme.themes) ? props.theme.themes.filter(rw=>rw !== null & rw !== undefined).map((rw, ind)=>{
    return <option value={rw.id}>{`${termarray[rw.termid]} ${rw.claszabbrv} ${rw.name}`}</option>
    }):[]
    
    let contactarray = []
    let weekidarray = Array.isArray(props.week.weeks) ? props.week.weeks.filter(rw=>rw !== null & rw !== undefined).map((rw, ind)=>{
        return <option value={rw.id}>{rw.name}</option>
        }):[];
   
    
    let { 
        name,
        content:contento,
        objective:objectiveo,
        material:materialo,
        claszname,
        subjectname,
    } = schemedatas || '';

  return (
    <>
    <CRow className='align-center mx-auto d-flex ' sm={12}>
    <CCol sm="6" md="6" className='mx-auto'>
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol>
                    <h4>{parseInt(id) > 0 ? 'Edit':'Add'} Lesson Plan</h4>
                    </CCol>
                    <CCol xs={2}>
                    <button  
                        onClick={()=>props.goBack()}
                        className="btn btn-info"><i className='fa fa-backward'></i></button>
                    </CCol> 
                </CRow>
            </CCardHeader>
            <CCardBody>
            <CRow>
            <CCol xs="12">
                    <CFormGroup>
                        <CLabel htmlFor="schemeid">Scheme of Work<i className='text-danger'>*</i></CLabel>
                        <CSelect 
                            custom 
                            id="schemeid" 
                            defaultValue={schemeid}
                            onChange={changeschemeid} 
                        >
                            <option >Select</option>
                            {schemearray1}
                        </CSelect>
                    </CFormGroup>
                </CCol>
                <CCol xs="12"><strong style={{textTransform:'uppercase'}}>{schemedata}</strong></CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="subtopic">Subtopic</CLabel>
                    <CInput 
                        id="subtopic" 
                        name='text'
                        defaultValue={subtopic}
                        placeholder="Mathematics Education "
                        onChange={(e)=>setsubtopic(e.target.value)} 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12">
                    <CFormGroup>
                        <CLabel htmlFor="weekid"><strong>Week <i className='text-danger'>*</i></strong></CLabel>
                        <CSelect 
                            custom 
                            id="weekid" 
                            defaultValue={weekid}
                            onChange={changeweekid} 
                        >
                            <option >Select</option>
                            {weekidarray}
                        </CSelect>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6">
                    <CFormGroup>
                        <CLabel htmlFor="contact"><strong>Contact/Period<i className='text-danger'>*</i></strong></CLabel>
                        <CSelect 
                            custom 
                            id="contact" 
                            defaultValue={contact}
                            onChange={changecontact} 
                        >
                            <option >Select</option>
                            {contactarray}
                        </CSelect>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6">
                    <CFormGroup>
                        <CLabel htmlFor="period"><strong>Time(minutes)<i className='text-danger'>*</i></strong></CLabel>
                        <CSelect 
                            custom 
                            id="period" 
                            defaultValue={period}
                            onChange={changeperiod} 
                        >
                            <option >Select</option>
                            {contactarray}
                        </CSelect>
                    </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CLabel htmlFor="content"><strong>Presentation/Steps<i className='text-danger'>*</i></strong></CLabel>
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
                

                onChange={e=>setcontent(e.editor.getData())}
                />
                </CCol>
                <CCol xs="12">
                <CLabel htmlFor="objective"><strong>Specific Objectives<i className='text-danger'>*</i></strong></CLabel>
                <CKEditor
                data ={objective}
                onChange={e=>setobjective(e.editor.getData())}
                type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                
                />
                </CCol>
                <CCol xs="12">
                    <CLabel htmlFor="material"><strong>Lesson materials<i className='text-danger'>*</i></strong></CLabel>
                <CKEditor
                data ={material}
                onChange={e=>setmaterial(e.editor.getData())}
                type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                
                />
                </CCol>
                <CCol xs="12">
                    <CLabel htmlFor="assessment"><strong>Lesson assessments<i className='text-danger'>*</i></strong></CLabel>
                    <CKEditor
                    data ={assessment}
                    onChange={e=>setassessment(e.editor.getData())}
                    type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                
                    />
                </CCol>
                <CCol xs="12">
                    <CLabel htmlFor="reference"><strong>Reference Materials<i className='text-danger'>*</i></strong></CLabel>
                    <CKEditor
                    data ={reference}
                    onChange={e=>setreference(e.editor.getData())}
                    type='classic'
                config={{
                    toolbar:[[
                        'Cut', 'Copy', 'Paste', 
                        'PasteText', 'PasteFromWord', 
                        'Undo', 'Redo', 'NumberedList', 'BulletedList',
                        'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat' 
                    ]]
                }}
                
                    />
                </CCol>
                <CCol xs="12">
                    <CLabel htmlFor="note"><strong>Lesson notes<i className='text-danger'>(Optional)</i></strong></CLabel>
                    <CKEditor
                    data ={note}
                    onChange={e=>setnote(e.editor.getData())}
                    />
                </CCol>
            </CRow>
            
            </CCardBody>
            <CCardFooter>
                <CButton block type="button" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
                <CButton block type="button" size="sm" color="danger" onClick={()=>props.handleClose()}><CIcon name="cil-ban" /> Close</CButton>
            </CCardFooter>
        </CCard>
        </CCol>

    <CCol sm="6" md="6" className='mx-auto'>
        <CCard>
            <CCardHeader>
            
            <CRow>
                    <CCol>
                    <h4>Lesson Plan: Preveiw</h4>
                    </CCol>
                    <CCol xs={2}>
                    <button  
                        onClick={()=>props.goBack()}
                        className="btn btn-info"><i className='fa fa-backward'></i></button>
                    </CCol> 
                </CRow>
            </CCardHeader>
            <CCardBody>
            <CRow>
                <table width="100%">
                    <tr>
                        <td width='20%' className='strong'><strong>Week</strong></td>
                        <td>{weekid}</td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Class</strong></td>
                        <td>{weekid}</td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Subject</strong></td>
                        <td>{weekid}</td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Theme</strong></td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Topic</strong></td>
                        <td>{subtopic}</td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Instructional Materials</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: materialo}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>General Objectives</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: objectiveo}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Specific Objectives</strong></td>
                        <td>
                            {'At the end of the lesson students should be able to'}
                            <div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: objective}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Teaching Methodology</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: method}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Lesson Content</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: contento}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Presentation</strong></td>
                        <td>
                        {'The Teacher presented the lesson as follows'}
                            <div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: content}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Evaluation / Assessment</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: assessment}} /></td>
                    </tr>
                    <tr>
                        <td width='20%' className='strong'><strong>Summary / Conclusion</strong></td>
                        <td><div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: assessment}} /></td>
                    </tr>
                </table>
            </CRow>
            </CCardBody>
        </CCard>
    </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    user : state.userReducer,
    theme:state.themeReducer,
    stafflessonplan: state.stafflessonplanReducer,
    week:state.weekReducer
  })
  export default connect(mapStateToProps, {
    registerStafflessonplan,
    updateStafflessonplan,
    getThemes,
    getWeeks,
    getStafflessonplans
    
  })(Stafflessonplans)
  
