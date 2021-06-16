import { CButton, CCard, CCardBody, CCardFooter } from '@coreui/react'
import React from 'react'
import { connect } from 'react-redux'

const ClassScore = (props) => {
    let dt = props.data
    let converts = props.converts
    let defaultconverts = props.defaultconverts
    let dt_arr = {}
    let dt_students = {}
    let dt_head = '';
    let dt_body = '';
    let dt_foot = '';
    let dt_col = {};
    let dt_total = [];
    let dt_ca = {};

    const loadDelete = () =>{

    }

    const avgs = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
           
            return Number(avg).toFixed(2);
        }
    }

    const sums = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su;
           
            return Number(avg).toFixed(2);
        }
    }

    if(Array.isArray(dt)){

        dt.forEach(ele => {
            if(Object.keys(dt_arr).includes(ele.clientid))
            {
                if(Object.keys(dt_arr[ele.clientid]).includes(ele.itemid1)){
                    dt_arr[ele.clientid][ele.itemid1].push(ele.score);
                }else{
                    dt_arr[ele.clientid][ele.itemid1] = [] ;
                    dt_arr[ele.clientid][ele.itemid1].push(ele.score);
                }

            }else{
                dt_arr[ele.clientid] = {};
                dt_arr[ele.clientid][ele.itemid1] = [] ;
                dt_arr[ele.clientid][ele.itemid1].push(ele.score); 
            }

            dt_ca[ele.itemid1] = ele.itemname1;
            dt_students[ele.clientid] = ele.studentname;
        })
    
        dt_head = Object.keys(dt_ca).map((prp, ind)=>{
            return<th key={ind} width='100px' className="text-center">{dt_ca[prp]}</th>
        });

       
    dt_students = Object.fromEntries(Object.entries(dt_students).sort((a, b)=>a[1] - b[1]))
    dt_body = Array.isArray(Object.keys(dt_students)) && Object.keys(dt_students).length > 0 ? Object.keys(dt_students).map((prp1, ind1)=>{
        let dt_row = [];
        return <tr key={ind1}>
            <td className="text-center">{ind1 + 1}</td>
            <td>{Object.keys(dt_students).includes(prp1) ? dt_students[prp1] : ''}</td>
              {
                Array.isArray(Object.keys(dt_ca)) && Object.keys(dt_ca).length > 0 ? Object.keys(dt_ca).map((prp, ind)=>{
                    if(Object.keys(dt_arr).includes(prp1) && Object.keys(dt_arr[prp1]).includes(prp) ){
                        let dt_sum = avgs(dt_arr[prp1][prp]);
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
                        return <td className="text-center">-</td>
                    }
                }):''
              }
            <td className="text-center">{sums(dt_row)}</td>
        </tr>   
    }):"";


    dt_foot = Object.keys(dt_ca).map((prp, ind)=>{
        let d_sum = avgs(dt_col[prp]);
        dt_total.push(parseFloat(d_sum));
        return <th key={ind}>{d_sum}</th>
    });

    }

    return (
        <CCard>
            <CCardBody>
        <table width="100%" border="solid #ccc 2px">
        <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'400px'}} width="10px">STUDENTS</td>
                {dt_head}
                <td className='text-center' width="50px">TOTAL<br/>({converts})</td>
            </tr>
        </thead>
        <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
            {dt_body}
        </tbody>
        <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr className='text-center'>
            <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'200px'}} width="10px">STUDENTS</td>
                {dt_foot}
                <td className='text-center' width="50px">{avgs(dt_total)}</td>
            </tr>
        </tfoot>
    </table>
        </CCardBody>
        <CCardFooter>
            <CButton color="danger" onClick={loadDelete}>Delete All</CButton>
        </CCardFooter>
    </CCard>
   
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScore)
