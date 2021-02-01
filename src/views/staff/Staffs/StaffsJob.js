import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Staffs = (props) => {
   const history = useHistory()
   let data = props.staffs && Array.isArray(props.staffs) ? props.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : []
   
   let cont = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/staffs/${row.id}`)}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
            <strong><a href={`mailto:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
    </td>
    <td>
        <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
    </td>
    
    <td>
      <div className="text-muted " style={{textTransform:'capitalize'}}>{row.address}</div>
    </td>
  </tr>
})

   let acct = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/staffs/${row.id}`)}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
        {props.tin}
    </td>
    <td>
        {props.nin}
    </td>
        {props.pen}
    <td>
      
    </td>
  </tr>
})

   let tabl = data.map((row, ind)=>{
        return <tr key={ind}
        onClick={() => history.push(`/staffs/${row.id}`)}>
        <td className="text-center">
          <div className="c-avatar">
            <img src={'avatars/1.png'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
            <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
          </div>
        </td>
        <td>
            <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
                <div className="small text-muted">
                <span>{row.employment_no} | {row.departmentname}</span>
            </div>
        </td>
        <td>
            <div className="small text-muted">
                <span>Phone</span>: <strong><a href={`tel:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
            </div>
            <div className="small text-muted">
                <span>Email</span>: <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
            </div>
        </td>
        <td>
            <div className="small text-muted">
                <span>Date of Birth</span>: <strong>{row.dob}</strong>
            </div>
            <div className="small text-muted">
                <span>Date of Emply.</span>: <strong>{row.doe}</strong> 
            </div>
        </td>
        <td>
          <div className="small text-muted " style={{textTransform:'capitalize'}}>{row.soo}</div>
          <strong style={{textTransform:'capitalize'}}>{row.lga}</strong>
        </td>
        <td>
          <div className="text-muted " style={{textTransform:'capitalize'}}>{row.gender}</div>
        </td>
        <td>
          
        </td>
      </tr>
    });
 
 
  return (
    <>
    <CRow>
    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Staff ID</th>
                    <th>Fullname</th>
                    <th className="text-center">BIRTH DATE</th>
                    <th className="text-center">DATE EMPLOYED</th>
                    <th className="text-center">DEPARTMENT</th>
                    <th className="text-center">LEVEL</th>
                    <th className="text-center">JOB ROLES</th>
                  </tr>
                </thead>
                <tbody>
                  {cont}
                </tbody>
                </table>
    </CRow>
    </>
  )
}


  export default Staffs
  
