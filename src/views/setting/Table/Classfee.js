import React from 'react'
import { connect } from 'react-redux';
import {getClassfees, getClassfee, registerClassfee, updateClassfee, deleteClassfee} from './../../../actions/setting/classfee';
import { useHistory} from 'react-router-dom'



const Classfee = (props) => {
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td className='text-center'>{row.claszname}</td>
                <td>{row.feename}</td>
                <td>{Number(row.amount).toFixed(2)}</td>
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
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

          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> CLASS</th>
                    <th><i className='fa fa-list'></i> FEE</th>
                    <th><i className='fa fa-list'></i> AMOUNT</th>
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
  classfees : state.classfeeReducer
})
export default connect(mapStateToProps, {
  getClassfees,
  getClassfee,
  registerClassfee,
  updateClassfee,
  deleteClassfee
})(Classfee)
