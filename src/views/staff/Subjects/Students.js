import React, { useEffect, useState }  from 'react'
import { useHistory} from 'react-router-dom'
import { getStaffstudents, updateStaffstudent, registerStaffstudent, deleteStaffstudent} from './../../../actions/staff/staffstudent'
import { getStudentscores, updateStudentscore, registerStudentscore, deleteStudentscore} from './../../../actions/student/studentscore'
import { getStaffsubjects} from './../../../actions/staff/staffsubject'
import CIcon from '@coreui/icons-react'
import SearchDashboard3 from './../SearchDashboard3'
import { connect } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CInput } from '@coreui/react'
import Swal from'sweetalert'
import Header from './Header'
import ScoreBox from './ScoreBox'



const Studentclasss = (props) => {
  
  let data = props.staffstudents.staffstudents && Array.isArray(props.staffstudents.staffstudents) ? props.staffstudents.staffstudents.filter(rw =>rw !== null || rw !== undefined) : []
  let scoresall = props.studentscores.studentscores && Array.isArray(props.studentscores.studentscores) ? props.studentscores.studentscores.filter(rw =>rw !== null || rw !== undefined) : []
  let idx = data.map((pp, ii)=>pp.clientid);
  let ids = idx.join(',')
  let clientid = props.clientid;
  let termid = props.termid;
  let sessionid = props.sessionid;
  let subjectid = props.subjectid;
  let claszid = props.claszid;
  let subject = props.subject;
  let groupid = 3;
   
 const [studentdata, setStudentdata] = useState({})
 const [castore, setcastore] = useState({})
 const [cascores, setcascores] = useState({})
 
  useEffect(() => {
    if(parseInt(subjectid) > 0 ){
     let params = {
        data:JSON.stringify(
        {
            'termid':termid,
            'itemid':subject.itemid1,
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

  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'termid':termid,
          'sessionid':sessionid,
          'clientid':clientid,
          'grp':2
      }),
      cat:'staffclass',
      table:'accessstaffsubjectnum',
      narration:'get staffsubjects'

    }
    props.getStaffsubjects(params1);
    
  }, [])

  useEffect(() => {
    let params1 = {
      data:JSON.stringify(
      {
          'termid':termid,
          'sessionid':sessionid,
          'itemid':subjectid,
          'ids': ids, 
          'grp':8
      }),
      cat:'studentscore',
      table:'accessstudentscore',
      narration:'get scores'

    }
    props.getStudentscores(params1);
    
  }, [termid, sessionid, subjectid, ids, claszid])

  useEffect(() => {
    // let scs = {...cascores}
    // scoresall.forEach(ele=>{
    //   if(ele !== undefined)
    //   {
    //     let nm = ele.clientid+"_"+ele.itemid1;
    //     scs[nm] = ele.contact
    //   }
     
    // })
    // setcascores(scs);
  }, [scoresall])

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

const getAllStudents = () =>{
  /**
    * classunitid
    * termid
    * subjectid
    */
   let fd = new FormData();
   fd.append('claszid', claszid);
   fd.append('termid', termid);
   fd.append('subjectid', subjectid);
   fd.append('sessionid', sessionid);
   fd.append('staffid', clientid);
   fd.append('grp', groupid);
   
   fd.append('table', 'accessstudentclass');
   fd.append('cat', 'insertsubject');
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

const setShowca = (id, name, score) =>{
    let sh = {...castore};
    let ar = {}
    ar['id'] = id;
    ar['name'] = name;
    ar['score'] = score;
    sh[id] = ar;
    setcastore(sh);
    
    // scoresall.forEach(ele => {
    //   if(ele.itemid )
    //   {

    //   } 
    // });
}

const saveScore = (studentid, caid, score) =>{

   let fd = new FormData();
   
   fd.append('caid', caid);
   fd.append('sessionid', sessionid);
   fd.append('termid', termid);
   fd.append('studentid', studentid);
   fd.append('subjectid', subjectid);
   fd.append('score', score);
   fd.append('staffid', clientid);
   fd.append('grp', 8);
   fd.append('cat', 'insertscore');
   fd.append('table', 'accessstudentscore');

   props.registerStudentscore(fd)

}


const saveScoreHeader = (caid, score) =>{
   let fd = new FormData();
   fd.append('caid', caid);
   fd.append('sessionid', sessionid);
   fd.append('termid', termid);
   fd.append('subjectid', subjectid);
   fd.append('score', score);
   fd.append('staffid', clientid);
   fd.append('grp', 7);

}

const setScoreValues = (e, student, ca, namz, sco) =>{
  let sc = {...cascores}
  let nm = student+"_"+ca;
  
  if(parseFloat(e.target.value) <= parseFloat(sco)){
    sc[nm] = e.target.value
    setcascores(sc);
  }else{
    sc[nm] = ''
    setcascores(sc);
  } 
}
const saveScoreValues = (e, student, ca, namz, sco) =>{
  saveScore(student, ca , e.target.value)
  
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
      
    </td>
    <td width='340px' valign='middle' className='container' valign="middle" >
        <div className='strong my-auto py-auto'><strong>{`${row.clientname}`}</strong></div>
            <div className="small text-muted">  
            {`${row.admission_no}`}
        </div>
    </td>
    {
      Object.keys(castore).map((prp, inds)=>{
        let sd = scoresall.filter(rws=>rws !== undefined && rws !== null && parseInt(rws.itemid1) === parseInt(castore[prp].id) && parseInt(rws.clientid) === parseInt(row.clientid));
        let sd_array = sd && Array.isArray(sd) && sd.length ? sd[0] : null;
        let sd_val = sd_array !== null ? parseFloat(sd_array.contact) : '';
        let sd_id = sd_array !== null ? sd_array.id : '';
        let sd_color = sd_array !== null ? 'green' : 'black';
        console.log(sd_val)
        //console.log(sd, castore[prp].id, row.id, scoresall);
        return <ScoreBox 
                  key={inds}
                  sessionid={sessionid}
                  termid={termid}
                  caid={prp}
                  subjectid={subjectid}
                  staffid={props.user.mid}
                  studentid={row.clientid}
                  id={prp}
                  name={castore[prp].name} 
                  score={castore[prp].score}
                  sd_val={sd_val}
                  sd_id={sd_id}
                  sd_color={sd_color}
                  setScoreValues={(e, id, name, score)=>setScoreValues(e, id, prp, name, score)}
                  saveScoreValues={(e, id, name, score)=>saveScoreValues(e, id, prp, name, score)}
                />
      })
    }
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
        getAllStudents={()=>getAllStudents()}
        cas={props.cas}
        setShowca={setShowca}
      />
    </CCardHeader>
   <CCardBody className='table-responsive'>
   <table className="table table-bordered mb-0  d-sm-table">
        <thead className="thead-light">
            <tr>
            <th className="text-center"><CIcon name="cil-people" /></th>
            <th>Students</th>
            {
              Object.keys(castore).map((prp, inds)=>{
                return <th key={inds}>
                  {castore[prp].name}
                  <CInput
                    size="lg"
                    style={{width:'100px', textAlign:'center', fontWeight:'bolder'}}
                    value={castore[prp].score}
                    onChange={(e)=>setScoreValues(e, prp, castore[prp].name, castore[prp].score)}
                    onMouseOut={(e)=>saveScoreValues(e, prp, castore[prp].name, castore[prp].score)}
                  />
                </th>
              })
            }
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
 staffstudents:state.staffstudentReducer,
 studentscores:state.studentscoreReducer,
 cas:state.caReducer.cas,
 user:state.userReducer
})
export default connect(mapStatetoProps, {
    getStaffstudents,
    updateStaffstudent,
    registerStaffstudent,
    deleteStaffstudent,
    getStudentscores,
    updateStudentscore,
    registerStudentscore,
    deleteStudentscore,
    getStaffsubjects
}) (Studentclasss)
  
