import React from 'react'
import { connect } from 'react-redux'

const ClassUnitList = (props) => {
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
            let avg = su/le;
           
            return Number(avg).toFixed(2);
        }
    }
    let dt_body =  props.dt_body
    let dt_head =  props.dt_head
    let dt_foot =  props.dt_foot
    let dt_total =  props.dt_total
    let converts = props.converts

    return (
        <table width="100%" border="solid #ccc 2px">
            <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                <tr>
                    <td className='text-center' style={{width:'20px'}}>SN</td>
                    <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
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
                    <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                    {dt_foot}
                    <td className='text-center' width="50px">{avgs(dt_total)}</td>
                </tr>
            </tfoot>
        </table>
             
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassUnitList)
