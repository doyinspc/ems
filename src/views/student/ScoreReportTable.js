import React, { useState, useEffect }  from 'react'
import { connect } from "react-redux";
import { useHistory} from 'react-router-dom'
import {
    CRow,
    CCol,
    CTabPane,
    CButton
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Button, Col } from 'reactstrap'
import { insertStudentca , deleteStudentca , getStudentscorecas} from './../../actions/student/studentscore'
import { updateStaffsubject} from './../../actions/staff/staffsubject';

const StudentReportList = (props) => {
    let subjectid = props.subjectid;
    let reportid = props.reportid;
    let sessionid = props.sessionid;
    let students = props.students;
    let claszname = props.claszname;
    let claszparentname = props.claszparentname;
    let classteacher = props.classteacher;
    let subjectname = props.subjectname;
    let theadm = props.theadm;
    let theadm1 = props.theadm1;
    let caunit_array = props.caunit_array;
    let ca_array = props.ca_array;
    let ca_score = props.ca_score;
    let arr = props.arr
    let classparent_subject_average = props.classparent_subject_average
    let class_subject_average = props.class_subject_average
    let student_classparent_subject_position_store = props.student_classparent_subject_position_store
    let student_class_subject_position_store = props.student_class_subject_position_store
    let student_classparent_position_store = props.student_classparent_position_store
    let student_class_position_store = props.student_class_position_store
    let student_ca_score_store = props.student_ca_score_store

    let keepca = {}

    useEffect(() => {
      let params = {
        data:JSON.stringify(
        {
              'sessionid':sessionid,
              'reportid':reportid,
              'itemid':subjectid,
              'idx':students,
              'grp': 11
        }),
          cat:'studentca',
          table:'accessstudentcas',
          narration:'get ca scores'
      }
      props.getStudentscorecas(params);
    }, [sessionid, reportid, subjectid, students])

    const compute = (sumz, totz, id, cas, sid, cid)=>{
        let sc = Array.isArray(Object.keys(cas)) &&
        Object.keys(cas).includes(sid) &&  Array.isArray(Object.keys(cas[sid])) && 
        Object.keys(cas[sid]).includes(subjectid) && Array.isArray(Object.keys(cas[sid][subjectid])) && 
        Object.keys(cas[sid][subjectid]).includes(cid) ? cas[sid][subjectid][cid] : '0';
        
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * ca_score[id] : 0;
        if( Number(res).toFixed(1) == parseFloat(sc))
        {
          return <font style={{color:"blue"}}>{Number(res).toFixed(1)}</font>;
        }else{
          return <font style={{color:"red"}}>{Number(res).toFixed(1)}</font>;
        }
        
        
    }
    const computes = (sumz, totz, id)=>{
     
      let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      
      let res = sums > 0 && tots > 0 ? (sums/tots) * ca_score[id] : 0;
      return Number(res).toFixed(1)
      
  }
    const compute100 = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 100 : 0;
        return Number(res).toFixed(1)
    }
    const openEditing = () =>{
    }
    const clearRecord = (data) =>{
        let fd = new FormData();
        fd.append('subjectid', subjectid);
        fd.append('reportid', reportid);
        fd.append('sessionid', sessionid);
        fd.append('data', JSON.stringify(data));
        fd.append('cat', 'savecadelete');
        fd.append('table', 'savecadelete');
        props.deleteStudentca(fd);
    }
    const lockEditing = (data) =>{

        let fd = new FormData();
        fd.append('subjectid', subjectid);
        fd.append('reportid', reportid);
        fd.append('sessionid', sessionid);
        fd.append('data', JSON.stringify(data));
        fd.append('cat', 'saveca');
        fd.append('table', 'saveca');
        props.insertStudentca(fd);
      
    }
    /**
     * sort position by student
     * sort maxscore
     */
    let rank_array_classparent ={}
    let total_array_classparent = {}
    let avg_array_classparent = {}
    student_classparent_subject_position_store.forEach(el => {
        rank_array_classparent[el.studentid] = el.rank;
        total_array_classparent[el.studentid] = el.score;
        avg_array_classparent[el.studentid] = el.average;
    });

    let rank_array_class ={}
    let total_array_class = {}
    let avg_array_class = {}
    student_class_subject_position_store.forEach(el => {
        rank_array_class[el.studentid] = el.rank;
        total_array_class[el.studentid] = el.score;
        avg_array_class[el.studentid] = el.average;
    });
   

    let cascored = props.studentscore && Array.isArray(props.studentscore) ? props.studentscore.filter(rw =>rw != null || rw != undefined) : []
    let cascored_array = {}
    cascored.forEach(ele=>{
      if(Object.keys(cascored_array).includes(ele.clientid))
      {
        if(Object.keys(cascored_array[ele.clientid]).includes(ele.itemid))
        {
          if(Object.keys(cascored_array[ele.clientid][ele.itemid]).includes(ele.itemid1))
          {

          }else{
            cascored_array[ele.clientid][ele.itemid][ele.itemid1] = ele.contact
          }

        }else{
          cascored_array[ele.clientid][ele.itemid] = {}
          cascored_array[ele.clientid][ele.itemid][ele.itemid1] = ele.contact
        }

      }else
      {
          cascored_array[ele.clientid] = {};
          cascored_array[ele.clientid][ele.itemid] ={}
          cascored_array[ele.clientid][ele.itemid][ele.itemid1] = ele.contact
      }
    })
    
    let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
    
    let acct = data.map((row, ind)=>{
      let subs= [];
      let adds = [];
      return <tr key={ind}>
      <td className="text-center">
       {ind + 1}
      </td>
      <td>
        <div><strong>{`${row.surname} ${row.firstname} ${row.middlename}`}</strong></div>
      </td>
      {
          
          Object.keys(ca_array).map((prop, ind)=>{
            let sumrow = [];
            let totrow = [];
            return <>{Object.keys(caunit_array[prop]).map((pro, inds)=>{
            if(Object.keys(arr).includes(row.id) && Object.keys(arr[row.id]).includes(caunit_array[prop][pro].id) )
            {
              let sh = arr[row.id][caunit_array[prop][pro].id];
              let shmax = caunit_array[prop][pro].score;
              sumrow.push(sh)
              totrow.push(shmax)
              subs.push(sh)
              adds.push(shmax)
              return <td className='text-center' key={inds}>{Number(sh).toFixed(1)}</td>
            }else
            {
              return <td className='text-danger text-center'><CIcon name="cil-x"/></td>
            }
             })}
             <th className='text-center' >
               {
                  compute(sumrow, totrow, prop, cascored_array, row.id, prop)
               }
             </th>
             </>
         })
         
      }
      <th className='text-center' >{compute100(subs, adds)}</th>
      <th className='text-center' >{rank_array_class[row.id]} of {Object.keys(student_class_subject_position_store).length} </th>
      <th className='text-center' >{rank_array_classparent[row.id]} of {Object.keys(student_classparent_subject_position_store).length}</th>
      
    </tr>
  })

    data.forEach(row=>{
        if(Object.keys(arr).includes(row.id) && Object.keys(arr[row.id]).length > 0 )
        {
          keepca[row.id] = {};
          Object.keys(ca_array).map((prop, ind)=>{
            let sumrow = [];
            let totrow = [];
            Object.keys(caunit_array[prop]).map((pro, inds)=>{
              if(Object.keys(arr).includes(row.id) && Object.keys(arr[row.id]).includes(caunit_array[prop][pro].id) )
              {
                let sh = arr[row.id][caunit_array[prop][pro].id];
                let shmax = caunit_array[prop][pro].score;
                sumrow.push(sh)
                totrow.push(shmax)
              }
            })
            console.log(prop);
            keepca[row.id][prop] = computes(sumrow, totrow, prop)
        })
        }
  })

  return (
   <>
    <CTabPane>
    <div className="A4" >
        <div className="sheet padding-5mm" >
         <CRow className='mb-5'>
      
   <CCol xs={12}>
       <h3>{subjectname}</h3>
       <h5>{claszname} Subject Average : {class_subject_average !== undefined && class_subject_average.hasOwnProperty('average') ? Number(class_subject_average.average).toFixed(1) :''}</h5>
       <h5>{claszname} Population : {class_subject_average !== undefined && class_subject_average.hasOwnProperty('average') ? Number(class_subject_average.pop).toFixed(0): ''}</h5>
       <h5>{claszparentname} Subject Average : {classparent_subject_average !== undefined &&  classparent_subject_average.hasOwnProperty('average') ? Number(classparent_subject_average.average).toFixed(1):''}</h5>
       <h5>{claszparentname} Population : {classparent_subject_average !== undefined &&  classparent_subject_average.hasOwnProperty('average') ? Number(classparent_subject_average.pop).toFixed(0):''}</h5>
  </CCol>      
  <CCol>
                <table width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                    <thead className="text-center">
                        <tr>
                            <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>{theadm}
                            <th rowSpan={2}>TOTAL<br/> (100%)</th>
                            <th rowSpan={2}>RANK<br/> ARM</th>
                            <th rowSpan={2}>RANK<br/> CLASS</th>
                        </tr>
                        <tr>
                            {theadm1}
                        </tr>
                    </thead>
                    {
                        acct
                    }
                </table>
                </CCol>
                {classteacher ?
                <CCol xs="12" className="mt-5 pt-10 d-print-none">
                    <CRow>
                    <CCol xs="4">
                      <CButton 
                      block
                        color="info" 
                        onClick={()=>lockEditing(keepca)}
                        ><i className="fa fa-lock"></i>{" "} Save and Lock</CButton>
                    </CCol>
                    <CCol xs="4">
                      <CButton 
                        block
                        color="secondary"
                        onClick={()=>openEditing()}
                        ><i className="fa fa-unlock"></i>{" "}Open for Editing</CButton>
                    </CCol>
                    <CCol xs="4">
                      <CButton 
                        block
                        color="danger"
                        onClick={()=>clearRecord(keepca)}
                        >Clear All Record</CButton>
                    </CCol>
                    </CRow>
                </CCol>:""}
            
        </CRow>
        </div>
            </div>
    </CTabPane>
   </>
  )
}
const mapStateToProps = (state) =>({
  studentscore : state.studentscoreReducer.studentscoreca,
  staffsubjects : state.staffsubjectReducer.staffsubjects
})
export default connect(mapStateToProps, {
  insertStudentca,
  deleteStudentca, 
  getStudentscorecas,
  updateStaffsubject
})(StudentReportList)
  
