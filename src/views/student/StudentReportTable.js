import React from 'react'
import {
    CRow,
    CCol,
    CTabPane
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const StudentReportList = (props) => {
  
    let studentid = props.studentid;
    let rows = props.studentname;
    let claszname = props.claszname;
    let claszparentname = props.claszparentname;
    let classteacher = props.classteacher;
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

    let total_subjects = 0;
    let total_scores = [];
    
    let std_position = student_classparent_position_store !== undefined && 
                      Array.isArray(student_classparent_position_store) && 
                      student_classparent_position_store.length > 0 ? student_classparent_position_store[0] : {'rank':'-'}
    let std_positions = student_class_position_store !== undefined && 
                      Array.isArray(student_class_position_store) && 
                      student_class_position_store.length > 0 ? student_class_position_store[0] : {'rank':'-'}
    
                      const compute = (sumz, totz, id)=>{
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
    const get_student_total = (sumz)=>{
      let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      return Number(sums).toFixed(1)
    }
    const get_student_average = (sumz, tots)=>{
      let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      let res = sums > 0 && tots > 0 ? (sums/tots) : 0;
      return Number(res).toFixed(1)
    }
    
    /**
     * sort position by student
     * sort maxscore
     */
    let rank_array_classparent ={}
    let total_array_classparent = {}
    let avg_array_classparent = {}

    Object.keys(student_classparent_subject_position_store).forEach(el => {
      let ra = student_classparent_subject_position_store[el].filter(rw=>parseInt(rw.studentid) === parseInt(studentid))[0]
      if(ra !== undefined)
      {
        rank_array_classparent[el] = ra.rank;
        total_array_classparent[el] = ra.score;
        avg_array_classparent[el] = ra.average;
      }
    });
    
    let rank_array_class ={}
    let total_array_class = {}
    let avg_array_class = {}
    Object.keys(student_class_subject_position_store).forEach(el => {
      let ra = student_class_subject_position_store[el].filter(rw=>parseInt(rw.studentid) === parseInt(studentid))[0]
      if(ra !== undefined)
      {
        rank_array_class[el] = ra.rank;
        total_array_class[el] = ra.score;
        avg_array_class[el] = ra.average;
      }
  });
    let data = props.data && Array.isArray(Object.keys(props.data)) ? props.data : []
  
    let acct = Object.keys(data).map((row, ind)=>{
      if(arr && Array.isArray(Object.keys(arr)) && Object.keys(arr).includes(row)  && arr[row] !== undefined )
      {
      let subs= [];
      let adds = [];
      total_subjects = total_subjects + 1;
      return <tr key={ind}>
      <td className="text-center">
       {ind + 1}
      </td>
      <td>
      <div><strong style={{textTransform:'capitalize'}}>{data[row]}</strong></div>
      </td>
      {
          
          Object.keys(ca_array).map((prop, ind)=>{
            let sumrow = [];
            let totrow = [];
            return <>{Object.keys(caunit_array[prop]).map((pro, inds)=>{
            if(arr && Array.isArray(Object.keys(arr)) && Object.keys(arr).includes(row) && Object.keys(arr[row]).includes(caunit_array[prop][pro].id) )
            {
              let sh = arr[row][caunit_array[prop][pro].id];
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
             <th className='text-center' >{compute(sumrow, totrow, prop)}</th>
             </>
         })
         
      }
      
      <th className='text-center' >{compute100(subs, adds)}{total_scores.push(compute100(subs, adds))}</th>
      <th className='text-center' >{class_subject_average.hasOwnProperty(row) && props.class_subject_average[row].hasOwnProperty('average') ? Number(props.class_subject_average[row].average).toFixed(1):'0'}</th>
      <th className='text-center' >{classparent_subject_average.hasOwnProperty(row) && props.classparent_subject_average[row].hasOwnProperty('average') ? Number(props.classparent_subject_average[row].average).toFixed(1) :'0'}</th>
      <th className='text-center' >{rank_array_class[row]} of {class_subject_average.hasOwnProperty(row) && class_subject_average[row].hasOwnProperty('pop') ? class_subject_average[row].pop:'-'}</th>
      <th className='text-center' >{rank_array_classparent[row]} of {classparent_subject_average.hasOwnProperty(row) && classparent_subject_average[row].hasOwnProperty('pop') ? classparent_subject_average[row].pop :""} </th>
    
    </tr>}
  })
    

  return (
   <>
   <CTabPane>
   <CRow className='mb-5'>
   <CCol xs={9}>
       <h3 style={{textTransform:'capitalize'}}>{`${rows.surname} ${rows.firstname} ${rows.middlename}`}</h3>
       <h5>{rows.abbrv}{rows.admission_no}</h5>
       <h6>{`${std_position.rank} of ${claszname} `}</h6>
       <h6>{`${std_positions.rank} of  ${claszparentname} `}</h6>
    </CCol>
    <CCol xs={3}>
    <div className="c-avata">
        <img 
          src={process.env.REACT_APP_SERVER_URL+ rows.photo} 
          className="c-" 
          style={{width:'120px'}}
          alt={rows.admission_no} 
          onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
        />
        <span className={`c-avatar-status ${rows.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </CCol>

            <CCol  xs="12"className="printpages" >
                <table width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                    <thead className="text-center">
                    <tr>
                            <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>{theadm}
                            <th rowSpan={2}>TOTAL<br/> (100%)</th>
                            <th rowSpan={2}>AVG<br/> ARM</th>
                            <th rowSpan={2}>AVG<br/> CLASS</th>
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
            <CCol xs="12">
            <table width="100%" >
              <tr>
                <th className="text-right" width="15%"><strong>{`TOTAL SCORE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{get_student_total(total_scores)}</td>
                <th className="text-right" width="15%"><strong>{`${claszname} AVERAGE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{Number(std_position.average).toFixed(1)}</td>
                <th className="text-right" width="15%"><strong>{`TOTAL FEES`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
              <tr>
                <th className="text-right"><strong>{`SUBJECTS RECORDED`}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{total_subjects}</td>
                <th className="text-right" width="15%"><strong>{`${claszparentname} AVERAGE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{Number(std_positions.average).toFixed(1)}</td>
                <th className="text-right"><strong>{`TOTAL PAIDS`}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
              <tr>
                <th className="text-right"><strong>{`STUDENT AVERAGE `}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{get_student_average(total_scores, total_subjects)}</td>
                <th className="text-right" width="15%"><strong>{`CLASS AVERAGE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>12</td>
                <th className="text-right"><strong>{'BALANCE'}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
            </table>
            </CCol>
        </CRow></CTabPane>
   </>
  )
}

export default StudentReportList
  
