import React  from 'react'
import moment from 'moment'
import CIcon from '@coreui/icons-react'

const Studentclasss = (props) => {
   
   const lStudent = (id) =>{
     window.open(process.env.PUBLIC_URL+"#/students/"+id)
   }
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
  
let tabl = data.map((row, ind)=>{
    return <tr key={ind} onClick={()=>lStudent(row.id)}>
    <td className="text-center">
      <div className="c-avatar">
        <img 
        src={process.env.REACT_APP_SERVER_URL+ row.photo} 
        className="c-avatar-img" 
        alt={row.admission_no} 
        onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td>
<div><strong>{`${row.surname} ${row.firstname} ${row.middlename}`}</strong></div>
            <div className="small text-muted">
            <span>{row.schoolabbrv}{row.admission_no}</span>
        </div>
    </td>
    
    <td>
        <div className="small text-muted">
            <span>Date of Birth</span>: <strong>{moment(row.dob).format('Do MMM, YYYY')}</strong>
        </div>
        <div className="small text-muted">
            <span>Age (Years)</span>: <strong>{moment().diff(row.dob, 'years')}</strong> 
        </div>
    </td>
    <td>
      <div className="small text-muted " style={{textTransform:'capitalize'}}>{row.soo}</div>
      <strong style={{textTransform:'capitalize'}}>{row.lga}</strong>
    </td>
    <td>
      <div className="text-muted " style={{textTransform:'capitalize'}}>{row.gender}</div>
    </td>
  </tr>
});

  return (
   <>
   <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Studentclass</th>
                    <th className="text-center">Dates</th>
                    <th>Origin</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                </tbody>
                </table>
   </>
  )
}

export default Studentclasss
  
