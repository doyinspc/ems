import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerReport, updateReport, deleteReport} from './../../../actions/setting/report';
import {getCas} from './../../../actions/setting/ca';
import {getClaszs} from './../../../actions/setting/clasz';
import {getTerms} from './../../../actions/setting/term';
import {getSessions} from './../../../actions/setting/session';
import {getSubjects} from './../../../actions/setting/subject';
import {getGrades} from './../../../actions/setting/grade';
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
  CFormText,
  CSelect,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

let settingz = [
 { 'id': 1, 'name': 'Ranking for all classes'},
 { 'id': 2, 'name': 'Ranking for senior classes only '},
 { 'id': 3, 'name': 'Ranking for junior classes only'},
 { 'id': 4, 'name': 'Show Grading'},
 { 'id': 5, 'name': 'Show Subject Ranking'},
 { 'id': 6, 'name': 'Show Subject Average'},
 { 'id': 7, 'name': 'Show Class Average'},

]
const Report = (props) => {
  const [collapse, setCollapse] = useState(false)
  
  const [id, setId] = useState(null)
  const [title, settitle] = useState('')
  const [abbrv, setabbrv] = useState('')
  const [clasz, setclasz] = useState([])
  const [ca, setca] = useState([])
  const [composite, setcomposite] = useState({})
  const [grade, setgrade] = useState(0)
  const [termid, settermid] = useState(0)
  const [sessionid, setsessionid] = useState(0)
  const [setting, setsetting] = useState([])
  const [page, setpage] = useState(0)

  let data = Object.keys(props.reports.report) && Array.isArray(Object.keys(props.reports.report)) ? props.reports.report : [];
  
  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(data.id && parseInt(data.id) > 0)
    {
      let dt = data;
      setId(dt.id);
      settitle(dt.title);
      setabbrv(dt.abbrv);
      setgrade([dt.grade]);
      settermid(dt.termid);
      setsessionid(dt.sessionid);
      let ccl = dt.clasz.length > 0 ? JSON.parse(dt.clasz):[];
      setclasz(ccl);
      let cal = dt.ca.length > 0 ? dt.ca.split(","):[];
      setca(cal);
      let co = dt.composite.length > 0 ? JSON.parse(dt.composite):[];
      setcomposite(co);
      let se = dt.setting.length > 0 ? JSON.parse(dt.setting):[];
      setsetting(se);

    }else
    {
      setId(null);
      settitle('');
      setabbrv('');
      setgrade(0);
      settermid(0);
      setsessionid(0);
      setclasz({});
      setca({});
      setcomposite({});
      setsetting({});
    }
    
  }, [data])


  useEffect(() => {
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {    
        let params = {
          data:JSON.stringify({
            'schoolid':props.user.activeschool.id
          }),
          cat:'select',
          table:'sessions',
          narration:'get sessions'
      }
        props.getSessions(params)

        let params1 = {
          data:JSON.stringify({
            'typeid':props.user.activeschool.typeid
          }),
          cat:'selected',
          table:'subjects',
          narration:'get sessions'
      }
        props.getSubjects(params1);

        let params2 = {
          data:JSON.stringify({
            'typeid':props.user.activeschool.typeid
          }),
          cat:'selected',
          table:'claszs',
          narration:'get sessions'
      }
        props.getClaszs(params2)

        let params3 = {
          data:JSON.stringify({
            'is_active': 0
          }),
          cat:'selected',
          table:'grades',
          narration:'get grades'
      }
        props.getGrades(params3)
    }
    
  }, [props.user.activeschool])

  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'sessionid':sessionid
      }),
      cat:'select',
      table:'terms',
      narration:'get terms'

  }
  props.getTerms(params1)
    let params = {
      data:JSON.stringify(
      {
        'sessionid':sessionid,
        'schoolid':props.user.activeschool.id
      }),
      cat:'dropdowncas',
      table:'dropdowncas',
      narration:'get cas'

    }
    props.getCas(params)
  }, [sessionid, props.user.activeschool.id])
 
  const handleSubmit = () =>{
    if(title.length > 0)
    {
      let fd = new FormData();
      fd.append('title', title);
      fd.append('abbrv', abbrv);
      fd.append('sessionid', sessionid);
      fd.append('termid', termid);
      fd.append('cat', 'update');
      fd.append('table', 'reports');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        props.updateReport(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerReport(fd)
      }
    }
  }
  const handleSubmitClass = () =>{
      let fd = new FormData();
    
      fd.append('clasz', JSON.stringify(clasz));
      fd.append('table', 'reports');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateReport(fd);
      }
  }
  const handleSubmitCa = () =>{
    let fd = new FormData();
    
      fd.append('ca', ca.join(","));
      fd.append('table', 'reports');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateReport(fd);
      }
  
  }
  const handleSubmitSetting = () =>{
    let fd = new FormData();
    fd.append('setting', JSON.stringify(setting));
    fd.append('table', 'reports');
    
    if(id && parseInt(id) > 0)
    {
      //UPDATE 
      fd.append('id', id);
      fd.append('cat', 'update');
      props.updateReport(fd);
    }
  
  }
  const handleSubmitComposite = () =>{
    let fd = new FormData();
    fd.append('composite', JSON.stringify(composite));
    fd.append('table', 'reports');
    
    if(id && parseInt(id) > 0)
    {
      //UPDATE 
      fd.append('id', id);
      fd.append('cat', 'update');
      props.updateReport(fd);
    }
  
  }
  const handleSubmitGrade = () =>{
    let fd = new FormData();
    if(Array.isArray(grade) && grade.length > 0){
    fd.append('grade', grade[0]);
    fd.append('table', 'reports');
    
    if(id && parseInt(id) > 0)
    {
      //UPDATE 
      fd.append('id', id);
      fd.append('cat', 'update');
      props.updateReport(fd);
    }
  }
  }

