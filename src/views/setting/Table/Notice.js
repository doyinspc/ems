import React from 'react'
import { connect } from 'react-redux';
import {getNotices, getNotice, registerNotice, updateNotice, deleteNotice} from './../../../actions/setting/notice';
import { useHistory} from 'react-router-dom'



const Notice = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>
                    <h6>{row.title}</h6>
                    <strong>{row.message}</strong><br/>
                    <strong><i>{row.source}</i></strong><br/>
                    <a href="">Download</a>
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

          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Notice</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
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
  notices : state.noticeReducer
})
export default connect(mapStateToProps, {
  getNotices,
  getNotice,
  registerNotice,
  updateNotice,
  deleteNotice
})(Notice)
