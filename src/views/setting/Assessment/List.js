import { CTooltip } from '@coreui/react';
import React from 'react'
import { connect } from 'react-redux'

const List = (props) => {
    const cumavg = (arr , arr1) =>{
        if(Array.isArray(arr) && arr.length > 0 && Array.isArray(arr1) && arr1.length > 0)
        {
            let le = arr1.reduce((a, b)=>a + b, 0);
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
            
            return Number(avg).toFixed(2);
        }
    }

    let dt = props.dt
    let converts = props.converts
    let defaultconverts = props.defaultconverts

    

    let fx_array = [];
    let x_array = [];

    return (
        <table width="100%" border="solid #ccc 2px">
        <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                <td className='text-center' style={{width:'100px'}} width="10px">CLASS</td>
                <td className='text-center' width="50px">POP</td>
                <td className='text-center' width="50px">AVG<br/>({converts})</td>
                <td className='text-center' width="50px">MAX<br/>({converts})</td>
                <td className='text-center' width="50px">MIN<br/>({converts})</td>
                <td className='text-center'>STAFFNAME</td>
            </tr>
        </thead>
        <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
            {
                
                Array.isArray(dt) ? dt.filter(rw=>rw !== undefined && rw !== null).map((prop, indx)=>{
                    let fx = parseFloat(prop.num) * ((parseFloat(prop.score) * converts)/defaultconverts);
                    fx_array.push(fx);
                    x_array.push(parseFloat(prop.num));
                    return <tr>
                                <td className='text-center'>
                                 {indx + 1}
                                </td>
                                <CTooltip content="Click to open in summary tab">
                                <td className='text-left' style={{textTransform:'capitalize', cursor:'pointer'}}>
                                <i 
                                    onClick={()=>props.lunchModal(prop.itemid, prop.studentid)}
                                >{prop.itemname}</i>
                                </td>
                                </CTooltip>
                                <td className='text-center'>
                                {prop.itemname1}
                                </td>
                                
                                <td className='text-center'>{prop.num}</td>
                                <td className='text-center'>{Number((parseFloat(prop.score)/defaultconverts) * converts).toFixed(2)}</td>
                                <td className='text-center'>{Number((parseFloat(prop.maxscore)/defaultconverts) * converts).toFixed(2)}</td>
                                <td className='text-center'>{Number((parseFloat(prop.minscore)/defaultconverts) * converts).toFixed(2)}</td>
                                <td className='text-center'>
                                    {prop.clientname}
                                </td>
                           </tr>
                }):''
            }

        </tbody>
        <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                 <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'100px'}} width="10px">SUBJECT</td>
                <td className='text-center' style={{width:'100px'}} width="10px">CLASS</td>
                
                <td className='text-center'>POP</td>
                <td className='text-center'>{cumavg(fx_array, x_array)}</td>
                <td className='text-center d-print-none' width="10px">MAX</td>
                <td className='text-center d-print-none' width="10px">MIN</td>
                <td className='text-center'>STAFFNAME</td>
            </tr>
        </tfoot>

    </table>
        
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
