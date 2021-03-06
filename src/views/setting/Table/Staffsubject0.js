import React from 'react'
import { connect } from 'react-redux';

const Staffsubject = (props) => {
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.clientname}</td>
                <td className='text-left'>{parseInt(row.staffid) === 1 ? row.itemnameops :row.itemname}</td>
                <td className='text-left'>{row.itemname1}</td>
                <td className='text-center'>{row.contact}</td>
                <td className='text-center'>{row.number_of_candidate}</td>
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
        <>
        <div className="table-responsive">
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center"> SN.</th>
                    <th><i className='fa fa-users'></i> STAFF NAME</th>
                    <th><i className='fa fa-blacboard'></i> CLASS</th>
                    <th><i className='fa fa-book'></i> SUBJECT</th>
                    <th><i className='fa fa-clock-o'></i> PERIODS<br/> (PER WEEK)</th>
                    <th><i className='fa fa-clock-o'></i> STUDENTS</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
              </div>
              </>
         
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer
})
export default connect(mapStateToProps, {
})(Staffsubject)
