import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  Page  from './Page';




const Report = (props) => {
    const [fontz, setfontz] = useState(14)
    
    useEffect(() => {
        setfontz(props.fontz)
    }, [props.fontz])
    
    let reportname = props.reportname;
    let dt_arr = props.dt;
    let ct_arr = props.ct;
    let subjects = props.dt_subject;
    let dt_class = {};
    let cas = props.dt_ca;
    let bas = props.ct_ca;
    let dt_student = props.dt_student;
    let dt_body = '';
    let dt_col = {};
    let dt_total = [];
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

    const loadComment = (e) =>{

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
                        loadComment={(e)=>loadComment(e)}
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
                    loadComment={(e)=>loadComment(e)}
                />
     }):"";
    }
    let dt_foot = Object.keys(dt_class).map((prp, ind)=>{
    let d_sum = avgs(dt_col[prp]);
    dt_total.push(parseFloat(d_sum));
    return <th key={ind}>{d_sum}</th>
    });

    return (
<>
        {dt_body} 
</> 
    )
}

const mapStateToProps = (state) => ({
    user:state.userReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
