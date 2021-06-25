import { CTooltip } from '@coreui/react';
import React from 'react'
import { connect } from 'react-redux'

const terms = {
    1:'First',
    2:'Second',
    3:'Third',
}

const List = (props) => {
    let dt_arr = props.dt;
    let subjectid = props.subjectid;
    let dt_arr_sum = {};
    let dt_subject = props.dt_subject;
    let dt_class = {};
    let dt_cla = {};
    let dt_ca = props.dt_ca;
    let dt_student = props.dt_student;
    let dt_head = '';
    let dt_body = '';
    let dt_foot = '';
    let dt_col = {};
    let dt_total = [];
    let subject_totals = props.subject_totals
    let student_totals = props.student_totals

    const cumavg = (arr , arr1) =>{
        if(Array.isArray(arr) && arr.length > 0 && Array.isArray(arr1) && arr1.length > 0)
        {
            let le = arr1.reduce((a, b)=>a + b, 0);
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
            
            return Number(avg).toFixed(2);
        }
    }
    const avgs = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su;
           
            return Number(avg).toFixed(2);
        }
    }
    dt_head = Object.keys(dt_ca).map((prp, ind)=>{
        let d = dt_ca !== undefined && dt_ca.hasOwnProperty(prp) && dt_ca[prp] !== null ? dt_ca[prp].split(":::") : ';';
        return<th key={ind} className="text-center" width="60px">{d[1]}</th>
    });
    
    dt_body = Array.isArray(Object.keys(dt_student)) && Object.keys(dt_student).length > 0 ? 
    Object.keys(dt_student).map((prp1, ind1)=>{
    let dt_row = [];
    return <tr key={ind1}>
        <td className="text-center">{ind1 + 1}</td>
        <td style={{textTransform:'capitalize'}}>{dt_student[prp1][0]}</td>
        {
            Array.isArray(Object.keys(dt_ca)) && Object.keys(dt_ca).length > 0 ? Object.keys(dt_ca).map((prp, ind)=>{
                if( Object.keys(dt_arr).includes(prp1) && 
                    Object.keys(dt_arr[prp1]).includes(subjectid) &&
                    Object.keys(dt_arr[prp1][subjectid]).includes(prp)
                  ){
                    let dt_sum = dt_arr[prp1][subjectid][prp];
                    let dt_sum_in = Number(dt_sum).toFixed(2);
                    dt_row.push(parseFloat(dt_sum_in));
                    //store column values to add later
                    if(Object.keys(dt_col).includes(prp))
                    {dt_col[prp].push(parseFloat(dt_sum_in));}
                    else{dt_col[prp] =[]; dt_col[prp].push(parseFloat(dt_sum_in));}

                    return <th key={ind} className="text-center">
                        {dt_sum_in}
                    </th>
                }else{
                    return <td className="text-center">--</td>
                }
            }):''
        }
        <td className="text-center">{avgs(dt_row)}</td>
        <td className="text-center">{avgs(dt_row)}</td>
    </tr>   
    }):"";

    dt_foot = Object.keys(dt_class).map((prp, ind)=>{
    let d_sum = avgs(dt_col[prp]);
    dt_total.push(parseFloat(d_sum));
    return <th key={ind}>{d_sum}</th>
    });

    return (
        <table width="100%" border="solid #ccc 2px" style={{fontFamily: 'Source Sans Pro'}}>
        <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'300px'}}>Student Names</td>
                {dt_head}
                <td className='text-center' style={{width:'15px'}} width="15px">SUM</td>
                <td className='text-center' style={{width:'15px'}} width="15px">RANK</td>
            </tr>
        </thead>
        <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
            {dt_body}
        </tbody>
        <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'200px'}}>Student Names</td>
                {dt_head}
                <td className='text-center' style={{width:'15px'}} width="15px">SUM</td>
                <td className='text-center' style={{width:'15px'}} width="15px">RANK</td>
            </tr>
        </thead>
        

    </table>
        
    )
}

const mapStateToProps = (state) => ({
    user:state.userReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
