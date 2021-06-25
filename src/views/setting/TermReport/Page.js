import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { numberformat, ordinal_suffix_of } from '../../../actions/common'
import ReactStars from "react-rating-stars-component"
import CIcon from '@coreui/icons-react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'

const Page = (props) => {

    const [bgc, setbgc] = useState(['teal', 'white'])
    const [fontz, setfontz] = useState(14)
    
    useEffect(() => {
        setfontz(props.fontz)
    }, [props.fontz])
    const sum100 = (sumz)=>{
        if(sumz !== undefined)
        {
            let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return Number(sums).toFixed(1)
        }
    }
    const avg = (sumz)=>{
        if(sumz !== undefined && Array.isArray(sumz) && sumz.length > 0)
        {
            let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return Number(sums/sumz.length).toFixed(1)}
    }
    const min = (sumz)=>{if(sumz !== undefined && Array.isArray(sumz)){return Math.min(...sumz)}}
    const max = (sumz)=>{if(sumz !== undefined && Array.isArray(sumz)){return Math.max(...sumz)}}

    const format = (f) =>{
        if(parseFloat(f)> 0)
        {
            return Number(f).toFixed(1)
        }
    }
    const grading = (scor, gra) =>{
        if(scor!== undefined && gra !== undefined)
        {
            
            let score = scor.reduce((a,b)=>parseFloat(a) + parseFloat(b), 0);
            let re = gra.filter(ele=>parseInt(score) > parseInt(ele.minscore) && parseInt(score) <= parseInt(ele.maxscore))
            return re !==undefined && Array.isArray(re) && re.length > 0  ? re[0].gradeabbrv:'NONE';
        }
    }
    const gradingf = (scor, gra) =>{
        if(scor!== undefined && gra !== undefined)
        {
            
            let score = scor;
            let re = gra.filter(ele=>parseInt(score) > parseInt(ele.minscore) && parseInt(score) <= parseInt(ele.maxscore))
            return re !==undefined && Array.isArray(re) && re.length > 0  ? re[0].gradeabbrv:'NONE';
        }
    }
    const gradingcomment = (scor, gra) =>{
        if(scor!== undefined && gra !== undefined)
        {
            
            let score = scor;
            let re = gra.filter(ele=>parseInt(score) > parseInt(ele.minscore) && parseInt(score) <= parseInt(ele.maxscore))
            return re !==undefined && Array.isArray(re) && re.length > 0  ? re[0].comment:'NONE';
        }
    }

    let sub_ana = props.subject_analysis;
    let rank = props.rank;
    let class_analysis = props.class_analysis
    let rank_student = props.rankstudents
    let behavior = props.behavior
    let bas = props.bas
    let sts = props.student
    let studentid = props.studentid
    let data = props.data
    let cas = props.cas
    let subject = props.subjects
    let ca_sum = {};
    let numbering = 0
    let num_subjects = 0
    let all_grades = props.all_grades
    let reportid = props.reportid
    let reportname = props.reportname
    let student_fee = props.student_fee
    let student_paid = props.student_paid
    let student_balance = props.student_fee - props.student_paid

    let classid = sts[7];
    let class_grades = all_grades !== undefined && all_grades.hasOwnProperty(classid) ? all_grades[classid]: []
   
    let keyz = []
    class_grades.forEach(rw=>{
        let nt = rw.gradeabbrv+" = "+rw.gradename+" ("+rw.minscore+"  ~ "+rw.maxscore+") ";
        keyz.push(nt);
    })
    const s_title = {
        minWidth: "150px",
        padding:"3px",
        textTransform:'uppercase'   
    }
    const t_title = {
        minWidth:"220px",
        maxWidth:"220px",
        fontFamily: "'Trebuchet MS', Arial, Helvetica, sans-serif",
        fontWeight:"bold",
        padding:"4px",
        textTransform:"uppercase",
        textWrap:"unrestricted"	
    }

    const dataAdd = {
        height:"80px"
    }
    const h3 = {
        fontFamily:'Righteous',
        lineHeight:"13px"
    }
    const h4 = {
        fontFamily:'Cantarell-Regular',
        fontSize:"14px"
    }
    const h2 = {
        fontFamily:'Cantarell-Regular'  
    }
    const commentAdd = {
        fontFamily:'Farsan-Regular',
        fontSize:"12px",
        padding:"8px"
    }
    const sheet = { 
            backgroundImage: "url(" + process.env.PUBLIC_URL + process.env.REACT_APP_LOGO1+")", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center",
            backgroundSize:"contain", 
            zIndex:1000,
            backgroundAttachment: "local",
            backgroundOrigin: "content-box",	
            webkitBackgroundSize: "cover",
            mozBackgroundSize:"cover",
            oBackgroundSize:"cover",
            backgroundSize: "cover",
            webkitAnimation: "myfirst 5s",
            animation: "myfirst 5s"  
    }

    
    let acct = Object.keys(subject).map((row, ind)=>{
            if(data && Array.isArray(Object.keys(data)) && Object.keys(data).includes(row)  && data[row] !== undefined )
              {
              let subs= [];
              let adds = [];
              num_subjects = num_subjects + 1;
              let d = subject !== undefined && subject.hasOwnProperty(row) && subject[row] !== null ? subject[row].split(":::") : ';';
              return <tr key={row+"_"+studentid} style={{fontSize: fontz+"px"}} >
              <td className="text-center m-0 p-0">
               {numbering = numbering + 1}
              </td>
              <td className="text-left m-0 p-0">
              <div style={{fontSize: fontz+"px", textTransform:'capitalize'}} className="m-0 p-0">{d[0]}</div>
              </td>
              {       
                  Object.keys(cas).map((prop, inds)=>{
                    let sumrow = [];
                    let totrow = [];
                    if(ca_sum.hasOwnProperty(prop)){  }
                    else{ca_sum[prop] = []}
                
                    if(data && Array.isArray(Object.keys(data)) && Object.keys(data).includes(row) && Object.keys(data[row]).includes(prop))
                    {
                      //SET CA SUM
                      let sh = data[row][prop];
                      if(sh > -1)
                      { 
                         ca_sum[prop].push(sh) 
                      }
                      let shmax = 20;//ca_score[prop];
                      sumrow.push(sh)
                      totrow.push(shmax)
                      subs.push(sh)
                      adds.push(shmax)
        
                      return <td className='text-center m-0 p-0' style={{fontSize: fontz+"px"}} key={ind}>{parseFloat(sh) > 0 ? Number(sh).toFixed(1):0}</td>
                    }else
                    {
                      return <td className='text-danger text-center m-0 p-0'><CIcon name="cil-x"/>{subs}</td>
                    }   
                 })  
              }
              
              <th className='text-center m-0 p-0' style={{backgroundColor:bgc[0], color:bgc[1], fontSize: fontz+"px"}}>{sum100(subs)}</th>
              <td className='text-center m-0 p-0' style={{fontSize: fontz+"px"}}>{grading(subs, class_grades)}</td>
              <td className='text-center m-0 p-0' style={{fontSize: fontz+"px"}}>{format(sub_ana[row]['avg'])}</td>
              <td className='text-center m-0 p-0' style={{fontSize: fontz+"px"}}>{format(sub_ana[row]['max'])}</td>
              <td className='text-center m-0 p-0' style={{fontSize: fontz+"px"}}>{format(sub_ana[row]['min'])}</td>
              <td className='text-right m-0 p-0' style={{fontSize: fontz+"px"}}>{`${ordinal_suffix_of(rank[row])} of ${sub_ana[row]['pop']}`}</td>
          </tr>
            }
          })
          
    let s_sum = []
    let s_avg = []
    let s_min = []
    let s_max = []
    Object.keys(subject).forEach(row=>{
        if(data && Array.isArray(Object.keys(data)) && Object.keys(data).includes(row)  && data[row] !== undefined )
        {
              let subs= [];
              let adds = [];
              Object.keys(cas).forEach(prop=>{
                    let sumrow = [];
                    let totrow = [];
                   
                    if(data && Array.isArray(Object.keys(data)) && Object.keys(data).includes(row) && Object.keys(data[row]).includes(prop))
                    {
                      //SET CA SUM
                      let sh = data[row][prop];
                      if(sh > -1)
                      { 
                         ca_sum[prop].push(sh) 
                      }
                      let shmax = 20;//ca_score[prop];
                      sumrow.push(sh)
                      totrow.push(shmax)
                      subs.push(sh)
                      adds.push(shmax)
                    }  
              })
              s_sum.push(sum100(subs))
              s_avg.push(sub_ana[row]['avg'])
              s_max.push(sub_ana[row]['max'])
              s_min.push(sub_ana[row]['min'])  
        }         
    })
    
    let tfootm = Object.keys(cas).map((prp, ind)=>{
        let d = avg(ca_sum[prp])
        return<th key={ind} className="text-center m-0 p-0 text-center align-self-center" width="60px">{d}</th>
    });
    
    return (
        <>
<CContainer className={sheet} style={{background:'#fff'}}>
    <CRow className="page mt-10" className="A4" style={{
                            overflow:'hidden',
                            position: 'relative',
                            backgroundColor:'#fff'
                            
                        }}>
    <CCol>
    <CRow >
        <CCol xs={2} className="m-0">
                <img 
                className="img img-responsive" 
                style={{maxWidth:'120px'}} 
                src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO1}
                className="m-0 p-0" 
                width='150px'
                height='100px'
                alt='admission' 
                onError={(e)=>{e.target.onerror=null; e.target.src= process.env.PUBLIC_URL + 'avatars/1.png'} }
                />
        </CCol>
        <CCol xs='3' style={{marginTop:'1px', marginBottom:'4px'}}>
        <div className='my-1'>
            <small className='pull-left'>
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
        <CCol xs={2} className="m-0">
                <img 
                    className="img img-responsive" 
                    style={{maxWidth:'120px'}} 
                    src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO2}
                    className="m-0 p-0" 
                    width='100%'
                    height='100px'
                    alt='admission' 
                    onError={(e)=>{e.target.onerror=null; e.target.src= process.env.PUBLIC_URL +'avatars/1.png'} }
                    />
        </CCol>
    </CRow>
    <CRow>
        <CCol xs={12} style={{background:'#333', color:'white', textAlign:'center', padding:'0px'}}>
            <h4>{reportname}</h4>
        </CCol>
    </CRow>
    <CRow>
        <CCol xs={12} style={{background:'#FFF', color:'#aa6c39', textAlign:'center', padding:'0px'}}>
            <h4>{props.user !== undefined && props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('name') ? props.user.activeschool.name :'No School'}</h4>
        </CCol>
    </CRow>
