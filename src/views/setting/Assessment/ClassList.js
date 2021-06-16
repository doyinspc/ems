import React from 'react'
import { connect } from 'react-redux'

const ClassList = (props) => {
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

    let ct_body =  props.ct_body
    let ct_head =  props.ct_head
    let ct_foot =  props.ct_foot
    let ct_total =  props.ct_total
    let converts = props.converts

    return (
        <div>
            <table width="100%" border="solid #ccc 2px">
                        <thead className="bg-dark text-center" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                            <tr>
                                <td className='text-center' style={{width:'20px'}}>SN</td>
                                <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                                {ct_head}
                                <td className='text-center' width="50px">TOTAL<br/>({converts})</td>
                            </tr>
                        </thead>
                        <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                            {ct_body}
                        </tbody>
                        <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                            <tr className='text-center'>
                            <td className='text-center' style={{width:'20px'}}>SN</td>
                                <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                                {ct_foot}
                                <td className='text-center' width="50px">{avgs(ct_total)}</td>
                            </tr>
                        </tfoot>
                    </table>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList)

