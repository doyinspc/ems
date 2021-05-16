import { CRow, CCol, CBadge, CContainer, CButton, CCardFooter} from '@coreui/react';
import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { getThemes} from './../../actions/setting/theme';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import CourseFormAssessment from './Question/Form/CourseFormAssessment';
import Theme from './Question/Form/CardFormTheme'
import PageHeader  from './PageHeader';

  const termarray ={
    1:'First term',
    2:'Second term',
    3:'Third term',
    4:'Alternative/Obsolete'
  }

const Staffattendance = (props) => {
     let clasz = useParams().clasz
     let term = useParams().term
     let subject = useParams().id

     const [pst, setpst] = useState(false);
     const [rst, setrst] = useState(false)
     const [datas, setdatas] = useState({})

    useEffect(() => {
        let params1 = {
          data:JSON.stringify(
          {
              'termid':term,
              'claszid':clasz,
              'subjectid':subject
          }),
          cat:'selected',
          table:'themes',
          narration:'get all theme pre term and class'
      }
        props.getThemes(params1)
      }, [clasz, term, subject])
     
      const showQuestion =(data)=>{
        setpst(true)
        setdatas(data)
      }
      const onEdit =(data)=>{
        setrst(true)
        setdatas(data)
      }
      const onReset = () =>{

      }
      const handleClose =()=>{
        setpst(false)
        setdatas({})
      }
      const handleCloses =()=>{
        setrst(false)
        setdatas({})
      }

      let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
      let tabl = data.filter(rw=>rw != null || rw !== undefined).map((row, ind)=>{
          let q_val = row.question.length > 0 ? JSON.parse(row.question):'';
          let q_num = Array.isArray(Object.keys(q_val)) && Object.keys(q_val).length > 0 ? Object.keys(q_val).length : 0;
          return <tr key={ind}>
          <td>
            <table border="0px" width="100%">
            <tr style={{padding:'0px'}}>
            <td style={{padding:'0px'}} width="20%"><strong>MODULE {row.moduleid}</strong></td><td style={{padding:'0px'}}><span style={{textTransform:'uppercase'}}> {row.name}</span></td>
            </tr>
            <tr style={{padding:'0px'}}>
            <td style={{padding:'0px'}}><strong>CLASS</strong></td><td style={{padding:'0px'}}><span style={{textTransform:'uppercase'}}> {row.claszname}</span></td>
            </tr>
            <tr>
            <td style={{padding:'0px'}}><strong>TERM</strong></td><td style={{padding:'0px'}}>{termarray[row.termid]}</td>
            </tr>
            <tr>
            <td style={{padding:'0px'}}><strong>COMPILED BY</strong></td><td style={{padding:'0px', textTransform:'capitalize'}}>{row.staffname}</td>
            </tr>
            </table>
            <CRow>
              <CCol xs={12} sm={4}>
                  <strong >The lesson would be presented as follows</strong>
                  <div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: row.content}} />
              </CCol>
              <CCol xs={12} sm={4}>
                <strong >At the end of the lesson students should be able to</strong>
                <div style={{whiteSpace:'pre-wraps'}}>
                  <div style={{whiteSpace:'pre-wraps'}}  dangerouslySetInnerHTML={{__html: row.objective}} />
                </div>
              </CCol>
              <CCol xs={12}sm={4}>
              <strong >Instructional Material</strong>
              <div  dangerouslySetInnerHTML={{__html: row.material.replace(/(\r\n|\n|\r)/gm, "<br/>") }} />
              </CCol>
            </CRow>
            <CCardFooter>
            <CRow className='d-print-none'>
             <CCol>
             <CBadge className="mr-1" color="danger">Actions</CBadge>
             <button onClick={()=>showQuestion(row)} className='btn btn-sm btn-link'><i className='fa fa-bank text-success'></i> Question Bank</button>
            <CBadge className="mr-1" color="info">{q_num} Questions available</CBadge>
             <button onClick={()=>onEdit(row)} className='btn btn-sm btn-link'><i className='fa fa-edit'></i> Edit</button>
             <button onClick={()=>props.onActivate(row.id, row.is_active)} className='btn btn-sm btn-link text-mute'><i className={parseInt(row.is_active) === 0 ? 'fa fa-unlock text-success':'fa fa-lock text-danger'}></i> {parseInt(row.is_active) === 0 ?'Lock':'Unlock'}</button>
             <button onClick={()=>props.onDelete(row)}className='btn btn-sm btn-link'><i className='fa fa-trash text-danger'></i> Delete</button>
             </CCol>
           </CRow>
           </CCardFooter>
          </td>
         
        </tr>
      })
      
    return(
        <>
        { pst ? 
        <CourseFormAssessment
          mid={datas.id}
          st={pst}
          data={datas}
          handleClose={handleClose}
       />:''
        }
         { rst ? 
        <Theme
                pid={3}
                mid={datas.id}
                id={datas.id}
                school={props.user.activeschool}
                data={datas}
                onReset={onReset}
                handleClose={handleCloses}
       />:''
        }
        <div className="m-20 p-30 container-fluid" id="maincont" style={{backgroundColor:'grey'}} >
        <div 
            className="m-200" 
            style={{marginLeft:'auto', marginRight:'auto', marginTop:'9px',  marginBottom:'5px', backgroundColor:'grey'}}
          >
                <CContainer style={{  minHeight:'900px', maxWidth:'720px', backgroundColor:'white'}}>
                    <PageHeader />     
                           
                           
            <CRow xs={12} >
                          <table className="table table-border table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th><i className='fa fa-list'></i> Scheme Of Work</th>
                       </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
                            </CRow>
                          </CContainer>   
                         
                  </div>
              
      
    </div>
        </>
    )
}
const mapStateToProps = (state) =>({
    
    data:state.themeReducer.themes,
    user:state.userReducer

  })
  export default connect(mapStateToProps, {
    getThemes
  })(Staffattendance)