<CRow>
    <CCol xs={10} className={dataAdd}>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Fullname</CCol>
            <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold', fontSize:fontz+"px"}}>{sts[0]}</CCol>
        </CRow>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Matriculation Number</CCol>
                    <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold'}}>{props.user.activeschool.abbrv}{sts[3]}/{sts[1]}</CCol>
        </CRow>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Gender</CCol>
            <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold'}}>{sts[2] == "" ? "None":sts[2] }</CCol>
        </CRow>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Class</CCol>
            <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold'}}>{sts[5]}</CCol>
        </CRow>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Dated</CCol>
            <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold'}}>{new Date().toDateString()}</CCol>
        </CRow>
        <CRow xs={12}>
            <CCol xs={3} className={s_title}>Position in Class</CCol>
            <CCol xs={9} className={t_title} style={{textTransform:'capitalize', fontWeight:'bold'}}>{`${ordinal_suffix_of(rank_student)} of ${class_analysis.pop}`}</CCol>
        </CRow>
    </CCol>
    <CCol xs={2} className="pull-left">
        <img 
            width="120px" 
            height="120px" 
            src={process.env.PUBLIC_URL + sts[4]}
            className="img img-responsive" 
            style={{maxWidth:'120px'}} 
            onError={(e)=>{e.target.onerror=null; e.target.src= process.env.PUBLIC_URL +'/icons/profile_4.png'} }
            
            />
    </CCol>
