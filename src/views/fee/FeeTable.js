import React from 'react'
import { connect } from 'react-redux';
import {getStudentfees, getStudentfee, registerStudentfee, updateStudentfee, deleteStudentfee} from './../../actions/student/studentfee';
import { useHistory} from 'react-router-dom'



const Studentfee = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind} style={{padding:'2px'}}>
                <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
                <td style={{padding:'2px'}}>{row.datepaid}</td>
                <td style={{padding:'2px'}}>{row.studentname}</td>
                <td style={{padding:'2px'}} className='text-center'>{row.amount}</td>
                <td style={{padding:'2px'}} className='text-center'>{row.accountname}</td>
                <td style={{padding:'2px'}} className='text-center'>{row.staffname}</td>
               <td style={{padding:'2px'}} className='text-center'> 
                    {props.editer === true ?
                     <>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>
              </tr>
  })
  return (

          <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center" title="Transaction ID">TID</th>
                    <th><i className='fa fa-list'></i> Date Paid</th>
                    <th><i className='fa fa-list'></i> Students</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Amount</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Account</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Recorded By</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  studentfees : state.studentfeeReducer
})
export default connect(mapStateToProps, {
  getStudentfees,
  getStudentfee,
  registerStudentfee,
  updateStudentfee,
  deleteStudentfee
})(Studentfee)
