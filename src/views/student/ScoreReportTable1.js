import React from 'react'
import { connect } from "react-redux";
import {
    CRow,
    CCol
  } from '@coreui/react'
import { insertStudentca , deleteStudentca , getStudentscorecas} from './../../actions/student/studentscore'
import { updateStaffsubject} from './../../actions/staff/staffsubject';
import { ordinal_suffix_of } from '../../actions/common';

const StudentReportList = (props) => {
    
    let allsubjects = props.subjectname;
    let theadm = props.theadm;
    let scores = props.student_ca_score_array

   

    const computeavg = (sums, tots)=>{
        let res = sums > 0 && tots > 0 ? (sums/tots)  : 0;
        return Number(res).toFixed(1)
    }
    const compute = (sumz)=>{
     
      let sums = sumz !== undefined ? sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0):'';
      return Number(sums).toFixed(1)
      
  }
    const compute100 = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 100 : 0;
        return Number(res).toFixed(1)
    }

    /**
     * sort position by student
     * sort maxscore
     */
    
    let cols = {}
    let sumfinal = []
    let avgfinal = []
    let rkfinal = []
    let avg_array = {}

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
    let pullrank = [];
    data.forEach(row=>{
        let sumrow = [];
        let numrow = [];
           Object.keys(allsubjects).forEach(prop=>{
              if(scores !== undefined && scores.hasOwnProperty(row.id) && scores[row.id].hasOwnProperty(prop))
              {
                  sumrow.push(compute(scores[row.id][prop]));
                  numrow.push(prop);
              }    
           })
           let pr = {};
           pr['studentid'] = row.id;
           pr['score']= computeavg(compute(sumrow), numrow.length);
           pullrank.push(pr)
    })
    
    //RANK STUDENTS
    pullrank.sort(function(a,b){ return b.score - a.score; });
    pullrank.forEach(function(player, i, arr)
    {
    player.rank = i === 0 || player.score != arr[i-1].score
            ? i + 1
            : arr[i-1].rank;
    });

    let stdrank = {}
    pullrank.forEach(el => {
        stdrank[el.studentid] = el.rank;
    });
  

    let acct = data.map((row, ind)=>{
      let sumrow = [];
      let numrow = [];
      
      return <tr key={ind}>
      <td className="text-center">
       {ind + 1}
      </td>
      <td className="text-center">
       {row.admission_no}
      </td>
      <td>
      <div><strong>{`${row.surname} ${row.firstname} ${row.middlename}`}</strong></div>
      </td>
      {
          
          Object.keys(allsubjects).map((prop, ind)=>{
            
            if(cols.hasOwnProperty(prop)){}else{cols[prop] = []}
            if(scores !== undefined && scores.hasOwnProperty(row.id) && scores[row.id].hasOwnProperty(prop))
            {
                sumrow.push(compute(scores[row.id][prop]));
                numrow.push(prop);
                cols[prop].push(compute(scores[row.id][prop]))
            }
            return <><td className='text-center' key={ind}>
               {
                scores !== undefined && scores.hasOwnProperty(row.id) && scores[row.id].hasOwnProperty(prop)  ? compute(scores[row.id][prop]) : '-'
               }
             </td>     
             </>
         })
      }
      <th className='text-center' >{numrow.length}</th>
      <th className='text-center' >{compute(sumrow)}</th>
      <th className='text-center' >{computeavg(compute(sumrow), numrow.length)}</th>
      <th className='text-center' >{ordinal_suffix_of(stdrank[row.id])}</th>
    </tr>
  })

   
    let numfooter = Object.keys(allsubjects).filter(rw=>allsubjects[rw] !== null && allsubjects[rw] !== undefined && allsubjects[rw].length > 0).map((sub, idx)=>{
        return <td key={idx} className='text-center'>{cols.hasOwnProperty(sub) ? cols[sub].length : '-'} </td>
    })

    let sumfooter = Object.keys(allsubjects).filter(rw=>allsubjects[rw] !== null && allsubjects[rw] !== undefined && allsubjects[rw].length > 0).map((sub, idx)=>{
        if(cols[sub] !== undefined && Array.isArray(cols[sub]) && compute(cols[sub]) > 0 ){ sumfinal.push(compute(cols[sub]))}
        return<> <td key={idx} className='text-center' style={{fontSize:'11px', fontStyle:'italic', fontWeight:'bolder'}}>{ cols[sub] !== undefined && Array.isArray(cols[sub]) && compute(cols[sub]) > 0? compute(cols[sub]) :''} </td>
        </>
    })

    let avgfooter = Object.keys(allsubjects).filter(rw=>allsubjects[rw] !== null && allsubjects[rw] !== undefined && allsubjects[rw].length > 0).map((sub, idx)=>{
        if( cols[sub] !== undefined && Array.isArray(cols[sub]) && computeavg(compute(cols[sub]), cols[sub].length) > 0 ){ avgfinal.push(computeavg(compute(cols[sub]), cols[sub].length)); 
        let rk = {}; 
        rk['subjectid'] = sub;
        rk['score'] = computeavg(compute(cols[sub]), cols[sub].length);
        rkfinal.push(rk);
        avg_array[sub] = computeavg(compute(cols[sub]), cols[sub].length);
     }
        return <td key={idx} className='text-center'>{ cols[sub] !== undefined && Array.isArray(cols[sub]) && computeavg(compute(cols[sub]), cols[sub].length) > 0  ? computeavg(compute(cols[sub]), cols[sub].length): '0'} </td>
    })

    //RANK AVERAGE
    rkfinal.sort(function(a,b){ return b.score - a.score; });
    rkfinal.forEach(function(player, i, arr) {
    player.rank = i === 0 || player.score != arr[i-1].score
            ? i + 1
            : arr[i-1].rank;
    });

    let rank = {}
    rkfinal.forEach(el => {
        rank[el.subjectid] = el.rank;
    });
        
    let rkfooter = Object.keys(allsubjects).filter(rw=>allsubjects[rw] !== null && allsubjects[rw] !== undefined && allsubjects[rw].length > 0).map((sub, idx)=>{
        return <td key={idx} className='text-center'>{rank.hasOwnProperty(sub) ? rank[sub] : '-'} </td>
    })

  return (
   <>
    
    <div className="A4" >
        <div className="sheet padding-5mm" >
        <CRow className='mb-5'>    
           <CCol>
                <table width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                    <thead className="text-center">
                        <tr>
                            <th rowSpan={2}>SN</th>
                            <th rowSpan={2}>MATRIC</th>
                            <th rowSpan={2}>FULLNAME</th>
                            {theadm}
                            <th rowSpan={2}>NUM</th>
                            <th rowSpan={2}>SUM</th>
                            <th rowSpan={2}>AVG</th>
                            <th rowSpan={2}>POS.</th>
                        </tr>
                    </thead>
                    {
                        acct
                    }
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>NUMBER</td>
                            {numfooter}
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>TOTAL</td>
                            {sumfooter}
                            <td></td>
                            <td className='text-center'>{compute(sumfinal)}</td>
                            <td className='text-center'>{computeavg(compute(sumfinal), sumfinal.length)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>AVERAGE</td>
                            {avgfooter}
                            <td></td>
                            <td className='text-center'>{compute(avgfinal)}</td>
                            <td className='text-center'><strong>{computeavg(compute(avgfinal), avgfinal.length)}</strong></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>RANK</td>
                            {rkfooter}
                            <td></td>
                            <td className='text-center'></td>
                            <td className='text-center'><strong></strong></td>
                        </tr>
                    </tfoot>
                </table>
                
            </CCol>
            
        </CRow>
        <CRow>
            <CCol>
                <h4>CLASS AVERAGE {computeavg(compute(avgfinal), avgfinal.length)}</h4>
            </CCol>
        </CRow>
        </div>
    </div>
   
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
  