</CRow>
<CRow xs={12} >  	
    <CCol xs={12} className='m-0 p-0'>
        <table key={studentid} className="table" width="100%" border={`solid 3px ${bgc[0]}`} style={{border:`solid 2px ${bgc[0]}`}}>
            <thead>
                <tr className="text-center justify-items-center align-items-center" style={{backgroundColor:bgc[0], color:bgc[1]}} >
                    <th rowSpan={1} className="text-center m-0 p-0">SN</th>
                    <th rowSpan={1} className="text-center m-0 p-0">SUBJECT</th>
                    {props.theadm}
                    <th rowSpan={1} className="align-self-center text-center m-0 p-0">TOTAL<br/> (100%)</th>
                    <th rowSpan={1} className="align-self-center text-center m-0 p-0">GRADE<br/></th>
                    <th rowSpan={1} className="text-center m-0 p-0">AVG</th>
                    <th rowSpan={1} className="text-center m-0 p-0">MAX</th>
                    <th rowSpan={1} className="text-center m-0 p-0">MIN</th>
                    <th rowSpan={1} className="text-center m-0 p-0">RANK</th>
                </tr>
            </thead>
            <tbody style={{color:'#000'}}>
            {acct}
            </tbody>
            <tfoot>
                <tr className="text-center" style={{backgroundColor:bgc[0], color:bgc[1]}}>
                    <th className="text-center m-0 p-0">SN</th>
                    <th className="text-center m-0 p-0">SUBJECT</th>
                    {tfootm}
                    <th className="text-center m-0 p-0">{avg(s_sum)}</th>
                    <th className="text-center m-0 p-0">{gradingf(avg(s_sum), class_grades)}<br/></th>
                    <th className="text-center m-0 p-0">{avg(s_avg)}</th>
                    <th className="text-center m-0 p-0">{max(s_max)}</th>
                    <th className="text-center m-0 p-0">{min(s_min)}</th>
                    <th className="text-center m-0 p-0" style={{fontSize:'18px'}}>{`${ordinal_suffix_of(rank_student)}`}</th>
                </tr>
            </tfoot>
        </table>
    </CCol>
