import React, { useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import { getStaffstudents, updateStaffstudent, registerStaffstudent} from './../../../actions/staff/staffstudent'
import CIcon from '@coreui/icons-react'
import SearchDashboard3 from '../SearchDashboard3'
import { connect } from 'react-redux'



const Studentclasss = (props) => {
  let history = useHistory()
  let data = props.staffstudents.staffstudents && Array.isArray(props.staffstudents.staffstudents) ? props.staffstudents.staffstudents.filter(rw =>rw !== null || rw !== undefined) : []
  let clientid = props.clientid;
  let termid = props.termid;
  let sessionid = props.sessionid;
  let subjectid = props.subject.id;
  let groupid = 3;

 
  useEffect(() => {
    if(parseInt(subjectid) > 0 ){
     let params = {
        data:JSON.stringify(
        {
            'termid':termid,
            'itemid':subjectid,
            'sessionid':sessionid,
            'itemid1':clientid,
            'grp':groupid
        }),
        cat:'staffclass',
        table:'accessstudentsubject',
        narration:'get staff student subjects'
  
      }
      props.getStaffstudents(params)
    }
  }, [termid,subjectid, sessionid, groupid, clientid])

const loadStudent = (studentid) =>{
    let fd = new FormData();
      fd.append('itemid', subjectid);
      fd.append('itemid1', clientid);
      fd.append('clientid', studentid.id);
      fd.append('checker', groupid+'_'+termid+'_'+studentid.id+'_'+subjectid);
      fd.append('table', 'accessstudentsubject');
      fd.append('sessionid', sessionid);
     
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerStaffstudent(fd)
      
}

let tabl = data.filter(rw=>rw !== null && rw !== undefined).map((row, ind)=>{
    return <tr key={ind}
    >
    <td className="text-center">
      <div className="c-avatar">
        <img 
          src={process.env.REACT_APP_SERVER_URL+ '/passport/'+ row.photo} 
          className="c-avatar-img" 
          alt={row.admission_no} 
          onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td>
        <div>{`${row.clientname}`}</div>
            <div className="small text-muted">
            <span>{row.schoolabbrv}{row.admission_no}</span>
        </div>
    </td>
    
    
   
   
  </tr>
});
  return (
   <>
   <SearchDashboard3 
      studentz={loadStudent}  
   />
   <table className="table table-hover table-outline mb-0 d-none d-sm-table">
        <thead className="thead-light">
            <tr>
            <th className="text-center"><CIcon name="cil-people" /></th>
            <th>Students</th>
            </tr>
        </thead>
        <tbody>
            {tabl}
        </tbody>
  </table>
   </>
  )
}
const mapStatetoProps = (state)=>({
 staffstudents:state.staffstudentReducer
})
export default connect(mapStatetoProps, {
    getStaffstudents,
    updateStaffstudent,
    registerStaffstudent
}) (Studentclasss)
  