const loadSelect = (e, d) =>{
  let sel = [...clasz];
    if(e)
    {
      sel.push(d)
      setclasz(sel)
    }else{
      let f = sel.filter(ele =>parseInt(ele) !== parseInt(d))
      setclasz(f)
    }
 }

 const loadca = (e, d) =>{
  let sel = [...ca];
    if(e)
    {
      sel.push(d)
      setca(sel)
    }else{
      let f = sel.filter(ele =>parseInt(ele) !== parseInt(d))
      setca(f)
    }
 }

 const loadset = (e, d) =>{
  let sel = [...setting];
  
    if(e)
    {
      sel.push(d)
      setsetting(sel)
    }else{
      let f = sel.filter(ele =>parseInt(ele) !== parseInt(d))
      setsetting(f)
    }
 }

 const loadgrade = (e, d) =>{
  let sel = [];
  
    if(e)
    {
      sel.push(d)
      setgrade(sel)
    }else{
      let f = []
      setgrade(f)
    }
 }
 
///options create
let sessionarray = props.sessions.sessions && Array.isArray(props.sessions.sessions) ? props.sessions.sessions : [];
  let session_array = sessionarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
});

let termarray = props.terms.terms && Array.isArray(props.terms.terms) ? props.terms.terms : [];
  let term_array = termarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
})

let caarray = props.cas.cas && Array.isArray(props.cas.cas) && props.cas.cas.length > 0  ? props.cas.cas : [];
  let ca_array = caarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <><CCol xs={12}><CSwitch 
    className={'my-auto mx-3'} 
    variant={'3d'} 
    color={'info'} 
    checked={rw.id !== undefined ? Array.isArray(ca) && ca.includes(rw.id.toString()) ? true : false:false}
    onChange={(e)=>loadca(e.target.checked, rw.id)}/><span className="pb-auto">{rw.name}</span></CCol></>
})

let setting_array = settingz.filter(rw=>rw !== null).map((rw, ind) =>{
  return <><CCol xs={12}><CSwitch 
  className={'my-auto mx-3'} 
  variant={'3d'} 
  color={'warning'} 
  checked={Array.isArray(setting) && setting.includes(rw.id) ? true : false}
  onChange={(e)=>loadset(e.target.checked, rw.id)}/><span className="pb-auto">{rw.name}</span></CCol></>
})

let gradearray = props.grades.grades && Array.isArray(props.grades.grades) ? props.grades.grades : [];
  let grade_array = gradearray.filter(rw=>rw !== null).map((rw, ind) =>{
      return  <><CCol xs={12}><CSwitch 
      className={'my-auto mx-3'} 
      variant={'3d'} 
      color={'dark'} 
      checked={Array.isArray(grade) && grade.includes(rw.id.toString()) ? true : false}
      onChange={(e)=>loadgrade(e.target.checked, rw.id)}/><span className="pb-auto">{rw.name}</span></CCol></>
})

let subjectarray = props.subjects.subjects && Array.isArray(props.subjects.subjects) ? props.subjects.subjects : [];
  let subject_array = subjectarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
})

