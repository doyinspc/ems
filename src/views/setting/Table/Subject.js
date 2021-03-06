import React from 'react'
import { connect } from 'react-redux';
import {getSubjects, getSubject, registerSubject, updateSubject, deleteSubject} from './../../../actions/setting/subject';
import { useHistory} from 'react-router-dom'
import Loader from './../Loader'


const Subject = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>{row.departmentname}</td>
                <td className='text-center'>{row.unitname}</td>
                <td className='text-center'>{parseInt(row.typeid) === 1 ? 'Secondary' :'Primary'}</td>
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
                    {
                        props.submenu.map((prp, ind)=>{
                            return <a  key={ind} title='Scheme of Work' onClick={(item) => history.push(`/setting/${props.sid}/${row.id}/0/0/0/0`)}><i className='fa fa-list ml-2 px-2'></i></a>
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
    {props.subjects.isLoading ?
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Subject</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Department</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Unit</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Category</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>:<Loader />}
   </>      
  )
}
const mapStateToProps = (state) =>({
  subjects : state.subjectReducer
})
export default connect(mapStateToProps, {
  getSubjects,
  getSubject,
  registerSubject,
  updateSubject,
  deleteSubject
})(Subject)
