import React, { useEffect, useState }  from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation} from 'react-router-dom'


import StudentReportTable from './../student/StudentReportTable1';
import {getReports} from './../../actions/setting/report';
import {getCas} from './../../actions/setting/ca';
import {getStudentscores} from './../../actions/student/studentscore';

const StudentReportList = (props) => {

    let location = useLocation()
    let history = useHistory()
   
    
    //STORE DATA IN STATES
    const [repid, setrepid] = useState(0)
    const [active, setActive] = useState(0)
    const [report, setreport] = useState(0)
    const [studentids, setstudentids] = useState('')
    const [students, setstudents] = useState([])
    const [termid, settermid] = useState(null)
    const [sessionid, setsessionid] = useState(null)
    const [classteacher, setclassteacher] = useState(true)
    const [clasz, setclasz] = useState({})
    const [claszparent, setclaszparent] = useState(null)
    const [claszname, setclaszname] = useState('')
    const [claszparentname, setclaszparentname] = useState('')
    const [activeterm, setactiveterm] = useState({})
    const [staffid, setstaffid] = useState(null)
    const [cass, setcass] = useState([])
    if(location.state !== undefined && location.state !== null & Array.isArray(Object.keys(location.state)))
    {
        //console.log(Object.keys(location.state))
        localStorage.setItem('reporters', JSON.stringify(location.state))
    }else{
       // console.log(Object.keys(location.state))
    }
    
    useEffect(() => {
    //PASS DATA FROM PARENT PAGE
        let loca = JSON.parse(localStorage.getItem('reporters'))
        let report = loca.report; setreport(report);
        let studentids = loca.studentids; setstudentids(studentids);
        let students = loca.students; setstudents(students);
        let termid = loca.term; settermid(termid);
        let sessionid = loca.sessionid; setsessionid(sessionid);
        let classteacher = loca.classteacher; setclassteacher(classteacher);
        let clasz = loca.clasz; setclasz(clasz);
        let claszparent = loca.claszparent; setclaszparent(claszparent);
        let claszname = loca.claszname; setclaszname(claszname);
        let claszparentname = loca.claszparentname; setclaszparentname(claszparentname);
        let activeterm = loca.activeterm; setactiveterm(activeterm);
        let staffid = loca.staffid;setstaffid(staffid);
        let cas = loca.cas;setcass(cas);

    }, [location])
    
    //GET DATA NEED FOR THIS PAGE
    //ALL REPORTS FOR THE SESSION
    //DEPENDS ON SESSION
    useEffect(() => {
        //GET ALL REPORT FOR THIS SESSION
        //SO AS TO GENERATE DROPDOWNLIST
        let params = {
            data:JSON.stringify(
            {
                  'sessionid':sessionid
              }),
              cat:'selected',
              table:'reports',
              narration:'get reports'
            }
            props.getReports(params);

          
           let params1 = {
                data:JSON.stringify(
                {
                'termid':termid,
                'schoolid':sessionid
                }),
                cat:'dropdownca',
                table:'dropdownca',
                narration:'get ca'
        
            }
            props.getCas(params1)
            


    }, [sessionid])

    useEffect(() => {
        //GET ALL REPORT FOR THE STUDENTS
        let reportarrays = props.reports && Array.isArray(props.reports) ? props.reports : [];
        let casss = reportarrays.filter(rw=>rw !== null && parseInt(rw.id) === parseInt(report));
        let cass = Array.isArray(casss) && casss.length > 0 ? casss[0].ca : '';
        let cas = cass.length > 0 ? JSON.parse(cass).join(",") : '';
        if(parseInt(repid) > 0){
        let params = {
            data:JSON.stringify(
            {
                  'sessionid':sessionid,
                  'reportid':repid,
                  'termid':termid,
                  'ids':studentids,
                  'clasz':clasz,
                  'claszparent':claszparent,
                  'cas' : cas,

              }),
              cat:'selectreport',
              table:'studentscore',
              narration:'get reports'
            }
          props.getStudentscores(params);
        }
    }, [repid, studentids, claszparent, clasz])
    
    const summ = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        return Number(sums).toFixed(1)
        }
    }
    const numm = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.length;
        return Number(sums).toFixed(0)
        }
    }
    const avgg = (sumz)=>{
        if(sumz !== undefined){
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = sumz.length;
        
        let res = sums > 0 && tots > 0 ? (sums/tots)  : 0;
        return Number(res).toFixed(1)
        }
    }

    let studentscorearray = props.studentscores && Array.isArray(props.studentscores[0]) ? props.studentscores[0] : [];
    let arr = {};
    let srr = {};
    let beh = {};
    let allsubjects = {};
    let allcaunits = {}; //store all caunit by student and id
    let allcas = {}; //store all caunit by student and id
    let allcid = []; //store all ca by type
    let allcaid = []; //store all caunit by ca
    
    studentscorearray.forEach(ele => {
        //by subjects
        if(parseInt(ele.subjectid) > -1){
        if(Object.keys(arr).includes(ele.subjectid))
        {
            if(Object.keys(arr[ele.subjectid]).includes(ele.studentid))
            {
                if(Object.keys(arr[ele.subjectid][ele.studentid]).includes(ele.caid))
                {

                }else{
                    arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
                }

            }
            else{
                arr[ele.subjectid][ele.studentid] = {}
                arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
            }
        }else
        {
            arr[ele.subjectid] = {};
            arr[ele.subjectid][ele.studentid] = {}
            arr[ele.subjectid][ele.studentid][ele.caid] = ele.score
        }
        //by students
        if(Object.keys(srr).includes(ele.studentid))
        {
            if(Object.keys(srr[ele.studentid]).includes(ele.subjectid))
            {
                if(Object.keys(srr[ele.studentid][ele.subjectid]).includes(ele.caid))
                {

                }else{
                    srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
                }

            }
            else{
                srr[ele.studentid][ele.subjectid] = {}
                srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
            }
        }else
        {
            srr[ele.studentid] = {};
            srr[ele.studentid][ele.subjectid] = {}
            srr[ele.studentid][ele.subjectid][ele.caid] = ele.score
        }

        if(parseInt(ele.catypeid) === 2 || parseInt(ele.catypeid) === 3)
        {
            if(beh.hasOwnProperty(ele.studentid))
            {
                if(beh[ele.studentid].hasOwnProperty(ele.caid))
                {
                    beh[ele.studentid][ele.caid].push(ele.score)
                }else
                {
                    beh[ele.studentid][ele.caid] = []
                    beh[ele.studentid][ele.caid].push(ele.score)
                }
            }else
            {
                beh[ele.studentid] = {}
                beh[ele.studentid][ele.caid] = []
                beh[ele.studentid][ele.caid].push(ele.score)
            }

            allcaunits[ele.caid] = ele.caunitname;
            allcas[ele.cid] = ele.caname;
            //GET ALL CA BY TYPE
            if(allcid.includes(ele.catypeid))
            {allcid[ele.catypeid].push(ele.cid);}
            else
            {allcid[ele.catypeid] = []; allcid[ele.catypeid].push(ele.cid);}

           

            if(Object.keys(allcaid).includes(ele.cid))
            {
                if(Object.keys(allcaid[ele.cid]).includes(ele.caid)){

                }else
                {
                    allcaid[ele.cid][ele.caid] = ele.caunitname;
                }
                
            }else
            {
                if(parseInt(ele.cid) > -1){
                    allcaid[ele.cid] = {}
                    allcaid[ele.cid][ele.caid] = ele.caunitname;
                }
            }
        }
        }
        if(parseInt(ele.subjectid) > -1)
        {
            allsubjects[ele.subjectid] = ele.subjectname;
        }
       
    });
    
    //ARRANGE
    let studentparentaveragearray = props.studentscores && Array.isArray(props.studentscores[1]) ? props.studentscores[1] : [];
    let classparent_subject_average = {}
    studentparentaveragearray.forEach(ele=>{
        let frr = {};
        frr['pop'] = ele.students;
        frr['average'] = ele.avgr;
        frr['maxscore'] = ele.maxscore;
        frr['score'] = ele.score;
        classparent_subject_average[ele.subjectid] = frr;
    })
    
    //ARRANGE
    let studentclassaveragearray = props.studentscores && Array.isArray(props.studentscores[13]) ? props.studentscores[13] : [];
    let class_subject_average = {}
    studentclassaveragearray.forEach(ele=>{
        let frr = {};
        frr['pop'] = ele.num;
        frr['average'] = ele.score;
        frr['score'] = ele.total;
        class_subject_average[ele.subjectid] = frr;
    })
    //ARRANGE SUBJECT CLASS PARENT POSITION
    let student_classparent_subject_position_array = props.studentscores && Array.isArray(props.studentscores[4]) ? props.studentscores[4] : [];
    let student_classparent_subject_position_store = {}
    let student_classparent_subject_position_stores = []
    
    student_classparent_subject_position_array.forEach(ele=>{
        
        if(Object.keys(student_classparent_subject_position_store).includes(ele.studentid))
        {
            if(Object.keys(student_classparent_subject_position_store[ele.studentid]).includes(ele.subjectid))
            {

            }else
            {
                let frr = {};
                frr['score'] = ele.avgr;
                student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
                let prr = {};
                prr['score'] = ele.avgr;
                prr['studentid'] = ele.studentid;
                prr['subjectid'] = ele.subjectid;
                student_classparent_subject_position_stores.push(prr)
            }

        }else
        {
            let frr = {};
            frr['score'] = ele.avgr;
            student_classparent_subject_position_store[ele.studentid] = {};
            student_classparent_subject_position_store[ele.studentid][ele.subjectid] = frr;
            let prr = {};
            prr['score'] = ele.avgr;
            prr['studentid'] = ele.studentid;
            prr['subjectid'] = ele.subjectid;
            student_classparent_subject_position_stores.push(prr)
        }
        
    })
    
    //ARRANGE SUBJECT CLASS PARENT POSITION
    let student_class_subject_position_array = props.studentscores && Array.isArray(props.studentscores[5]) ? props.studentscores[5] : [];
    let student_class_subject_position_store = {}
    let student_class_subject_position_stores = []
    student_class_subject_position_array.forEach(ele=>{
        
        if(Object.keys(student_class_subject_position_store).includes(ele.studentid))
        {
            if(Object.keys(student_class_subject_position_store[ele.studentid]).includes(ele.subjectid))
            {

            }else
            {
                let frr = {};
                frr['score'] = ele.avgr;
                student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
                let prr = {};
                prr['score'] = ele.avgr;
                prr['studentid'] = ele.studentid;
                prr['subjectid'] = ele.subjectid;
               student_class_subject_position_stores.push(prr)
            }

        }else
        {
            let frr = {};
            frr['score'] = ele.avgr;
            student_class_subject_position_store[ele.studentid] = {};
            student_class_subject_position_store[ele.studentid][ele.subjectid] = frr;
            let prr = {};
            prr['score'] = ele.avgr;
            prr['studentid'] = ele.studentid;
            prr['subjectid'] = ele.subjectid;
            student_class_subject_position_stores.push(prr)
        }
        
    })

    //ARRANGE CLASS PARENT POSITION
    let rankclassparent = props.studentscores && Array.isArray(props.studentscores[12]) ? props.studentscores[12] : [];
    rankclassparent.sort(function(a,b){ return b.score - a.score; });
    rankclassparent.forEach(function(player, i, arr) {
        player.rank = i === 0 || player.score != arr[i-1].score
                   ? i + 1
                   : arr[i-1].rank;
        });
    
    //ARRANGE CLASS POSITION
    let rankclass = props.studentscores && Array.isArray(props.studentscores[11]) ? props.studentscores[11] : [];
    rankclass.sort(function(a,b){ return b.score - a.score; });

        rankclass.forEach(function(player, i, arr) {
        player.rank = i === 0 || player.score != arr[i-1].score
                   ? i + 1
                   : arr[i-1].rank;
        });
    
    
    //ARRANGE CLASS POSITION
    let student_ca_score = props.studentscores && Array.isArray(props.studentscores[8]) ? props.studentscores[8] : [];
    let student_ca_score_store = {}
    student_ca_score.forEach(ele=>{
      
       if(Object.keys(student_ca_score_store).includes(ele.studentid))
       {
           if(Object.keys(student_ca_score_store[ele.studentid]).includes(ele.subjectid))
           {
               if(Object.keys(student_ca_score_store[ele.studentid][ele.subjectid]).includes(ele.caid))
               {

               }else
               {
                   student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
               }

           }else
           {
               student_ca_score_store[ele.studentid][ele.subjectid] = {};
               student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
           }

       }else
       {
           student_ca_score_store[ele.studentid] = {};
           student_ca_score_store[ele.studentid][ele.subjectid] = {};
           student_ca_score_store[ele.studentid][ele.subjectid][ele.caid] = ele.score;
       }        
        
    })


     

    let cascored = props.studentscore && Array.isArray(props.studentscore) ? props.studentscore.filter(rw =>rw != null || rw != undefined) : []
    let cascored_array = {}
    let cascored_sum_array = {}
    let cascored_sum_all = []
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

      if(Object.keys(cascored_sum_array).includes(ele.clientid))
      {
        if(Object.keys(cascored_sum_array[ele.clientid]).includes(ele.itemid))
        {
            cascored_sum_array[ele.clientid][ele.itemid].push(ele.contact)

        }else
        {
            cascored_sum_array[ele.clientid][ele.itemid] = []
            cascored_sum_array[ele.clientid][ele.itemid].push(ele.contact)
        }

      }else
      {
          cascored_sum_array[ele.clientid] = {};
          cascored_sum_array[ele.clientid][ele.itemid] = []
          cascored_sum_array[ele.clientid][ele.itemid].push(ele.contact)
      }
    })
    let cascored_sum = [];
    let student_grand_total = [];
    let cascored_students = {};
    let cascored_subjects = {};
    Object.keys(cascored_sum_array).forEach(ele=>{
    cascored_students[ele] = [];
    let step1 = cascored_sum_array[ele];
    Object.keys(step1).forEach(ele1=>{
        let summer = summ(cascored_sum_array[ele][ele1])
        //get students subject scores
        let stud_sub_sco = {}
        stud_sub_sco['studentid'] = ele;
        stud_sub_sco['subjectid'] = ele1;
        stud_sub_sco['score'] = summer;
        cascored_sum.push(stud_sub_sco);
        //store students scores to get total
        cascored_students[ele].push(summer)
        cascored_sum_all.push(summer)
    })
    //get students average, total and number of subjects
    let students_score = {}
    students_score['studentid'] = ele;
    students_score['total'] = summ(cascored_students[ele]);
    students_score['num'] = numm(cascored_students[ele]);
    students_score['score'] = avgg(cascored_students[ele]);
    student_grand_total.push(students_score)
 })
 let class_average = avgg(cascored_sum_all)
 let class_population = students.length

    let reportarray = props.reports && Array.isArray(props.reports) ? props.reports : [];
       let report_array = reportarray.filter(rw=>rw !== null).map((rw, ind) =>{
           return <option key={ind} value={rw.id}>{rw.title}</option>
   })
   
     var ranksubjectclassunit = {};
    
     Object.keys(allsubjects).forEach(rw=>{
        let data = cascored_sum.filter(r=>parseInt(r.subjectid) === parseInt(rw));
        data.sort(function(a,b){ return b.score - a.score; });
       
        data.forEach(function(player, i, arr) {
        player.rank = i === 0 || player.score != arr[i-1].score
                   ? i + 1
                   : arr[i-1].rank;
        });
        ranksubjectclassunit[rw] = data
   })
   
    var ranksubjectclass = {};
    Object.keys(allsubjects).forEach(rw=>{
            let data = cascored_sum.filter(r=>parseInt(r.subjectid) === parseInt(rw));
            data.sort(function(a,b){ return b.score - a.score; });

            data.forEach(function(player, i, arr) {
            player.rank = i === 0 || player.score != arr[i-1].score
                    ? i + 1
                    : arr[i-1].rank;
            });
            ranksubjectclass[rw] = data
    })
    
       
        //SET ASSESSMENT
        let cas = Array.isArray(cass) ? cass : [];
        let ca_array = {};
        let ca_score= {};
        let ca1_array = {};
        let ca2_array = {};
        let caunit_array = {};
        cas.forEach(ele => {
          if(parseInt(ele.typeid) === 1){
            if(Object.keys(ca_array).includes(ele.sid))
            {
               //ca_array[ele.sid] = ele.cname;
            }else{
               ca_array[ele.sid] = ele.caabbrv;
               ca_score[ele.sid] = ele.score;
            }
          }else if(parseInt(ele.typeid) === 2){
           if(Object.keys(ca_array).includes(ele.sid))
           {
              //ca_array[ele.sid] = ele.cname;
           }else{
              ca1_array[ele.sid] = ele.caabbrv;
           }
          }
          else if(parseInt(ele.typeid) === 3){
           if(Object.keys(ca_array).includes(ele.sid))
           {
              //ca_array[ele.sid] = ele.cname;
           }else{
              ca2_array[ele.sid] = ele.caabbrv;
           }
          }
       
          if(Object.keys(caunit_array).includes(ele.sid))
            {
                let arr = {}
                arr['id'] = ele.id;
                arr['typeid'] = ele.typeid;
                arr['name'] = ele.abbrv;
                arr['score'] = ele.maxscore;
                caunit_array[ele.sid].push(arr);
            }else
            {
               caunit_array[ele.sid] = [];
               let arr = {}
               arr['id'] = ele.id;
               arr['typeid'] = ele.typeid;
               arr['name'] = ele.abbrv;
               arr['score'] = ele.maxscore;
               caunit_array[ele.sid].push(arr);
            }
        });

        let theadm = Object.keys(ca_array).map((prop, ind)=>{
                    return <th key={ind} >{ca_array[prop]}<br/>{ca_score[prop]}</th>
        })
             
        let STUDENTZ = students.map((sub, idx)=>{
            return <StudentReportTable 
                key={idx}
                studentid={sub.id}
                studentids={sub.ids}
                ssessionid={sessionid}
                claszname={claszname}
                claszparentname={claszparentname}
                report={report}
                studentname={sub}
                theadm={theadm}
                data={allsubjects}
                allcas={allcas}
                allcid={allcid}
                allcaunits={allcaunits}
                allcaid={allcaid}
                beh_array={beh}
                ca_array={ca_array}
                ca_score={ca_score}
                class_average={class_average}
                class_population={class_population}
                cascored_array={cascored_array[sub.id]}
                caunit_array={caunit_array}
                arr={srr[sub.id]}
                classparent_subject_average={classparent_subject_average}
                class_subject_average={class_subject_average}
                student_classparent_subject_position_store={ranksubjectclass}
                student_class_subject_position_store={ranksubjectclassunit}
                student_classparent_position_store={rankclassparent}
                student_class_position_store={rankclass}
                student_ca_score_store={student_ca_score_store[sub.id]}
            />
    })

 return (
   <>
   <div className="container" id="maincont1" style={{margin:'auto', padding:'auto'}} >
        <div 
            className="printpage" 
            style={{marginLeft:'auto', marginRight:'auto'}}
          >
                {STUDENTZ}               
        </div>   
    </div>  
   </>
  )
}
const mapStateToProps = (state) =>({
    user:state.userReducer,
    reports : state.reportReducer.reports,
    studentscores : state.studentscoreReducer.studentscores,
    cas:state.caReducer.cas,
    studentscore : state.studentscoreReducer.studentscoreca
  })
  export default connect(mapStateToProps, {
    getReports,
    getStudentscores,
    getCas
  })(StudentReportList)
  
