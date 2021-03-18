import React, { useState, useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import { connect} from "react-redux";
import {
    CRow,
    CCol,
    CContainer,
    CCardHeader,
    CNav,
    CNavLink,
    CNavItem,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CButton,
    CWidgetIcon,
    CCardFooter,
    CLink,
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
import Chart1 from './Chart1'
import {registerComment, updateComment, getComment, getComments, deleteComment} from './../../actions/setting/comment'
import {getStudentfees} from './../../actions/student/studentfee'

const StudentReportList = (props) => {
    let studentid = props.studentid;
    let sessionid = props.sessionid;
    let studentids = props.studentids;
    let report = props.report;
    let rows = props.studentname;
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


    
    let reportid = report.id;
    const [small, setSmall] = useState(false)
    const [id, setid] = useState(null)
    const [owner, setowner] = useState(0)
    const [comment, setcomment] = useState('')
    const [office, setoffice] = useState('')

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

    const changeOwner = (e) =>{
        setowner(e.target.value)
    }
    let data = props.data && Array.isArray(Object.keys(props.data)) ? props.data : []
    
    let acct = Object.keys(data).map((row, ind)=>{
      let subs= [];
      let adds = [];
      return <tr key={ind+"_"+row.id}>
      <td className="text-center">
       {ind + 1}
      </td>
      <td>
      <div><strong style={{textTransform:'capitalize'}}>{data[row]}</strong></div>
      </td>
      {
          
          Object.keys(ca_array).map((prop, inds)=>{
            let sumrow = [];
            let totrow = [];
            
  
            if(student_ca_score_store && Array.isArray(Object.keys(student_ca_score_store)) && Object.keys(student_ca_score_store).includes(row) && Object.keys(student_ca_score_store[row]).includes(prop) )
            {
              let sh = student_ca_score_store[row][prop];
              let shmax = ca_score[prop];
              
              sumrow.push(sh)
              totrow.push(shmax)
              subs.push(sh)
              adds.push(shmax)
              return <td className='text-center' key={ind}>{parseFloat(sh) > 0 ? Number(sh).toFixed(1):0}</td>
            }else
            {
              return <td className='text-danger text-center'><CIcon name="cil-x"/></td>
            }   
         })
      }
      <th className='text-center' >{compute100(subs, adds)}</th>
      <th className='text-center' >{Number(props.class_subject_average[row].average).toFixed(1)}</th>
      <th className='text-center' >{Number(props.classparent_subject_average[row].average).toFixed(1)}</th>
      <th className='text-center' >{student_class_subject_position_store !== undefined && Array.isArray(Object.keys(student_class_subject_position_store))  && Object.keys(student_class_subject_position_store).includes(row) ? student_class_subject_position_store[row].position:'--'} of {class_subject_average[row].pop}</th>
      <th className='text-center' >{student_classparent_subject_position_store !== undefined && Array.isArray(Object.keys(student_classparent_subject_position_store))  && Object.keys(student_classparent_subject_position_store).includes(row) ? student_classparent_subject_position_store[row].position:'--'} of {classparent_subject_average[row].pop} </th>
    </tr>
  })
  
    let commenter = Array.isArray(props.comments.comments) ? props.comments.comments.filter(rw=>rw !== null && rw !== undefined && parseInt(rw.reportid) === parseInt(reportid) && parseInt(rw.studentid) === parseInt(studentid)): []
    console.log(sessionid)
    return (
   <>
        <div className="A4" >
                <div className="sheet padding-5mm" >
                    <CRow style={{backgroundColor:'white', height:'30mm', paddingTop:'3mm'}} >
                        <CCol  style={{marginTop:'2px', marginBottom:'2px', width:'30mm'}}>
                        <img 
                            
                            src={process.env.PUBLIC_URL + '/avatars/logo.png'}
                            className="m-0 p-0" 
                            width='100%'
                            height='100px'
                            alt='admission' 
                            onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
                        />
                        </CCol>
                        <CCol xs='3' style={{marginTop:'1px', marginBottom:'4px'}}>
                        <div className='my-1'>
                            <small className='pull-left '>
                                <b>
                                    MESL Staff School <br/>
                                    Kainji & Jebba Hydro Power Plant<br/>
                                    07035992972 (Jebba)<br/>
                                    07035839707 (Kainji)<br/>
                                </b>
                            </small>
                        </div>
                        </CCol>
                        <CCol xs='1' style={{marginTop:'1px', marginBottom:'1px'}}></CCol>
                        <CCol xs='3' style={{textAlign:'right'}}>
                        <div className='my-2'>
                            <small className='pull-right '>
                                <b>
                                2nd Floor, ACHILLES PLACE<br/>
                                11, Maye Street<br/>
                                Off Commercial Avenue
                                    <br/>
                                    Yaba, Lagos Statet<br/>
                                    +234 906 8808 021<br/>
                                    info@stresertintegrated.com<br/>
                                </b>
                                
                            </small>
                        </div>
                        </CCol>
                        <CCol xs='2' className='pull-right' style={{ marginTop:'1px'}}>
                    <img 
                        src={process.env.PUBLIC_URL + '/avatars/logo1.png'}
                        className="m-0 p-0" 
                        width='100%'
                        height='100px'
                        alt='admission' 
                        onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
                    />
                    </CCol> 
                    </CRow>
                    <CRow xs={12} >
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
                                            <h4 style={{lineHeight:'normal'}} >mainstream energy solution primary school, </h4>
                                        </th>
                                        </tr>
                                    <tr>
                                        <th 
                                            className="text-center" 
                                            style={{textTransform:'uppercase'}}>
                                            <h4 >PRIMARY</h4>
                                        </th>
                                    </tr>
                                </thead >
                                <tbody >     
         <CRow className='mb-5 mt-5'>
            <CCol xs={9}>
            <h3>{`${rows.surname} ${rows.firstname} ${rows.middlename}`}</h3>
            <h5>{rows.schoolabbrv}{rows.admission_no}</h5>
            <h6>{`CLASS POSITION : ${student_class_position_store !== undefined ? student_class_position_store.position: ''} `}</h6>
            <h6>{`CLASS POSITION : ${student_classparent_position_store !== undefined ? student_classparent_position_store.position: ''} `}</h6>
            <h6>{`STUDENT AVERAGE : ${student_class_position_store !== undefined ? Number(student_class_position_store.average).toFixed(1): ''} `}</h6>
            <h6>{`TOTAL SCORE OBTAINED : ${student_class_position_store !== undefined ? Number(student_class_position_store.total).toFixed(1): ''} `}</h6>
            <h6>{`TOTAL SUBJECTS RECORDED : ${student_class_position_store !== undefined ? student_class_position_store.subjects: 0} subjects`}</h6>
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
                <CCol>
                    <table className='table-condensed' width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                        <thead className="text-center">
                        <tr>
                                <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>
                                {theadm}
                                <th rowSpan={2}>TOTAL<br/> (100%)</th>
                                <th rowSpan={2}>AVG<br/> ARM</th>
                                <th rowSpan={2}>AVG<br/> CLASS</th>
                                <th rowSpan={2}>RANK<br/> ARM</th>
                                <th rowSpan={2}>RANK<br/> CLASS</th>
                            </tr>
                        </thead>
                        {
                            acct
                        }
                    </table>
                </CCol>
            </CRow> 
                                </tbody>
                            </table>
                            
                        </CCol>
                    </CRow>
                    <CRow xs='12' className='mb-0' >
                        <CCol xs='6'>
                        <Chart1 />
                        </CCol>
                        <CCol xs='6'>
                        <Chart1 />
                        </CCol>
                    </CRow>
                    <CRow xs='12' className='mt-1'>
                        <h3>Comments</h3>
                    <CCol xs='12'>
                        {
                            commenter.map((prp, ind)=>{
                                return <CRow xs="12">
                                    <CCol xs="3">
                                       <b> {prp.office}</b>
                                    </CCol>
                                    <CCol xs="9">
                                       <i> {prp.comment}</i>
                                    </CCol>
                                </CRow>
                            })
                        }
                    </CCol>

                    </CRow>
                    <CButton size="sm" className="print" color="info" onClick={()=>setSmall(prev=>!prev)}>
                        Add Comment
                    </CButton>
                    <div className="scales" style={{bottom:'0px', left:"5px", padding:'5px', fontSize:'9px'}}>
                        grading
                    </div>
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
    user:state.userReducer
  })
  export default connect(mapStateToProps, {
    getStudentfees,
    getComment,
    getComments,
    registerComment,
    updateComment,
    deleteComment
  })(StudentReportList)
  
