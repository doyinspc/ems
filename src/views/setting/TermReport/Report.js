import CIcon from '@coreui/icons-react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CCollapse, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdownDivider, CForm, CFormGroup, CFormText, CLabel, CListGroup, CListGroupItem, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CTextarea } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { registerStudentcomment } from '../../../actions/student/studentcomment';
import { getComments, registerComment } from './../../../actions/setting/comment'
import  Page  from './Page';


const Report = (props) => {
    const [fontz, setfontz] = useState(14)
    const [modalselectcomment, setmodalselectcomment] = useState(false)
    const [modaladdcomment, setmodaladdcomment] = useState(false)
    const [modalmakecomment, setmodalmakecomment] = useState(false)
    const [accordion, setAccordion] = useState(1)
    const [activeselection, setactiveselection] = useState(0)
    const [name, setname] = useState('')
    const [name1, setname1] = useState('he')
    const [name2, setname2] = useState('his')
    const [studentid, setstudentid] = useState(null)
    const [storecomments, setstorecomments] = useState({})
    const [office, setoffice] = useState('')
    const [comment, setcomment] = useState('')
    const [typeid, settypeid] = useState(2)
    const [showstudent, setshowstudent] = useState(0)
    const [ids, setids] = useState([])
    const [displayreport, setdisplayreport] = useState(0)
    
    useEffect(() => {
        setfontz(props.fontz)
    }, [props.fontz])

    useEffect(() => {
        
    }, [showstudent])

    useEffect(() => {
        let d = Object.keys(props.dt_student)
        setids(d)
    }, [props.dt_student])

    useEffect(() => {
   
      let params = {
          data:JSON.stringify(
          {
              'is_active':0
          }),
          cat:'selected',
          table:'comments',
          narration:'get comments'
          }
          props.getComments(params)
        
      }, [])
    
    let reportname = props.reportname;
    let reportid = props.reportid;
    let dt_arr = props.dt;
    let ct_arr = props.ct;
    let subjects = props.dt_subject;
    let dt_class = {};
    let cas = props.dt_ca;
    let bas = props.ct_ca;
    let dt_student = props.dt_student;
    let dt_body = '';
    let subject_stud_totals = props.subject_stud_totals
    let rankstudentsubject = props.rankstudentsubject
    let rankstudents = props.rankstudents
    let class_analysis = props.class_analysis
    let all_grades = props.gt
    let students_fee = props.students_fee
    let students_paid = props.students_paid
    
    //COMMON HEADER
    let theadm = Object.keys(cas).map((prp, ind)=>{
        let d = cas !== undefined && cas.hasOwnProperty(prp) && cas[prp] !== null ? cas[prp].split(":::") : ';';
        return<th key={ind} className="text-center" width="60px">{d[1]}</th>
    });
    const avgs = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
            return Number(avg).toFixed(2);
        }
    }
    const summ = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            let avg = su/le;
            return parseFloat(avg);
        }
    }

    const selectComment = (studentid, student) =>{
        setmodalselectcomment(true);
        setstudentid(studentid)
        let nm = student[0]
        let nm1 = nm.split(" ")
        let nm2 = nm1[1]
       

        let gen = student[2].toLowerCase()
        let gen1 = gen == 'male' ? 'his' : 'her'
        let gen2 = gen == 'male' ? 'he' : 'she'
        let gen3 = gen == 'male' ? 'him' : 'her'

        //useEffect(() => {
            setname(nm)
            setname1(gen1)
            setname2(gen2)
        //}, [nm])

        

    }
    const makeComment = (e, student) =>{
        setmodalmakecomment(true);
    }
    const addComment = (e) =>{
        setmodaladdcomment(true);
    }

    let sub_ana = {}
    Object.keys(subject_stud_totals).forEach(ele => {
        let vals = Object.values(subject_stud_totals[ele])
        let arr = {}
        arr['sum'] = summ(vals)
        arr['max'] = Math.max(...vals)
        arr['min'] = Math.min(...vals)
        arr['avg'] = avgs(vals)
        arr['pop'] = vals.length
        sub_ana[ele] = arr;
    });
    
    let final_rank = {}
    rankstudents.forEach(ele => {
        final_rank[ele.studentid] = ele.rank
    });

    let ranksubjectstudent = {}
    if(Array.isArray(Object.keys(rankstudentsubject))){
        Object.keys(rankstudentsubject).forEach(ele=>{
        let ar = rankstudentsubject[ele]
        
        ar.forEach(r=>{
            if(ranksubjectstudent.hasOwnProperty(r.studentid)){
                ranksubjectstudent[r.studentid][r.subjectid] = r.rank
            }else{
                ranksubjectstudent[r.studentid] = {}
                ranksubjectstudent[r.studentid][r.subjectid] = r.rank
            }
        })  
    })}

    if(displayreport === 0)
    {
        let students_keys = Object.keys(dt_student)
        let prp1 = students_keys[showstudent]
        if(dt_student.hasOwnProperty(prp1)){
            dt_body=   <Page 
                    key={prp1}
                    fontz={fontz}
                    data={dt_arr[prp1]}
                    behavior={ct_arr[prp1]}
                    studentid={prp1}
                    reportid={reportid}
                    rank={ranksubjectstudent[prp1]}
                    student ={dt_student[prp1]}
                    subjects ={subjects}
                    rankstudents={final_rank[prp1]}
                    class_analysis={class_analysis}
                    cas={cas}
                    bas={bas}
                    theadm={theadm}
                    subject_analysis={sub_ana}
                    all_grades={all_grades}
                    reportname={reportname}
                    student_fee={students_fee.hasOwnProperty(prp1)?students_fee[prp1] : 0}
                    student_paid={students_paid.hasOwnProperty(prp1)?students_paid[prp1] : 0}
                    selectComment={(e, student)=>selectComment(e, student)}
                    addComment={(e)=>addComment(e)}
                    makeComment={(e, student)=>makeComment(e, student)}
                />
        }

    }
    else{
        if(props.search.length > 3)
        {
            dt_body = Array.isArray(Object.keys(dt_student)) && Object.keys(dt_student).length > 0 ? 
            Object.keys(dt_student)
            .filter(rw=>dt_student[rw][0].includes(props.search) || dt_student[rw][1].includes(props.search) )
            .map(prp1=>{
                return  <Page 
                            key={prp1}
                            fontz={fontz}
                            data={dt_arr[prp1]}
                            behavior={ct_arr[prp1]}
                            studentid={prp1}
                            reportid={reportid}
                            rank={ranksubjectstudent[prp1]}
                            student ={dt_student[prp1]}
                            subjects ={subjects}
                            rankstudents={final_rank[prp1]}
                            class_analysis={class_analysis}
                            cas={cas}
                            bas={bas}
                            theadm={theadm}
                            subject_analysis={sub_ana}
                            all_grades={all_grades}
                            reportname={reportname}
                            student_fee={students_fee.hasOwnProperty(prp1)?students_fee[prp1] : 0}
                            student_paid={students_paid.hasOwnProperty(prp1)?students_paid[prp1] : 0}
                            selectComment={(e, student)=>selectComment(e, student)}
                            addComment={(e)=>addComment(e)}
                            makeComment={(e, student)=>makeComment(e, student)}
                        />
            }):"";

        }else{
        dt_body = Array.isArray(Object.keys(dt_student)) && Object.keys(dt_student).length > 0 ? 
        Object.keys(dt_student).map(prp1=>{
            return  <Page 
                        key={prp1}
                        fontz={fontz}
                        data={dt_arr[prp1]}
                        behavior={ct_arr[prp1]}
                        studentid={prp1}
                        reportid={reportid}
                        rank={ranksubjectstudent[prp1]}
                        student ={dt_student[prp1]}
                        subjects ={subjects}
                        rankstudents={final_rank[prp1]}
                        class_analysis={class_analysis}
                        cas={cas}
                        bas={bas}
                        theadm={theadm}
                        subject_analysis={sub_ana}
                        all_grades={all_grades}
                        student_fee={students_fee.hasOwnProperty(prp1)?students_fee[prp1] : 0}
                        student_paid={students_paid.hasOwnProperty(prp1)?students_paid[prp1] : 0}
                        reportname={reportname}
                        selectComment={(e, student)=>selectComment(e, student)}
                        addComment={(e)=>addComment(e)}
                        makeComment={(e, student)=>makeComment(e, student)}
                    />
        }):"";
        }
    }
    
    let comments = Array.isArray(props.comments.comments) ? props.comments.comments:[];
    const changeComment = (id) =>{
        let comm = {...storecomments}
        if(id in Object.keys(comm))
        {
            delete comm[id]
            setstorecomments(comm)
        }else{
            comm[id]=id
            setstorecomments(comm)
        }
    }

    const submitIndividualComment = () =>{
        let comms = Object.keys(storecomments).map(rw=>rw.toString()).join(", ")
        let fd = new FormData()
        fd.append('studentid', studentid)
        fd.append('staffid', props.user.user.id)
        fd.append('reportid', reportid)
        fd.append('office', office)
        fd.append('commentid', comms)
        fd.append('comment', comms)
        fd.append('typeid', 1)
        fd.append('table', 'studentcomments')
        fd.append('cat', 'insertcomment')
        props.registerStudentcomment(fd)
    }

    const submitGeneralComment = () =>{
        let comms = Object.keys(storecomments).join(",")
        let fd = new FormData()
        fd.append('studentid', studentid)
        fd.append('staffid', props.user.user.id)
        fd.append('reportid', reportid)
        fd.append('office', office)
        fd.append('comment', comment)
        fd.append('commentid', comms)
        fd.append('typeid', typeid)
        fd.append('table', 'studentcomments')
        fd.append('cat', 'insertcomment')
        props.registerStudentcomment(fd)
    }

    const moveForward = () =>{
        if(Object.keys(dt_student).length - 1 > showstudent){
        setshowstudent(prev=>prev + 1)
        }
    }
    const moveBackward = () =>{
        if(showstudent > 0){setshowstudent(prev=>prev - 1)}
    }
   
    return (
    <>
    <CRow xs={12} className="d-print-none h-100">
        <CCol xs="6" sm="12">
        <CButtonGroup>
            <CButton 
                color="dark" 
                disabled={displayreport !== 0 ? true: false}
                style={{textTransform:'capitalize', width:'250px'}}
                onClick={moveBackward}>
                <CIcon name="cil-chevron-left" />{" "}
                 {
                     Array.isArray(Object.keys(dt_student))  &&  
                     showstudent -1  > -1
                     ? dt_student[Object.keys(dt_student)[showstudent - 1]][0]
                     : '--'
                    } 
            </CButton>
            <CButton 
                color="dark" 
                onClick={()=>window.print()}>
                <CIcon name="cil-print" />{" "}
                Print 
            </CButton>
            <CButton 
                color="dark" 
                onClick={()=>setdisplayreport(0)}>
                <CIcon name="cil-pen" />
                Show Single  
            </CButton>
            <CButton 
                color="dark" 
                onClick={()=>setdisplayreport(1)}>
                <CIcon name="cil-pen" />
                Show All  
            </CButton>
            <CDropdown className="" >
              <CDropdownToggle color="dark" className="p-2" disabled={displayreport !== 0 ? true: false}>
                Select Student
              </CDropdownToggle>
              <CDropdownMenu>
                  {
                      Object.keys(dt_student).map((p, i)=>{
                      return <CDropdownItem 
                                    key={i}
                                    className="m-0 p-1"
                                    style={{textTransform:'capitalize'}}
                                    onClick={()=>setshowstudent(i)}
                                    >
                                    {dt_student[p][0]}
                            </CDropdownItem>
                      })
                  }
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CButton 
                color="dark" 
                style={{textTransform:'capitalize', width:'250px'}}
                disabled={displayreport !== 0 ? true: false}
                onClick={moveForward}>
                     {
                     Array.isArray(Object.keys(dt_student))  &&  
                     Object.keys(dt_student).length - 1 > showstudent
                     ? dt_student[Object.keys(dt_student)[showstudent + 1]][0]
                     : '--'
                    } {" "}
                <CIcon name="cil-chevron-right" />
                
            </CButton>
        </CButtonGroup>
    </CCol>
    </CRow>
        {/* start modal to select comment */}
        <CModal 
            show={modalselectcomment} 
            onClose={setmodalselectcomment}
        >
            <CModalHeader closeButton >
            <CModalTitle>Select Comment</CModalTitle>
            </CModalHeader> 
                <CModalBody className="m-0 p-0" >
                    <CContainer className="m-0 p-0">
                        <CRow className="m-0 p-0">
                            <CCol xs="12" className="m-0 p-0">
                                <CCard className="m-0 p-0">
                                    <CCardHeader>
                                    <CFormGroup >
                                        <CCol xs="12" md="12">
                                            <CSelect 
                                                custom 
                                                name="select" 
                                                id="select"
                                                onChange={(e)=>setactiveselection(e.target.value)}
                                                >
                                                <option >Please Select a category</option>
                                                {
                                                    comments.filter(rw=>!parseInt(rw.parent_id) > 0).map((prop, ind)=>{
                                                        return <option key={ind+"_A"} value={prop.id}>{prop.comment}</option>
                                                    })
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CFormGroup>
                                    </CCardHeader>
                                    <CCardBody className="m-0 p-0" style={{height:'300px', overflow:'scroll', scrollBehavior:'auto'}}>
                                        <CCol xs={12}>
                                        <CListGroup>
                                            {
                                                comments.filter(rw=>parseInt(rw.parent_id) == activeselection).map((prop, ind)=>{
                                                    let text = prop.comment
                                                    text = text.replace('{{NAME}}', name)
                                                    text = text.replace('{{GENDER}}', name1)
                                                    text = text.replace('{{GENDER2}}', name2)
                                                    let bg = prop.id in storecomments ? 'success': 'secondary';
                                                    return <CListGroupItem 
                                                            key={prop.id}
                                                            color={bg}
                                                            onClick={()=>changeComment(prop.id)}
                                                            >{text}</CListGroupItem>
                                                    })
                                            }
                                        </CListGroup>
                                        </CCol>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
            <CModalFooter>
            <CButton 
                color="primary"
                onClick={() =>submitIndividualComment()}
            >Save</CButton>{' '}
            <CButton 
                color="secondary" 
                onClick={() =>setmodalselectcomment(false)}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
        {/* end modal to select comment */}
        {/* start modal to add comment */}
         <CModal 
            show={modaladdcomment} 
            onClose={setmodaladdcomment}
        >
            <CModalHeader closeButton>
            <CModalTitle>Add Comment</CModalTitle>
            </CModalHeader> 
                <CModalBody>
                <CForm action="" method="post" inline>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">Name</CLabel>
                  <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                    />
                </CFormGroup>
              </CForm>
                </CModalBody>
            <CModalFooter>
            <CButton color="primary">Do Something</CButton>{' '}
            <CButton 
                color="secondary" 
                onClick={() => setmodaladdcomment(false)}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
        {/* end modal to add comment */}
        {/* start modal to make comment */}
         <CModal 
            show={modalmakecomment} 
            onClose={setmodalmakecomment}
        >
            <CModalHeader closeButton>
            <CModalTitle>Make Comment</CModalTitle>
            </CModalHeader> 
                <CModalBody>
                <CContainer className="m-0 p-0">
                  <CRow className="m-0 p-0">
                    <CCol xs="12" className="m-0 p-0">
                      <CForm action="" method="post" >
                        <CFormGroup row>
                        <CCol md="2">
                            <CLabel htmlFor="" className="pr-1">Comment</CLabel>
                        </CCol>
                        <CCol xs="12" md="10">
                        <CTextarea 
                            name="textarea-input"  
                            placeholder="Content..." 
                            columns="12"
                        ></CTextarea>
                        <CFormText>Please check for grammar and spelling errors before saving</CFormText>
                        </CCol>
                         </CFormGroup>
                    </CForm>
              </CCol>
              </CRow>
              </CContainer>
                </CModalBody>
            <CModalFooter>
            <CButton 
                color="primary"
                onClick={() =>submitGeneralComment() }
                >Save </CButton>{' '}
            <CButton 
                color="secondary" 
                onClick={() => setmodalmakecomment(false)}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
        {/* end modal to make comment */}
        <CRow>                                  
            {dt_body} 
        </CRow>
    </> 
    )
}

const mapStateToProps = (state) => ({
    user:state.userReducer,
    comments:state.commentReducer
})

const mapDispatchToProps = {
    getComments,
    registerComment,
    registerStudentcomment
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
