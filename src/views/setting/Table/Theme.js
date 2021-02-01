import React from 'react'
import { connect } from 'react-redux';
import {getThemes, getTheme, registerTheme, updateTheme, deleteTheme} from './../../../actions/setting/theme';
import { useHistory} from 'react-router-dom'
import { 
  CRow ,
  CCol,
  CBadge
} from '@coreui/react';


const termarray ={
  1:'First term',
  2:'Second term',
  3:'Third term',
  4:'Alternative/Obsolete'
}
const Theme = (props) => {
  const history = useHistory()
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
      <td>
        <strong>MODULE {row.moduleid}</strong>{" : "}<span style={{textTransform:'uppercase'}}> {row.name}</span><br/>
  <strong>CLASS</strong>{" : "}<span style={{textTransform:'uppercase'}}> {row.claszname}{termarray[row.termid]}</span>
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
           <CRow className='d-print-none'>
             <CCol>
             <CBadge className="mr-1" color="primary">Primary</CBadge>
             <button className='btn btn-sm btn-link'><i className='fa fa-bank text-success'></i> Question Bank</button>
             <button onClick={()=>props.onEdit(row)} className='btn btn-sm btn-link'><i className='fa fa-edit'></i> Edit</button>
             <button onClick={()=>props.onActivate(row.id, row.is_active)} className='btn btn-sm btn-link text-mute'><i className={parseInt(row.is_active) === 0 ? 'fa fa-unlock text-success':'fa fa-lock text-danger'}></i> {parseInt(row.is_active) === 0 ?'Lock':'Unlock'}</button>
             <button onClick={()=>props.onDelete(row)}className='btn btn-sm btn-link'><i className='fa fa-trash text-danger'></i> Delete</button>
             </CCol>
           </CRow>
      </td>
     
    </tr>
  })
  return (

          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th><i className='fa fa-list'></i> Scheme Of Work</th>
                       </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  themes : state.themeReducer
})
export default connect(mapStateToProps, {
  getThemes,
  getTheme,
  registerTheme,
  updateTheme,
  deleteTheme
})(Theme)
