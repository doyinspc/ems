import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import {getCas, getCa, registerCa, updateCa, deleteCa} from './../../../actions/setting/ca';
import { useHistory} from 'react-router-dom'



const Ca = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td className='text-left'>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>{row.maxscore}</td>
                <td className='text-center'>{moment(row.started).format('MMM D, YYYY')}</td>
                <td className='text-center'>{moment(row.ended).format('MMM D, YYYY')}</td>    
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
                    <a  key={ind} title='Assessement Items' onClick={(item) => history.push(`/setting/${props.sid}/${props.pid}/${props.qid}/${props.did}/${row.id}/0/0`)}><i className='fa fa-list ml-2 px-2'></i></a>     
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
                    
                    <th><i className='fa fa-list text-center'></i> ASSESSMENT NAME</th>
                    <th><i className='fa fa-bullseye text-center'></i> ABBRV</th>
                    <th><i className='fa fa-list'></i> MAX SCORE</th>
                    <th className="text-center"> <i className='fa fa-calendar'></i> COMMENCES</th>
                    <th className="text-center"><i className='fa fa-calendar'></i> ENDS</th>
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
  cas : state.caReducer
})
export default connect(mapStateToProps, {
  getCas,
  getCa,
  registerCa,
  updateCa,
  deleteCa
})(Ca)
