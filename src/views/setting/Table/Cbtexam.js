import React,{use, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import {getCbtexams, getCbtexam, registerCbtexam, updateCbtexam, deleteCbtexam} from './../../../actions/setting/cbtexam';
import {getThemes} from './../../../actions/setting/theme';
import { useHistory} from 'react-router-dom'
import { 
    CButton, CCard, CCardBody, CCardHeader, CCollapse, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle 
} from '@coreui/react';





const Cbtexam = (props) => {
  const history = useHistory()

  const [id, setid] = useState(null)
  const [claszid, setclaszid] = useState(null)
  const [subjectid, setsubjectid] = useState(null)
  const [large, setLarge] = useState(false)
  const [accordion, setAccordion] = useState(0)
  const [store, setstore] = useState({})

  const handleSubmit = () =>{
    
    let fd = new FormData();
    fd.append('questions', JSON.stringify(store));
    fd.append('table', 'cbtexams');
    
    if(id && parseInt(id) > 0)
    {
      //UPDATE 
      fd.append('id', id);
      fd.append('cat', 'update');
      props.updateCbtexam(fd)
      
    }
  
}

  const toggleQue = (id, question) =>{
      let score = {...store}
      if(Object.keys(score).includes(id))
      {
         delete score[id]
         setstore(score)
      }else{
          score[id] = question
          setstore(score)
      }
      
  }
  const loadQ = (id, subjecid, classid, qdb)=>{
      setid(id)
      setsubjectid(subjecid)
      setclaszid(classid)
      setstore(qdb !== undefined && qdb.length > 0 ? JSON.parse(qdb):{})
      setLarge(large=>!large)
      let params = {
        data:JSON.stringify(
        {
            'claszid':classid,
            'subjectid':subjecid,
            'is_active':0
        }),
        cat:'selected',
        table:'themes',
        narration:'get Questions'
  
    }
    props.getThemes(params)
  }
  let themes = props.themes && Array.isArray(props.themes) ? props.themes.filter(rw =>rw !== null || rw !== undefined) : []
  let qbank = themes.map((prop, ind)=>{
      let qb = prop.question.length > 0 ? JSON.parse(prop.question): {};
      //let que = 
        return <CCard className="mb-0 " >
        <CCardHeader id="headingOne">
          <CButton 
            block 
            color="link" 
            className="text-left m-0 p-0" 
            onClick={() => setAccordion(accordion === parseInt(prop.id) ? null : parseInt(prop.id))}
          >
            <h5 className="m-0 p-0">{`${prop.claszname}${" "} ${prop.name}  `}</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === parseInt(prop.id)}>
          <CCardBody>
           {Object.keys(qb).map((pr, ih)=>{
               let qs = qb[pr]
               return <CCard 
                        key={ih} 
                        className={Object.keys(store).includes(pr) ? "bg-success" : ''}
                        onClick={()=>toggleQue(pr, qs)}
                        >
                   <CCardBody>
                       {qs.question}
                   </CCardBody>
               </CCard>
           })}
          </CCardBody>
        </CCollapse>
      </CCard>
  })
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.subjectname}</td>
                <td className='text-center'>{row.claszname}</td>
                <td className='text-center'>{row.teststart}</td>
                <td className='text-center'>{row.testend}</td>
                <td className='text-center'>{row.testtime}</td>
                <td className='text-center'>
                    <button
                    size="sm"
                    onClick={()=>loadQ(row.id, row.subjectid, row.claszid, row.questions)}
                    >
                        Questions</button>
                    </td>
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
                    {
                        props.submenu.map((prp, ind)=>{
                            return <a  key={ind} title={prp.tag} onClick={(item) => history.push(`/setting/${props.sid}/${props.pid}/${row.id}`)}><i className='fa fa-list ml-2 px-2'></i></a>
                        })
                     }
                        
                    {props.editer === true ?
                     <>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onActivate(row.id, row.is_active)}><i className={`fa ${parseInt(row.is_active) == 1 ? 'fa-thumbs-down text-danger' : 'fa-thumbs-up text-success'} ml-2 px-2`}></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>:''}
              </tr>
  })
  return (
    <>
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> SUBJECT</th>
                    <th><i className='fa fa-list'></i> CLASS</th>
                    <th><i className='fa fa-list'></i> START DATE</th>
                    <th><i className='fa fa-list'></i> START END</th>
                    <th><i className='fa fa-list'></i> DURATION</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
              <CModal 
              show={large} 
              onClose={() => setLarge(!large)}
              size="lg"
            >
              <CModalHeader closeButton>
            <CModalTitle>QUESTIONS {`(${Object.keys(store).length} selected)`}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCardBody>
            <div id="accordion">
            {qbank}
               </div>
          </CCardBody>
               
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={handleSubmit}>Save Selected Questions ({Object.keys(store).length})</CButton>{' '}
                <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
            </>
         
  )
}
const mapStateToProps = (state) =>({
  cbtexams : state.cbtexamReducer,
  themes : state.themeReducer.themes
})
export default connect(mapStateToProps, {
  getCbtexams,
  getCbtexam,
  registerCbtexam,
  updateCbtexam,
  deleteCbtexam,
  getThemes
})(Cbtexam)
