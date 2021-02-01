import React, { useEffect, useState }  from 'react'
import { useHistory} from 'react-router-dom'
import { getStaffstudents, updateStaffstudent, registerStaffstudent, deleteStaffstudent} from './../../../actions/staff/staffstudent'
import CIcon from '@coreui/icons-react'
import SearchDashboard3 from './../SearchDashboard3'
import { connect } from 'react-redux'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import Swal from'sweetalert'
import Header from './Header'



const Studentclasss = (props) => {
  let history = useHistory()
  let data = props.staffstudents.staffstudents && Array.isArray(props.staffstudents.staffstudents) ? props.staffstudents.staffstudents.filter(rw =>rw !== null || rw !== undefined) : []
  let clientid = props.clientid;
  let termid = props.termid;
  let sessionid = props.sessionid;
  let subjectid = props.subjectid;
  let claszid = props.claszid;
  let subject = props.subject;
  let groupid = 3;

  const [studentdata, setStudentdata] = useState({})
 
  useEffect(() => {
    if(parseInt(subjectid) > 0 ){
     let params = {
        data:JSON.stringify(
        {
            'termid':termid,
            'itemid':subjectid.itemid1,
            'sessionid':sessionid,
            'itemid1':clientid,
            'contact':claszid,
            'grp':groupid
        }),
        cat:'staffclass',
        table:'accessstudentsubject',
        narration:'get staff student subjects'
  
      }
      props.getStaffstudents(params)
    }
  }, [termid,subjectid, sessionid, groupid, clientid])

const placeStudent = (students) =>{
   setStudentdata(students);
}

const loadStudent = () =>{

      let fd = new FormData();
      fd.append('itemid', subjectid);
      fd.append('itemid1', clientid);
      fd.append('contact', claszid);
      fd.append('clientid', studentdata.id);
      fd.append('checker', groupid+'_'+termid+'_'+studentdata.id+'_'+subjectid);
      fd.append('table', 'accessstudentsubject');
      fd.append('sessionid', sessionid);
     
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerStaffstudent(fd)
      
}

const onRemove =(id)=>{
     Swal("Are you sure you want to delete you will not be able to restore the data.")
    .then((value) => {
      if(value == true && parseInt(id) > 0){
          let fd = new FormData();
          fd.append('id', id);
          fd.append('sessionid', sessionid)
          fd.append('table', 'accessstudentsubject')
          fd.append('cat', 'deletes')
          props.deleteStaffstudent(fd, id);
      }else{
        Swal(`Not deleted`);
      }
      
    });
  
}
let tabl = data.filter(rw=>rw !== null && rw !== undefined).map((row, ind)=>{
    return <tr key={ind}
    >
    <td className="text-center" width='60px'>
      <div className="c-avatar">
        <img 
          src={process.env.REACT_APP_SERVER_URL+ row.photo} 
          className="c-avatar-img" 
          style={{width:'50px', height:'50px'}}
          height='50px'
          width='50px'
          alt={row.admission_no} 
          onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + 'avatars/1.png'} }
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
      <span>{row.admission_no}</span>
    </td>
    <td width='340px' valign='middle' className='container'>
        <div className='strong my-auto py-auto'><strong>{`${row.clientname}`}</strong></div>
            <div className="small text-muted">  
            {`${row.admission_no}`}
        </div>
    </td>
    <td >
      <span className='pull-right'>
      <button  onClick={()=>onRemove(row.id)} className='btn btn-sm btn-round btn-danger '><CIcon  size='lg' name="cil-x"/></button>
      </span>
    </td>
  </tr>
});
let len = data.filter(rw=>rw !== null && rw !== undefined).length;

return (
   <>
   <CCard>
     <CCardHeader>
      <Header 
        len={len}
        subject={subject}
        studentdata={studentdata}
        goBack={props.goBack}
        placeStudent={placeStudent}
        loadStudent={loadStudent}
        setStudentdata={(pr)=>setStudentdata(pr)}
      />
    </CCardHeader>
   <CCardBody className='table-responsive'>
   <table className="table table-bordered mb-0  d-sm-table">
        <thead className="thead-light">
            <tr>
            <th className="text-center"><CIcon name="cil-people" /></th>
            <th>Students</th>
            <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {tabl}
        </tbody>
  </table>
  </CCardBody>
  </CCard>
   </>
  )
}
const mapStatetoProps = (state)=>({
 staffstudents:state.staffstudentReducer
})
export default connect(mapStatetoProps, {
    getStaffstudents,
    updateStaffstudent,
    registerStaffstudent,
    deleteStaffstudent
}) (Studentclasss)
  