</CRow>
<CRow xs={12} >  	
    <CCol xs={12} className='m-0 p-0'>
        <table key={studentid+'A'} className="table m-0 p-0" width="100%"  >
            <tr className='m-0 p-0'>
                <td className='m-0 p-0' style={{fontWeight:'bold', fontSize:'11px'}}>
                    KEYS :  {keyz.join(", ")}
                </td>
            </tr>
        </table>
    </CCol>
</CRow>
<CRow xs={12}>
    <CCol xs={12}>
        <table className="m-0"  border="solid #000 2px" style={{fontWeight:'bold', fontStyle:'italic'}} width="100%">
            <tr>
                <td>Class Average</td><td className='text-center'>{Number(class_analysis['avg']).toFixed(0)}</td>
                <td>Class Maximum</td><td className='text-center'>{Number(class_analysis['max']).toFixed(0)}</td>
                <td>Class Minimum</td><td className='text-center'>{Number(class_analysis['min']).toFixed(0)}</td>
            </tr>
            <tr>
                    <td>Total Fee @ {new Date().toDateString()}</td><td>{numberformat(student_fee)}</td>
                <td>Total Payments @ {new Date().toDateString()}</td><td>{numberformat(student_paid)}</td>
                <td>Fee Balance @ {new Date().toDateString()}</td><td>{numberformat(student_balance)}</td>
            </tr>
        </table>
    </CCol>
</CRow>
<CRow xs={12}>
   <CCard xs={12}>
       <CCardBody xs={12}>
       <CRow xs={12} >
           <CCol xs={12} sm={12} className="">
               <CContainer className='d-flex flex-wrap'>
                {
                    Object.keys(bas).map(ele=>{
                    return <CRow  xs='12'  style={{width:'250px',padding:'-3px' }} className="m-0 p-0 d-flex flex-nowrap">
                                <CCol xs={6} className="m-0 p-0 align-self-center" style={{fontSize:'13px', width:'100px'}}>
                                    {bas[ele][0]}
                                </CCol>
                                <CCol sm={6} className="m-0 p-0" style={{fontSize:'13px', width:'100px', padding:"-3px"}}>
                                    <ReactStars                   
                                        count={ behavior !== undefined && behavior.hasOwnProperty(ele) && behavior[ele] ? behavior[ele] * 5 : 0 }
                                        classNames='m-0 p-0'
                                        style={{margin:'0px', padding:'-2px'}}
                                        size={20}
                                        isHalf={true}
                                        emptyIcon={<i className="">-</i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                    />
                                </CCol>
                            </CRow>
                    })
                }
                </CContainer>
                </CCol>
            </CRow>
       </CCardBody>
    </CCard>
</CRow>
<CRow xs={12}>
    <CCol xs={12} className="m-0 p-5">
        <div className="row panel panel-default">
          <div className="panel-heading">
          </div>
          <div className="panel-body" style={{fontFamily:'Bubblegum sans'}}>
              <CCol style={{display:'block'}} xs={12}>
                 {gradingcomment(avg(s_sum), class_grades)}
              </CCol>
              {
                  props.comment.comments
                  .filter(rw=>rw.studentid == studentid && rw.reportid == reportid )
                  .map(rw=>{
                      return <CCol style={{display:'block'}} xs={12}>
                                <span><b>{rw.staffname}</b></span>
                                <span>
                                    {rw.comment}
                                    <span className="pull-left"><i className="fa fa-remove"></i></span>
                                </span>
                             </CCol>
                  })
              }
          </div>
          <CButtonGroup>
            <CButton 
                className="d-print-none" 
                color="dark" 
                onClick={()=>props.loadComment(studentid)}
                ><i className="fa fa-pencil"></i> Pick Comment </CButton>
            <CButton 
                className="d-print-none" 
                color="dark"
                onClick={()=>props.makeComment(studentid)}
                ><i className="fa fa-comment"></i> Make a Comment </CButton>
          </CButtonGroup>
        </div>
    </CCol>
</CRow>
<CRow xs={12}>
    <CCol xs={12}>
    <br/>
    <br/>
    <br/>
    <b>__________________________</b><br/>
    <strong>{props.user.activeschool.signed}</strong><br/>
            for : School Management
    </CCol>
</CRow>
</CCol>
    </CRow>
</CContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    user :state.userReducer,
    comment:state.commentReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
