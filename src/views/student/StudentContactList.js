import React  from 'react'
import { useHistory } from 'react-router-dom'

const Studentclasss = (props) => {
   let history = useHistory()
   
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
  let cont = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/studentclasss/${row.id}`)}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
            {row.g1_name.length > 0 ? <><strong>{row.g1_name} (<i>{row.g1_rel}</i>) <i className="text-info" style={{textTransform:'capitalize'}}>{row.g1_place}</i></strong>{' '}<a href={`mailto:${row.g1_phone1}`}>{row.g1_phone1}</a> <a href={`mailto:${row.g1_phone2}`}>{row.g1_phone2}</a><a href={`mailto:${row.g1_email}`}>{row.g1_email}</a>{' '}{row.g1_address}</>:''}<br/>
            {row.g2_name.length > 0 ? <><strong>{row.g2_name} (<i>{row.g2_rel}</i>) <i className="text-info" style={{textTransform:'capitalize'}}>{row.g1_place}</i></strong>{' '}<a href={`mailto:${row.g2_phone1}`}>{row.g2_phone1}</a> <a href={`mailto:${row.g2_phone2}`}>{row.g2_phone2}</a><a href={`mailto:${row.g2_email}`}>{row.g2_email}</a>{' '}{row.g2_address}</>:''}  
    </td>
  </tr>
})

  
  return (
   <>
   <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Studentclass ID</th>
                    <th>Fullname</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {cont}
                </tbody>
                </table>
   </>
  )
}

export default Studentclasss
  
