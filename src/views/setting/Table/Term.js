import React from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getTerms, getTerm, registerTerm, updateTerm, deleteTerm} from './../../../actions/setting/term';
import { useHistory} from 'react-router-dom'



const Term = (props) => {
  const history = useHistory()
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind} style={{color:parseInt(row.is_active) == 1 ? 'blue':'red'}}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{moment(row.started).format('MMM D, YYYY')}</td>
                <td className='text-center'>{moment(row.ended).format('MMM D, YYYY')}</td>    
              { props.editer === true  || props.submenu.length > 0 ? 
              <td className='text-center'>
                <a style={{cursor:'pointer'}} onClick={()=>props.onActivate(row.id, row.is_active, props.user.activeschool.id)}><i className={`fa ${parseInt(row.is_active) == 1 ? 'fa-thumbs-up text-success' : 'fa-thumbs-down text-danger'} ml-2 px-2`}></i></a>
                <a style={{cursor:'pointer'}} title='Menu' onClick={(item) => history.push(`/setting/3/${props.pid}/${row.id}/0/0/0`)}><i className='fa fa-list ml-2 px-2'></i></a>
                <a style={{cursor:'pointer'}} title='Edit' onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                <a style={{cursor:'pointer'}} title='Delete' onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
              </td>:''}
              </tr>
  })
  return (

          <table className="table  table-outline mb-0  d-sm-table">
                <thead className="thead-lighst" style={{backgroundColor:'navy', color:'white'}}>
                  <tr>
                  <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Term</th>
                    <th className="text-center"> <i className='fa fa-calendar'></i> Start</th>
                    <th className="text-center"><i className='fa fa-calendar'></i> End</th>
                    { props.editer === true  ||  props.submenu.length > 0 ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
            </table>
         
  )
}
const mapStateToProps = (state) =>({
  terms : state.termReducer,
  user: state.userReducer
})
export default connect(mapStateToProps, {
  getTerms,
  getTerm,
  registerTerm,
  updateTerm,
  deleteTerm
})(Term)
