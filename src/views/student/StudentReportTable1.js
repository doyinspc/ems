import React, { useState, useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import { connect} from "react-redux";
import {
    CRow,
    CCol,   
    CButton,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea,
    CSelect
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {registerComment, updateComment, getComment, getComments, deleteComment} from './../../actions/setting/comment'
import {getStudentfees} from './../../actions/student/studentfee'
import ReactStars from "react-rating-stars-component";
import { ordinal_suffix_of } from '../../actions/common';
import PageHeader  from './../staff/PageHeader2';

const StudentReportList = (props) => {

    let studentid = props.studentid;
    let sessionid = props.sessionid;
    let studentids = props.studentids;
    let report = props.report;
    let rows = props.studentname;
    let theadm = props.theadm;
    let ca_array = props.ca_array;
    let cascored_array = props.cascored_array;
    let ca_score = props.ca_score;
    let class_average = props.class_average;
    let class_population = props.class_population;
    let claszname = props.claszname;
    let claszparentname = props.claszparentname;
    let classparent_subject_average = props.classparent_subject_average
    let class_subject_average = props.class_subject_average
    let student_classparent_subject_position_store = props.student_classparent_subject_position_store
    let student_class_subject_position_store = props.student_class_subject_position_store
    let student_classparent_position_store = props.student_classparent_position_store
    let student_class_position_store = props.student_class_position_store
    let student_ca_score_store = props.student_ca_score_store

    let allcas = props.allcas;
    let allcid = props.allcid;
    let allcaunits = props.allcaunits;
    let allcaid = props.allcaid;
    let beh_array = props.beh_array;

    
    let total_subjects = 0;
    let total_scores = [];
    
    let std_position = student_classparent_position_store.filter(rw=>parseInt(rw.studentid) === parseInt(studentid))
    let std_positions = student_class_position_store.filter(rw=>parseInt(rw.studentid) === parseInt(studentid)) 
    let comments ='';
    if(std_positions[0] !== undefined && std_positions[0].rank > 0 && student_classparent_position_store !== undefined && student_classparent_position_store.length > 0)
    {
        let diff = student_classparent_position_store.length - std_positions[0].rank;
        let tot = (std_positions[0].rank/student_classparent_position_store.length) * 100;
        if(Math.floor(tot) <= 5)
        {
            comments = "Congratulations! you are one of the top "+5+"% in "+claszparentname;
        }else if(Math.floor(tot) <= 10)
        {
            comments = "and one of the top "+10+"% in "+claszparentname+" "+student_classparent_position_store.length;
        }
        else if(Math.floor(tot) <= 20)
        {
            comments = "and one of the top "+20+"% in "+claszparentname+" "+student_classparent_position_store.length;;
        }
        else if(Math.floor(tot) <= 50)
        {
            comments = "and one of the top "+50+"% in "+claszparentname+" "+student_classparent_position_store.length;;
        }else{
            comments=""
        }

    }

    
    let reportid = report.id;
    const [small, setSmall] = useState(false)
    const [id, setid] = useState(null)
    const [owner, setowner] = useState(0)
    const [comment, setcomment] = useState('')
    const [office, setoffice] = useState('')
    const [fontz, setfontz] = useState(20)

    const [fontz1, setfontz1] = useState(20)

    useEffect(() => {
        //get comments
        let params = {
            data:JSON.stringify(
            {
                reportid:reportid,
                studentid:studentid
            }),
            cat:'selected',
            table:'comments',
            narration:'get comments'
           }
           props.getComments(params)
        
    }, [studentid, reportid])

    useEffect(() => {
        //get comments
        let params = {
            data:JSON.stringify(
            {
                sessionid:sessionid,
                studentid:studentid
            }),
            cat:'selected',
            table:'studentfees',
            narration:'get fees'
           }
           props.getStudentfees(params)
        
    }, [sessionid, studentid])

    const compute = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 100 : 0;
        return Number(res).toFixed(1)
    }
    const compute100 = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 100 : 0;
        return Number(res).toFixed(1)
    }
    const sum100 = (sumz)=>{
        if(sumz !== undefined)
        {
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        return Number(sums).toFixed(1)
        }
    }
    const avg = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = sumz.length;
        
        let res = sums > 0 && tots > 0 ? (sums/tots) : 0;
        return Number(res).toFixed(0)
        }
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
    const onSubmit = () =>{
         let lock =  Math.random() * 1000000000;
         let locked = report.id+"_"+lock;
        if(parseInt(owner) === 0)
        {
            let fd = new FormData();

            fd.append('studentid', studentid);
            
            fd.append('comment', comment);
            fd.append('office', office);
            fd.append('table', "comments");
            

            if(id && parseInt(id) > 0)
            {
                //UPDATE 
                fd.append('id', id);
                fd.append('cat', 'update');
                props.updateComment(fd)
                
            }else
            {
                //INSERT
                fd.append('reportid', report.id); 
                fd.append('locked', locked);
                fd.append('cat', 'insert');
                props.registerComment(fd)
            }
        }else if (parseInt(owner) === 1)
        {
            let allstud = studentids.split(",");
            allstud.forEach(element => {
                let fd = new FormData();

                fd.append('studentid', element);
                fd.append('locked', locked);
                fd.append('comment', comment);
                fd.append('owner', owner);
                fd.append('office', office);
                
                fd.append('reportid', report.id); 
                fd.append('cat', 'insert');
                props.registerComment(fd)
                
            });

        }

    }

    const grading = (scor, gra) =>{
        if(scor!== undefined)
        {
            let score = scor.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            
            
            let re = gra.filter(ele=>parseInt(score) > parseInt(ele.minscore) && parseInt(score) <= parseInt(ele.maxscore))
            console.log(score,  re);
            return re !==undefined && Array.isArray(re) && re.length > 0  ? re[0].abbrv:'-';
        }
    }

    const gradingfinal = (score) =>{
      
        let re = props.gradeunits.filter(ele=>parseFloat(Math.floor(score)) > parseFloat(ele.minscore) && parseFloat(Math.floor(score)) <= parseFloat(ele.maxscore))
        return Array.isArray(re) && re.length > 0  ? re[0].comment:'';
    }

    const changeOwner = (e) =>{
        setowner(e.target.value)
    }

    let ca_sum = {}
    let ca_total = []
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
    let numbering = 0;
    let data = props.data && Array.isArray(Object.keys(props.data)) ? props.data : []
    Object.keys(data).forEach(row=>{
        if(cascored_array && Array.isArray(Object.keys(cascored_array)) && Object.keys(cascored_array).includes(row)  && cascored_array[row] !== undefined )
          {
          let subx= [];
          let addx = [];  
              Object.keys(ca_array).map((prop, inds)=>{
                let sumxrow = [];
                let totxrow = [];
                
                if(cascored_array && Array.isArray(Object.keys(cascored_array)) && Object.keys(cascored_array).includes(row) && Object.keys(cascored_array[row]).includes(prop) )
                {
                    //SET CA SUM
                  let sh = cascored_array[row][prop];
                  
                 
                  subx.push(sh)
    
                }
             })  
          total_scores.push(sum100(subx))
         
        }
      })

    Object.keys(student_class_subject_position_store).forEach(el => {
      let ra = student_class_subject_position_store[el].filter(rw=>parseInt(rw.studentid) === parseInt(studentid))[0]
      if(ra !== undefined)
      {
        rank_array_class[el] = ra.rank;
        total_array_class[el] = ra.total;
        avg_array_class[el] = ra.score;
      }
    });
    let x = 0;
    
    let acct = Object.keys(data).map((row, ind)=>{
    if(cascored_array && Array.isArray(Object.keys(cascored_array)) && Object.keys(cascored_array).includes(row)  && cascored_array[row] !== undefined )
      {
      let subs= [];
      let adds = [];
      total_subjects = total_subjects + 1;
      return <tr key={ind+"_"+row}>
      <td className="text-center">
       {numbering = numbering + 1}
      </td>
      <td>
      <div style={{fontSize: fontz}}><strong style={{textTransform:'capitalize'}}>{data[row]}</strong></div>
      </td>
      {
          
          Object.keys(ca_array).map((prop, inds)=>{
            let sumrow = [];
            let totrow = [];
            if(ca_sum.hasOwnProperty(prop)){  }
            else{ca_sum[prop] = []}
        
            if(cascored_array && Array.isArray(Object.keys(cascored_array)) && Object.keys(cascored_array).includes(row) && Object.keys(cascored_array[row]).includes(prop) )
            {
                //SET CA SUM
              let sh = cascored_array[row][prop];
              if(sh > -1)
              { 
                 ca_sum[prop].push(sh) 
              }
              let shmax = ca_score[prop];
              sumrow.push(sh)
              totrow.push(shmax)
              subs.push(sh)
              adds.push(shmax)

              return <td className='text-center' style={{fontSize: fontz}} key={ind}>{parseFloat(sh) > 0 ? Number(sh).toFixed(1):0}</td>
            }else
            {
            return <td className='text-danger text-center'><CIcon name="cil-x"/>{subs}</td>
            }   
         })  
      }
      
      <th className='text-center' style={{fontSize: fontz}} >{sum100(subs)}</th>
      <th className='text-center' style={{fontSize: fontz}}>{grading(subs, props.gradeunits)}</th>
      <th className='text-center' style={{fontSize: fontz}}>{class_subject_average.hasOwnProperty(row) && props.class_subject_average[row].hasOwnProperty('average') ? Number(props.class_subject_average[row].average).toFixed(1):'0'}</th>
      <th className='text-center' style={{fontSize: fontz}}>{ordinal_suffix_of(rank_array_class[row])}</th>
    </tr>
    }
  })
  
    let lastrow =  Object.keys(ca_array).map((prop, inds)=>{
    return  <th key={inds +'kt'} className='text-center'>{avg(ca_sum[prop])}</th>
    })
  
    let commenter = Array.isArray(props.comments.comments) ? props.comments.comments.filter(rw=>rw !== null && rw !== undefined && parseInt(rw.reportid) === parseInt(reportid) && parseInt(rw.studentid) === parseInt(studentid)): []
    
    return (
   <>
        <div className="A4" style={{
                            overflow:'hidden',
                            position: 'relative',
                            
                        }}>
        <img
                             src={process.env.REACT_APP_SERVER_URL + props.user.activeschool.links}
                             className="text-center align-self-center"
                             style={{
                                 margin:'auto',
                                 padding:'auto',
                                 position:'absolute',
                                 left:'20%',
                                 top:'20%',
                                 bottom:'0',
                                 width:'50%',
                                 height:'auto',
                                 opacity:'0.2'
                             }}

                            />
                <div className="sheet padding-5mm"  >
                   <PageHeader photo={rows.photo} admission_no={rows.admission_no} />
                  
                   <CRow 
                        xs={12} 
                        className="watermark"
                        >
                            
                        <CCol xs={12}>
                            <table className="mb-3 mt-5" width='100%' style={{fontSize:'14px'}}>
                                <thead className="thead-light mb-7" >
                                    <tr>
                                        <th 
                                            className="text-center" 
                                            style={{textTransform:'uppercase'}}>
                                            <h2 style={{fontFamily:'Aclonica', fontSize:'30pt', lineHeight:'100%'}}>{report.title}</h2>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th 
                                            className="text-center" 
                                            style={{textTransform:'uppercase'}}>
                                            <h5 style={{lineHeight:'normal'}} >{props.user.activeschool.name}</h5>
                                        </th>
                                        </tr>
                                    <tr>
                                        <th 
                                            className="text-center" 
                                            style={{textTransform:'uppercase'}}>
                                            <h5 style={{fontFamily:"fantasy", color:'brown'}} >{parseInt(props.user.activeschool.typeid) == 1 ? 'SECONDARY SCHOOL' : 'PRIMARY SCHOOL'}</h5>
                                        </th>
                                    </tr>
                                </thead >
                        </table>
                        </CCol>
                        <CCol>
                    <CRow xs={12}>
                        <CCol xs={10} className="ml-0 pl-0">
                        <table>
                            <tbody > 
                                <CCol>                
                                    <CRow className='mb-5 mt-1'>
                                   
                                        <CCol xs={12}>
                                            <h3 style={{textTransform:'capitalize', fontFamily:'Bubblegum Sans'}}>{`${rows.surname} ${rows.firstname} ${rows.middlename}`} {" -"}<small>{` ${rows.abbrv}${rows.admission_no} `}</small></h3>
                                            <h5>Gender : {rows.gender}</h5>
                                            <h4 style={{fontFamily:'Lobster Two'}}>{`${std_positions[0] !== undefined && std_positions[0].hasOwnProperty('rank') ? ordinal_suffix_of(std_positions[0].rank) : '-'} position out of  ${class_population} pupils in ${claszname}`}</h4>
                                            {/* <h4 style={{fontFamily:'Lobster Two'}}>{`${comments}`}</h4> */}
                                        </CCol>
                                        
                                        <CCol xs={12}>
                                                <table className='table-condensed' width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                                                    <thead className="text-center">
                                                    <tr>
                                                            <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>
                                                            {theadm}
                                                            <th rowSpan={2}>TOTAL<br/> (100%)</th>
                                                            <th rowSpan={2}>GRADE<br/></th>
                                                            <th rowSpan={2}>SUBJECT<br/>AVERAGE</th>
                                                            <th rowSpan={2}>RANK</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                    {
                                                        acct
                                                    }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            {lastrow}
                                                            <th className='text-center'>{get_student_average(total_scores, total_subjects)}</th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                <CCol xs="12">
            <table width="100%" style={{fontSize:'10px'}} >
              <tr>
                <th className="text-right" width="15%"><strong>{`TOTAL SCORE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{get_student_total(total_scores)}</td>
                <th className="text-right" width="15%"><strong>{`CLASS AVERAGE`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{class_average}</td>
                <th className="text-right" width="15%"><strong>{`TOTAL FEES`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
              <tr>
                <th className="text-right"><strong>{`SUBJECTS RECORDED`}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{total_subjects}</td>
                <th className="text-right" width="15%"><strong>{`CLASS POPULATION`}</strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{class_population}</td>
                <th className="text-right"><strong>{`TOTAL PAIDS`}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
              <tr>
                <th className="text-right"><strong>{`STUDENT AVERAGE `}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}>{get_student_average(total_scores, total_subjects)}</td>
                <th className="text-right" width="15%"><strong></strong></th>
                <td width="15%" style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
                <th className="text-right"><strong>{'BALANCE'}</strong></th>
                <td style={{fontFamily:'tahoma', fontStyle:"italic", paddingLeft:'9px'}}></td>
              </tr>
            </table>
            </CCol>
                                            </CCol>
                                    </CRow> 
                                </CCol>
                            </tbody>
                        </table>
                        </CCol>
                        <CCol xs={2} className="m-0 pr-0" >
                            
                            <CRow className="m-0 p-0">
                                <CCol className="m-0" style={{fontSize:'24px'}}><h5 style={{fontFamily:'Lobster', fontSize:'20px'}}>BEHAVIOR & PSYCHOMOTOR</h5></CCol>
                                {
                                 Object.keys(allcaid).map((rop, idc)=>{
                                    return <>
                                    {Object.keys(allcaid[rop]).map((rop1, idc1)=>{
                                    if(beh_array.hasOwnProperty(studentid) && beh_array[studentid].hasOwnProperty(rop1)){
                                    let numz = avg(beh_array[studentid][rop1])
                                    return <>
                                            <CCol key={idc} xs={12} className="m-0 p-0">
                                                <strong>{
                                                    beh_array.hasOwnProperty(studentid) && beh_array[studentid].hasOwnProperty(rop1) ? 
                                                    <><strong>{allcaunits[rop1]}</strong><br/>
                                                    <ReactStars
                                                        count={numz}
                                                        size={20}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                        /></>
                                                    : ''
                                                }</strong>
                                            </CCol></>  } 
                                                                        
                                    })}</>
                                })
                            }
                            </CRow>
                       
                        </CCol>
                    </CRow>  
                        </CCol>    
                    </CRow>
                    <CRow xs='12' className='mt-1'>
                        <h4>Comments</h4>
                    <CCol xs='12' style={{fontSize:fontz1}}>
                        <CCol xs='12' style={{fontFamily:'Bubblegum sans'}}>{gradingfinal(get_student_average(total_scores, total_subjects))}</CCol>
                        {
                            commenter.map((prp, ind)=>{
                                return <CRow xs="12">
                                    <CCol xs="3">
                                       <b> {prp.office}</b>
                                    </CCol>
                                    <CCol xs="9" style={{fontFamily:'Bubblegum sans'}}>
                                       <i> {prp.comment}</i>
                                    </CCol>
                                </CRow>
                            })
                        }
                    </CCol>

                    </CRow>
                    <CButton size="sm" className="d-print-none" color="info" onClick={()=>setSmall(prev=>!prev)}>
                        Add Comment
                    </CButton>
                    <CRow xs={12}>
                        <CCol>
                            <br/>
                            <br/>
                            <br/>
                            <b>__________________________</b><br/>
                            <strong>{props.user.activeschool.signed}</strong><br/>
                                    for : School Management
                        </CCol>
                        <hr/>
                    </CRow>
                    <CRow xs={12} className="navbar-fixed-bottom">
                    <div className="scaless" 
                    style={{
                        position:'relative',  height: '150px',  paddingTop:'20px', bottom:'0px', left:"5px", padding:'5px', fontSize:'11px', fontWeight:'bold'}}
                    >
                        <strong>KEY:{" "} </strong>
                        {
                            props.gradeunits.map((rw, ind)=>{
                            return <span className="pills">{rw.abbrv} {"=>"} {rw.name}{"    ,   "}</span>
                            })
                        }
                    </div>
                    </CRow>
                </div>   
        </div>
        <CModal 
              show={small} 
              onClose={() => setSmall(!small)}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>{`${rows.surname} ${rows.firstname} ${rows.middlename}`}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="office" className="pr-1">Office</CLabel>
                  <CInput 
                    id="office" 
                    placeholder="Class Teacher, Head Master etc." 
                    onChange={(e)=>setoffice(e.target.value)}
                    required 
                    />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="comment" className="pr-1">Comment</CLabel>
                  <CTextarea 
                  id="comment" 
                  placeholder="Class Teacher, Head Master etc." 
                  onChange={(e)=>setcomment(e.target.value)}
                  required />
                </CFormGroup>
                <CLabel htmlFor="owner" className="pr-1">Who should have this comment?</CLabel>
                <CSelect
                    id='owner'
                    onChange={(e)=>changeOwner(e)}
                >
                    <option></option>
                    <option value='0' selected={ owner === 0 ? 'selected':''}>Current Students</option>
                    <option value='1' selected={ owner === 1 ? 'selected':''}>To all students</option>
                </CSelect>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={onSubmit}>Save</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
   </>
  )
}
const mapStateToProps = (state) =>({
    students : state.studentReducer,
    comments : state.commentReducer,
    studentfees : state.studentfeeReducer,
    user:state.userReducer,
    gradeunits:state.gradeunitReducer.gradeunits
  })
  export default connect(mapStateToProps, {
    getStudentfees,
    getComment,
    getComments,
    registerComment,
    updateComment,
    deleteComment
  })(StudentReportList)
  
