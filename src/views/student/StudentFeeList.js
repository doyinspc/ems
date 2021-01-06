import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'

const Studentclasss = (props) => {
   let history = useHistory()
   
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let acct = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/studentclasss/${row.id}`)}>
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

  
  return (
   <>
   <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Student ID</th>
                    <th>Studentclass</th>
                    <th className="text-center">FEES</th>
                    <th className="text-center">PAYMENTS</th>
                    <th className="text-center">BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {acct}
                </tbody>
                </table>
   </>
  )
}

export default Studentclasss
  