let claszarray = props.claszs.claszs && Array.isArray(props.claszs.claszs) ? props.claszs.claszs : [];
  let clasz_array = claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <><CCol xs={12}><CSwitch 
        className={'my-auto mx-3'} 
        variant={'3d'} 
        color={'primary'} 
        checked={Array.isArray(clasz) && clasz.includes(rw.id.toString()) ? true : false}
        onChange={(e)=>loadSelect(e.target.checked, rw.id)}/><span className="pb-auto">{rw.name}</span></CCol></>
})

 
   return (
    <CCol xl={12}  id="#formz">
    {page !== 1 && page !== 2 && page !== 3 && page !== 4 && page !== 5 ? 
    <CCard>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-title">Report</CLabel>
              <CInput 
                  type="text"
                  size="lg" 
                  id="nf-title" 
                  title="title"
                  value={title}
                  onChange={(e)=>settitle(e.target.value)}
                  placeholder="2020/2021 First Term Result" 
                />
              <CFormText className="help-block">Please enter report name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-abbrv">Abbrv </CLabel>
              <CInput 
                  type="text" 
                  size="lg"
                  id="nf-abbrv" 
                  name="abbrv"
                  value={abbrv}
                  onChange={(e)=>setabbrv(e.target.value)}
                  placeholder="3RD 2021" 
                />
              <CFormText className="help-block">Give a short representation of the title (max 6 characters)</CFormText>
            </CFormGroup>
            <CFormGroup>
                  <CLabel htmlFor="nf-sessionid">Session </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-sessionid" 
                      name="sessionid"
                      defaultValue={sessionid}
                      onChange={(e)=>setsessionid(e.target.value)}
                       
                    >
                      {id && parseInt(id) > 0 ? <option value={data.sessionid}>{data.sessionname}nn</option>:<option></option>}
                      {session_array}
                  </CSelect>
                  <CFormText className="help-block">Select the session</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-termid">Term </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-termid" 
                      name="termid"
                      defaultValue={termid}
                      onChange={(e)=>settermid(e.target.value)}
                       
                    >
                      {id && parseInt(id) > 0 ? <option value={data.termid}>{data.termname}</option>:<option></option>}
                      {term_array}
                  </CSelect>
                  <CFormText className="help-block">Select the Term</CFormText>
                </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev + 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Next..</CButton>:""}
        </CCardFooter>
      </CCard>
      :""}
      {page === 1 ? 
    <CCard>
        <CCardBody>
        <CRow><CCol><h5>Which Classes would use this result?</h5></CCol></CRow>
        <CRow>
            {clasz_array}
            </CRow>
        </CCardBody>
        <CCardFooter>
        {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev - 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Prev..</CButton>:""}{" "}
          <CButton type="button" onClick={handleSubmitClass} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev + 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Next..</CButton>:""}
        </CCardFooter>
      </CCard>
      :""}
     {page === 2 ? 
    <CCard>
        <CCardBody>
        <CRow><CCol><h5>Select Assessments, Behaviors and Skills that will make up this report</h5></CCol></CRow>
        
          <CRow>
            {ca_array}
          </CRow>
        </CCardBody>
        <CCardFooter>
          {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev - 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Prev..</CButton>:""}
          <CButton type="button" onClick={handleSubmitCa} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev + 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Next..</CButton>:""}
        </CCardFooter>
      </CCard>
      :""}
       {page === 3 ? 
    <CCard>
        <CCardBody>
        <CRow><CCol><h5>What items should display on the report card</h5></CCol></CRow>
        <CRow>
            {setting_array}
            </CRow>
        </CCardBody>
        <CCardFooter>
        {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev - 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Prev..</CButton>:""}
          <CButton type="submit" onClick={handleSubmitSetting} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev + 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Next..</CButton>:""}
        </CCardFooter>
      </CCard>
      :""}
      {page === 4 ? 
    <CCard>
        <CCardBody>
          <CRow><CCol><h5>Select the grading system to you use.</h5></CCol></CRow>
            <CRow>
            {grade_array}
            </CRow>
        </CCardBody>
        <CCardFooter>
        {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev - 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Prev..</CButton>:""}
          <CButton type="submit" onClick={handleSubmitGrade} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
        {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev + 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Next..</CButton>:""}
        </CCardFooter>
      </CCard>
      :""}
      {page === 5 ? 
    <CCard>
        <CCardBody>
          <CRow><CCol><h5>Setup Composite Subjects.</h5></CCol></CRow>
        <CRow>
            {grade_array}
            </CRow>
        </CCardBody>
        <CCardFooter>
        {id > 0 ?
          <CButton type="reset" onClick={(prev)=>setpage(prev=>prev - 1)} size="sm" color="danger"><CIcon name="cil-ban" /> Prev..</CButton>:""}
          <CButton type="submit" onClick={handleSubmitGrade} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          </CCardFooter>
      </CCard>
      :""}
  </CCol>
    )
}
const mapStateToProps = (state) =>({
  reports : state.reportReducer,
  user : state.userReducer,
  sessions : state.sessionReducer,
  subjects : state.subjectReducer,
  terms : state.termReducer,
  cas : state.caReducer,
  grades : state.gradeReducer,
  claszs : state.claszReducer,
})
export default connect(mapStateToProps, {
  registerReport,
  updateReport,
  deleteReport,
  getCas,
  getSessions,
  getTerms,
  getSubjects,
  getGrades,
  getClaszs
})(Report)
