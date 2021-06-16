import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getReports} from './../../../actions/setting/report';
import {getGradeunits} from './../../../actions/setting/gradeunit';
import {getSubjects} from './../../../actions/setting/subject';
import {getClaszs} from './../../../actions/setting/clasz';
import {getClaszunits} from './../../../actions/setting/claszunit';
import {getStudentscoreSummary} from './../../../actions/student/studentscore';
import moment from 'moment';

import {
  CRow,
  CCol,
  CCard,
  CButton,
  CButtonGroup,
  CCardBody,
  CCardHeader,
 CTabs,
 CNav,
 CNavItem,
 CNavLink,
 CTabContent,
 CTabPane,
 CTooltip,
 CCardFooter
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react'


const Dashboards= (props) => {

    let termid = props.termid;
    let sessionid = props.sessionid;
    let all_clasz = props.claszs;
    let all_claszunit = props.claszunits;
    let all_subject = props.subjects;

    const [reportid, setreportid] = useState(null)
    const [rep, setrep] = useState({})
    const [class_toggle, setclass_toggle] = useState(true)
    const [sub_toggle, setsub_toggle] = useState(true)

    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'is_active':0,
                'termid':termid
            }),
            cat:'selected',
            table:'reports',
            narration:'get all reports'
        }
        props.getReports(params)
        
    }, [termid, sessionid])

    useEffect(() => {
       let grd = Array.isArray(Object.keys(rep)) ? rep.gradeid : '';

        let params = {
            data:JSON.stringify(
            {
                'reportid':reportid,
                'termid':termid,
                'sessionid':sessionid
            }),
            cat:'getreport',
            table:'studentscores',
            narration:'get all reports'
        }
        props.getStudentscoreSummary(params)
        
        let params2 = {
            data:JSON.stringify(
            {
                  'gradeid' : grd,
                  'is_active':0
            }),
              cat:'selected',
              table:'gradeunits',
              narration:'get cas'
            }
          props.getGradeunits(params2);
        
        let params3 = {
            data:JSON.stringify(
            {
                  'is_active':0
            }),
              cat:'selected',
              table:'subjectsort',
              narration:'get all subjects'
            }
          props.getSubjects(params3);
        
          let params4 = {
            data:JSON.stringify(
            {
                  'is_active':0
            }),
              cat:'selected',
              table:'claszsort',
              narration:'get all clasz'
            }
          props.getClaszs(params4);

          let params5 = {
            data:JSON.stringify(
            {
                  'is_active':0
            }),
              cat:'selected',
              table:'claszunitsort',
              narration:'get all classz units'
            }
          props.getClaszunits(params5);

    }, [reportid, sessionid, termid])
    
    const avg = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = sumz.length;
        
        let res = sums > 0 && tots > 0 ? (sums/tots) : 0;
        return Number(res).toFixed(2)
        }
    }
    const cnt = (sumz)=>{
        if(sumz !== undefined){
        ;
        let tots = sumz.length;
        return Number(tots).toFixed(0)
        }
    }
    const compute = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.length;
        
        return Number(sums).toFixed(0)
        }
    }
    const loadreport = (dt) =>{
        if(dt.length > 0)
        {
            let dt1 = JSON.parse(dt)
            setreportid(dt1.id)
            setrep(dt1)

        }
    }
    const sum_all = (obj) =>{
        let al = []
        Object.keys(obj).forEach(el=>{
           al =  [...al, ...obj[el]];
        })
        let all = al.length
        return all;
        //console.log(obj, Object.values(obj))
    }
    const avg_all = (obj) =>{
        let al = []
        Object.keys(obj).forEach(el=>{
           al =  [...al, ...obj[el]];
        })
        let sumz = al;

        if(sumz !== undefined)
        {
            let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            let tots = sumz.length;
            let res = sums > 0 && tots > 0 ? (sums/tots) : 0;
            return Number(res).toFixed(1)
        }
        
    }
    const pers = (num, obj) =>{
            let tots = num;
            let al = []
            Object.keys(obj).forEach(el=>{
            al.push(obj[el])
            })
            let sumz = al;

            if(sumz !== undefined)
            {
                let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
                let res = sums > 0 && tots > 0 ? (tots/sums) * 100 : 0;
                return Number(res).toFixed(0)+'%'
            }
    }
    const perss = (num, obj) =>{
        let tots = num;
        let al = []
        Object.keys(obj).forEach(el=>{
            al =  [...al, ...obj[el]];
        })
        
        let sumz = al;

        if(sumz !== undefined)
        {
            let sums = sumz.length;
            let res = sums > 0 && tots > 0 ? (tots/sums) * 100 : 0;
            return Number(res).toFixed(0)+'%'
        }
   }
   const  lister = (obj) =>{
       if(obj !== undefined && Array.isArray(obj)){
       let list_holder = {};
       obj.forEach(ele=>{
        list_holder[ele.id] = ele.name;
       })
       return list_holder;
    }
    return {}
   }
   
   const all_claszs = lister(all_clasz);
   const all_claszunits = lister(all_claszunit);
   const all_subjects = lister(all_subject);
   
   let studentscore0 = props.studentscore[0] !== undefined && Array.isArray(props.studentscore[0]) ? props.studentscore[0]:[];
   let studentscore1 = props.studentscore[1] !== undefined && Array.isArray(props.studentscore[1]) ? props.studentscore[1]:[];
   let studentscore2 = props.studentscore[2] !== undefined && Array.isArray(props.studentscore[2]) ? props.studentscore[2]:[];
   let studentscore3 = props.studentscore[3] !== undefined && Array.isArray(props.studentscore[3]) ? props.studentscore[3]:[];
   let studentscore4 = props.studentscore[4] !== undefined && Array.isArray(props.studentscore[4]) ? props.studentscore[4]:[];

   let total_score0 = [];
   let tabl0 = studentscore0.map((prop, ind)=>{
       total_score0.push(prop.score)
       return <tr key={prop.studentid}>
           <td>{ind + 1}</td>
           <td>{prop.studentname}</td>
           <td className="text-center">{prop.classname}</td>
           <td className="text-center">{prop.subjectid}</td>
           <td className="text-center">{Number(prop.score).toFixed(2)}</td>
       </tr>
   })

   let total_score00 = {};
   studentscore0.forEach(ele=>{
        let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
        if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
        {
                let nm = group[0]
                if(total_score00.hasOwnProperty(nm.abbrv))
                {
                    total_score00[nm.abbrv] = total_score00[nm.abbrv] + 1
                }else
                {
                    total_score00[nm.abbrv] = 0;
                    total_score00[nm.abbrv] = 1
                } 
        }
   })

   let total_score000 = {};
   studentscore0.forEach(ele=>{
   let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
    
    if(total_score000 !== undefined && total_score000.hasOwnProperty(ele.classid))
    {
        if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
        {       let nm = group[0] 
                if(total_score000[ele.classid].hasOwnProperty(nm.abbrv))
                {
                    total_score000[ele.classid][nm.abbrv] = total_score000[ele.classid][nm.abbrv] + 1
                }else
                {
                    total_score000[ele.classid][nm.abbrv] = 1
                } 
        }
    }else
    {
        if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
        {
            
            let nm = group[0] 
            total_score000[ele.classid] = {};
            total_score000[ele.classid][nm.abbrv] = 1;
        }
    }
   })

   let total_score0000 = {};
   studentscore0.forEach(ele=>{
   let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
    
    if(total_score0000 !== undefined && total_score0000.hasOwnProperty(ele.claszid))
    {
        if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
        {       let nm = group[0] 
                if(total_score0000[ele.claszid].hasOwnProperty(nm.abbrv))
                {
                    total_score0000[ele.claszid][nm.abbrv] = total_score0000[ele.claszid][nm.abbrv] + 1
                }else
                {
                    total_score0000[ele.claszid][nm.abbrv] = 1
                } 
        }
    }else
    {
        if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
        {
            
            let nm = group[0] 
            total_score0000[ele.claszid] = {};
            total_score0000[ele.claszid][nm.abbrv] = 1;
        }
    }
   })
  
   let total_score1 = [];
   let tabl1 = studentscore1.map((prop, ind)=>{
       total_score1.push(prop.score)
       return <tr key={prop.classid}>
           <td>{ind + 1}</td>
           <td className="text-center">{prop.classname}</td>
           <td className="text-center">{prop.studentid}</td>
           <td className="text-center">{Number(prop.score).toFixed(2)}</td>
           {
                props.gradeunits.map(pr=>{
                    return <th key={`4_${pr.id}`} className="text-center">
                            {total_score000[prop.classid] !== undefined && total_score000[prop.classid].hasOwnProperty(pr.abbrv) ? class_toggle ? total_score000[prop.classid][pr.abbrv] : pers(total_score000[prop.classid][pr.abbrv], total_score000[prop.classid]) :'-'}
                        </th>
                })
           }
       </tr>
   })
   let total_score10 = {};
    studentscore1.forEach(ele =>{
    total_score10[ele.classname] = Number(ele.score).toFixed(2)
   })

   let total_score2 = [];
   let tabl2 = studentscore2.map((prop, ind)=>{
       total_score2.push(prop.score)
       return <tr key={prop.classid}>
           <td>{ind + 1}</td>
           <td className="text-center">{prop.classname}</td>
           <td className="text-center">{prop.studentid}</td>
           <td className="text-center">{Number(prop.score).toFixed(2)}</td>
           {
                props.gradeunits.map(pr=>{
                    return <th key={`4_${pr.id}`} className="text-center">
                            {total_score0000[prop.classid] !== undefined && total_score0000[prop.classid].hasOwnProperty(pr.abbrv) ?  class_toggle ? total_score0000[prop.classid][pr.abbrv] : pers(total_score0000[prop.classid][pr.abbrv], total_score0000[prop.classid]) :'-'}
                        </th>
                })
           }
       </tr>
   })
   let total_score20 = {};
    studentscore2.forEach(ele =>{
        total_score20[ele.classname] = Number(ele.score).toFixed(2)
   })
   
   // SORT SUBJECT CLASS SCORE POPULATION
   let cla_sub1 = {}
   studentscore3.forEach(ele=>{
        if( cla_sub1 !== undefined && cla_sub1.hasOwnProperty(ele.classid))
        {
            if(cla_sub1[ele.classid].hasOwnProperty(ele.subjectid))
            {
                let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
                if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
                {
                        let nm = group[0]
                        if(cla_sub1[ele.classid][ele.subjectid].hasOwnProperty(nm.abbrv))
                        {
                            
                            cla_sub1[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                        }else
                        {
                            cla_sub1[ele.classid][ele.subjectid][nm.abbrv] = []
                            cla_sub1[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                        } 
                }
            }else
            {
                cla_sub1[ele.classid][ele.subjectid] = {}
                let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
                if(group !== undefined && Array.isArray(group)&& group[0] !== undefined )
                {
                        let nm = group[0]
                        cla_sub1[ele.classid][ele.subjectid][nm.abbrv] = []
                        cla_sub1[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                }
            }
        }else
        {
            cla_sub1[ele.classid] = {}
            cla_sub1[ele.classid][ele.subjectid] = {}
            let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
            
            if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
            {
                
                    let nm = group[0]
                    cla_sub1[ele.classid][ele.subjectid][nm.abbrv] = []
                    cla_sub1[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
            }
        }

   })
   let tbl1 = Object.keys(all_claszunits).map((prp, ind)=>{
    if(cla_sub1[prp] !== undefined && Array.isArray(Object.keys(cla_sub1[prp])))
    {
        let ig = 0;
    return <><h3>{all_claszunits[prp]}</h3>
       <table key={prp} width="100%" border="2px solid">
           <thead>
               <tr>
                   <th className="text-center">SN</th>
                   <th className="text-center">SUBJECT</th>
                   <th className="text-center" title='CLASS POPULATION'>POP</th>
                   <th className="text-center" title='CLASS SUBJECT AVERAGE'>AVG</th>
                   {
                       props.gradeunits.map(pr=>{
                           return <th key={`1_${pr.id}`} className="text-center">
                               {pr.abbrv}
                           </th>
                       })
                   }
               </tr>
           </thead>
           <tbody>
               {
                   all_subject.map((pp, ir)=>{
                       if(cla_sub1[prp] !== undefined  && cla_sub1[prp].hasOwnProperty(pp.id) && cla_sub1[prp][pp.id] !== undefined && Array.isArray(Object.keys(cla_sub1[prp][pp.id])))
                       {
                        ig = ig + 1;
                        return <tr>
                            <td className="text-center">{ig}</td>
                            <td style={{textTransform:'capitalize'}}>{all_subjects[pp.id].toUpperCase()}</td>
                            <td className="text-center">{sum_all(cla_sub1[prp][pp.id])}</td>
                            <td className="text-center">{avg_all(cla_sub1[prp][pp.id])}</td>
                            {
                                props.gradeunits.map(pr1=>{
                                    if(pr1 !== undefined )
                                    {
                                    return <td key={`3_${pr1.id}`} className='text-center'>
                                        {cla_sub1[prp][pp.id] !== undefined && cla_sub1[prp][pp.id].hasOwnProperty(pr1.abbrv) ? sub_toggle ? compute(cla_sub1[prp][pp.id][pr1.abbrv])  : perss(compute(cla_sub1[prp][pp.id][pr1.abbrv]) , cla_sub1[prp][pp.id]) :'-'}
                                    </td>
                                    }
                                })
                            }
                        </tr>
                       }
                   })
               }
           </tbody>
       </table></>
    }
   })
    
   let cla_sub = {};
   studentscore4.forEach(ele=>{
        if( cla_sub !== undefined && cla_sub.hasOwnProperty(ele.classid))
        {
            if(cla_sub[ele.classid].hasOwnProperty(ele.subjectid))
            {
                let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
                if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
                {
                        let nm = group[0]
                        if(cla_sub[ele.classid][ele.subjectid].hasOwnProperty(nm.abbrv))
                        {
                            
                            cla_sub[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                        }else
                        {
                            cla_sub[ele.classid][ele.subjectid][nm.abbrv] = []
                            cla_sub[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                        } 
                }
            }else
            {
                cla_sub[ele.classid][ele.subjectid] = {}
                let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
                if(group !== undefined && Array.isArray(group)&& group[0] !== undefined )
                {
                        let nm = group[0]
                        cla_sub[ele.classid][ele.subjectid][nm.abbrv] = []
                        cla_sub[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
                }
            }
        }else
        {
            cla_sub[ele.classid] = {}
            cla_sub[ele.classid][ele.subjectid] = {}
            let group = props.gradeunits.filter(el=>parseFloat(ele.score) > parseFloat(el.minscore)  && parseFloat(ele.score) <= parseFloat(el.maxscore)  )
            
            if(group !== undefined && Array.isArray(group) && group[0] !== undefined )
            {
                
                    let nm = group[0]
                    cla_sub[ele.classid][ele.subjectid][nm.abbrv] = []
                    cla_sub[ele.classid][ele.subjectid][nm.abbrv].push(ele.score)
            }
        }
   })
  
   let tbl = Object.keys(all_claszs).map((prp, ind)=>{
    if(cla_sub[prp] !== undefined && Array.isArray(Object.keys(cla_sub[prp])))
    {
        let ig = 0;
    return <><h3 key={ind}>{all_claszs[prp]}</h3>
       <table key={prp} width="100%" border="2px solid">
           <thead>
               <tr>
                   <th className="text-center">SN</th>
                   <th className="text-center">SUBJECT</th>
                   <th className="text-center" title='CLASS POPULATION'>POP</th>
                   <th className="text-center" title='CLASS SUBJECT AVERAGE'>AVG</th>
                   {
                       props.gradeunits.map(pr=>{
                           return <th key={`1_${pr.id}`} className="text-center">
                               {pr.abbrv}
                           </th>
                       })
                   }
               </tr>
           </thead>
           <tbody>
               {
                   
                   all_subject.map((pp, ir)=>{
                       if(cla_sub[prp] !== undefined && cla_sub[prp][pp.id] !== undefined && Array.isArray(Object.keys(cla_sub[prp][pp.id])))
                       {
                        ig = ig + 1;
                        return <tr>
                            <td className="text-center">{ig}</td>
                            <td style={{textTransform:'capitalize'}}>{all_subjects[pp.id].length > 0 ? all_subjects[pp.id].toUpperCase():'--'}</td>
                            <td className="text-center">{sum_all(cla_sub[prp][pp.id])}</td>
                            <td className="text-center">{avg_all(cla_sub[prp][pp.id])}</td>
                            {
                                props.gradeunits.map(pr1=>{
                                    if(pr1 !== undefined){
                                    return <td key={`3_${pr1.id}`} className='text-center'>
                                        {cla_sub[prp][pp.id] !== undefined && cla_sub[prp][pp.id].hasOwnProperty(pr1.abbrv)? sub_toggle ? compute(cla_sub[prp][pp.id][pr1.abbrv])  : perss(compute(cla_sub[prp][pp.id][pr1.abbrv]) , cla_sub[prp][pp.id])  :'-'}
                                    </td>
                                    }
                                })
                            }
                        </tr>
                       }
                   })
               }
           </tbody>
       </table></>
    }
   })

  return (
    <>
    <CRow className="sheet padding-5mm m-0 p-0">
       <CCol>
          <CCard >
            <CCardBody>
            <CRow>
            <CCol sm="5">
  <h4 id="traffic" className="card-title mb-0">{rep !== undefined && Object.keys(rep).length > 0 ? rep.title : 'Academic Report' }</h4>
                <div className="small text-muted">{moment(new Date()).format('MMMM YYYY')}</div>
            </CCol>
            <CCol sm="7" className="d-none d-print-none d-md-block">
              
              <CButtonGroup className="float-right mr-3">
                {
                  Array.isArray(props.reports) ? props.reports.map(value => (
                    <CButton
                      color="outline-dark"
                      key={value.id}
                      value={JSON.stringify(value)}
                      className="mx-0"
                      onClick={(e)=>loadreport(e.target.value)}
                    >
                      {value.title}
                    </CButton>
                  )):''
                }
              </CButtonGroup>
            </CCol>
          </CRow>

              <CRow>
              <CCol xs="12" md="12" xl="12"></CCol>
              </CRow>
              <br />
              {rep !== undefined && Object.keys(rep).length > 0 ? 
            <CTabs className="m-0 p-0">
              <CNav variant="tabs" className="d-print-none">
                <CNavItem>
                  <CNavLink>
                    Charts
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    School Analysis
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Class Analysis
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Subject Analysis
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <CRow xs={12}>
                      <CCol xs={12}>
                          <CRow className="text-center" xs="12" sm="12" md="12">
                                {/* school percentsge */}
                                <CCol xs={6}>
                                    <CRow xs={12}>
                                        <CCol xs={12}><h5>SCHOOL AVERAGE</h5></CCol>
                                        <CCol xs={12}><h1 style={{fontFamily:'Julius Sans One'}}>{avg(total_score0)}</h1></CCol>
                                    </CRow>
                                </CCol>
                                <CCol xs={6}>
                                    <CRow xs={12}>
                                        <CCol xs={12}><h5>SCHOOL POPULATION</h5></CCol>
                                        <CCol xs={12}><h1 style={{fontFamily:'Julius Sans One'}}>{cnt(total_score0)}</h1></CCol>
                                    </CRow>
                                </CCol>
                          </CRow>
                          <CRow className='text-center ' xs="12" sm="12" md="12">
                          <h4>GRADES CHART</h4>
                                {/* school grading chart */}
                                <CCol className="text-center" xs="12" sm="12" md="12">
                                    <CCardBody style={{width:'100%'}} className="text-center mw-100 align-items-center" xs="12" sm="12" md="12">
                                    <CChartLine
                                        type="barchart"

                                        datasets={[
                                            {
                                            data: Object.values(total_score00),
                                            label: 'student',
                                            backgroundColor: 'rgba(255,99,132,0.2)',
                                            borderColor: 'rgba(255,99,132,1)',
                                            borderWidth: 4,
                                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                            hoverBorderColor: 'rgba(255,99,132,1)',
                                            }
                                        ]}
                                        labels={Object.keys(total_score00)}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        }}
                                    />
                                    </CCardBody>
                                </CCol>
                                
                          </CRow>
                          <CRow>
                          <h4>CLASS UNIT AVERAGES</h4>
                                {/* class averages chart */}
                                <CCol xs="12" sm="12" md="12">
                                    <CCardBody>
                                    <CChartBar
                                        type="barchart"
                                        datasets={[
                                            {
                                            data: Object.values(total_score10),
                                            label: 'Average',
                                            backgroundColor: 'rgba(0,128,128,0.4)',
                                            borderColor: 'rgba(0,128,128, 1)',
                                            borderWidth: 4,
                                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                            hoverBorderColor: 'rgba(255,99,132,1)',
                                            }
                                        ]}
                                        labels={Object.keys(total_score10)}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        }}
                                    />
                                    </CCardBody>
                                </CCol>
                          </CRow>
                          <CRow>
                              <h4>CLASS AVERAGES</h4>
                                {/* arm averages chart */}
                                <CCol xs="12" sm="12" md="12">
                                    <CCardBody>
                                    <CChartBar
                                        type="barchart"
                                        datasets={[
                                            {
                                            data: Object.values(total_score20),
                                            label: 'Average',
                                            backgroundColor: 'rgba(128,0,0,0.4)',
                                            borderColor: 'rgba(128,0,0,1)',
                                            borderWidth: 4,
                                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                            hoverBorderColor: 'rgba(255,99,132,1)',
                                            }
                                        ]}
                                        labels={Object.keys(total_score20)}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        }}
                                    />
                                    </CCardBody>
                                </CCol>
                          </CRow>
                      </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane>
                <CCol xs="12" sm="12" md="12">
                <CCardBody>
                    <table width="100%" border="2px solid">
                        <thead>
                            <tr>
                                <th className="text-center">SN</th>
                                <th className="text-center">STUDENT NAME</th>
                                <th className="text-center">CLASS</th>
                                <th className="text-center">SUBJECTS</th>
                                <th className="text-center">STUDENT <br/>AVERAGE</th>                                          
                            </tr>
                        </thead>
                        <tbody>
                            {tabl0}
                        </tbody>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>SCHOOL AVERAGE</th>
                                <th></th>
                                <th></th>
                                <th className="text-center">{avg(total_score0)}</th>
                            </tr>
                        </thead>
                    </table>
                
                </CCardBody>
              </CCol>             
                </CTabPane>
                <CTabPane>
                <CCol xs="12" sm="12" md="12">
                <CRow>
                    <CCol sm="9">
                        <h4 id="traffic" className="card-title mb-0">Class Analysis (Students Performance)</h4>
                        <div className="small text-muted">{class_toggle  ? ' Population' : ' Percentage' }</div>
                    </CCol>
                    <CCol sm="3" className="d-none d-md-block d-print-none">
                    <CTooltip content='Toggle between propulation and percentages' >
                    <CButton color="primary" className="float-right" onClick={()=>setclass_toggle(prev=>!prev)}>
                        <CIcon name="cil-loop"/>
                    </CButton>
                    </CTooltip>
                    </CCol>
                </CRow>

                <CCardBody>
                    <CCardHeader>
                        {
                             props.gradeunits.map(pr=>{
                                return <th key={`5_${pr.id}`} className="text-center">
                                    <span className="badge badge-secondary">{`${pr.abbrv}- > ${pr.name} (${Number(pr.minscore).toFixed(0)}-${pr.maxscore})`}</span>
                                </th>
                            })
                        }
                    </CCardHeader>
                    <table width="100%" border="2px solid">
                            <thead>
                                <tr>
                                    <th className="text-center">SN</th>
                                    <th className="text-center">CLASS NAME</th>
                                    <th className="text-center">POP.</th>
                                    <th className="text-center">AVERAGE</th>
                                    {
                                        props.gradeunits.map(pr=>{
                                            return <th key={`5_${pr.id}`} className="text-center">
                                                {pr.abbrv}
                                            </th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {tabl1}
                            </tbody>
                        
                        </table>
                </CCardBody>
              </CCol>   
              <CCol xs="12" sm="12" md="12">
              <CCardBody>
              <CCardHeader>
                        {
                             props.gradeunits.map(pr=>{
                                return <th key={`5_${pr.id}`} className="text-center">
                                    <span className="badge badge-secondary">{`${pr.abbrv}- > ${pr.name} (${Number(pr.minscore).toFixed(0)}-${pr.maxscore})`}</span>
                                </th>
                            })
                        }
                    </CCardHeader>
                    <table width="100%" border="2px solid">
                        <thead>
                            <tr>
                                <th className="text-center">SN</th>
                                <th className="text-center">CLASS NAME</th>
                                <th className="text-center">POP.</th>
                                <th className="text-center">AVERAGE</th>
                                {
                                    props.gradeunits.map(pr=>{
                                        return <th key={`5_${pr.id}`} className="text-center">
                                            {pr.abbrv}
                                        </th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {tabl2}
                        </tbody>
                        
                    </table>
                
                </CCardBody>
              </CCol>                             
                </CTabPane>
                <CTabPane>
                <CCol xs="12" sm="12" md="12">
                <CRow>
                    <CCol sm="9">
                        <h4 id="traffic" className="card-title mb-0">Class Analysis (Subjects Performance)</h4>
                        <div className="small text-muted">{sub_toggle  ? ' Population' : ' Percentage' }</div>
                    </CCol>
                    <CCol sm="3" className="d-none d-md-block d-print-none">
                    <CTooltip content='Toggle between propulation and percentages' >
                    <CButton color="primary" className="float-right" onClick={()=>setsub_toggle(prev=>!prev)}>
                        <CIcon name="cil-loop"/>
                    </CButton>
                    </CTooltip>
                    </CCol>
                </CRow>
               </CCol>
              <CCol xs="12" sm="12" md="12">
                  <CCardBody>
                      {tbl}      
                  </CCardBody>
                  <CCardFooter>
                        {
                             props.gradeunits.map(pr=>{
                                return <th key={`5_${pr.id}`} className="text-center">
                                    <span className="badge badge-secondary">{`${pr.abbrv}- > ${pr.name} (${Number(pr.minscore).toFixed(0)}-${pr.maxscore})`}</span>
                                </th>
                            })
                        }
                    </CCardFooter>
               </CCol>
               <CCol xs="12" sm="12" md="12">
                  <CCardBody>
                      {tbl1}
                  </CCardBody>
                  <CCardFooter>
                        {
                             props.gradeunits.map(pr=>{
                                return <th key={`5_${pr.id}`} className="text-center">
                                    <span className="badge badge-secondary">{`${pr.abbrv}- > ${pr.name} (${Number(pr.minscore).toFixed(0)}-${pr.maxscore})`}</span>
                                </th>
                            })
                        }
                    </CCardFooter>
                </CCol>
            
                </CTabPane>
              </CTabContent>
            </CTabs>
         
      
         :'' }
             </CCardBody>
          </CCard>
        </CCol>
    
    </CRow>
    
    </>
  )
}

const mapStateToProps = (state) =>({
    reports: state.reportReducer.reports,
    user: state.userReducer,
    studentscore : state.studentscoreReducer.studentscoresummary,
    gradeunits:state.gradeunitReducer.gradeunits,
    subjects:state.subjectReducer.subjects,
    claszs:state.claszReducer.claszs,
    claszunits:state.claszunitReducer.claszunits
  })
export default connect(mapStateToProps,
    {
    getReports, 
    getStudentscoreSummary, 
    getGradeunits,
    getClaszunits,
    getClaszs,
    getSubjects
})(Dashboards)
  
  
